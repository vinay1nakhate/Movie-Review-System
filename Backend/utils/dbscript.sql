drop database if exists movie_review_sys;

use movie_review_sys;

create table user(
    id integer AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50) UNIQUE NOT NULL,
    password varchar(100),
    phoneNumber varchar(15),
    isDeleted integer(1) default 0, -- 0: not deleted, 1: deleted
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
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);