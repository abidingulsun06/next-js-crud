CREATE DATABASE tasksdb;

-- \c tasksdb;

CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(200),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees(
    id SERIAL PRIMARY KEY,
    username text UNIQUE NOT NULL,
    name text,
    lastname text,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks(title, description) VALUES ('first task', 'some description');


SELECT * FROM tasks;