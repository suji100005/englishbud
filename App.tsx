import React, { useState, useEffect, useCallback, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate, NavLink } from 'react-router-dom';
import {
  STUDENTS_KEY, BOOKS_KEY, READING_LOGS_KEY, LOGGED_IN_STUDENT_KEY, INITIAL_STUDENTS, INITIAL_BOOKS,
  RENAISSANCE_URL, NAVER_DICT_URL, AUDIO_LINKS_KEY, INITIAL_BOOK_EXCERPTS, BookOpenIcon, HeadphonesIcon,
  QuizIcon, LogoutIcon, LibraryIcon, AdminIcon, TrashIcon, PlusIcon, PencilIcon, INITIAL_AUDIO_LINKS, BOOK_EXCERPTS_KEY,
  UserCardIcon, GOOGLE_DRIVE_SEARCH_URL, DictionaryIcon, CheckIcon
} from './constants';
import { getWordDefinitions, getDictionaryDefinition } from './services/geminiService';
import { ReadingStatus } from './types';
import type { Student, Book, ReadingLog, StudentReadingData, WordDefinition } from './types';

// A generic hook for using localStorage
function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}


// --- AUTHENTICATION ---
const AuthContext = React.createContext<{
  student: Student | null;
  login: (studentId: string, students: Student[]) => void;
  logout: () => void;
}>({ student: null, login: () => {}, logout: () => {} });

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students] = useLocalStorage<Student[]>(STUDENTS_KEY, INITIAL_STUDENTS);
  const [loggedInStudentId, setLoggedInStudentId] = useLocalStorage<string | null>(LOGGED_IN_STUDENT_KEY, null);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (loggedInStudentId) {
      const currentStudent = students.find(s => s.id === loggedInStudentId);
      setStudent(currentStudent || null);
    } else {
      setStudent(null);
    }
  }, [loggedInStudentId, students]);

  const login = (studentId: string, allStudents: Student[]) => {
    const studentToLogin = allStudents.find(s => s.id === studentId);
    if (studentToLogin) {
      setLoggedInStudentId(studentId);
      setStudent(studentToLogin);
    }
  };

  const logout = () => {
    setLoggedInStudentId(null);
    setStudent(null);
  };

  return <AuthContext.Provider value={{ student, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

// --- PROTECTED ROUTE ---
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { student } = useAuth();
  const location = useLocation();

  if (!student) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};


// --- HEADER COMPONENT ---
const Header: React.FC<{ onDictionaryClick: () => void }> = ({ onDictionaryClick }) => {
    const { student, logout } = useAuth();
    const navigate = useNavigate();
    
    if (!student) return null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
        isActive ? 'bg-sky-100 text-sky-700' : 'text-slate-600 hover:bg-slate-100'
      }`;

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Link to="/" className="text-xl font-bold text-sky-600">우리들의 리딩 허브</Link>
                <div className="flex items-center gap-2">
                    <NavLink to="/" className={navLinkClass}><BookOpenIcon className="w-5 h-5" /> 책 보러가기</NavLink>
                    <NavLink to="/library" className={navLinkClass}><LibraryIcon className="w-5 h-5" /> 나의 서재</NavLink>
                    {student.id === 'admin' && (
                       <NavLink to="/admin" className={navLinkClass}><AdminIcon className="w-5 h-5" /> 선생님</NavLink>
                    )}
                    <button onClick={onDictionaryClick} className={navLinkClass({isActive: false})}>
                        <DictionaryIcon className="w-5 h-5" /> 사전
                    </button>
                    <div className="flex items-center gap-2 border-l border-slate-200 pl-2 ml-2">
                      <span className="text-slate-700 font-semibold hidden sm:block text-sm">{student.name}님, 반가워요!</span>
                      <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50">
                          <LogoutIcon className="w-5 h-5" />
                          <span className="hidden md:inline sr-only">나가기</span>
                      </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

// --- STUDENT SELECTION PAGE ---
const StudentSelectionPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [students] = useLocalStorage<Student[]>(STUDENTS_KEY, INITIAL_STUDENTS);

  const handleSelectStudent = (studentId: string) => {
    login(studentId, students);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-slate-800">
            우리들의 리딩 허브에 오신 걸 환영해요!
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            먼저 이름을 골라주세요
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => handleSelectStudent(student.id)}
              className="group flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:border-sky-500 hover:bg-sky-50 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-slate-100 rounded-full group-hover:bg-sky-100 transition-colors">
                {student.id === 'admin' ? 
                  <AdminIcon className="w-16 h-16 text-slate-400 group-hover:text-sky-600 transition-colors" /> :
                  <UserCardIcon className="w-16 h-16 text-slate-400 group-hover:text-sky-600 transition-colors" />
                }
              </div>
              <span className="mt-3 text-sm font-medium text-slate-700 group-hover:text-sky-800">{student.name === 'Admin' ? '선생님' : student.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; }> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-slate-600 mt-2 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors">취소</button>
          <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">삭제</button>
        </div>
      </div>
    </div>
  );
};


// --- WORD HELP MODAL ---
const WordHelpModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  definitions: WordDefinition[];
  isLoading: boolean;
  error: string | null;
  bookTitle: string;
}> = ({ isOpen, onClose, definitions, isLoading, error, bookTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">"{bookTitle}" 어려운 단어 풀이</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
        </div>
        <div className="min-h-[150px]">
          {isLoading && <div className="text-center p-4 text-slate-500">단어 뜻을 찾아보고 있어요...</div>}
          {error && <div className="text-center p-4 text-red-600">{error}</div>}
          {!isLoading && !error && definitions.length > 0 && (
            <ul className="space-y-4">
              {definitions.map((def, index) => (
                <li key={index} className="border-b border-slate-200 pb-3">
                  <strong className="text-sky-600 text-lg">{def.word}</strong>: 
                  <p className="text-slate-600 ml-2 inline">{def.definition}</p>
                  <a href={`${NAVER_DICT_URL}${def.word}`} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline ml-2">네이버 사전에서 찾아보기</a>
                </li>
              ))}
            </ul>
          )}
           {!isLoading && !error && definitions.length === 0 && (
            <div className="text-center p-4 text-slate-500">도움이 필요한 단어를 찾지 못했어요. 모두 아는 단어인가 봐요!</div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- DICTIONARY MODAL ---
const DictionaryModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setError("찾고 싶은 단어를 입력해주세요.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setDefinition('');
    try {
      const result = await getDictionaryDefinition(word);
      setDefinition(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setWord('');
    setDefinition('');
    setError(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">사전</h3>
          <button onClick={handleClose} className="text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="궁금한 단어를 찾아보세요..."
            className="flex-grow px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button type="submit" disabled={isLoading} className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 disabled:bg-sky-300 transition-colors">
            {isLoading ? '...' : '찾기'}
          </button>
        </form>
        <div className="mt-4 min-h-[100px] bg-slate-50 p-4 rounded-lg">
          {error && <p className="text-red-500">{error}</p>}
          {definition && (
            <div>
              <h4 className="font-semibold text-slate-700">'{word}'의 뜻</h4>
              <p className="text-slate-800 text-xl mt-1">{definition}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- QUIZ MODAL ---
const QuizModal: React.FC<{ isOpen: boolean; onClose: () => void; student: Student | null; }> = ({ isOpen, onClose, student }) => {
  const [idCopied, setIdCopied] = useState(false);
  const [pwCopied, setPwCopied] = useState(false);

  const handleCopy = (text: string, type: 'id' | 'pw') => {
    navigator.clipboard.writeText(text);
    if(type === 'id') {
      setIdCopied(true);
      setTimeout(() => setIdCopied(false), 2000);
    } else {
      setPwCopied(true);
      setTimeout(() => setPwCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">퀴즈를 풀어볼까요?</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
        </div>
        <div className="space-y-4">
          <p className="text-slate-600">이 ID와 비밀번호로 로그인해주세요.</p>
          <div className="bg-slate-100 p-4 rounded-lg space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-500">나의 르네상스 ID:</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-mono font-semibold text-slate-800">{student?.renaissanceId || 'N/A'}</p>
                {student?.renaissanceId && (
                  <button onClick={() => handleCopy(student.renaissanceId!, 'id')} className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-md hover:bg-sky-200 flex items-center gap-1 transition-colors">
                    {idCopied ? <><CheckIcon className="w-4 h-4" /> 복사했어요!</> : 'ID 복사하기'}
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-500">나의 비밀번호:</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-mono font-semibold text-slate-800">{student?.renaissancePw || 'N/A'}</p>
                {student?.renaissancePw && (
                  <button onClick={() => handleCopy(student.renaissancePw!, 'pw')} className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-md hover:bg-sky-200 flex items-center gap-1 transition-colors">
                     {pwCopied ? <><CheckIcon className="w-4 h-4" /> 복사했어요!</> : '비밀번호 복사'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <a
            href={RENAISSANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center bg-violet-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-violet-600 transition-colors"
          >
            르네상스 웹사이트로 가기
          </a>
        </div>
      </div>
    </div>
  );
};


// --- BOOK CARD COMPONENT ---
const BookCard: React.FC<{ book: Book; onRead: () => void; onQuiz: () => void; audioLink?: string; isAnimatingOut: boolean; }> = ({ book, onRead, onQuiz, audioLink, isAnimatingOut }) => {
    const listenUrl = audioLink || `${GOOGLE_DRIVE_SEARCH_URL}${encodeURIComponent(book.title)}`;
    const animationClass = isAnimatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

    return (
        <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${animationClass}`}>
            <img src={`https://picsum.photos/seed/${book.id}/400/200`} alt={book.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800">{book.title}</h3>
                {book.author && <p className="text-sm text-slate-500">지은이: {book.author}</p>}
                <p className="text-sm text-slate-500 mb-4">레벨 {book.level}</p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                   <a href={listenUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1">
                        <HeadphonesIcon className="w-4 h-4" /> 들어보기
                    </a>
                   <button onClick={onQuiz} className="text-center bg-violet-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-violet-600 transition-colors flex items-center justify-center gap-1">
                        <QuizIcon className="w-4 h-4" /> 퀴즈 풀기
                    </button>
                </div>
                 <button onClick={onRead} className="w-full mt-2 bg-sky-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center gap-1">
                    읽기 시작!
                </button>
            </div>
        </div>
    );
};

// --- READING BOOK CARD COMPONENT (for My Library & Continue Reading) ---
const ReadingBookCard: React.FC<{ book: Book; onMarkComplete?: () => void; onWordHelp: () => void; onQuiz: () => void; onRemove: () => void; audioLink?: string; status: ReadingStatus; isAnimatingOut: boolean; }> = 
({ book, onMarkComplete, onWordHelp, onQuiz, onRemove, audioLink, status, isAnimatingOut }) => {
    const listenUrl = audioLink || `${GOOGLE_DRIVE_SEARCH_URL}${encodeURIComponent(book.title)}`;
    const animationClass = isAnimatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${animationClass}`}>
            <div>
                <h4 className="font-bold text-slate-800">{book.title}</h4>
                {book.author && <p className="text-sm text-slate-500">지은이: {book.author}</p>}
                <p className="text-sm text-slate-400">레벨 {book.level}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <a href={listenUrl} target="_blank" rel="noopener noreferrer" className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md text-sm font-semibold hover:bg-emerald-200 transition-colors">들어보기</a>
                <button onClick={onWordHelp} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm font-semibold hover:bg-amber-200 transition-colors">어려운 단어</button>
                <button onClick={onQuiz} className="bg-violet-100 text-violet-800 px-3 py-1 rounded-md text-sm font-semibold hover:bg-violet-200 transition-colors">퀴즈 풀기</button>
                {status === ReadingStatus.InProgress && onMarkComplete && (
                  <button onClick={onMarkComplete} className="bg-sky-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-sky-600 transition-colors">다 읽었어요!</button>
                )}
                 <button onClick={onRemove} className="text-slate-400 hover:text-red-600 p-1 rounded-full transition-colors">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

// --- HOME PAGE ---
const HomePage: React.FC = () => {
  const [books] = useLocalStorage<Book[]>(BOOKS_KEY, INITIAL_BOOKS);
  const { student } = useAuth();
  const [readingLogs, setReadingLogs] = useLocalStorage<StudentReadingData>(READING_LOGS_KEY, {});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [audioLinks] = useLocalStorage<{[key: string]: string}>(AUDIO_LINKS_KEY, INITIAL_AUDIO_LINKS);
  const [bookExcerpts] = useLocalStorage<{ [key: string]: string }>(BOOK_EXCERPTS_KEY, INITIAL_BOOK_EXCERPTS);

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ book: Book | null; definitions: WordDefinition[]; isLoading: boolean; error: string | null }>({ book: null, definitions: [], isLoading: false, error: null });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, bookId: '', bookTitle: ''});
  const [animatingOut, setAnimatingOut] = useState<string | null>(null);

  const uniqueLevels = [...new Set(books.map(b => b.level))].sort((a, b) => a - b);
  
  const studentLogs = (student && readingLogs[student.id]) || {};

  const handleAnimationAndAction = (bookId: string, action: (id: string) => void) => {
    setAnimatingOut(bookId);
    setTimeout(() => {
        action(bookId);
        setAnimatingOut(null);
    }, 300); // Animation duration
  };

  const handleMarkAsReading = (bookId: string) => {
    if (!student) return;
    handleAnimationAndAction(bookId, (id) => {
        setReadingLogs(prevLogs => {
          const studentLogs = prevLogs[student.id] || {};
          return { ...prevLogs, [student.id]: { ...studentLogs, [id]: ReadingStatus.InProgress } };
        });
    });
  };
  
  const handleMarkAsComplete = (bookId: string) => {
    if (!student) return;
    handleAnimationAndAction(bookId, (id) => {
        setReadingLogs(prev => ({...prev, [student.id]: { ...prev[student.id], [id]: ReadingStatus.Completed }}));
    });
  };

  const handleRemoveBookConfirm = () => {
    if (!student || !confirmModal.bookId) return;
     handleAnimationAndAction(confirmModal.bookId, (id) => {
        setReadingLogs(prevLogs => {
            const newStudentLogs = { ...(prevLogs[student.id] || {}) };
            delete newStudentLogs[id];
            return { ...prevLogs, [student.id]: newStudentLogs };
        });
    });
  };


  const handleGetWordHelp = useCallback(async (book: Book) => {
    if (!student) return;
    
    const excerpt = bookExcerpts[book.title];
    if (!excerpt) {
        setModalData({ book, definitions: [], isLoading: false, error: "이 책은 발췌문이 준비되지 않았어요." });
        setIsHelpModalOpen(true);
        return;
    }

    setModalData({ book, definitions: [], isLoading: true, error: null });
    setIsHelpModalOpen(true);

    try {
        const definitions = await getWordDefinitions(student.level, book.title, book.level, excerpt);
        setModalData(prev => ({ ...prev, definitions, isLoading: false }));
    } catch (error) {
        setModalData(prev => ({ ...prev, error: (error as Error).message, isLoading: false }));
    }
  }, [student, bookExcerpts]);

  
  const inProgressBooks = books.filter(book => studentLogs[book.id] === ReadingStatus.InProgress);
  const availableBooks = books.filter(book => !studentLogs[book.id]);

  const filteredAvailableBooks = availableBooks.filter(book => {
      const matchesQuery = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;
      return matchesQuery && matchesLevel;
  });

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {inProgressBooks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">이어서 읽기</h2>
            <div className="grid grid-cols-1 gap-4">
              {inProgressBooks.map(book => (
                <ReadingBookCard 
                  key={book.id}
                  book={book}
                  onMarkComplete={() => handleMarkAsComplete(book.id)}
                  onWordHelp={() => handleGetWordHelp(book)}
                  onQuiz={() => setIsQuizModalOpen(true)}
                  onRemove={() => setConfirmModal({ isOpen: true, bookId: book.id, bookTitle: book.title })}
                  audioLink={audioLinks[book.title]}
                  status={ReadingStatus.InProgress}
                  isAnimatingOut={animatingOut === book.id}
                />
              ))}
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-slate-800 mb-6">멋지고 신기한 책들의 세상</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm">
          <input
            type="text"
            placeholder="책 제목으로 찾아보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="책 제목으로 찾아보세요..."
          />
          <div className="w-full sm:w-auto">
            <label htmlFor="level-filter" className="sr-only">레벨로 찾아보기</label>
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">모든 레벨</option>
              {uniqueLevels.map(level => (
                <option key={level} value={level}>레벨 {level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAvailableBooks.map(book => 
            <BookCard 
              key={book.id} 
              book={book} 
              onRead={() => handleMarkAsReading(book.id)} 
              onQuiz={() => setIsQuizModalOpen(true)} 
              audioLink={audioLinks[book.title]}
              isAnimatingOut={animatingOut === book.id} 
            />
          )}
        </div>
        {filteredAvailableBooks.length === 0 && <p className="text-slate-600 text-center col-span-full mt-4">찾으시는 책이 없어요.</p>}
      </div>
       <WordHelpModal 
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
          definitions={modalData.definitions}
          isLoading={modalData.isLoading}
          error={modalData.error}
          bookTitle={modalData.book?.title || ''}
        />
      <QuizModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} student={student} />
      <ConfirmationModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, bookId: '', bookTitle: '' })}
        onConfirm={handleRemoveBookConfirm}
        title="책 삭제"
        message={`'${confirmModal.bookTitle}' 책을 목록에서 정말 지울까요?`}
      />
    </>
  );
};


// --- MY LIBRARY PAGE ---
const MyLibraryPage: React.FC = () => {
    const { student } = useAuth();
    const [books] = useLocalStorage<Book[]>(BOOKS_KEY, INITIAL_BOOKS);
    const [readingLogs, setReadingLogs] = useLocalStorage<StudentReadingData>(READING_LOGS_KEY, {});
    const [bookExcerpts] = useLocalStorage<{ [key: string]: string }>(BOOK_EXCERPTS_KEY, INITIAL_BOOK_EXCERPTS);
    const [audioLinks] = useLocalStorage<{[key: string]: string}>(AUDIO_LINKS_KEY, INITIAL_AUDIO_LINKS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
    
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ book: Book | null; definitions: WordDefinition[]; isLoading: boolean; error: string | null }>({ book: null, definitions: [], isLoading: false, error: null });
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, bookId: '', bookTitle: ''});
    const [animatingOut, setAnimatingOut] = useState<string | null>(null);

    const uniqueLevels = [...new Set(books.map(b => b.level))].sort((a, b) => a - b);
    const studentLogs = (student && readingLogs[student.id]) || {};
    
    const inProgressBooks = books.filter(book => studentLogs[book.id] === ReadingStatus.InProgress);
    const completedBooks = books.filter(book => studentLogs[book.id] === ReadingStatus.Completed);

    const filterMyBooks = (bookList: Book[]) => bookList.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedLevel === 'all' || book.level === selectedLevel)
    );

    const filteredInProgressBooks = filterMyBooks(inProgressBooks);
    const filteredCompletedBooks = filterMyBooks(completedBooks);

    const handleAnimationAndAction = (bookId: string, action: (id: string) => void) => {
      setAnimatingOut(bookId);
      setTimeout(() => {
          action(bookId);
          setAnimatingOut(null);
      }, 300); // Animation duration
    };

    const handleMarkAsComplete = (bookId: string) => {
        if (!student) return;
        handleAnimationAndAction(bookId, (id) => {
            setReadingLogs(prev => ({...prev, [student.id]: { ...prev[student.id], [id]: ReadingStatus.Completed }}));
        });
    };

    const handleRemoveBookConfirm = () => {
        if (!student || !confirmModal.bookId) return;
        handleAnimationAndAction(confirmModal.bookId, (id) => {
            setReadingLogs(prevLogs => {
                const newStudentLogs = { ...(prevLogs[student.id] || {}) };
                delete newStudentLogs[id];
                return { ...prevLogs, [student.id]: newStudentLogs };
            });
        });
    };
    
    const handleGetWordHelp = useCallback(async (book: Book) => {
        if (!student) return;
        const excerpt = bookExcerpts[book.title];
        if (!excerpt) {
            setModalData({ book, definitions: [], isLoading: false, error: "이 책은 발췌문이 준비되지 않았어요." });
            setIsHelpModalOpen(true);
            return;
        }
        setModalData({ book, definitions: [], isLoading: true, error: null });
        setIsHelpModalOpen(true);
        try {
            const definitions = await getWordDefinitions(student.level, book.title, book.level, excerpt);
            setModalData(prev => ({ ...prev, definitions, isLoading: false }));
        } catch (error) {
            setModalData(prev => ({ ...prev, error: (error as Error).message, isLoading: false }));
        }
    }, [student, bookExcerpts]);

    const renderBookList = (list: Book[], status: ReadingStatus) => (
      <>
        {list.length > 0 ? (
          <div className="space-y-4">
            {list.map(book => (
              <ReadingBookCard
                key={book.id}
                book={book}
                status={status}
                onMarkComplete={status === ReadingStatus.InProgress ? () => handleMarkAsComplete(book.id) : undefined}
                onWordHelp={() => handleGetWordHelp(book)}
                onQuiz={() => setIsQuizModalOpen(true)}
                onRemove={() => setConfirmModal({ isOpen: true, bookId: book.id, bookTitle: book.title })}
                audioLink={audioLinks[book.title]}
                isAnimatingOut={animatingOut === book.id}
              />
            ))}
          </div>
        ) : <p className="text-slate-500">조건에 맞는 책이 없어요.</p>}
      </>
    );

    return (
        <>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">나의 서재</h2>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
                  <input type="text" placeholder="책 제목으로 찾아보세요..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full sm:flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                  <div className="w-full sm:w-auto">
                    <label htmlFor="my-library-level-filter" className="sr-only">레벨로 찾아보기</label>
                    <select id="my-library-level-filter" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="all">모든 레벨</option>
                      {uniqueLevels.map(level => <option key={level} value={level}>레벨 {level}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-10">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-4 border-b border-slate-200 pb-2">지금 읽고 있는 책</h3>
                        {inProgressBooks.length > 0 ? renderBookList(filteredInProgressBooks, ReadingStatus.InProgress) : <p className="text-slate-500">아직 읽고 있는 책이 없네요. 새로운 책을 골라볼까요?</p>}
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-4 border-b border-slate-200 pb-2">다 읽은 책들</h3>
                        {completedBooks.length > 0 ? renderBookList(filteredCompletedBooks, ReadingStatus.Completed) : <p className="text-slate-500">아직 다 읽은 책이 없어요.</p>}
                    </div>
                </div>
            </div>
            <WordHelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} definitions={modalData.definitions} isLoading={modalData.isLoading} error={modalData.error} bookTitle={modalData.book?.title || ''}/>
            <QuizModal isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)} student={student} />
            <ConfirmationModal 
              isOpen={confirmModal.isOpen}
              onClose={() => setConfirmModal({ isOpen: false, bookId: '', bookTitle: '' })}
              onConfirm={handleRemoveBookConfirm}
              title="책 삭제"
              message={`'${confirmModal.bookTitle}' 책을 목록에서 정말 지울까요?`}
            />
        </>
    );
};


// --- ADMIN PAGE ---
const AdminPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">선생님 페이지</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ManageStudents />
                <ManageBooks />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ManageExcerpts />
                <ManageAudioLinks />
            </div>
        </div>
    );
};

const ManageStudents: React.FC = () => {
    const [students, setStudents] = useLocalStorage<Student[]>(STUDENTS_KEY, INITIAL_STUDENTS);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentLevel, setNewStudentLevel] = useState(1);
    const [newStudentRenaissanceId, setNewStudentRenaissanceId] = useState('');
    const [newStudentRenaissancePw, setNewStudentRenaissancePw] = useState('');
    const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

    const resetStudentForm = () => {
        setNewStudentName('');
        setNewStudentLevel(1);
        setNewStudentRenaissanceId('');
        setNewStudentRenaissancePw('');
        setEditingStudentId(null);
    };

    const handleStudentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStudentName.trim()) return;

        if (editingStudentId) {
            setStudents(prev => prev.map(s => s.id === editingStudentId ? { ...s, name: newStudentName, level: newStudentLevel, renaissanceId: newStudentRenaissanceId, renaissancePw: newStudentRenaissancePw } : s));
        } else {
            const newStudent: Student = {
                id: `s${Date.now()}`,
                name: newStudentName,
                level: newStudentLevel,
                renaissanceId: newStudentRenaissanceId,
                renaissancePw: newStudentRenaissancePw,
            };
            setStudents(prev => [...prev, newStudent]);
        }
        resetStudentForm();
    };
    
    const handleEditStudent = (student: Student) => {
        setEditingStudentId(student.id);
        setNewStudentName(student.name);
        setNewStudentLevel(student.level);
        setNewStudentRenaissanceId(student.renaissanceId || '');
        setNewStudentRenaissancePw(student.renaissancePw || '');
    };

    const handleDeleteStudent = (id: string) => {
        if(id === 'admin') {
            alert("선생님 계정은 삭제할 수 없어요.");
            return;
        }
        if (window.confirm("정말로 이 학생을 목록에서 지울까요?")) {
            setStudents(prev => prev.filter(s => s.id !== id));
        }
    };

    const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
      <input {...props} className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
    );
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-slate-700">학생 관리</h3>
            <form onSubmit={handleStudentSubmit} className="space-y-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">이름</label>
                    <FormInput type="text" value={newStudentName} onChange={e => setNewStudentName(e.target.value)} required />
                </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700">레벨</label>
                   <FormInput type="number" min="0" value={newStudentLevel} onChange={e => setNewStudentLevel(Number(e.target.value))} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">르네상스 ID</label>
                    <FormInput type="text" value={newStudentRenaissanceId} onChange={e => setNewStudentRenaissanceId(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">르네상스 비밀번호</label>
                    <FormInput type="text" value={newStudentRenaissancePw} onChange={e => setNewStudentRenaissancePw(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                    {editingStudentId && <button type="button" onClick={resetStudentForm} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300">취소</button>}
                    <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2">
                        {editingStudentId ? <PencilIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/>}
                        {editingStudentId ? '학생 정보 바꾸기' : '새로운 학생'}
                    </button>
                </div>
            </form>
            <ul className="space-y-2 max-h-60 overflow-y-auto p-1">
                {students.map(s => (
                    <li key={s.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div>
                            <span className="font-semibold text-slate-800">{s.name}</span> (레벨 {s.level})
                            <p className="text-xs text-slate-500">ID: {s.renaissanceId || '없음'}, PW: {s.renaissancePw || '없음'}</p>
                        </div>
                        {s.id !== 'admin' && (
                            <div className="flex gap-2">
                                <button onClick={() => handleEditStudent(s)} className="text-sky-500 hover:text-sky-700 p-1"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleDeleteStudent(s.id)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ManageBooks: React.FC = () => {
    const [books, setBooks] = useLocalStorage<Book[]>(BOOKS_KEY, INITIAL_BOOKS);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookAuthor, setNewBookAuthor] = useState('');
    const [newBookLevel, setNewBookLevel] = useState(1);

    const handleAddBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBookTitle.trim()) return;
        const newBook: Book = {
            id: `b${Date.now()}`,
            title: newBookTitle,
            author: newBookAuthor,
            level: newBookLevel
        };
        setBooks(prev => [...prev, newBook]);
        setNewBookTitle('');
        setNewBookAuthor('');
        setNewBookLevel(1);
    };

    const handleDeleteBook = (id: string) => {
        if (window.confirm("정말로 이 책을 목록에서 지울까요?")) {
            setBooks(prev => prev.filter(b => b.id !== id));
        }
    };

    const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
      <input {...props} className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-slate-700">책 관리</h3>
            <form onSubmit={handleAddBook} className="space-y-4 mb-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">책 제목</label>
                    <FormInput type="text" value={newBookTitle} onChange={e => setNewBookTitle(e.target.value)} required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">지은이</label>
                    <FormInput type="text" value={newBookAuthor} onChange={e => setNewBookAuthor(e.target.value)} />
                </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700">레벨</label>
                   <FormInput type="number" step="0.1" min="0" value={newBookLevel} onChange={e => setNewBookLevel(Number(e.target.value))} required />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 flex items-center gap-2">
                        <PlusIcon className="w-5 h-5"/>새로운 책
                    </button>
                </div>
            </form>
            <ul className="space-y-2 max-h-60 overflow-y-auto p-1">
                {books.slice().reverse().map(b => (
                    <li key={b.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div>
                            <span className="font-semibold text-slate-800">{b.title}</span> <span className="text-xs text-slate-500">{b.author ? `(${b.author})` : ''}</span>
                        </div>
                        <button onClick={() => handleDeleteBook(b.id)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon className="w-5 h-5"/></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ManageExcerpts: React.FC = () => {
    const [books] = useLocalStorage<Book[]>(BOOKS_KEY, INITIAL_BOOKS);
    const [excerpts, setExcerpts] = useLocalStorage<{ [key: string]: string }>(BOOK_EXCERPTS_KEY, INITIAL_BOOK_EXCERPTS);
    const [selectedBook, setSelectedBook] = useState('');
    const [excerpt, setExcerpt] = useState('');

    useEffect(() => {
        if (selectedBook) {
            setExcerpt(excerpts[selectedBook] || '');
        } else {
            setExcerpt('');
        }
    }, [selectedBook, excerpts]);

    const handleSaveExcerpt = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBook) return;
        setExcerpts(prev => ({...prev, [selectedBook]: excerpt}));
        alert(`'${selectedBook}' 책 내용이 저장되었어요.`);
    };
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-slate-700">책 내용 관리</h3>
            <form onSubmit={handleSaveExcerpt} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">책을 골라주세요</label>
                    <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg">
                        <option value="">-- 책을 골라주세요 --</option>
                        {books.map(b => <option key={b.id} value={b.title}>{b.title}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">책 내용</label>
                    <textarea
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        rows={6}
                        placeholder="책의 일부분을 여기에 적어주세요..."
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        disabled={!selectedBook}
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600" disabled={!selectedBook}>내용 저장</button>
                </div>
            </form>
        </div>
    );
};

const ManageAudioLinks: React.FC = () => {
    const [books] = useLocalStorage<Book[]>(BOOKS_KEY, INITIAL_BOOKS);
    const [audioLinks, setAudioLinks] = useLocalStorage<{[key: string]: string}>(AUDIO_LINKS_KEY, INITIAL_AUDIO_LINKS);
    const [selectedBook, setSelectedBook] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(() => {
        setAudioUrl(audioLinks[selectedBook] || '');
    }, [selectedBook, audioLinks]);

    const handleSaveLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBook) return;
        setAudioLinks(prev => ({ ...prev, [selectedBook]: audioUrl }));
        alert(`'${selectedBook}'의 오디오 주소가 저장되었어요.`);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-slate-700">오디오 링크 관리</h3>
            <form onSubmit={handleSaveLink} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">책을 골라주세요</label>
                    <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-lg">
                        <option value="">-- 책을 골라주세요 --</option>
                        {books.map(b => <option key={b.id} value={b.title}>{b.title}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">오디오 주소</label>
                    <input
                        type="url"
                        value={audioUrl}
                        onChange={e => setAudioUrl(e.target.value)}
                        placeholder="오디오 주소를 여기에 넣어주세요..."
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        disabled={!selectedBook}
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600" disabled={!selectedBook}>주소 저장</button>
                </div>
            </form>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<StudentSelectionPage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-slate-50">
                <Header onDictionaryClick={() => setIsDictionaryOpen(true)} />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/library" element={<MyLibraryPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Routes>
                </main>
                 <DictionaryModal isOpen={isDictionaryOpen} onClose={() => setIsDictionaryOpen(false)} />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;