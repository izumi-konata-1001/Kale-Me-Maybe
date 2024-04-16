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
    image_path VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (avatar_id) REFERENCES avatar (id)
);

CREATE TABLE ingredient (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image_path VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE recipe (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    time_consuming VARCHAR(50) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    ingredient_details TEXT NOT NULL,
    method TEXT NOT NULL,
    image_path VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id)
);

CREATE TABLE score (
    score INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id)
);


INSERT INTO avatar (id, image_path, created_at, updated_at) VALUES
(1, '/images/avatar1.png', '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, '/images/avatar2.png', '2023-04-12 09:00:00', '2023-04-15 10:00:00'),
(3, '/images/avatar3.png', '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, '/images/avatar4.png', '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, '/images/avatar5.png', '2023-04-15 08:30:00', '2023-04-16 11:00:00');

INSERT INTO user (id, name, encrypted_password, email, role, bio, gender, birth_date, city, avatar_id, created_at, updated_at) VALUES
(1, 'John Doe', 'hashed_password1', 'john@example.com', 1, 'A chef', 'Male', '1985-02-15', 'New York', 1, '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, 'Jane Doe', 'hashed_password2', 'jane@example.com', 2, 'Loves to cook', 'Female', '1987-05-22', 'Los Angeles', 2, '2023-04-13 09:00:00', '2023-04-15 10:00:00'),
(3, 'Alice Johnson', 'hashed_password3', 'alice@example.com', 1, 'A pastry chef', 'Female', '1990-07-30', 'Chicago', 3, '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, 'Bob Smith', 'hashed_password4', 'bob@example.com', 1, 'Barbecue expert', 'Male', '1982-11-15', 'Houston', 4, '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, 'Carol Taylor', 'hashed_password5', 'carol@example.com', 2, 'Healthy eating advocate', 'Female', '1992-03-05', 'Philadelphia', 5, '2023-04-15 08:30:00', '2023-04-16 11:00:00');

INSERT INTO ingredient (id, name, image_path, created_at, updated_at) VALUES
(1, 'Tomato', '/images/tomato.png', '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, 'Cheese', '/images/cheese.png', '2023-04-12 09:00:00', '2023-04-15 10:00:00'),
(3, 'Basil', '/images/basil.png', '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, 'Chicken', '/images/chicken.png', '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, 'Olive Oil', '/images/olive_oil.png', '2023-04-15 08:30:00', '2023-04-16 11:00:00');

INSERT INTO recipe 
    (id, name, time_consuming, difficulty, ingredient_details, method, image_path, created_at, updated_at) 
VALUES
    (1, 'Tomato Pasta', '30 minutes', 'Easy', 'Fresh tomatoes, garlic, olive oil, and basil.', 'Boil pasta, prepare sauce with crushed tomatoes and garlic, mix with cooked pasta, top with basil.', './example-image-recipe.png', '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
    (2, 'Cheese Pizza', '15 minutes', 'Medium', 'Mozzarella cheese, homemade tomato sauce, Italian herbs.', 'Prepare dough, apply tomato sauce, add cheese and herbs, bake in oven.', './example-image-recipe.png', '2023-04-13 09:00:00', '2023-04-15 10:00:00'),
    (3, 'Basil Chicken', '45 minutes', 'Hard', 'Chicken pieces, fresh basil leaves, garlic, lemon zest.', 'Marinate chicken with garlic and basil, grill until cooked, serve with a sprinkle of lemon zest.', './example-image-recipe.png', '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
    (4, 'Chicken Curry', '60 minutes', 'Medium', 'Chicken pieces, onions, tomatoes, garlic, ginger, spices.', 'Cook onions, garlic, and ginger, add spices, then chicken, simmer with tomatoes until done.', './example-image-recipe.png', '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
    (5, 'Salad with Olive Oil', '10 minutes', 'Easy', 'Mixed greens, cherry tomatoes, cucumbers, feta cheese, olive oil.', 'Combine all ingredients in a bowl, dress with olive oil.', './example-image-recipe.png', '2023-04-15 08:30:00', '2023-04-16 11:00:00');

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
(1, 1),  -- Tomato Pasta includes Tomato
(2, 2),  -- Cheese Pizza includes Cheese
(3, 3),  -- Basil Chicken includes Basil
(4, 4),  -- Chicken Curry includes Chicken
(5, 5);  -- Salad with Olive Oil includes Olive Oil

INSERT INTO search_history (id, user_id, created_at) VALUES
(1, 1, '2023-04-12 10:30:00'),
(2, 2, '2023-04-12 11:00:00'),
(3, 3, '2023-04-13 10:30:00'),
(4, 4, '2023-04-14 10:30:00'),
(5, 5, '2023-04-15 10:30:00');

INSERT INTO history_ingredient (search_history_id, ingredient_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 5),
(3, 4);

INSERT INTO collection (id, name, user_id, created_at, updated_at) VALUES
(1, 'Favorites', 1, '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, 'Italian', 2, '2023-04-12 09:00:00', '2023-04-15 10:00:00'),
(3, 'Quick Meals', 3, '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, 'Dinner Specials', 4, '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, 'Healthy Choices', 5, '2023-04-15 08:30:00', '2023-04-16 11:00:00');

INSERT INTO collection_recipe (collection_id, recipe_id) VALUES
(1, 1),
(1, 3),
(2, 5),
(3, 2),
(4, 4);

INSERT INTO browsing_history (user_id, recipe_id, created_at) VALUES
(1, 1, '2023-04-12 12:00:00'),
(2, 2, '2023-04-12 12:30:00'),
(3, 3, '2023-04-13 12:00:00'),
(4, 4, '2023-04-14 12:00:00'),
(5, 5, '2023-04-15 12:00:00');

INSERT INTO score (score, user_id, recipe_id, created_at, updated_at) VALUES
(5, 1, 1, '2023-04-12 13:00:00', '2023-04-12 13:00:00'),
(4, 2, 2, '2023-04-13 13:30:00', '2023-04-15 14:00:00'),
(3, 3, 3, '2023-04-13 13:00:00', '2023-04-13 13:00:00'),
(2, 4, 4, '2023-04-14 13:00:00', '2023-04-15 14:30:00'),
(1, 5, 5, '2023-04-15 13:00:00', '2023-04-16 14:00:00');