drop database if exists railway;

create database railway;

use railway;

create table user(
    id integer AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50) UNIQUE NOT NULL,
    password varchar(100),
    phoneNumber varchar(15),
    isDeleted integer default 0, -- 0: not deleted, 1: deleted
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);

create table categories(
    category_id integer AUTO_INCREMENT PRIMARY KEY,
    name varchar(20)
);

CREATE TABLE movies (
    movie_id integer AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,
    release_date date,
    release_year integer,
    category_id integer,
    image varchar(500),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE reviews (
    review_id integer AUTO_INCREMENT PRIMARY KEY,
    movie_id integer,
    user_id integer,
    rating integer,
    comment text,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO user (firstName, lastName, email, password, phoneNumber) VALUES
('Amit', 'Sharma', 'amit.sharma@example.com', 'password123', '9876543210'),
('Priya', 'Patel', 'priya.patel@example.com', 'password123', '9876543211'),
('Ravi', 'Kumar', 'ravi.kumar@example.com', 'password123', '9876543212'),
('Sneha', 'Reddy', 'sneha.reddy@example.com', 'password123', '9876543213'),
('Arjun', 'Mehta', 'arjun.mehta@example.com', 'password123', '9876543214'),
('Neha', 'Singh', 'neha.singh@example.com', 'password123', '9876543215'),
('Karan', 'Verma', 'karan.verma@example.com', 'password123', '9876543216'),
('Isha', 'Gupta', 'isha.gupta@example.com', 'password123', '9876543217'),
('Rahul', 'Kapoor', 'rahul.kapoor@example.com', 'password123', '9876543218'),
('Ananya', 'Joshi', 'ananya.joshi@example.com', 'password123', '9876543219'),
('John', 'Smith', 'john.smith@example.com', 'password123', '9876543220'),
('Emily', 'Johnson', 'emily.johnson@example.com', 'password123', '9876543221'),
('Michael', 'Brown', 'michael.brown@example.com', 'password123', '9876543222'),
('Sophia', 'Davis', 'sophia.davis@example.com', 'password123', '9876543223'),
('William', 'Miller', 'william.miller@example.com', 'password123', '9876543224'),
('Rohan', 'Chopra', 'rohan.chopra@example.com', 'password123', '9876543225'),
('Aarav', 'Rao', 'aarav.rao@example.com', 'password123', '9876543226'),
('Diya', 'Iyer', 'diya.iyer@example.com', 'password123', '9876543227'),
('Siddharth', 'Shah', 'siddharth.shah@example.com', 'password123', '9876543228'),
('Tanvi', 'Malhotra', 'tanvi.malhotra@example.com', 'password123', '9876543229'),
('Olivia', 'Martinez', 'olivia.martinez@example.com', 'password123', '9876543230'),
('Liam', 'Garcia', 'liam.garcia@example.com', 'password123', '9876543231'),
('Noah', 'Rodriguez', 'noah.rodriguez@example.com', 'password123', '9876543232'),
('Ava', 'Wilson', 'ava.wilson@example.com', 'password123', '9876543233'),
('Isabella', 'Anderson', 'isabella.anderson@example.com', 'password123', '9876543234'),
('Aryan', 'Desai', 'aryan.desai@example.com', 'password123', '9876543235'),
('Meera', 'Bhatt', 'meera.bhatt@example.com', 'password123', '9876543236'),
('Kabir', 'Singh', 'kabir.singh@example.com', 'password123', '9876543237'),
('Shreya', 'Nair', 'shreya.nair@example.com', 'password123', '9876543238'),
('Vivaan', 'Kapadia', 'vivaan.kapadia@example.com', 'password123', '9876543239'),
('Ethan', 'Thomas', 'ethan.thomas@example.com', 'password123', '9876543240'), -- ID 31
('Mia', 'Taylor', 'mia.taylor@example.com', 'password123', '9876543241'), -- ID 32
('Alexander', 'Lee', 'alexander.lee@example.com', 'password123', '9876543242'), -- ID 33
('Charlotte', 'Harris', 'charlotte.harris@example.com', 'password123', '9876543243'), -- ID 34
('James', 'Clark', 'james.clark@example.com', 'password123', '9876543244'), -- ID 35
('Benjamin', 'Lewis', 'benjamin.lewis@example.com', 'password123', '9876543245'), -- ID 36
('Saanvi', 'Rao', 'saanvi.rao@example.com', 'password123', '9876543246'), -- ID 37
('Ishaan', 'Malik', 'ishaan.malik@example.com', 'password123', '9876543247'), -- ID 38
('Anika', 'Jain', 'anika.jain@example.com', 'password123', '9876543248'), -- ID 39
('Arya', 'Kohli', 'arya.kohli@example.com', 'password123', '9876543249'); -- ID 40


INSERT INTO categories (name) VALUES
('Action'),
('Comedy'),
('Drama'),
('Romance'),
('Horror'),
('Thriller'),
('Sci-Fi');


INSERT INTO movies (title, release_date, release_year, category_id, image) VALUES
('Pathaan', '2023-01-25', 2023, 1, 'https://upload.wikimedia.org/wikipedia/en/1/1b/Pathaan_poster.jpg'),
('3 Idiots', '2009-12-25', 2009, 2, 'https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg'),
('Kabir Singh', '2019-06-21', 2019, 4, 'https://upload.wikimedia.org/wikipedia/en/4/4e/Kabir_Singh_poster.jpg'),
('Drishyam', '2015-10-02', 2015, 6, 'https://upload.wikimedia.org/wikipedia/en/9/92/Drishyam.jpg'),
('Dangal', '2016-12-23', 2016, 3, 'https://upload.wikimedia.org/wikipedia/en/0/01/Dangal_poster.jpg'),
('Kantara', '2022-09-30', 2022, 3, 'https://upload.wikimedia.org/wikipedia/en/1/1a/Kantara_poster.jpg'),
('K.G.F: Chapter 1', '2018-12-21', 2018, 1, 'https://upload.wikimedia.org/wikipedia/en/9/9e/KGF_Chapter_1.jpg'),
('K.G.F: Chapter 2', '2022-04-14', 2022, 1, 'https://upload.wikimedia.org/wikipedia/en/f/f1/KGF_Chapter_2.jpg'),
('Stree', '2018-08-31', 2018, 5, 'https://upload.wikimedia.org/wikipedia/en/3/36/Stree_movie_poster.jpg'),
('Tumbbad', '2018-10-12', 2018, 5, 'https://upload.wikimedia.org/wikipedia/en/0/01/Tumbbad_Poster.jpg'),
('Raazi', '2018-05-11', 2018, 6, 'https://upload.wikimedia.org/wikipedia/en/0/03/Raazi_film_poster.jpg'),
('Andhadhun', '2018-10-05', 2018, 6, 'https://upload.wikimedia.org/wikipedia/en/f/f3/Andhadhun_poster.jpg'),
('Chhichhore', '2019-09-06', 2019, 2, 'https://upload.wikimedia.org/wikipedia/en/8/8b/Chhichhore_film_poster.jpg'),
('Zindagi Na Milegi Dobara', '2011-07-15', 2011, 4, 'https://upload.wikimedia.org/wikipedia/en/d/df/Zindagi_Na_Milegi_Dobara.jpg'),
('Interstellar', '2014-11-07', 2014, 7, 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'),
('Inception', '2010-07-16', 2010, 7, 'https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg'),
('The Dark Knight', '2008-07-18', 2008, 1, 'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg'),
('Brahmastra', '2022-09-09', 2022, 7, 'https://upload.wikimedia.org/wikipedia/en/c/cf/Brahmastra_film_poster.jpg'),
('Housefull', '2010-04-30', 2010, 2, 'https://upload.wikimedia.org/wikipedia/en/4/42/Housefull_poster.jpg'),
('Tanhaji', '2020-01-10', 2020, 1, 'https://upload.wikimedia.org/wikipedia/en/3/30/Tanhaji.jpg');


INSERT INTO reviews (movie_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Mind-blowing action scenes!'),
(1, 2, 4, 'SRK comeback is solid.'),
(1, 3, 5, 'Loved every scene.'),
(1, 4, 4, 'Great cinematography.'),
(1, 5, 5, 'Amazing!'),
(2, 6, 5, 'Classic comedy.'),
(2, 7, 4, 'Always funny.'),
(2, 8, 5, 'Loved the message too.'),
(2, 9, 4, 'Excellent performances.'),
(2, 10, 5, 'Timeless movie.'),
(3, 11, 4, 'Shahid Kapoor nailed it.'),
(3, 12, 3, 'Too intense for me.'),
(3, 13, 4, 'Good, but emotional.'),
(3, 14, 4, 'Loved the songs.'),
(3, 15, 5, 'Fantastic!'),
(4, 16, 5, 'Edge-of-seat thriller.'),
(4, 17, 4, 'Very smart plot.'),
(4, 18, 5, 'Brilliant.'),
(4, 19, 4, 'Highly recommended.'),
(4, 20, 5, 'Amazing storyline.'),
(5, 21, 5, 'Inspirational!'),
(5, 22, 5, 'Loved it.'),
(5, 23, 4, 'Great performances.'),
(5, 24, 4, 'Very emotional.'),
(5, 25, 5, 'Aamir at his best.'),
(6, 26, 4, 'Beautiful visuals.'),
(6, 27, 3, 'Slow but good.'),
(6, 28, 4, 'Loved the ending.'),
(6, 29, 4, 'Good story.'),
(6, 30, 5, 'Amazing acting.'),
(7, 31, 5, 'High energy!'),
(7, 32, 5, 'Yash is superb.'),
(7, 33, 5, 'Loved the BGM.'),
(7, 34, 4, 'Action packed.'),
(7, 35, 5, 'Awesome movie.'),
(8, 36, 4, 'Sequel is good.'),
(8, 37, 5, 'Loved the visuals.'),
(8, 38, 5, 'Great continuation.'),
(8, 39, 4, 'Good story.'),
(8, 40, 5, 'Loved it.'),
(9, 1, 4, 'Funny and spooky.'),
(9, 2, 5, 'Loved the concept.'),
(10, 3, 5, 'Dark and amazing.'),
(10, 4, 4, 'Very unique horror.'),
(11, 5, 4, 'Excellent spy story.'),
(11, 6, 3, 'Good movie.'),
(12, 7, 5, 'Thrilling till end.'),
(12, 8, 4, 'Clever twists.'),
(13, 9, 5, 'Heartwarming.'),
(13, 10, 4, 'Great message.'),
(14, 11, 5, 'Makes you travel.'),
(14, 12, 4, 'Beautiful friendship story.'),
(15, 13, 5, 'Epic Sci-Fi.'),
(15, 14, 5, 'Masterpiece.'),
(16, 15, 5, 'Mind-bending.'),
(16, 16, 4, 'Loved the concept.'),
(17, 17, 5, 'Iconic superhero.'),
(17, 18, 5, 'Best Joker performance.'),
(18, 19, 3, 'Decent fantasy.'),
(18, 20, 4, 'Good visuals.'),
(19, 21, 3, 'Funny comedy.'),
(19, 22, 2, 'Average.'),
(20, 23, 4, 'Ajay Devgn is perfect.'),
(20, 24, 5, 'Great historical action.'),
(20, 25, 4, 'Loved the battle scenes.'),
(20, 26, 5, 'Very engaging');