CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    removed BOOL NOT NULL DEFAULT FALSE,
    created TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP
);