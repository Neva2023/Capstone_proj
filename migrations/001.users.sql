CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    occupation TEXT,
    numbers BIGINT,
    addresss TEXT NOT NULL,
    password_hash TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS aim (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    brief TEXT
 
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    comment TEXT
 
);

