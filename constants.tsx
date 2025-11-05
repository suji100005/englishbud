import React from 'react';
import type { Student, Book } from './types';

export const STUDENTS_KEY = 'students_data';
export const BOOKS_KEY = 'books_data';
export const READING_LOGS_KEY = 'reading_logs_data';
export const LOGGED_IN_STUDENT_KEY = 'logged_in_student_id';
export const BOOK_EXCERPTS_KEY = 'book_excerpts_data';
export const AUDIO_LINKS_KEY = 'audio_links_data';

export const RENAISSANCE_URL = "https://global-zone60.renaissance-go.com/welcomeportal/rpid/RPNA67ED";
export const NAVER_DICT_URL = "https://dict.naver.com/enkodict/#/search?query=";
export const GOOGLE_DRIVE_SEARCH_URL = "https://drive.google.com/drive/search?q=";

export const INITIAL_STUDENTS: Student[] = [
    { id: 's1', name: '윤세인', level: 1, renaissanceId: 'sein', renaissancePw: 'yoon' },
    { id: 's2', name: '윤세아', level: 1, renaissanceId: 'seah', renaissancePw: 'yoon' },
    { id: 's3', name: '구서윤', level: 1, renaissanceId: 'seoyoon', renaissancePw: 'koo' },
    { id: 's4', name: '김리안', level: 2, renaissanceId: 'rian', renaissancePw: 'kim' },
    { id: 's5', name: '최도연', level: 1, renaissanceId: 'doyeon', renaissancePw: 'choi' },
    { id: 's6', name: '하예린', level: 1, renaissanceId: 'yerin', renaissancePw: 'ha' },
    { id: 's7', name: '홍예서', level: 1, renaissanceId: 'yeseo h', renaissancePw: 'hong' },
    { id: 's8', name: '권서린', level: 1, renaissanceId: 'seorin', renaissancePw: 'kwon' },
    { id: 's9', name: '국태완', level: 1, renaissanceId: 'taewan', renaissancePw: 'kook' },
    { id: 's10', name: '강연우', level: 2, renaissanceId: 'yeonu', renaissancePw: 'kang' },
    { id: 's11', name: '이소민', level: 0, renaissanceId: 'somin', renaissancePw: 'lee' },
    { id: 's12', name: '김재이', level: 1, renaissanceId: 'jaye', renaissancePw: 'kim' },
    { id: 's13', name: '이윤서', level: 1, renaissanceId: 'yoonseo lee', renaissancePw: 'lee' },
    { id: 's14', name: '방서윤', level: 2, renaissanceId: 'seoyun', renaissancePw: 'bang' },
    { id: 'admin', name: 'Admin', level: 99 },
];


export const INITIAL_BOOKS: Book[] = [
    { id: 'b801', title: 'Amazing Dolphins', author: 'Thomson, Sarah L.', level: 3.5 },
    { id: 'b802', title: 'Ranger Rick: I Wish I Was a Monarch Butterfly', author: 'Bové, Jennifer', level: 3.5 },
    { id: 'b803', title: 'Amazing Gorillas!', author: 'Thomson, Sarah L.', level: 3.5 },
    { id: 'b804', title: 'Curious George Goes to the Zoo', author: 'Platt, Cynthia', level: 3.1 },
    { id: 'b805', title: 'Curious George and the Ice Cream Surprise', author: 'Perez, Monica', level: 3.2 },
    { id: 'b806', title: 'Curious George Feeds the Animals', author: 'Rey, Margret', level: 3.3 },
    { id: 'b807', title: 'Curious George Goes to a Chocolate Factory', author: 'Rey, Margret', level: 3.5 },
    { id: 'b808', title: 'Curious George Saves His Pennies', author: 'Perez, Monica', level: 3.3 },
    { id: 'b809', title: 'Curious George', author: 'Rey, H.A.', level: 2.6 },
    { id: 'b810', title: 'Sweet Dreams, Curious George', author: 'Platt, Cynthia', level: 3.3 },
    { id: 'b811', title: 'How a House Is Built', author: 'Gibbons, Gail', level: 3.7 },
    { id: 'b812', title: 'Shrek!', author: 'Steig, William', level: 3.9 },
    { id: 'b813', title: 'Pumpkin Soup', author: 'Cooper, Helen', level: 3.1 },
    { id: 'b814', title: 'Sadie and the Snowman', author: 'Morgan, Allen', level: 3.5 },
    { id: 'b815', title: 'Morning Bath', author: 'Cowley, Joy', level: 2.9 },
    { id: 'b816', title: 'Save Me, Smee!', author: 'LaRose, Melinda', level: 2.7 },
    { id: 'b817', title: 'The Big Balloon Race', author: 'Coerr, Eleanor', level: 2.6 },
    { id: 'b818', title: 'Mercy Watson Fights Crime', author: 'DiCamillo, Kate', level: 2.6 },
    { id: 'b819', title: 'The Absent Author', author: 'Roy, Ron', level: 3.4 },
    { id: 'b820', title: 'The Falcon\'s Feathers', author: 'Roy, Ron', level: 3.3 },
    { id: 'b821', title: 'The Empty Envelope', author: 'Roy, Ron', level: 3.5 },
    { id: 'b822', title: 'The Deadly Dungeon', author: 'Roy, Ron', level: 3.4 },
    { id: 'b823', title: 'The Bald Bandit', author: 'Roy, Ron', level: 3.2 },
    { id: 'b824', title: 'The Invisible Island', author: 'Roy, Ron', level: 3.6 },
    { id: 'b825', title: 'The Jaguar\'s Jewel', author: 'Roy, Ron', level: 3.5 },
    { id: 'b826', title: 'The Haunted Hotel', author: 'Roy, Ron', level: 3.4 },
    { id: 'b827', title: 'The Canary Caper', author: 'Roy, Ron', level: 3.4 },
    { id: 'b828', title: 'The Goose\'s Gold', author: 'Roy, Ron', level: 3.3 },
    { id: 'b829', title: 'Twister on Tuesday', author: 'Osborne, Mary Pope', level: 3.2 },
    { id: 'b830', title: 'Dinosaurs Before Dark', author: 'Osborne, Mary Pope', level: 2.6 },
    { id: 'b831', title: 'The Knight at Dawn', author: 'Osborne, Mary Pope', level: 2.9 },
    { id: 'b832', title: 'Dingoes at Dinnertime', author: 'Osborne, Mary Pope', level: 3.2 },
    { id: 'b833', title: 'Mummies in the Morning', author: 'Osborne, Mary Pope', level: 2.7 },
    { id: 'b834', title: 'Revolutionary War on Wednesday', author: 'Osborne, Mary Pope', level: 3.5 },
    { id: 'b835', title: 'Vacation Under the Volcano', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b836', title: 'Buffalo Before Breakfast', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b837', title: 'Tigers at Twilight', author: 'Osborne, Mary Pope', level: 3 },
    { id: 'b838', title: 'Thanksgiving on Thursday', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b839', title: 'Earthquake in the Early Morning', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b840', title: 'Stage Fright on a Summer Night', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b841', title: 'Good Morning, Gorillas', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b842', title: 'Day of the Dragon King', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b843', title: 'High Tide in Hawaii', author: 'Osborne, Mary Pope', level: 3.4 },
    { id: 'b844', title: 'Ghost Town at Sundown', author: 'Osborne, Mary Pope', level: 3 },
    { id: 'b845', title: 'Lions at Lunchtime', author: 'Osborne, Mary Pope', level: 3 },
    { id: 'b846', title: 'Dolphins at Daybreak', author: 'Osborne, Mary Pope', level: 3.1 },
    { id: 'b847', title: 'Tonight on the Titanic', author: 'Osborne, Mary Pope', level: 3.1 },
    { id: 'b848', title: 'Polar Bears Past Bedtime', author: 'Osborne, Mary Pope', level: 3.3 },
    { id: 'b849', title: 'Sunset of the Sabertooth', author: 'Osborne, Mary Pope', level: 3 },
    { id: 'b850', title: 'Tales of a Fourth Grade Nothing', author: 'Blume, Judy', level: 3.3 },
    { id: 'b851', title: 'Freckle Juice', author: 'Blume, Judy', level: 3.1 },
    { id: 'b852', title: 'Monkey me and the school ghost', author: 'Roland, Timothy', level: 2.5 },
    { id: 'b853', title: 'Monkey Me and the Pet Show', author: 'Roland, Timothy', level: 2.2 },
    { id: 'b854', title: 'Monkey Me and the Golden Monkey', author: 'Roland, Timothy', level: 2.4 },
    { id: 'b855', title: 'Hey, Al', author: 'Yorinks, Arthur', level: 2.1 },
    { id: 'b856', title: 'The Paperboy', author: 'Pilkey, Dav', level: 2.9 },
    { id: 'b857', title: 'Don\'t Let the Pigeon Drive the Bus!', author: 'Willems, Mo', level: 0.9 },
    { id: 'b858', title: 'Anna\'s Icy Adventure', author: 'Allen, Elise', level: 3.6 },
    { id: 'b859', title: 'Amelia Bedelia by the Yard', author: 'Parish, Herman', level: 2.6 },
    { id: 'b860', title: 'To the Rescue!', author: 'Mayer, Mercer', level: 1.2 },
    { id: 'b861', title: 'The Camping Trip', author: 'Hapka, Catherine', level: 2.2 },
    { id: 'b862', title: 'Green Eyes', author: 'Birnbaum, Abe', level: 2.8 },
    { id: 'b863', title: 'Mittens', author: 'Schaefer, Lola M.', level: 1.2 },
    { id: 'b864', title: 'Follow me, Mittens', author: 'Schaefer, Lola M.', level: 1.6 },
    { id: 'b865', title: 'What\'s that, Mittens?', author: 'Schaefer, Lola M.', level: 1 },
    { id: 'b866', title: 'Mittens, Where Is Max', author: 'Schaefer, Lola M.', level: 0.8 },
    { id: 'b867', title: 'Happy Halloween, Mittens', author: 'Schaefer, Lola M.', level: 1.5 },
    { id: 'b868', title: 'Mittens at School', author: 'Schaefer, Lola M.', level: 1.2 },
    { id: 'b869', title: 'Noodleheads See the Future (AR 1.8)', author: 'Arnold, Tedd', level: 1.8 },
    { id: 'b870', title: 'Noodleheads Find Something Fishy (AR 1.8)', author: 'Arnold, Tedd', level: 1.8 },
    { id: 'b871', title: 'Noodlehead Nightmares (AR 1.9)', author: 'Arnold, Tedd', level: 1.9 },
    { id: 'b872', title: 'Noodleheads Fortress of Doom (AR 2.0)', author: 'Arnold, Tedd', level: 2 },
    { id: 'b873', title: 'Noodleheads Lucky Day (AR 1.7)', author: 'Arnold, Tedd', level: 1.7 },
    { id: 'b874', title: 'Noodleheads Do the Impossible (AR 2.0)', author: 'Arnold, Tedd', level: 2 },
    { id: 'b875', title: 'Noodleheads Take it Easy (AR 2.1)', author: 'Arnold, Tedd', level: 2.1 },
    { id: 'b876', title: 'Flat Stanley and the Firehouse (AR 2.4)', author: 'Houran, Lori Haskins', level: 2.4 },
    { id: 'b877', title: 'Flat Stanley and the Haunted House (AR 2.2)', author: 'Houran, Lori Haskins', level: 2.2 },
    { id: 'b878', title: 'Flat Stanley Show-and-Tall, Flat Stanley! (AR 2.7)', author: 'Houran, Lori Haskins', level: 2.7 },
    { id: 'b879', title: 'Flat Stanley at Bat (AR 2.3)', author: 'Houran, Lori Haskins', level: 2.3 },
    { id: 'b880', title: 'Flat Stanley Goes Camping (AR 2.4)', author: 'Houran, Lori Haskins', level: 2.4 },
    { id: 'b881', title: 'Flat Stanley and the Very Big Cookie (AR 2.6)', author: 'Houran, Lori Haskins', level: 2.6 },
    { id: 'b882', title: 'Flat Stanley on Ice (AR 2.5)', author: 'Houran, Lori Haskins', level: 2.5 },
    { id: 'b883', title: 'Flat Stanley and the Lost Treasure (AR 2.5)', author: 'Houran, Lori Haskins', level: 2.5 },
    { id: 'b884', title: 'Flat Stanley and the Missing Pumpkins (AR 2.6)', author: 'Houran, Lori Haskins', level: 2.6 },
    { id: 'b885', title: 'Flat Stanley and the Bees (AR 2.2)', author: 'Houran, Lori Haskins', level: 2.2 },
    { id: 'b886', title: 'Queen of the World! (AR 2.2)', author: 'Holm, Jennifer L.', level: 2.2 },
    { id: 'b887', title: 'Our Hero! (AR 2.0)', author: 'Holm, Jennifer L.', level: 2 },
    { id: 'b888', title: 'Beach Babe (AR 2.0)', author: 'Holm, Jennifer L.', level: 2 },
    { id: 'b889', title: 'Rock Star (AR 1.9)', author: 'Holm, Jennifer L.', level: 1.9 },
    { id: 'b890', title: 'Heartbreaker (AR 2.0)', author: 'Holm, Jennifer L.', level: 2 },
    { id: 'b891', title: 'Camp Babymouse (AR 2.0)', author: 'Holm, Jennifer L.', level: 2 },
    { id: 'b892', title: 'Skater Girl (AR 2.2)', author: 'Holm, Jennifer L.', level: 2.2 },
    { id: 'b893', title: 'Puppy Love (AR 1.8)', author: 'Holm, Jennifer L.', level: 1.8 },
    { id: 'b894', title: 'Monster Mash (AR 1.9)', author: 'Holm, Jennifer L.', level: 1.9 },
    { id: 'b895', title: 'The Musical (AR 2.1)', author: 'Holm, Jennifer L.', level: 2.1 },
    { id: 'b896', title: 'Dragonslayer (AR 2.6)', author: 'Holm, Jennifer L.', level: 2.6 },
    { id: 'b897', title: 'Cupcake Tycoon (AR 2.2)', author: 'Holm, Jennifer L.', level: 2.2 },
    { id: 'b898', title: 'Mad Scientist (AR 2.6)', author: 'Holm, Jennifer L.', level: 2.6 },
    { id: 'b899', title: 'A Very Babymouse Christmas (AR 2.1)', author: 'Holm, Jennifer L.', level: 2.1 },
    { id: 'b900', title: 'Babymouse for President (AR 2.6)', author: 'Holm, Jennifer L.', level: 2.6 },
    { id: 'b901', title: 'Extreme Babymouse (AR 2.3)', author: 'Holm, Jennifer L.', level: 2.3 },
    { id: 'b902', title: 'Happy Birthday, Babymouse (AR 2.4)', author: 'Holm, Jennifer L.', level: 2.4 },
    { id: 'b903', title: 'Bad Babysitter (AR 2.3)', author: 'Holm, Jennifer L.', level: 2.3 },
    { id: 'b904', title: 'Goes for the Gold (AR 2.3)', author: 'Holm, Jennifer L.', level: 2.3 },
    { id: 'b905', title: 'Burns Rubber (AR 2.2)', author: 'Holm, Jennifer L.', level: 2.2 },
    { id: 'b906', title: 'All by Myself (AR 1.3)', author: 'Mayer, Mercer', level: 1.3 },
    { id: 'b907', title: 'Just Me and My Babysitter (AR 1.3)', author: 'Mayer, Mercer', level: 1.3 },
    { id: 'b908', title: 'Just Me and My Dad (AR 1.4)', author: 'Mayer, Mercer', level: 1.4 },
    { id: 'b909', title: 'Just a Mess (AR 1.5)', author: 'Mayer, Mercer', level: 1.5 },
    { id: 'b910', title: 'Me Too! (AR 1.5)', author: 'Mayer, Mercer', level: 1.5 },
    { id: 'b911', title: 'Just Shopping With Mom (AR 1.7)', author: 'Mayer, Mercer', level: 1.7 },
    { id: 'b912', title: 'Just Me and My Puppy (AR 1.6)', author: 'Mayer, Mercer', level: 1.6 },
    { id: 'b913', title: 'I Was So Mad (AR 1.6)', author: 'Mayer, Mercer', level: 1.6 },
    { id: 'b914', title: 'The New Baby (AR 1.9)', author: 'Mayer, Mercer', level: 1.9 },
    { id: 'b915', title: 'Just Grandma and Me (AR 1.9)', author: 'Mayer, Mercer', level: 1.9 },
    { id: 'b916', title: 'Just Grandpa and Me (AR 1.9)', author: 'Mayer, Mercer', level: 1.9 },
    { id: 'b917', title: 'Just My Friend and Me (AR 1.9)', author: 'Mayer, Mercer', level: 1.9 },
    { id: 'b918', title: 'I Just Forgot (AR 2.0)', author: 'Mayer, Mercer', level: 2 },
    { id: 'b919', title: 'The New Potty (AR 2.0)', author: 'Mayer, Gina', level: 2 },
    { id: 'b920', title: 'Just for You (AR 2.0)', author: 'Mayer, Mercer', level: 2 },
    { id: 'b921', title: 'Just Go to Bed (AR 2.0)', author: 'Mayer, Mercer', level: 2 },
    { id: 'b922', title: 'What a Bad Dream (AR 2.1)', author: 'Mayer, Mercer', level: 2.1 },
    { id: 'b923', title: 'Just Me and My Mom (AR 2.2)', author: 'Mayer, Mercer', level: 2.2 },
    { id: 'b924', title: 'When I Grow Up (AR 2.2)', author: 'Mayer, Mercer', level: 2.2 },
    { id: 'b925', title: 'When I Get Bigger (AR 2.2)', author: 'Mayer, Mercer', level: 2.2 },
    { id: 'b926', title: 'Happy Easter, Little Critter (AR 2.3)', author: 'Mayer, Mercer', level: 2.3 },
    { id: 'b927', title: 'Just Going to the Dentist (AR 2.4)', author: 'Mayer, Mercer', level: 2.4 },
    { id: 'b928', title: 'Merry Christmas Mom and Dad (AR 2.4)', author: 'Mayer, Mercer', level: 2.4 },
    { id: 'b929', title: 'Just Me and My Little Brother (AR 2.5)', author: 'Mayer, Mercer', level: 2.5 },
    { id: 'b930', title: 'Mia and the daisy dance', author: 'Farley, Robin', level: 1.2 },
    { id: 'b931', title: 'Mia jazzes it up', author: 'Farley, Robin', level: 1.8 },
    { id: 'b932', title: 'Mia and the dance for two', author: 'Farley, Robin', level: 1.4 },
    { id: 'b933', title: 'Mia and the girl with a twirl', author: 'Farley, Robin', level: 1.7 },
    { id: 'b934', title: 'Mia sets the stage', author: 'Farley, Robin', level: 1.5 },
    { id: 'b935', title: 'Mia and the big sister ballet', author: 'Farley, Robin', level: 1.4 },
    { id: 'b936', title: 'Mia and the too big tutu', author: 'Farley, Robin', level: 1.3 },
    { id: 'b937', title: 'Mia and tiny toe shoes', author: 'Farley, Robin', level: 1.6 },
    { id: 'b938', title: 'Splat the cat: blow, snow, blow', author: 'Hsu Lin, Amy', level: 2 },
    { id: 'b939', title: 'Splat the cat: and the hotshot', author: 'Driscoll, Laura', level: 2.3 },
    { id: 'b940', title: 'Splat the cat: the rain is a pain', author: 'Hsu Lin, Amy', level: 1.9 },
    { id: 'b941', title: 'Splat the cat: I scream for ice cream', author: 'Driscoll, Laura', level: 2.2 },
    { id: 'b942', title: 'Splat the cat: twice the mice', author: 'Resnick, Jacqueline', level: 2.1 },
    { id: 'b943', title: 'Splat the cat: and the duck with no quack', author: 'Scotton, Rob', level: 2.3 },
    { id: 'b944', title: 'Splat the cat: good night, sleep tight', author: 'Engel, Natalie', level: 2 },
    { id: 'b945', title: 'Splat the cat: up in the air at the fair', author: 'Hsu Lin, Amy', level: 2.5 },
    { id: 'b946', title: 'Splat the cat: and the quick chicks', author: 'Driscoll, Laura', level: 2.2 },
    { id: 'b947', title: 'Splat the cat: splat and seymour, best friends forevermore', author: 'Heyman, Alissa', level: 2.6 },
    { id: 'b948', title: 'Splat the cat: with a bang and a clang', author: 'Hsu Lin, Amy', level: 2 },
    { id: 'b949', title: 'Splat the cat: a whale of a tale', author: 'Hsu Lin, Amy', level: 2 },
    { id: 'b950', title: 'Splat the cat: takes the cake', author: 'Hsu Lin, Amy', level: 2.1 },
    { id: 'b951', title: 'Splat the cat: sings flat', author: 'Strathearn, Chris', level: 1.8 },
    { id: 'b952', title: 'Splat the cat: makes dad glad', author: 'Heyman, Alissa', level: 2.5 },
    { id: 'b953', title: 'Horrid Henry Gets Rich Quick', author: 'Simon, Francesca', level: 3.3 },
    { id: 'b954', title: 'Sunlight on the Snow Leopard', author: 'Osborne, Mary Pope', level: 3.2 },
    { id: 'b955', title: 'Camp Time in California', author: 'Osborne, Mary Pope', level: 3.5 },
    { id: 'b956', title: 'Late Lunch with Llamas', author: 'Osborne, Mary Pope', level: 3.4 },
    { id: 'b957', title: 'Narwhal on a Sunny Night', author: 'Osborne, Mary Pope', level: 3.4 },
    { id: 'b958', title: 'To the Future, Ben Franklin!', author: 'Osborne, Mary Pope', level: 3.5 },
    { id: 'b959', title: 'Junie B., First Grader: One-Man Band', author: 'Park, Barbara', level: 3 },
    { id: 'b960', title: 'Junie B., First Grader: Shipwrecked', author: 'Park, Barbara', level: 3.1 },
    { id: 'b961', title: 'Junie B., First Grader: Cheater Pants', author: 'Park, Barbara', level: 3.1 },
    { id: 'b962', title: 'Junie B., First Grader: Turkeys We have Loved and Eaten (and Other Thankful Stuff)', author: 'Park, Barbara', level: 2.9 },
    { id: 'b963', title: 'Junie B., First Grader: Dumb Bunny', author: 'Park, Barbara', level: 2.8 },
    { id: 'b964', title: 'Junie B., First Grader: Aloha-ha-ha!', author: 'Park, Barbara', level: 2.8 },
    { id: 'b965', title: 'Junie B., First Grader: Jingle Bells, Batman Smells! (P.S. So Does May)', author: 'Park, Barbara', level: 2.8 },
    { id: 'b966', title: 'Junie B., First Grader: Boo...and I Mean It!', author: 'Park, Barbara', level: 2.9 },
    { id: 'b967', title: 'Junie B., First Grader: Toothless Wonder', author: 'Park, Barbara', level: 2.8 },
    { id: 'b968', title: 'Junie B., First Grader: Boss of Lunch', author: 'Park, Barbara', level: 2.8 },
    { id: 'b969', title: 'Junie B., First Grader (at Last!)', author: 'Park, Barbara', level: 2.6 },
    { id: 'b970', title: 'Junie B. Jones Is a Graduation Girl', author: 'Park, Barbara', level: 3 },
    { id: 'b971', title: 'Junie B. Jones Is Captain Field Day', author: 'Park, Barbara', level: 2.8 },
    { id: 'b972', title: 'Junie B. Jones Has a Peep in Her Pocket', author: 'Park, Barbara', level: 2.9 },
    { id: 'b973', title: 'Junie B. Jones and the Mushy Gushy Valentime', author: 'Park, Barbara', level: 2.9 },
    { id: 'b974', title: 'Junie B. Jones Is (Almost) a Flower Girl', author: 'Park, Barbara', level: 2.7 },
    { id: 'b975', title: 'Junie B. Jones Smells Something Fishy', author: 'Park, Barbara', level: 2.6 },
    { id: 'b976', title: 'Junie B. Jones Is a Beauty Shop Guy', author: 'Park, Barbara', level: 2.8 },
    { id: 'b977', title: 'Junie B. Jones Is a Party Animal', author: 'Park, Barbara', level: 2.8 },
    { id: 'b978', title: 'Junie B. Jones Is Not a Crook', author: 'Park, Barbara', level: 3 },
    { id: 'b979', title: 'Junie B. Jones Has a Monster Under Her Bed', author: 'Park, Barbara', level: 2.7 },
    { id: 'b980', title: 'Junie B. Jones Loves Handsome Warren', author: 'Park, Barbara', level: 2.7 },
    { id: 'b981', title: 'Junie B. Jones and That Meanie Jim\'s Birthday', author: 'Park, Barbara', level: 2.8 },
    { id: 'b982', title: 'Night of the Ninjas', author: 'Osborne, Mary Pope', level: 2.7 },
    { id: 'b983', title: 'Pirates Past Noon', author: 'Osborne, Mary Pope', level: 2.8 },
    { id: 'b984', title: 'Mummies in the Morning', author: 'Osborne, Mary Pope', level: 2.7 },
    { id: 'b985', title: 'The Knight at Dawn', author: 'Osborne, Mary Pope', level: 2.9 },
    { id: 'b986', title: 'Dinosaurs Before Dark', author: 'Osborne, Mary Pope', level: 2.6 },
    { id: 'b987', title: 'Butterfly Garden', author: 'McNamara, Margaret', level: 2.2 },
    { id: 'b988', title: 'Picking Apples', author: 'McNamara, Margaret', level: 1.5 },
    { id: 'b989', title: 'Snow Day', author: 'McNamara, Margaret', level: 1.3 },
    { id: 'b990', title: 'The Playground Problem', author: 'McNamara, Margaret', level: 1.5 },
    { id: 'b991', title: 'Earth Day', author: 'McNamara, Margaret', level: 2.2 },
    { id: 'b992', title: 'Halloween Fun', author: 'McNamara, Margaret', level: 1.2 },
    { id: 'b993', title: 'Summer Treasure', author: 'McNamara, Margaret', level: 1.7 },
    { id: 'b994', title: 'Class Picture Day', author: 'McNamara, Margaret', level: 1.7 },
    { id: 'b995', title: 'Class Mom', author: 'McNamara, Margaret', level: 1.5 },
    { id: 'b996', title: 'Dad Goes to School', author: 'McNamara, Margaret', level: 1.4 },
    { id: 'b997', title: 'One Hundred Days (Plus One)', author: 'McNamara, Margaret', level: 2.2 },
    { id: 'b998', title: 'The Counting Race', author: 'McNamara, Margaret', level: 1.4 },
    { id: 'b999', title: 'Groundhog Day', author: 'McNamara, Margaret', level: 1.7 },
    { id: 'b1000', title: 'The Pumpkin Patch', author: 'McNamara, Margaret', level: 1.5 }
];


export const INITIAL_AUDIO_LINKS: { [key: string]: string } = {};

export const INITIAL_BOOK_EXCERPTS: { [key: string]: string } = {};


export const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const HeadphonesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z" />
  </svg>
);

export const QuizIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LogoutIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const LibraryIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

export const AdminIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const PencilIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

export const UserCardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

export const DictionaryIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);