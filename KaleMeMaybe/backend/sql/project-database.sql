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
    FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    UNIQUE(user_id, recipe_id)
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
/*test data, score*/
INSERT INTO score (score, user_id, recipe_id, created_at, updated_at) VALUES
(3, 1, 6, '2023-04-16 15:00:00', '2023-04-16 15:00:00'),
(4, 2, 6, '2023-04-16 16:00:00', '2023-04-16 16:00:00'),
(5, 3, 6, '2023-04-16 17:00:00', '2023-04-16 17:00:00'),
(3, 1, 7, '2023-04-17 15:00:00', '2023-04-17 15:00:00'),
(2, 2, 7, '2023-04-17 16:00:00', '2023-04-17 16:00:00'),
(4, 3, 7, '2023-04-17 17:00:00', '2023-04-17 17:00:00'),
(5, 1, 8, '2023-04-18 09:00:00', '2023-04-18 09:00:00'),
(5, 2, 8, '2023-04-18 10:00:00', '2023-04-18 10:00:00'),
(4, 3, 8, '2023-04-18 11:00:00', '2023-04-18 11:00:00'),
(4, 1, 10, '2023-04-20 18:00:00', '2023-04-20 18:50:00'),
(5, 2, 10, '2023-04-20 19:00:00', '2023-04-20 19:50:00'),
(3, 3, 10, '2023-04-20 20:00:00', '2023-04-20 20:50:00'),
(2, 1, 11, '2023-04-21 11:00:00', '2023-04-21 12:00:00'),
(3, 2, 11, '2023-04-21 13:00:00', '2023-04-21 14:00:00'),
(4, 3, 11, '2023-04-21 15:00:00', '2023-04-21 16:00:00'),
(5, 1, 12, '2023-04-22 14:00:00', '2023-04-22 14:30:00'),
(4, 2, 12, '2023-04-22 15:00:00', '2023-04-22 15:30:00'),
(3, 3, 12, '2023-04-22 16:00:00', '2023-04-22 16:30:00'),
(2, 1, 13, '2023-04-23 13:00:00', '2023-04-23 13:30:00'),
(4, 2, 13, '2023-04-23 14:00:00', '2023-04-23 14:30:00'),
(1, 3, 13, '2023-04-23 15:00:00', '2023-04-23 15:30:00'),
(3, 1, 14, '2023-04-24 16:00:00', '2023-04-24 16:45:00'),
(2, 2, 14, '2023-04-24 17:00:00', '2023-04-24 17:45:00'),
(5, 3, 14, '2023-04-24 18:00:00', '2023-04-24 18:45:00'),
(4, 1, 15, '2023-04-25 15:00:00', '2023-04-25 15:40:00'),
(5, 2, 15, '2023-04-25 16:00:00', '2023-04-25 16:40:00'),
(3, 3, 15, '2023-04-25 17:00:00', '2023-04-25 17:40:00');



/* AI generated recipes */
INSERT INTO "recipe"
VALUES
    (16, 'Apple Potato Onion Stir-Fry', '30 mins', 'Easy', '1 apple, diced
2 potatoes, peeled and diced
1 onion, sliced
2 tbsp olive oil
1 tsp cumin seeds
1 tsp turmeric powder
1 tsp chili powder
Salt and pepper to taste', 'Heat olive oil in a pan over medium heat.
Add cumin seeds and sauté for a minute until fragrant.
Add sliced onions and cook until translucent.
Add diced potatoes and cook until slightly browned and cooked through.
Add diced apples and cook for another 5 minutes until apples are tender.
Season with turmeric powder, chili powder, salt, and pepper. Mix well.
Cook for another 2-3 minutes until all the flavors are combined.
Serve hot as a side dish or over rice for a complete meal.', '/generated-images/Apple_Potato_Onion_Stir-Fry_20240421.png', '2024-04-21 04:18:58', '2024-04-21 04:18:58');
INSERT INTO "recipe"
VALUES
    (17, 'Roasted Asparagus and Tofu with Spinach', '30 mins', 'Medium', '1 bunch of asparagus, trimmed
1 block of tofu, pressed and cubed
2 cups of fresh spinach
2 tablespoons of olive oil
2 cloves of garlic, minced
Salt and pepper to taste
1 tablespoon of soy sauce
1 tablespoon of balsamic vinegar', 'Preheat the oven to 400°F (200°C).
Place the trimmed asparagus and cubed tofu on a baking sheet. Drizzle with olive oil, minced garlic, salt, and pepper. Toss to coat evenly.
Roast in the oven for 20-25 minutes, or until the asparagus is tender and the tofu is crispy.
In a large skillet, heat 1 tablespoon of olive oil over medium heat. Add the spinach and sauté until wilted.
Add the roasted asparagus and tofu to the skillet. Drizzle with soy sauce and balsamic vinegar. Toss to combine and heat through.
Serve hot and enjoy!', '/generated-images/Roasted_Asparagus_and_Tofu_with_Spinach_20240421.png', '2024-04-21 05:07:24', '2024-04-21 05:07:24');
INSERT INTO "recipe"
VALUES
    (18, 'Roasted Vegetable Medley', '45 mins', 'Medium', '1 cup of corn kernels
1 cup of diced pumpkin
1 red capsicum, sliced
1 yellow capsicum, sliced
2 tbsp olive oil
1 tsp salt
1/2 tsp black pepper
1/2 tsp paprika
1/2 tsp garlic powder', 'Preheat the oven to 200°C.
In a large bowl, toss the corn, pumpkin, and capsicum with olive oil, salt, pepper, paprika, and garlic powder until well coated.
Spread the vegetables in a single layer on a baking sheet lined with parchment paper.
Roast in the oven for 30-35 minutes, or until the vegetables are tender and slightly caramelized, stirring halfway through.
Remove from the oven and let cool slightly before serving.
Enjoy your delicious Roasted Vegetable Medley!', '/generated-images/Roasted_Vegetable_Medley_20240421.png', '2024-04-21 05:11:29', '2024-04-21 05:11:29');
INSERT INTO "recipe"
VALUES
    (19, 'Roasted Beetroot and Cauliflower with Garlic', '45 mins', 'Medium', '1 medium beetroot, peeled and diced
1 small head of cauliflower, cut into florets
3 cloves of garlic, minced
2 tablespoons olive oil
Salt and pepper to taste', 'Preheat the oven to 400°F (200°C).
In a large mixing bowl, combine the diced beetroot, cauliflower florets, minced garlic, olive oil, salt, and pepper. Toss well to coat the vegetables evenly.
Spread the vegetables in a single layer on a baking sheet lined with parchment paper.
Roast in the preheated oven for 30-35 minutes, or until the vegetables are tender and slightly caramelized, stirring halfway through.
Remove from the oven and let cool slightly before serving. Enjoy as a side dish or on its own!', '/generated-images/Roasted_Beetroot_and_Cauliflower_with_Garlic_20240421.png', '2024-04-21 05:17:24', '2024-04-21 05:17:24');
INSERT INTO "recipe"
VALUES
    (20, 'Fennel, Corn, and Cucumber Salad with Lettuce Wraps', '20 mins', 'Easy', '1 fennel bulb, thinly sliced
1 cup corn kernels, cooked
1 cucumber, diced
1 head of lettuce, leaves separated
1/4 cup olive oil
2 tablespoons lemon juice
Salt and pepper to taste', 'In a large bowl, combine the sliced fennel, corn kernels, and diced cucumber.
In a small bowl, whisk together the olive oil, lemon juice, salt, and pepper to make the dressing.
Pour the dressing over the fennel, corn, and cucumber mixture and toss to coat evenly.
Place a spoonful of the salad mixture onto each lettuce leaf and wrap it up like a taco.
Serve the fennel, corn, and cucumber salad lettuce wraps immediately and enjoy!', '/generated-images/Fennel,_Corn,_and_Cucumber_Salad_with_Lettuce_Wraps_20240421.png', '2024-04-21 05:19:26', '2024-04-21 05:19:26');
INSERT INTO "recipe"
VALUES
    (21, 'Beetroot and Garlic Roasted Onion Salad', '45 mins', 'Medium', '1 large beetroot, peeled and diced
1 large onion, sliced
3 cloves of garlic, minced
2 tbsp olive oil
Salt and pepper to taste
1/4 cup balsamic vinegar
2 cups mixed greens', 'Preheat the oven to 400°F (200°C).
In a bowl, toss the diced beetroot, sliced onion, minced garlic, olive oil, salt, and pepper until well combined.
Spread the mixture onto a baking sheet in a single layer and roast in the preheated oven for 25-30 minutes, or until the vegetables are tender and slightly caramelized.
In a small bowl, whisk together the balsamic vinegar with a pinch of salt and pepper to make the dressing.
In a large salad bowl, combine the roasted beetroot and onion mixture with the mixed greens.
Drizzle the balsamic dressing over the salad and toss gently to combine.
Serve the beetroot and garlic roasted onion salad as a delicious and nutritious vegetarian meal.', '/generated-images/Beetroot_and_Garlic_Roasted_Onion_Salad_20240421.png', '2024-04-21 05:20:30', '2024-04-21 05:20:30');
INSERT INTO "recipe"
VALUES
    (22, 'Roasted Garlic, Beetroot, and Pumpkin Salad', '45 mins', 'Medium', '3 cloves of garlic, minced
2 medium beetroot, peeled and diced
1 small pumpkin, peeled and diced
2 tbsp olive oil
Salt and pepper to taste
1/4 cup balsamic vinegar
1/4 cup crumbled feta cheese
2 tbsp chopped fresh parsley', 'Preheat the oven to 400°F (200°C).
In a mixing bowl, combine the minced garlic, diced beetroot, diced pumpkin, olive oil, salt, and pepper. Toss to coat the vegetables evenly.
Spread the vegetable mixture on a baking sheet in a single layer. Roast in the preheated oven for 30-35 minutes, or until the vegetables are tender and slightly caramelized.
Remove the roasted vegetables from the oven and let them cool slightly.
In a small bowl, whisk together the balsamic vinegar and a pinch of salt.
Transfer the roasted vegetables to a serving dish. Drizzle the balsamic dressing over the vegetables.
Sprinkle the crumbled feta cheese and chopped parsley over the salad.
Serve the roasted garlic, beetroot, and pumpkin salad warm or at room temperature. Enjoy!', '/generated-images/Roasted_Garlic,_Beetroot,_and_Pumpkin_Salad_20240421.png', '2024-04-21 05:35:31', '2024-04-21 05:35:31');
INSERT INTO "recipe"
VALUES
    (23, 'Garlic Pumpkin Kale Asparagus Stir-Fry', '30 mins', 'Medium', '1 bunch of kale, stems removed and leaves chopped
1 bunch of asparagus, trimmed and cut into 2-inch pieces
3 cloves of garlic, minced
1 small pumpkin, peeled and diced
2 tablespoons of olive oil
Salt and pepper to taste', 'Heat 1 tablespoon of olive oil in a large skillet over medium heat.
Add the diced pumpkin to the skillet and cook for 10-15 minutes, stirring occasionally, until the pumpkin is tender and slightly browned.
In a separate skillet, heat the remaining 1 tablespoon of olive oil over medium heat.
Add the minced garlic and sauté for 1-2 minutes until fragrant.
Add the chopped kale and asparagus to the skillet with the garlic, and sauté for another 5-7 minutes until the vegetables are tender but still slightly crisp.
Season with salt and pepper to taste.
Combine the cooked pumpkin with the kale and asparagus mixture, and stir well to combine.
Serve hot and enjoy!', '/generated-images/Garlic_Pumpkin_Kale_Asparagus_Stir-Fry_20240421.png', '2024-04-21 05:53:53', '2024-04-21 05:53:53');
INSERT INTO "recipe"
VALUES
    (24, 'Roasted Pumpkin and Asparagus with Garlic Kale Pesto', '40 mins', 'Medium', '1 small pumpkin, peeled, seeded, and diced
1 bunch of asparagus, trimmed
2 cups kale leaves, stems removed
4 cloves of garlic, minced
1/2 cup olive oil
Salt and pepper to taste', 'Preheat the oven to 400°F (200°C).
Place the diced pumpkin on a baking sheet, drizzle with olive oil, and season with salt and pepper. Roast in the oven for 20-25 minutes or until tender and slightly caramelized.
Meanwhile, in a food processor, combine the kale leaves, minced garlic, and olive oil. Blend until smooth to make the kale pesto. Season with salt and pepper to taste.
In a large skillet, heat some olive oil over medium heat. Add the trimmed asparagus and sauté for 5-7 minutes or until tender-crisp.
Once the pumpkin is roasted, remove it from the oven and toss it with the asparagus in the skillet.
Add the garlic kale pesto to the skillet and toss everything together until well coated and heated through.
Serve the roasted pumpkin and asparagus with garlic kale pesto warm as a delicious and nutritious vegetarian dish.', '/generated-images/Roasted_Pumpkin_and_Asparagus_with_Garlic_Kale_Pesto_20240421.png', '2024-04-21 05:54:15', '2024-04-21 05:54:15');
INSERT INTO "recipe"
VALUES
    (25, 'Roasted Beetroot and Garlic Salad', '45 mins', 'Medium', '3 medium-sized beetroots, peeled and diced
4 cloves of garlic, minced
1 red onion, thinly sliced
2 tbsp olive oil
Salt and pepper to taste
1/4 cup balsamic vinegar
1/4 cup crumbled feta cheese
Handful of fresh parsley, chopped', 'Preheat the oven to 400°F (200°C).
In a large bowl, toss the diced beetroot, minced garlic, and red onion slices with olive oil, salt, and pepper until well coated.
Spread the beetroot mixture on a baking sheet in a single layer and roast in the preheated oven for 30-35 minutes, or until the beetroot is tender and slightly caramelized.
In a small bowl, whisk together balsamic vinegar and a pinch of salt.
Once the beetroot is roasted, transfer it to a serving dish and drizzle with the balsamic vinegar dressing.
Top the salad with crumbled feta cheese and chopped parsley before serving.
Enjoy your delicious Roasted Beetroot and Garlic Salad!', '/generated-images/Roasted_Beetroot_and_Garlic_Salad_20240421.png', '2024-04-21 05:57:44', '2024-04-21 05:57:44');
INSERT INTO "recipe"
VALUES
    (26, 'Beetroot and Garlic Risotto', '45 mins', 'Medium', '2 medium beetroots, peeled and diced
4 cloves of garlic, minced
1 onion, finely chopped
1 1/2 cups arborio rice
4 cups vegetable broth
1/2 cup white wine
1/2 cup grated Parmesan cheese
2 tablespoons olive oil
Salt and pepper to taste', 'In a large pan, heat olive oil over medium heat. Add the onion and garlic, sauté until fragrant.
Add the diced beetroot to the pan and cook for about 5 minutes until slightly softened.
Stir in the arborio rice and cook for another 2 minutes, stirring constantly.
Pour in the white wine and cook until it is absorbed by the rice.
Gradually add the vegetable broth, 1/2 cup at a time, stirring frequently and allowing the liquid to be absorbed before adding more.
Continue this process until the rice is creamy and cooked to al dente, about 20-25 minutes.
Stir in the Parmesan cheese and season with salt and pepper.
Serve the beetroot and garlic risotto hot, garnished with additional Parmesan cheese and fresh herbs if desired.', '/generated-images/Beetroot_and_Garlic_Risotto_20240421.png', '2024-04-21 05:58:22', '2024-04-21 05:58:22');
INSERT INTO "recipe"
VALUES
    (27, 'Garlic Tofu with Asparagus', '30 mins', 'Medium', '1 block of firm tofu, pressed and cubed
1 bunch of asparagus, trimmed and cut into 2-inch pieces
4 cloves of garlic, minced
2 tablespoons of soy sauce
1 tablespoon of sesame oil
1 tablespoon of vegetable oil
Salt and pepper to taste', 'Heat vegetable oil in a large skillet over medium heat.
Add tofu cubes and cook until golden brown on all sides, about 8-10 minutes. Remove tofu from skillet and set aside.
In the same skillet, add sesame oil and minced garlic. Cook for 1-2 minutes until fragrant.
Add asparagus to the skillet and stir-fry for 5-6 minutes until tender-crisp.
Return tofu to the skillet and add soy sauce. Stir well to combine and cook for another 2-3 minutes.
Season with salt and pepper to taste.
Serve hot and enjoy!', '/generated-images/Garlic_Tofu_with_Asparagus_20240421.png', '2024-04-21 06:03:12', '2024-04-21 06:03:12');
INSERT INTO "recipe"
VALUES
    (28, 'Crispy Tofu Asparagus Stir Fry', '30 mins', 'Medium', '1 block of firm tofu, pressed and cubed
1 bunch of asparagus, trimmed and cut into 2-inch pieces
4 cloves of garlic, minced
2 tablespoons of soy sauce
1 tablespoon of cornstarch
1 tablespoon of sesame oil
1 teaspoon of ginger, minced
1/4 cup of vegetable broth
Salt and pepper to taste
Cooking oil', 'In a bowl, mix the cubed tofu with soy sauce and cornstarch until well coated. Let it marinate for 10 minutes.
Heat some cooking oil in a pan over medium heat. Add the tofu cubes and cook until crispy on all sides. Remove from pan and set aside.
In the same pan, add a bit more oil if needed. Add the minced garlic and ginger, sauté until fragrant.
Add the asparagus pieces and vegetable broth to the pan. Cook until the asparagus is tender but still crisp.
Return the crispy tofu to the pan and stir to combine with the asparagus. Season with salt and pepper to taste.
Drizzle sesame oil over the stir fry before serving.
Serve hot over rice or noodles. Enjoy!', '/generated-images/Crispy_Tofu_Asparagus_Stir_Fry_20240421.png', '2024-04-21 06:03:33', '2024-04-21 06:03:33');
INSERT INTO "recipe"
VALUES
    (29, 'Crispy Tofu Asparagus Stir Fry', '30 mins', 'Medium', '1 block of firm tofu, pressed and cubed
1 bunch of asparagus, trimmed and cut into bite-sized pieces
4 cloves of garlic, minced
2 tablespoons of soy sauce
1 tablespoon of sesame oil
1 tablespoon of cornstarch
1/2 teaspoon of red pepper flakes
Salt and pepper to taste
2 tablespoons of vegetable oil for frying', 'In a bowl, mix the cubed tofu with cornstarch, salt, and pepper until well coated.
Heat vegetable oil in a large skillet over medium-high heat. Add the tofu cubes and cook until crispy and golden brown on all sides. Remove from the skillet and set aside.
In the same skillet, add a bit more oil if needed and sauté the minced garlic until fragrant.
Add the asparagus pieces and cook for a few minutes until they start to soften but are still crisp.
Return the crispy tofu to the skillet and add soy sauce, sesame oil, and red pepper flakes. Stir well to combine and coat everything evenly.
Cook for an additional 2-3 minutes, allowing the flavors to meld together.
Taste and adjust seasoning if needed. Serve hot over rice or noodles.
Enjoy your delicious Crispy Tofu Asparagus Stir Fry!', '/generated-images/Crispy_Tofu_Asparagus_Stir_Fry_20240421.png', '2024-04-21 06:04:11', '2024-04-21 06:04:11');
INSERT INTO "recipe"
VALUES
    (30, 'Crispy Tofu Asparagus Stir-Fry', '30 mins', 'Medium', '1 block of firm tofu, pressed and cubed
1 bunch of asparagus, trimmed and cut into 2-inch pieces
4 cloves of garlic, minced
2 tablespoons of soy sauce
1 tablespoon of sesame oil
1 tablespoon of cornstarch
1/4 cup of vegetable broth
1 tablespoon of olive oil
Salt and pepper to taste', 'In a bowl, toss the cubed tofu with cornstarch until evenly coated.
Heat olive oil in a large skillet over medium heat. Add the tofu cubes and cook until crispy on all sides, about 5-7 minutes. Remove tofu from skillet and set aside.
In the same skillet, add a bit more olive oil if needed. Add minced garlic and cook until fragrant, about 1 minute.
Add the asparagus pieces to the skillet and sauté for 3-4 minutes, until slightly tender but still crisp.
Return the crispy tofu to the skillet with the asparagus. Add soy sauce, sesame oil, and vegetable broth. Stir well to combine and coat everything in the sauce.
Cook for an additional 2-3 minutes, allowing the flavors to meld together. Season with salt and pepper to taste.
Serve the crispy tofu and asparagus stir-fry hot over cooked rice or noodles. Enjoy!', '/generated-images/Crispy_Tofu_Asparagus_Stir-Fry_20240421.png', '2024-04-21 06:04:12', '2024-04-21 06:04:12');
INSERT INTO "recipe"
VALUES
    (31, 'Lettuce and Pea Salad', '15 mins', 'Easy', '1 head of lettuce, washed and chopped
1 cup of peas, cooked
1/4 cup of red onion, thinly sliced
1/4 cup of feta cheese, crumbled
1/4 cup of roasted sunflower seeds
Salt and pepper to taste
For dressing: 1/4 cup of olive oil, 2 tablespoons of balsamic vinegar, 1 tablespoon of honey', 'In a large mixing bowl, combine the chopped lettuce, cooked peas, red onion, feta cheese, and sunflower seeds.
In a small bowl, whisk together the olive oil, balsamic vinegar, and honey to make the dressing.
Pour the dressing over the salad and toss until everything is well coated.
Season with salt and pepper to taste.
Serve the salad chilled and enjoy!', '/generated-images/Lettuce_and_Pea_Salad_20240421.png', '2024-04-21 07:39:31', '2024-04-21 07:39:31');
INSERT INTO "recipe"
VALUES
    (32, 'Roasted Beetroot Salad with Garlic and Onion', '45 mins', 'Medium', '3 medium-sized beetroots, peeled and diced
4 cloves of garlic, minced
1 large onion, thinly sliced
2 tablespoons of olive oil
Salt and pepper to taste
1/4 cup of balsamic vinegar
1/2 cup of crumbled feta cheese
Handful of fresh parsley, chopped', 'Preheat the oven to 400°F (200°C).
In a mixing bowl, toss the diced beetroot with minced garlic, sliced onion, olive oil, salt, and pepper until well coated.
Spread the beetroot mixture in a single layer on a baking sheet lined with parchment paper.
Roast in the preheated oven for 30-35 minutes, or until the beetroot is tender and slightly caramelized.
Remove the beetroot from the oven and drizzle with balsamic vinegar. Toss to combine.
Transfer the roasted beetroot mixture to a serving platter and sprinkle with crumbled feta cheese and chopped parsley.
Serve the salad warm or at room temperature. Enjoy!', '/generated-images/Roasted_Beetroot_Salad_with_Garlic_and_Onion_20240421.png', '2024-04-21 09:30:44', '2024-04-21 09:30:44');
INSERT INTO "recipe"
VALUES
    (33, 'Kale and Chickpea Stuffed Sweet Potatoes', '45 mins', 'Medium', '2 large sweet potatoes
1 bunch of kale, stems removed and chopped
1 can of chickpeas, rinsed and drained
1 small red onion, diced
2 cloves of garlic, minced
1 tablespoon olive oil
1 teaspoon cumin
1 teaspoon paprika
Salt and pepper to taste
1/4 cup of vegetable broth
1/4 cup of crumbled feta cheese (optional)', 'Preheat the oven to 400°F (200°C).
Pierce the sweet potatoes with a fork and place them on a baking sheet. Bake for 40-45 minutes, or until tender.
In a large skillet, heat the olive oil over medium heat. Add the red onion and garlic, and sauté until softened.
Add the chopped kale to the skillet and cook until wilted, about 5 minutes.
Stir in the chickpeas, cumin, paprika, salt, and pepper. Cook for another 2-3 minutes.
Pour in the vegetable broth and simmer for 5 minutes, allowing the flavors to meld.
Once the sweet potatoes are cooked, slice them open and fluff the insides with a fork.
Divide the kale and chickpea mixture among the sweet potatoes, and top with crumbled feta cheese if desired.
Serve hot and enjoy!', '/generated-images/Kale_and_Chickpea_Stuffed_Sweet_Potatoes_20240421.png', '2024-04-21 10:19:59', '2024-04-21 10:19:59');
INSERT INTO "recipe"
VALUES
    (34, 'Roasted Vegetable Salad', '40 mins', 'Medium', '1 red capsicum, sliced
1 eggplant, diced
2 cups kale, chopped
2 tbsp olive oil
1 tsp salt
1/2 tsp black pepper
1/2 tsp paprika
1/4 tsp garlic powder', 'Preheat the oven to 200°C (400°F).
In a large bowl, toss the capsicum, eggplant, and kale with olive oil, salt, pepper, paprika, and garlic powder until well coated.
Spread the vegetables in a single layer on a baking sheet lined with parchment paper.
Roast in the preheated oven for 25-30 minutes, or until the vegetables are tender and slightly charred.
Remove from the oven and let cool slightly before serving.
Enjoy the roasted vegetable salad as a delicious and healthy vegetarian meal!', '/generated-images/Roasted_Vegetable_Salad_20240422.png', '2024-04-22 09:50:32', '2024-04-22 09:50:32');
INSERT INTO "recipe"
VALUES
    (35, 'Tofu and Spinach Stir Fry', '20 mins', 'Medium', '1 block of firm tofu, drained and cubed
2 cups of fresh spinach, washed and chopped
2 cloves of garlic, minced
1 tablespoon of soy sauce
1 tablespoon of sesame oil
1 teaspoon of ginger, grated
1 teaspoon of cornstarch
1/4 cup of vegetable broth
1 tablespoon of vegetable oil', 'In a small bowl, mix together soy sauce, sesame oil, ginger, and cornstarch. Set aside.
Heat vegetable oil in a pan over medium heat. Add minced garlic and cook until fragrant.
Add cubed tofu to the pan and cook until golden brown on all sides.
Pour the soy sauce mixture over the tofu and stir to coat. Cook for 2-3 minutes.
Add vegetable broth and chopped spinach to the pan. Stir well and cook until the spinach is wilted.
Serve hot and enjoy your delicious tofu and spinach stir fry!', '/generated-images/Tofu_and_Spinach_Stir_Fry_20240422.png', '2024-04-22 10:30:25', '2024-04-22 10:30:25');
INSERT INTO "recipe"
VALUES
    (36, 'Crispy Tofu and Spinach Salad', '25 mins', 'Medium', '1 block of firm tofu, drained and pressed
2 cups of fresh spinach leaves
1 tablespoon of soy sauce
1 tablespoon of cornstarch
1 teaspoon of garlic powder
1/2 teaspoon of salt
1/4 teaspoon of black pepper
2 tablespoons of olive oil
1 tablespoon of sesame seeds
1 tablespoon of rice vinegar
1 tablespoon of maple syrup', 'Preheat the oven to 400°F (200°C).
Cut the tofu into cubes and place in a bowl. Add soy sauce, cornstarch, garlic powder, salt, and black pepper. Toss gently to coat the tofu.
Heat olive oil in a skillet over medium heat. Add the tofu cubes and cook until crispy and golden brown on all sides, about 5-7 minutes. Remove from the skillet and set aside.
In the same skillet, add sesame seeds and toast for 1-2 minutes until fragrant. Add the spinach leaves and cook until wilted, about 2-3 minutes.
In a small bowl, whisk together rice vinegar and maple syrup to make the dressing.
In a large salad bowl, combine the crispy tofu, sautéed spinach, and dressing. Toss gently to coat everything evenly.
Serve the crispy tofu and spinach salad immediately. Enjoy!', '/generated-images/Crispy_Tofu_and_Spinach_Salad_20240422.png', '2024-04-22 10:31:33', '2024-04-22 10:31:33');
INSERT INTO "recipe"
VALUES
    (37, 'Tofu and Vegetable Stir-Fry', '25 mins', 'Medium', '1 block of tofu, pressed and cubed
2 cups of fresh spinach, washed and chopped
1 bunch of asparagus, trimmed and cut into 2-inch pieces
2 cloves of garlic, minced
1 tablespoon of soy sauce
1 tablespoon of sesame oil
1 teaspoon of ginger, grated
1 tablespoon of cornstarch
1/4 cup of vegetable broth
Salt and pepper to taste
Cooking oil', 'In a small bowl, mix together soy sauce, sesame oil, ginger, and cornstarch to make a sauce.
Heat some cooking oil in a large pan over medium heat.
Add the tofu cubes and cook until golden brown on all sides. Remove from the pan and set aside.
In the same pan, add a bit more oil if needed and sauté the garlic until fragrant.
Add the asparagus pieces and cook for 3-4 minutes until slightly tender.
Add the spinach and cook until wilted.
Pour in the vegetable broth and the sauce mixture. Stir well and let it simmer for a few minutes until the sauce thickens.
Add the cooked tofu back into the pan and mix everything together.
Season with salt and pepper to taste.
Serve the tofu and vegetable stir-fry hot over rice or noodles.', '/generated-images/Tofu_and_Vegetable_Stir-Fry_20240422.png', '2024-04-22 10:33:03', '2024-04-22 10:33:03');
INSERT INTO "recipe"
VALUES
    (38, 'Asparagus and Tofu Stir-Fry', '25 mins', 'Medium', '1 bunch of asparagus, trimmed and cut into 2-inch pieces
1 block of firm tofu, drained and cubed
2 cloves of garlic, minced
1 tablespoon of ginger, minced
2 tablespoons of soy sauce
1 tablespoon of sesame oil
1 tablespoon of vegetable oil
Salt and pepper to taste
Cooked rice for serving', 'In a large skillet, heat vegetable oil over medium heat.
Add tofu cubes and cook until golden brown on all sides, about 5-7 minutes. Remove from skillet and set aside.
In the same skillet, add sesame oil, garlic, and ginger. Cook for 1-2 minutes until fragrant.
Add asparagus to the skillet and stir-fry for 3-4 minutes until slightly tender but still crisp.
Return tofu to the skillet and add soy sauce. Stir well to combine and cook for another 2-3 minutes.
Season with salt and pepper to taste.
Serve hot over cooked rice. Enjoy your delicious asparagus and tofu stir-fry!', '/generated-images/Asparagus_and_Tofu_Stir-Fry_20240422.png', '2024-04-22 11:05:42', '2024-04-22 11:05:42');
