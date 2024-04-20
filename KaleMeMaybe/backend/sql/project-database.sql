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
DROP TABLE IF EXISTS third_party_account;
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
    name VARCHAR(50) DEFAULT 'fresh kaler',
    encrypted_password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    bio TEXT DEFAULT 'No bio provided',
    gender VARCHAR(50) DEFAULT 'Not specified',
    birth_date DATE DEFAULT '2000-01-01',
    city VARCHAR(50) DEFAULT 'Not specified',
    avatar_id INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (avatar_id) REFERENCES avatar (id)
);

CREATE TABLE third_party_account (
    id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    provider_name VARCHAR(50) NOT NULL, 
    provider_user_id VARCHAR(100) NOT NULL,
    UNIQUE(provider_name, provider_user_id), 
    FOREIGN KEY (user_id) REFERENCES user (id)
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
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id)
);


INSERT INTO avatar (id, image_path, created_at, updated_at) VALUES
(1, '/images/bear.png', '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, '/images/black-dog.png', '2023-04-12 09:00:00', '2023-04-15 10:00:00'),
(3, '/images/cat.png', '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, '/images/chicken.png', '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, '/images/dog.png', '2023-04-15 08:30:00', '2023-04-16 11:00:00'),
(6, '/images/gorilla.png', '2023-04-16 08:30:00', '2023-04-17 11:00:00'),
(7, '/images/meerkat.png', '2023-04-16 11:00:00', '2023-04-17 11:30:00'),
(8, '/images/panda.png', '2023-04-17 08:30:00', '2023-04-18 11:00:00'),
(9, '/images/rabbit.png', '2023-04-17 11:00:00', '2023-04-18 11:30:00'),
(10, '/images/sea-lion.png', '2023-04-18 08:30:00', '2023-04-19 11:00:00');

INSERT INTO user (id, name, encrypted_password, email, bio, gender, birth_date, city, avatar_id, created_at, updated_at) VALUES
(1, 'John Doe', 'hashed_password1', 'john@example.com', 'A chef', 'Male', '1985-02-15', 'New York', 1, '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, 'Jane Doe', 'hashed_password2', 'jane@example.com', 'Loves to cook', 'Female', '1987-05-22', 'Los Angeles', 2, '2023-04-13 09:00:00', '2023-04-15 10:00:00'),
(3, 'Alice Johnson', 'hashed_password3', 'alice@example.com', 'A pastry chef', 'Female', '1990-07-30', 'Chicago', 3, '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, 'Bob Smith', 'hashed_password4', 'bob@example.com', 'Barbecue expert', 'Male', '1982-11-15', 'Houston', 4, '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, 'Carol Taylor', 'hashed_password5', 'carol@example.com', 'Healthy eating advocate', 'Female', '1992-03-05', 'Philadelphia', 5, '2023-04-15 08:30:00', '2023-04-16 11:00:00');

INSERT INTO ingredient
    (id, name, image_path, created_at, updated_at)
VALUES
    (1, 'Tomato', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Corn', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Fennel', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Peas', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Lettuce', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Cucumber', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'Potato', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'Pumpkin', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'Beetroot', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'Garlic', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, 'Onion', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 'Cauliflower', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 'Eggplant', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 'Capsicum', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (15, 'Kale', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (16, 'Asparagus', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (17, 'Spinach', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (18, 'Tofu', 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);



INSERT INTO recipe
    (id, name, time_consuming, difficulty, ingredient_details, method, image_path, created_at, updated_at)
VALUES
    (1, 'Tomato Pasta', '30 mins', 'Easy', 'Fresh tomatoes, garlic, olive oil, and basil.', 'Boil pasta, prepare sauce with crushed tomatoes and garlic, mix with cooked pasta, top with basil.', './example-image-recipe.png', '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
    (2, 'Cheese Pizza', '15 mins', 'Medium', 'Mozzarella cheese, homemade tomato sauce, Italian herbs.', 'Prepare dough, apply tomato sauce, add cheese and herbs, bake in oven.', './example-image-recipe.png', '2023-04-13 09:00:00', '2023-04-15 10:00:00'),
    (3, 'Basil Chicken', '45 mins', 'Hard', 'Chicken pieces, fresh basil leaves, garlic, lemon zest.', 'Marinate chicken with garlic and basil, grill until cooked, serve with a sprinkle of lemon zest.', './example-image-recipe.png', '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
    (4, 'Chicken Curry', '60 mins', 'Medium', 'Chicken pieces, onions, tomatoes, garlic, ginger, spices.', 'Cook onions, garlic, and ginger, add spices, then chicken, simmer with tomatoes until done.', './example-image-recipe.png', '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
    (5, 'Salad with Olive Oil', '10 mins', 'Easy', 'Mixed greens, cherry tomatoes, cucumbers, feta cheese, olive oil.', 'Combine all ingredients in a bowl, dress with olive oil.', './example-image-recipe.png', '2023-04-15 08:30:00', '2023-04-16 11:00:00'),
    (9, 'Apple Potato Onion Stir-Fry', '30 mins', 'Medium', '1 apple, diced, 2 potatoes, peeled and diced, 1 onion, chopped, 2 tablespoons olive oil, 1 teaspoon cumin seeds, 1 teaspoon turmeric powder, 1 teaspoon chili powder, Salt and pepper to taste, Fresh cilantro for garnish', 'Heat olive oil in a pan over medium heat.
Add cumin seeds and let them sizzle for a few seconds.
Add chopped onions and sauté until translucent.
Add diced potatoes and cook until slightly browned and cooked through.
Add diced apple and stir-fry for 2-3 minutes.
Add turmeric powder, chili powder, salt, and pepper. Mix well to coat the vegetables evenly.
Cook for another 5-7 minutes until the potatoes and apples are cooked and slightly caramelized.
Garnish with fresh cilantro before serving.
Enjoy this delicious and nutritious apple potato onion stir-fry!', '/generated-images/Apple_Potato_Onion_Stir-Fry_20240417.png', '2024-04-17 05:34:21', '2024-04-17 05:34:21'
);
INSERT INTO recipe_ingredient
    (recipe_id, ingredient_id)
VALUES
    (1, 1),
    -- Tomato Pasta includes Tomato
    (2, 2),
    -- Cheese Pizza includes Cheese
    (3, 3),
    -- Basil Chicken includes Basil
    (4, 4),
    -- Chicken Curry includes Chicken
    (5, 5);
-- Salad with Olive Oil includes Olive Oil

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
(2, 'Italian', 1, '2023-04-12 09:00:00', '2023-04-15 10:00:00'),
(3, 'Quick Meals', 1, '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, 'Dinner Specials', 2, '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, 'Healthy Choices', 2, '2023-04-15 08:30:00', '2023-04-16 11:00:00');

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
/*test data, 6-8&10-15 recipe*/
INSERT INTO recipe
    (id, name, time_consuming, difficulty, ingredient_details, method, image_path, created_at, updated_at)
VALUES
    (6, 'Beef Stew', '90 mins', 'Medium', 'Beef chunks, potatoes, carrots, onions, celery, beef broth, tomato paste.', 'Season beef with salt and pepper. Brown in a hot pan with oil. Remove beef, add chopped onions and garlic, cook until soft. Return beef to pan, add broth, carrots, potatoes, celery, and tomato paste. Cover and simmer for 1.5 hours.', './example-image-recipe.png', '2023-04-16 12:30:00', '2023-04-16 14:00:00'),
    (7, 'Vegan Chili', '35 mins', 'Easy', 'Chopped onions, red beans, diced tomatoes, corn, bell peppers, chili spices.', 'Cook onions in a large pot until translucent. Add bell peppers, cook for 5 mins. Add tomatoes, beans, corn, and chili spices. Simmer for 25 mins. Serve hot.', './example-image-recipe.png', '2023-04-17 12:30:00', '2023-04-17 13:05:00'),
    (8, 'Pancakes', '20 mins', 'Easy', 'Flour, eggs, milk, sugar, baking powder, butter.', 'Mix flour, sugar, baking powder. In another bowl, beat eggs with milk. Combine wet and dry ingredients. Heat a pan with butter, pour batter to form pancakes. Cook each side until golden.', './example-image-recipe.png', '2023-04-18 08:00:00', '2023-04-18 08:20:00'),
    (10, 'Mushroom Risotto', '50 mins', 'Hard', 'Arborio rice, chicken broth, Parmesan cheese, mushrooms, onions, white wine, butter.', 'Saute chopped onions and mushrooms in butter until soft. Add rice, stir to coat with butter. Add wine, cook until evaporated. Add broth gradually, stirring constantly, until rice is creamy and al dente. Stir in Parmesan.', './example-image-recipe.png', '2023-04-20 17:00:00', '2023-04-20 17:50:00'),
    (11, 'Quiche Lorraine', '60 mins', 'Medium', 'Eggs, cream, bacon, cheese, pastry shell.', 'Cook bacon until crisp. Beat eggs with cream, season. Sprinkle bacon and cheese into pastry shell, pour over egg mixture. Bake at 180°C for 45 mins.', './example-image-recipe.png', '2023-04-21 09:00:00', '2023-04-21 10:00:00'),
    (12, 'Fish Tacos', '30 mins', 'Easy', 'White fish, cabbage slaw, sour cream, lime, corn tortillas, avocado, cilantro.', 'Season fish with salt and pepper, grill until cooked. Mix sour cream with lime juice for sauce. Serve fish in tortillas with slaw, sauce, sliced avocado, and cilantro.', './example-image-recipe.png', '2023-04-22 12:45:00', '2023-04-22 13:15:00'),
    (13, 'Lamb Curry', '120 mins', 'Hard', 'Lamb pieces, onions, garlic, ginger, tomatoes, curry powder, yogurt, cilantro.', 'Brown lamb with garlic and ginger, set aside. Cook onions until golden, add curry powder, tomatoes, and yogurt. Return lamb to pot, cover, simmer for 2 hours. Garnish with cilantro.', './example-image-recipe.png', '2023-04-23 10:30:00', '2023-04-23 12:30:00'),
    (14, 'Banana Bread', '75 mins', 'Medium', 'Ripe bananas, flour, sugar, butter, eggs, baking soda.', 'Mash bananas. Mix with melted butter. Beat in eggs and sugar. Add flour and baking soda, mix until smooth. Pour into a loaf pan, bake at 175°C for 1 hour.', './example-image-recipe.png', '2023-04-24 14:30:00', '2023-04-24 15:45:00'),
    (15, 'Stuffed Bell Peppers', '70 mins', 'Medium', 'Bell peppers, ground beef, rice, tomatoes, onions, cheese.', 'Cook rice. Saute onions, ground beef until cooked. Mix in tomatoes and cooked rice. Stuff mixture into halved bell peppers, top with cheese. Bake at 190°C for 30 mins.', './example-image-recipe.png', '2023-04-25 13:30:00', '2023-04-25 14:40:00');