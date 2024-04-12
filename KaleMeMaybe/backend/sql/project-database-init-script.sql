/*
 *  Database
 */
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(12) NOT NULL
);

INSERT INTO
    users
    (
    username
    )
VALUES
    (
        'testUser'
    );
