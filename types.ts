
export interface Student {
  id: string;
  name: string;
  level: number;
  renaissanceId?: string;
  renaissancePw?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  level: number;
}

export enum ReadingStatus {
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}

export interface ReadingLog {
  [bookId: string]: ReadingStatus;
}

export interface StudentReadingData {
  [studentId: string]: ReadingLog;
}

export interface WordDefinition {
  word: string;
  definition: string;
}