/*
 *  Database
 *  Author: Jennie Zhu, Zishuai Liu, Lyvia Huang
 */
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS history_ingredient;
DROP TABLE IF EXISTS search_history;
DROP TABLE IF EXISTS collection_recipe;
DROP TABLE IF EXISTS browsing_history;
DROP TABLE IF EXISTS score;

DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS collection; 
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS avatar;

CREATE TABLE avatar (
    id INTEGER NOT NULL PRIMARY KEY,
    image_path VARCHAR(50) NOT NULL
);

CREATE TABLE user (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    encrypted_password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    role INTEGER NOT NULL,
    bio TEXT,
    gender VARCHAR(50) NOT NULL,
    birth_date DATE,
    city VARCHAR(50),
    avatar_id INTEGER,
    FOREIGN KEY (avatar_id) REFERENCES avatar (id)
);

CREATE TABLE ingredient (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image_path VARCHAR(50) NOT NULL
);

CREATE TABLE recipe (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(50) NOT NULL
);

CREATE TABLE recipe_ingredient (
    recipe_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)
);

CREATE TABLE search_history (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE history_ingredient (
    search_history_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY (search_history_id) REFERENCES search_history (id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)
);

CREATE TABLE collection (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE collection_recipe (
    collection_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES collection (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id)
);

CREATE TABLE browsing_history (
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id)
);


CREATE TABLE score (
    score INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id)
);


INSERT INTO avatar (id, image_path) VALUES
(1, 'path/to/image1.jpg'),
(2, 'path/to/image2.jpg'),
(3, 'path/to/image3.jpg');

INSERT INTO user (id, name, encrypted_password, email, role, bio, gender, birth_date, city, avatar_id) VALUES
(1, 'John Doe', 'encrypted_password1', 'john.doe@example.com', 1, 'A bio of John', 'Male', '1985-02-15', 'New York', 1),
(2, 'Jane Doe', 'encrypted_password2', 'jane.doe@example.com', 2, 'A bio of Jane', 'Female', '1990-07-22', 'Los Angeles', 2),
(3, 'Alice Johnson', 'encrypted_password3', 'alice.j@example.com', 1, 'A bio of Alice', 'Female', '1992-03-10', 'Chicago', 3);

INSERT INTO ingredient (id, name, image_path) VALUES
(1, 'Tomato', 'path/to/tomato.jpg'),
(2, 'Cucumber', 'path/to/cucumber.jpg'),
(3, 'Chicken', 'path/to/chicken.jpg');

INSERT INTO recipe (id, name, description, image_path) VALUES
(1, 'Tomato Soup', 'A delicious tomato soup perfect for winter days.', 'path/to/tomatosoup.jpg'),
(2, 'Grilled Chicken', 'A healthy grilled chicken recipe ideal for a quick lunch.', 'path/to/grilledchicken.jpg'),
(3, 'Cucumber Salad', 'A refreshing salad for hot summer days.', 'path/to/cucumbersalad.jpg');

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
(1, 1),  -- Tomato Soup includes Tomato
(2, 3),  -- Grilled Chicken includes Chicken
(3, 2);  -- Cucumber Salad includes Cucumber

INSERT INTO search_history (id, user_id, time) VALUES
(1, 1, '2023-04-12 08:30:00'),
(2, 2, '2023-04-12 09:15:00'),
(3, 1, '2023-04-12 10:00:00');

INSERT INTO history_ingredient (search_history_id, ingredient_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 2),
(3, 1);

INSERT INTO collection (id, name, user_id) VALUES
(1, 'Favorite Recipes', 1),
(2, 'Weekend Meals', 2);

INSERT INTO collection_recipe (collection_id, recipe_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3);

INSERT INTO browsing_history (user_id, recipe_id, time) VALUES
(1, 1, '2023-04-11 14:20:00'),
(1, 2, '2023-04-11 14:25:00'),
(2, 1, '2023-04-11 15:00:00'),
(2, 3, '2023-04-11 15:05:00'),
(3, 3, '2023-04-11 16:00:00');

INSERT INTO score (score, user_id, recipe_id) VALUES
(5, 1, 1),
(4, 2, 1),
(3, 3, 2),
(5, 1, 3),
(4, 2, 3);