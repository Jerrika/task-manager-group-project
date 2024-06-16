DROP DATABASE IF EXISTS user_database;

CREATE DATABASE user_database;

\c user_database;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);