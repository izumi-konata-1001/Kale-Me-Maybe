USE project_database;

/* Drop existing tables */
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

/* Create tables */
CREATE TABLE avatar (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) DEFAULT 'fresh kaler',
    encrypted_password VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    bio VARCHAR(50) DEFAULT 'No bio provided',
    gender VARCHAR(50) DEFAULT 'Not specified',
    birth_date DATE DEFAULT '2000-01-01',
    city VARCHAR(50) DEFAULT 'Not specified',
    avatar_id INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (avatar_id) REFERENCES avatar(id)
);

CREATE TABLE third_party_account (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    provider_name VARCHAR(50) NOT NULL, 
    provider_user_id VARCHAR(100) NOT NULL,
    UNIQUE(provider_name, provider_user_id), 
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE recipe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    time_consuming VARCHAR(50) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    ingredient_details TEXT NOT NULL,
    method TEXT NOT NULL,
    image_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE recipe_ingredient (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE search_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE history_ingredient (
    search_history_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (search_history_id, ingredient_id),
    FOREIGN KEY (search_history_id) REFERENCES search_history(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE collection (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE collection_recipe (
    collection_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY (collection_id, recipe_id),
    FOREIGN KEY (collection_id) REFERENCES collection(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE browsing_history (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE score (
    score INT NOT NULL,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

/* Continue with your INSERT statements here, ensuring compatibility with MySQL syntax and data types */
/* Insert into avatar */
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

/* Insert into user */
INSERT INTO user (id, name, encrypted_password, email, bio, gender, birth_date, city, avatar_id, created_at, updated_at) VALUES
(1, 'John Doe', 'hashed_password1', 'john@example.com', 'A chef', 'Male', '1985-02-15', 'New York', 1, '2023-04-12 08:30:00', '2023-04-12 08:30:00'),
(2, 'Jane Doe', 'hashed_password2', 'jane@example.com', 'Loves to cook', 'Female', '1987-05-22', 'Los Angeles', 2, '2023-04-13 09:00:00', '2023-04-15 10:00:00'),
(3, 'Alice Johnson', 'hashed_password3', 'alice@example.com', 'A pastry chef', 'Female', '1990-07-30', 'Chicago', 3, '2023-04-13 08:30:00', '2023-04-13 08:30:00'),
(4, 'Bob Smith', 'hashed_password4', 'bob@example.com', 'Barbecue expert', 'Male', '1982-11-15', 'Houston', 4, '2023-04-14 08:30:00', '2023-04-15 09:30:00'),
(5, 'Carol Taylor', 'hashed_password5', 'carol@example.com', 'Healthy eating advocate', 'Female', '1992-03-05', 'Philadelphia', 5, '2023-04-15 08:30:00', '2023-04-16 11:00:00');

/* Insert into ingredient */
INSERT INTO ingredient (id, name, image_path, created_at, updated_at) VALUES
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

/* AI generated recipes */
INSERT INTO recipe
VALUES
    (1, 'Vegetarian Capsicum and Pea Salad', '15 mins', 'Easy', '1 head of lettuce, washed and torn into bite-sized pieces
1 red capsicum, diced
1 cup of peas, fresh or frozen
1/4 cup of olive oil
2 tablespoons of balsamic vinegar
Salt and pepper to taste', 'In a large salad bowl, combine the torn lettuce, diced capsicum, and peas.
In a small bowl, whisk together the olive oil, balsamic vinegar, salt, and pepper to make the dressing.
Pour the dressing over the salad and toss well to coat all the ingredients.
Serve immediately as a refreshing and nutritious vegetarian salad.', '/generated-images/Vegetarian_Capsicum_and_Pea_Salad_20240425.png', '2024-04-25 09:46:18', '2024-04-25 09:46:18');
INSERT INTO recipe
VALUES
    (2, 'Pumpkin, Potato, and Tofu Stir Fry', '30 mins', 'Medium', '1 cup diced pumpkin
1 cup diced potato
1 block of tofu, pressed and cubed
2 tbsp soy sauce
1 tbsp sesame oil
1 tsp ginger, minced
2 cloves garlic, minced
1 red chili, sliced
1/4 cup vegetable broth
Salt and pepper to taste
2 green onions, sliced', 'In a large skillet, heat sesame oil over medium heat.
Add ginger, garlic, and red chili to the skillet. Cook for 1-2 minutes until fragrant.
Add diced pumpkin and potato to the skillet. Cook for 10-15 minutes until vegetables are slightly tender.
Push vegetables to one side of the skillet and add cubed tofu. Cook for 5-7 minutes until tofu is golden brown.
Mix everything together in the skillet and add soy sauce and vegetable broth. Cook for another 5 minutes.
Season with salt and pepper to taste.
Garnish with sliced green onions before serving.
Serve hot over rice or quinoa.', '/generated-images/Pumpkin,_Potato,_and_Tofu_Stir_Fry_20240425.png', '2024-04-25 09:52:48', '2024-04-25 09:52:48');
INSERT INTO recipe
VALUES
    (3, 'Stir-Fried Vegetables with Asparagus, Capsicum, and Bok Choy', '20 mins', 'Easy', '1 bunch asparagus, trimmed and cut into 2-inch pieces
1 red capsicum, sliced
1 yellow capsicum, sliced
2 bok choy, chopped
2 cloves garlic, minced
2 tbsp soy sauce
1 tbsp sesame oil
1 tsp ginger, grated
Salt and pepper to taste
Cooking oil', 'Heat some cooking oil in a large pan or wok over medium heat.
Add the minced garlic and grated ginger, and sauté for 1-2 minutes until fragrant.
Add the sliced capsicum and stir-fry for 3-4 minutes until slightly softened.
Add the asparagus and bok choy, and continue to stir-fry for another 3-4 minutes until the vegetables are tender-crisp.
Drizzle the soy sauce and sesame oil over the vegetables, and season with salt and pepper to taste. Stir well to combine.
Cook for an additional 1-2 minutes, then remove from heat.
Serve the stir-fried vegetables hot as a side dish or over cooked rice for a complete meal.', '/generated-images/Stir-Fried_Vegetables_with_Asparagus,_Capsicum,_and_Bok_Choy_20240428.png', '2024-04-28 07:25:58', '2024-04-28 07:25:58');
INSERT INTO recipe
VALUES
    (4, 'Garlic Kale Scramble', '20 mins', 'Easy', '2 cloves of garlic, minced
2 cups of kale, chopped
1 tablespoon of egg replacer powder
2 tablespoons of water
Salt and pepper to taste', 'In a small bowl, mix the egg replacer powder with water and set aside.
In a pan, heat some oil over medium heat and add the minced garlic. Cook for 1-2 minutes until fragrant.
Add the chopped kale to the pan and sauté for 3-4 minutes until wilted.
Pour in the egg replacer mixture and stir well to combine with the kale. Cook for another 2-3 minutes until the egg replacer is fully cooked.
Season with salt and pepper to taste.
Serve hot and enjoy!', '/generated-images/Garlic_Kale_Scramble_20240428.png', '2024-04-28 07:44:09', '2024-04-28 07:44:09');
INSERT INTO recipe
VALUES
    (5, 'Vegetarian Pea, Fennel, and Corn Stir Fry', '25 mins', 'Medium', '1 cup peas, fresh or frozen
1 fennel bulb, thinly sliced
1 cup corn kernels
2 cloves garlic, minced
1 tablespoon olive oil
2 tablespoons soy sauce
1 teaspoon sesame oil
Salt and pepper to taste', 'Heat olive oil in a large skillet over medium heat.
Add the sliced fennel and cook for 5 minutes until slightly softened.
Add the minced garlic and cook for another minute until fragrant.
Add the peas and corn to the skillet and stir well to combine.
Cook for 8-10 minutes, stirring occasionally, until the vegetables are tender.
Drizzle soy sauce and sesame oil over the vegetables, and season with salt and pepper.
Stir well to combine and cook for another 2 minutes.
Serve hot as a side dish or over cooked rice for a complete meal.', '/generated-images/Vegetarian_Pea,_Fennel,_and_Corn_Stir_Fry_20240428.png', '2024-04-28 08:22:35', '2024-04-28 08:22:35');
INSERT INTO recipe
VALUES
    (6, 'Pea, Fennel, and Corn Medley', '25 mins', 'Medium', '1 cup peas
1 fennel bulb, thinly sliced
1 cup corn kernels
2 tbsp olive oil
1 tsp garlic powder
1/2 tsp salt
1/4 tsp black pepper
Fresh parsley for garnish', 'Heat olive oil in a large skillet over medium heat.
Add sliced fennel and sauté for 5 minutes until slightly softened.
Add peas and corn to the skillet and cook for another 5 minutes.
Season with garlic powder, salt, and black pepper. Stir well to combine.
Cook for an additional 5-7 minutes until vegetables are tender.
Garnish with fresh parsley before serving.
Enjoy your delicious Pea, Fennel, and Corn Medley!', '/generated-images/Pea,_Fennel,_and_Corn_Medley_20240428.png', '2024-04-28 08:23:00', '2024-04-28 08:23:00');
INSERT INTO recipe
VALUES
    (7, 'Apple Powder Energy Balls', '20 mins', 'Easy', '1 cup apple powder
1 cup dates, pitted
1/2 cup almonds
1/4 cup shredded coconut
1/4 cup chia seeds
1/4 cup honey', 'In a food processor, combine apple powder, dates, almonds, coconut, chia seeds, and honey. Pulse until mixture is well combined and sticky.
Roll mixture into small balls, about 1 inch in diameter.
Place balls on a baking sheet lined with parchment paper and refrigerate for at least 1 hour to set.
Enjoy these delicious and nutritious apple powder energy balls as a snack or dessert!', '/generated-images/Apple_Powder_Energy_Balls_20240428.png', '2024-04-28 08:23:57', '2024-04-28 08:23:57');
INSERT INTO recipe
VALUES
    (8, 'Spinach and Tofu Stir-Fry', '20 mins', 'Easy', '200g tofu, sliced into cubes
2 cups fresh spinach, washed and chopped
1 tablespoon soy sauce
1 teaspoon sesame oil
1 teaspoon minced garlic
1/2 teaspoon grated ginger
1/4 teaspoon red pepper flakes
1 tablespoon vegetable oil
Salt and pepper to taste', 'Heat vegetable oil in a large skillet over medium heat.
Add tofu cubes and cook until lightly browned on all sides, about 5 minutes.
Add garlic, ginger, and red pepper flakes to the skillet and cook for another minute.
Stir in soy sauce and sesame oil, then add spinach to the skillet.
Cook for 2-3 minutes, until the spinach is wilted and tofu is heated through.
Season with salt and pepper to taste.
Serve hot and enjoy!', '/generated-images/Spinach_and_Tofu_Stir-Fry_20240428.png', '2024-04-28 08:26:40', '2024-04-28 08:26:40');
INSERT INTO recipe
VALUES
    (9, 'Banana and Capsicum Stir-Fry', '20 mins', 'Easy', '2 ripe bananas, sliced
1 red capsicum, thinly sliced
1 green capsicum, thinly sliced
1 tbsp olive oil
2 cloves garlic, minced
1 tsp ginger, minced
2 tbsp soy sauce
1 tbsp honey
Salt and pepper to taste', 'Heat olive oil in a pan over medium heat.
Add garlic and ginger, sauté until fragrant.
Add sliced capsicum, cook until slightly softened.
Add sliced bananas, soy sauce, honey, salt, and pepper.
Stir-fry for 5-7 minutes until bananas are caramelized and capsicum is tender.
Serve hot over rice or noodles.', '/generated-images/Banana_and_Capsicum_Stir-Fry_20240428.png', '2024-04-28 08:27:36', '2024-04-28 08:27:36');
INSERT INTO recipe
VALUES
    (10, 'Spicy Banana and Capsicum Tacos', '30 mins', 'Medium', '2 ripe bananas, sliced
1 red capsicum, sliced
1 green capsicum, sliced
1 onion, sliced
2 cloves of garlic, minced
1 tsp cumin powder
1 tsp chili powder
1/2 tsp paprika
Salt and pepper to taste
1 tbsp olive oil
8 small tortillas
Optional toppings: avocado, salsa, cilantro', 'In a large skillet, heat olive oil over medium heat.
Add onions and garlic, sauté until onions are translucent.
Add sliced capsicums and cook until slightly softened.
Add bananas, cumin powder, chili powder, paprika, salt, and pepper. Stir well to combine.
Cook for another 5-7 minutes until bananas are heated through.
Warm tortillas in a separate pan or microwave.
Fill each tortilla with the banana and capsicum mixture.
Top with avocado, salsa, and cilantro if desired.
Serve hot and enjoy your spicy banana and capsicum tacos!', '/generated-images/Spicy_Banana_and_Capsicum_Tacos_20240428.png', '2024-04-28 08:27:58', '2024-04-28 08:27:58');
INSERT INTO recipe
VALUES
    (11, 'Banana and Capsicum Skewers', '25 mins', 'Easy', '2 ripe bananas
1 red capsicum
1 green capsicum
1 tbsp olive oil
1 tsp paprika
1/2 tsp cumin
Salt and pepper to taste', 'Preheat the grill to medium heat.
Cut the bananas, red capsicum, and green capsicum into chunks.
In a bowl, mix olive oil, paprika, cumin, salt, and pepper.
Thread the banana and capsicum chunks onto skewers, alternating between the two.
Brush the skewers with the olive oil mixture.
Grill the skewers for about 10-12 minutes, turning occasionally, until the bananas and capsicum are slightly charred.
Serve hot and enjoy!', '/generated-images/Banana_and_Capsicum_Skewers_20240428.png', '2024-04-28 08:28:14', '2024-04-28 08:28:14');
INSERT INTO recipe
VALUES
    (12, 'Roasted Garlic Beetroot and Pumpkin Salad', '45 mins', 'Medium', '2 cloves of garlic, minced
2 beetroots, peeled and diced
1 small pumpkin, peeled and diced
2 tbsp olive oil
Salt and pepper to taste
1/4 cup balsamic vinegar
1/4 cup crumbled feta cheese
2 tbsp chopped fresh parsley', 'Preheat the oven to 400°F (200°C).
In a bowl, toss the diced beetroot and pumpkin with minced garlic, olive oil, salt, and pepper until well coated.
Spread the mixture on a baking tray in a single layer and roast in the oven for 30-35 minutes, or until the vegetables are tender and slightly caramelized.
In a small bowl, whisk together balsamic vinegar, a pinch of salt, and pepper to make the dressing.
Once the vegetables are roasted, transfer them to a serving platter.
Drizzle the balsamic dressing over the vegetables and sprinkle with crumbled feta cheese and chopped parsley before serving.
Enjoy your delicious Roasted Garlic Beetroot and Pumpkin Salad!', '/generated-images/Roasted_Garlic_Beetroot_and_Pumpkin_Salad_20240428.png', '2024-04-28 08:28:52', '2024-04-28 08:28:52');
INSERT INTO recipe
VALUES
    (13, 'Pumpkin and Potato Veggie Bake', '45 mins', 'Medium', '1 small pumpkin, peeled and diced
2 large potatoes, peeled and sliced
1 onion, chopped
2 cloves of garlic, minced
1 cup of vegetable broth
1 tsp of dried thyme
1 tsp of paprika
Salt and pepper to taste
2 tbsp of olive oil
1/2 cup of grated cheese (optional)', 'Preheat the oven to 400°F (200°C).
In a large baking dish, combine the diced pumpkin, sliced potatoes, chopped onion, and minced garlic.
Drizzle the olive oil over the vegetables and toss to coat evenly.
Sprinkle the dried thyme, paprika, salt, and pepper over the vegetables and mix well.
Pour the vegetable broth over the mixture and cover the baking dish with foil.
Bake in the preheated oven for 30 minutes.
Remove the foil, sprinkle grated cheese over the top (if using), and bake for another 10-15 minutes until the cheese is melted and bubbly.
Serve hot and enjoy your delicious Pumpkin and Potato Veggie Bake!', '/generated-images/Pumpkin_and_Potato_Veggie_Bake_20240428.png', '2024-04-28 08:45:05', '2024-04-28 08:45:05');
INSERT INTO recipe
VALUES
    (14, 'Autumn Harvest Stuffed Squash', '45 mins', 'Medium', '1 small pumpkin
2 large potatoes
1 onion, diced
2 cloves of garlic, minced
1 red bell pepper, diced
1 cup of cooked quinoa
1/2 cup of chopped walnuts
1/2 cup of dried cranberries
1 tsp of ground cumin
1 tsp of paprika
Salt and pepper to taste
Olive oil for cooking', 'Preheat the oven to 400°F (200°C).
Cut the pumpkin in half and scoop out the seeds. Place the halves on a baking tray, drizzle with olive oil, and roast for 20-25 minutes until tender.
Peel and dice the potatoes, then boil them until fork-tender. Drain and set aside.
In a large skillet, heat some olive oil and sauté the onion, garlic, and red bell pepper until softened.
Add the cooked quinoa, walnuts, dried cranberries, cumin, paprika, salt, and pepper to the skillet. Stir to combine.
Once the pumpkin halves are roasted, fill them with the quinoa mixture and return to the oven for another 10 minutes.
Serve the stuffed squash hot, garnished with fresh herbs if desired.', '/generated-images/Autumn_Harvest_Stuffed_Squash_20240428.png', '2024-04-28 08:45:39', '2024-04-28 08:45:39');


INSERT INTO recipe
VALUES
    (15, 'Kale and Capsicum Stir Fry', '20 mins', 'Easy', '2 cups of chopped kale\n1 red capsicum, sliced\n1 yellow capsicum, sliced\n2 tablespoons of olive oil\n2 cloves of garlic, minced\n1 tablespoon of soy sauce\n1 teaspoon of sesame oil\nSalt and pepper to taste', 'Heat olive oil in a large pan over medium heat\nAdd minced garlic and sauté for 1 minute until fragrant\nAdd sliced capsicum and cook for 3-4 minutes until slightly softened\nAdd chopped kale to the pan and stir fry for another 3-4 minutes until kale is wilted\nDrizzle soy sauce and sesame oil over the vegetables, season with salt and pepper, and stir well to combine\nCook for an additional 1-2 minutes, then remove from heat\nServe hot as a side dish or over rice for a complete meal', '/generated-images/Kale_and_Capsicum_Stir_Fry_20240501.png', '2024-05-01 21:57:40', '2024-05-01 21:57:40');


INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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
INSERT INTO recipe
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

INSERT INTO recipe
VALUES
    (39, 'Tofu and Spinach Stir-Fry', '20 mins', 'Easy', '1 block of tofu, cubed
2 cups of fresh spinach
2 cloves of garlic, minced
1 tablespoon of soy sauce
1 tablespoon of sesame oil
1 teaspoon of ginger, grated
1 tablespoon of vegetable oil
Salt and pepper to taste', 'Press the tofu to remove excess moisture. Cut into cubes.
Heat vegetable oil in a pan over medium heat. Add tofu cubes and cook until golden brown on all sides. Remove from pan and set aside.
In the same pan, add sesame oil, garlic, and ginger. Cook for 1-2 minutes until fragrant.
Add spinach to the pan and cook until wilted.
Return tofu to the pan and add soy sauce. Stir well to combine.
Season with salt and pepper to taste.
Serve hot and enjoy!', '/generated-images/Tofu_and_Spinach_Stir-Fry_20240423.png', '2024-04-23 05:35:51', '2024-04-23 05:35:51');

/* Insert into recipe_ingredient */
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
(1, 1),  -- Tomato Pasta includes Tomato
(2, 2),  -- Cheese Pizza includes Cheese
(3, 3),  -- Basil Chicken includes Basil
(4, 4),  -- Chicken Curry includes Chicken
(5, 5);  -- Salad with Olive Oil includes Olive Oil

/* Continue with other insert statements in a similar fashion. */

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





INSERT INTO collection_recipe (collection_id, recipe_id) VALUES
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19);