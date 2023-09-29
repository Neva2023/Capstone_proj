CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    occupation TEXT,
    password_hash TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INTEGER REFERENCES users(id)
);

