CREATE TABLE users (
  userEmail varchar(100),
  userPassowrd varchar(255)
);
ALTER TABLE users 
ADD COLUMN id integer AutoIncremet;

ALTER TABLE users
ADD COLUMN id SERIAL PRIMARY KEY;

update users set verified =FALSE

Delete from users where id = 2
SELECT * FROM users Limit 50;
SELECT * FROM favorites Limit 50;
SELECT * FROM tokens Limit 50;


INSERT INTO users VALUES('Mohamad@Mehdi.com','test')

delete from users where userpassowrd = '$2a$10$W/zZPFrNoOyCGxDpJ6.BOuOQUqv.Z/qaghSU4pkppiaANmsy.H9d6'


Select true FROM users WHERE userEmail = 'mehdi21092005@gmail.com' AND userPassowrd = '$2a$10$5VtrGboujRKuyA6DoHeDi.wEoBSxiC1ETRraQFIzTssLdKjmbiFIK '

SELECT version();





CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    --username VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE Favorites (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     media_link_thumbnail VARCHAR(255) NOT NULL,
--     media_link_active VARCHAR(255) NOT NULL,
--     media_type VARCHAR(50) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES Users(id)
-- );

CREATE TABLE Favorites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    media JSONB NOT NULL, -- JSONB column to store the media item
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Tokens (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP , --NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS Tokens;
DROP TABLE IF EXISTS Favorites;
DROP TABLE IF EXISTS users;


ALTER TABLE Users
ADD COLUMN verified BOOLEAN DEFAULT FALSE;


TRUNCATE TABLE Tokens, Favorites, Users RESTART IDENTITY CASCADE;

Delete from tokens where id > 5

Delete from favorites where id > 3




CREATE TABLE Logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(50), -- The severity level of the log (e.g., 'info', 'warn', 'error')
    message TEXT,  -- The log message describing the event
    meta JSONB,-- Additional metadata related to the log (e.g., request details, error stack)
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- The time the log entry was created
    user_id INT,  -- The ID of the user associated with the log (if applicable)
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
