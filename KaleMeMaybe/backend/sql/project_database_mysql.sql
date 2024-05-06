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
    FOREIGN KEY (collection_id) REFERENCES collection(id) ON DELETE CASCADE,
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
INSERT INTO recipe (id, name, time_consuming, difficulty, ingredient_details, method, image_path, created_at, updated_at) VALUES
(1, 'Vegetarian Capsicum and Pea Salad', '15 mins', 'Easy', '1 head of lettuce, washed and torn into bite-sized pieces\r\n1 red capsicum, diced\r\n1 cup of peas, fresh or frozen\r\n1/4 cup of olive oil\r\n2 tablespoons of balsamic vinegar\r\nSalt and pepper to taste', 'In a large salad bowl, combine the torn lettuce, diced capsicum, and peas.\r\nIn a small bowl, whisk together the olive oil, balsamic vinegar, salt, and pepper to make the dressing.\r\nPour the dressing over the salad and toss well to coat all the ingredients.\r\nServe immediately as a refreshing and nutritious vegetarian salad.', '/generated-images/Vegetarian_Capsicum_and_Pea_Salad_20240425.png', '2024-04-24 21:46:18', '2024-04-24 21:46:18'),
(2, 'Pumpkin, Potato, and Tofu Stir Fry', '30 mins', 'Medium', '1 cup diced pumpkin\r\n1 cup diced potato\r\n1 block of tofu, pressed and cubed\r\n2 tbsp soy sauce\r\n1 tbsp sesame oil\r\n1 tsp ginger, minced\r\n2 cloves garlic, minced\r\n1 red chili, sliced\r\n1/4 cup vegetable broth\r\nSalt and pepper to taste\r\n2 green onions, sliced', 'In a large skillet, heat sesame oil over medium heat.\r\nAdd ginger, garlic, and red chili to the skillet. Cook for 1-2 minutes until fragrant.\r\nAdd diced pumpkin and potato to the skillet. Cook for 10-15 minutes until vegetables are slightly tender.\r\nPush vegetables to one side of the skillet and add cubed tofu. Cook for 5-7 minutes until tofu is golden brown.\r\nMix everything together in the skillet and add soy sauce and vegetable broth. Cook for another 5 minutes.\r\nSeason with salt and pepper to taste.\r\nGarnish with sliced green onions before serving.\r\nServe hot over rice or quinoa.', '/generated-images/Pumpkin,_Potato,_and_Tofu_Stir_Fry_20240425.png', '2024-04-24 21:52:48', '2024-04-24 21:52:48'),
(3, 'Stir-Fried Vegetables with Asparagus, Capsicum, and Bok Choy', '20 mins', 'Easy', '1 bunch asparagus, trimmed and cut into 2-inch pieces\r\n1 red capsicum, sliced\r\n1 yellow capsicum, sliced\r\n2 bok choy, chopped\r\n2 cloves garlic, minced\r\n2 tbsp soy sauce\r\n1 tbsp sesame oil\r\n1 tsp ginger, grated\r\nSalt and pepper to taste\r\nCooking oil', 'Heat some cooking oil in a large pan or wok over medium heat.\r\nAdd the minced garlic and grated ginger, and sauté for 1-2 minutes until fragrant.\r\nAdd the sliced capsicum and stir-fry for 3-4 minutes until slightly softened.\r\nAdd the asparagus and bok choy, and continue to stir-fry for another 3-4 minutes until the vegetables are tender-crisp.\r\nDrizzle the soy sauce and sesame oil over the vegetables, and season with salt and pepper to taste. Stir well to combine.\r\nCook for an additional 1-2 minutes, then remove from heat.\r\nServe the stir-fried vegetables hot as a side dish or over cooked rice for a complete meal.', '/generated-images/Stir-Fried_Vegetables_with_Asparagus,_Capsicum,_and_Bok_Choy_20240428.png', '2024-04-27 19:25:58', '2024-04-27 19:25:58'),
(4, 'Garlic Kale Scramble', '20 mins', 'Easy', '2 cloves of garlic, minced\r\n2 cups of kale, chopped\r\n1 tablespoon of egg replacer powder\r\n2 tablespoons of water\r\nSalt and pepper to taste', 'In a small bowl, mix the egg replacer powder with water and set aside.\r\nIn a pan, heat some oil over medium heat and add the minced garlic. Cook for 1-2 minutes until fragrant.\r\nAdd the chopped kale to the pan and sauté for 3-4 minutes until wilted.\r\nPour in the egg replacer mixture and stir well to combine with the kale. Cook for another 2-3 minutes until the egg replacer is fully cooked.\r\nSeason with salt and pepper to taste.\r\nServe hot and enjoy!', '/generated-images/Garlic_Kale_Scramble_20240428.png', '2024-04-27 19:44:09', '2024-04-27 19:44:09'),
(5, 'Vegetarian Pea, Fennel, and Corn Stir Fry', '25 mins', 'Medium', '1 cup peas, fresh or frozen\r\n1 fennel bulb, thinly sliced\r\n1 cup corn kernels\r\n2 cloves garlic, minced\r\n1 tablespoon olive oil\r\n2 tablespoons soy sauce\r\n1 teaspoon sesame oil\r\nSalt and pepper to taste', 'Heat olive oil in a large skillet over medium heat.\r\nAdd the sliced fennel and cook for 5 minutes until slightly softened.\r\nAdd the minced garlic and cook for another minute until fragrant.\r\nAdd the peas and corn to the skillet and stir well to combine.\r\nCook for 8-10 minutes, stirring occasionally, until the vegetables are tender.\r\nDrizzle soy sauce and sesame oil over the vegetables, and season with salt and pepper.\r\nStir well to combine and cook for another 2 minutes.\r\nServe hot as a side dish or over cooked rice for a complete meal.', '/generated-images/Vegetarian_Pea,_Fennel,_and_Corn_Stir_Fry_20240428.png', '2024-04-27 20:22:35', '2024-04-27 20:22:35'),
(6, 'Pea, Fennel, and Corn Medley', '25 mins', 'Medium', '1 cup peas\r\n1 fennel bulb, thinly sliced\r\n1 cup corn kernels\r\n2 tbsp olive oil\r\n1 tsp garlic powder\r\n1/2 tsp salt\r\n1/4 tsp black pepper\r\nFresh parsley for garnish', 'Heat olive oil in a large skillet over medium heat.\r\nAdd sliced fennel and sauté for 5 minutes until slightly softened.\r\nAdd peas and corn to the skillet and cook for another 5 minutes.\r\nSeason with garlic powder, salt, and black pepper. Stir well to combine.\r\nCook for an additional 5-7 minutes until vegetables are tender.\r\nGarnish with fresh parsley before serving.\r\nEnjoy your delicious Pea, Fennel, and Corn Medley!', '/generated-images/Pea,_Fennel,_and_Corn_Medley_20240428.png', '2024-04-27 20:23:00', '2024-04-27 20:23:00'),
(7, 'Apple Powder Energy Balls', '20 mins', 'Easy', '1 cup apple powder\r\n1 cup dates, pitted\r\n1/2 cup almonds\r\n1/4 cup shredded coconut\r\n1/4 cup chia seeds\r\n1/4 cup honey', 'In a food processor, combine apple powder, dates, almonds, coconut, chia seeds, and honey. Pulse until mixture is well combined and sticky.\r\nRoll mixture into small balls, about 1 inch in diameter.\r\nPlace balls on a baking sheet lined with parchment paper and refrigerate for at least 1 hour to set.\r\nEnjoy these delicious and nutritious apple powder energy balls as a snack or dessert!', '/generated-images/Apple_Powder_Energy_Balls_20240428.png', '2024-04-27 20:23:57', '2024-04-27 20:23:57'),
(8, 'Spinach and Tofu Stir-Fry', '20 mins', 'Easy', '200g tofu, sliced into cubes\r\n2 cups fresh spinach, washed and chopped\r\n1 tablespoon soy sauce\r\n1 teaspoon sesame oil\r\n1 teaspoon minced garlic\r\n1/2 teaspoon grated ginger\r\n1/4 teaspoon red pepper flakes\r\n1 tablespoon vegetable oil\r\nSalt and pepper to taste', 'Heat vegetable oil in a large skillet over medium heat.\r\nAdd tofu cubes and cook until lightly browned on all sides, about 5 minutes.\r\nAdd garlic, ginger, and red pepper flakes to the skillet and cook for another minute.\r\nStir in soy sauce and sesame oil, then add spinach to the skillet.\r\nCook for 2-3 minutes, until the spinach is wilted and tofu is heated through.\r\nSeason with salt and pepper to taste.\r\nServe hot and enjoy!', '/generated-images/Spinach_and_Tofu_Stir-Fry_20240428.png', '2024-04-27 20:26:40', '2024-04-27 20:26:40'),
(9, 'Banana and Capsicum Stir-Fry', '20 mins', 'Easy', '2 ripe bananas, sliced\r\n1 red capsicum, thinly sliced\r\n1 green capsicum, thinly sliced\r\n1 tbsp olive oil\r\n2 cloves garlic, minced\r\n1 tsp ginger, minced\r\n2 tbsp soy sauce\r\n1 tbsp honey\r\nSalt and pepper to taste', 'Heat olive oil in a pan over medium heat.\r\nAdd garlic and ginger, sauté until fragrant.\r\nAdd sliced capsicum, cook until slightly softened.\r\nAdd sliced bananas, soy sauce, honey, salt, and pepper.\r\nStir-fry for 5-7 minutes until bananas are caramelized and capsicum is tender.\r\nServe hot over rice or noodles.', '/generated-images/Banana_and_Capsicum_Stir-Fry_20240428.png', '2024-04-27 20:27:36', '2024-04-27 20:27:36'),
(10, 'Spicy Banana and Capsicum Tacos', '30 mins', 'Medium', '2 ripe bananas, sliced\r\n1 red capsicum, sliced\r\n1 green capsicum, sliced\r\n1 onion, sliced\r\n2 cloves of garlic, minced\r\n1 tsp cumin powder\r\n1 tsp chili powder\r\n1/2 tsp paprika\r\nSalt and pepper to taste\r\n1 tbsp olive oil\r\n8 small tortillas\r\nOptional toppings: avocado, salsa, cilantro', 'In a large skillet, heat olive oil over medium heat.\r\nAdd onions and garlic, sauté until onions are translucent.\r\nAdd sliced capsicums and cook until slightly softened.\r\nAdd bananas, cumin powder, chili powder, paprika, salt, and pepper. Stir well to combine.\r\nCook for another 5-7 minutes until bananas are heated through.\r\nWarm tortillas in a separate pan or microwave.\r\nFill each tortilla with the banana and capsicum mixture.\r\nTop with avocado, salsa, and cilantro if desired.\r\nServe hot and enjoy your spicy banana and capsicum tacos!', '/generated-images/Spicy_Banana_and_Capsicum_Tacos_20240428.png', '2024-04-27 20:27:58', '2024-04-27 20:27:58'),
(11, 'Banana and Capsicum Skewers', '25 mins', 'Easy', '2 ripe bananas\r\n1 red capsicum\r\n1 green capsicum\r\n1 tbsp olive oil\r\n1 tsp paprika\r\n1/2 tsp cumin\r\nSalt and pepper to taste', 'Preheat the grill to medium heat.\r\nCut the bananas, red capsicum, and green capsicum into chunks.\r\nIn a bowl, mix olive oil, paprika, cumin, salt, and pepper.\r\nThread the banana and capsicum chunks onto skewers, alternating between the two.\r\nBrush the skewers with the olive oil mixture.\r\nGrill the skewers for about 10-12 minutes, turning occasionally, until the bananas and capsicum are slightly charred.\r\nServe hot and enjoy!', '/generated-images/Banana_and_Capsicum_Skewers_20240428.png', '2024-04-27 20:28:14', '2024-04-27 20:28:14'),
(12, 'Roasted Garlic Beetroot and Pumpkin Salad', '45 mins', 'Medium', '2 cloves of garlic, minced\r\n2 beetroots, peeled and diced\r\n1 small pumpkin, peeled and diced\r\n2 tbsp olive oil\r\nSalt and pepper to taste\r\n1/4 cup balsamic vinegar\r\n1/4 cup crumbled feta cheese\r\n2 tbsp chopped fresh parsley', 'Preheat the oven to 400°F (200°C).\r\nIn a bowl, toss the diced beetroot and pumpkin with minced garlic, olive oil, salt, and pepper until well coated.\r\nSpread the mixture on a baking tray in a single layer and roast in the oven for 30-35 minutes, or until the vegetables are tender and slightly caramelized.\r\nIn a small bowl, whisk together balsamic vinegar, a pinch of salt, and pepper to make the dressing.\r\nOnce the vegetables are roasted, transfer them to a serving platter.\r\nDrizzle the balsamic dressing over the vegetables and sprinkle with crumbled feta cheese and chopped parsley before serving.\r\nEnjoy your delicious Roasted Garlic Beetroot and Pumpkin Salad!', '/generated-images/Roasted_Garlic_Beetroot_and_Pumpkin_Salad_20240428.png', '2024-04-27 20:28:52', '2024-04-27 20:28:52'),
(13, 'Pumpkin and Potato Veggie Bake', '45 mins', 'Medium', '1 small pumpkin, peeled and diced\r\n2 large potatoes, peeled and sliced\r\n1 onion, chopped\r\n2 cloves of garlic, minced\r\n1 cup of vegetable broth\r\n1 tsp of dried thyme\r\n1 tsp of paprika\r\nSalt and pepper to taste\r\n2 tbsp of olive oil\r\n1/2 cup of grated cheese (optional)', 'Preheat the oven to 400°F (200°C).\r\nIn a large baking dish, combine the diced pumpkin, sliced potatoes, chopped onion, and minced garlic.\r\nDrizzle the olive oil over the vegetables and toss to coat evenly.\r\nSprinkle the dried thyme, paprika, salt, and pepper over the vegetables and mix well.\r\nPour the vegetable broth over the mixture and cover the baking dish with foil.\r\nBake in the preheated oven for 30 minutes.\r\nRemove the foil, sprinkle grated cheese over the top (if using), and bake for another 10-15 minutes until the cheese is melted and bubbly.\r\nServe hot and enjoy your delicious Pumpkin and Potato Veggie Bake!', '/generated-images/Pumpkin_and_Potato_Veggie_Bake_20240428.png', '2024-04-27 20:45:05', '2024-04-27 20:45:05'),
(14, 'Autumn Harvest Stuffed Squash', '45 mins', 'Medium', '1 small pumpkin\r\n2 large potatoes\r\n1 onion, diced\r\n2 cloves of garlic, minced\r\n1 red bell pepper, diced\r\n1 cup of cooked quinoa\r\n1/2 cup of chopped walnuts\r\n1/2 cup of dried cranberries\r\n1 tsp of ground cumin\r\n1 tsp of paprika\r\nSalt and pepper to taste\r\nOlive oil for cooking', 'Preheat the oven to 400°F (200°C).\r\nCut the pumpkin in half and scoop out the seeds. Place the halves on a baking tray, drizzle with olive oil, and roast for 20-25 minutes until tender.\r\nPeel and dice the potatoes, then boil them until fork-tender. Drain and set aside.\r\nIn a large skillet, heat some olive oil and sauté the onion, garlic, and red bell pepper until softened.\r\nAdd the cooked quinoa, walnuts, dried cranberries, cumin, paprika, salt, and pepper to the skillet. Stir to combine.\r\nOnce the pumpkin halves are roasted, fill them with the quinoa mixture and return to the oven for another 10 minutes.\r\nServe the stuffed squash hot, garnished with fresh herbs if desired.', '/generated-images/Autumn_Harvest_Stuffed_Squash_20240428.png', '2024-04-27 20:45:39', '2024-04-27 20:45:39'),
(15, 'Kale and Capsicum Stir Fry', '20 mins', 'Easy', '2 cups of chopped kale\n1 red capsicum, sliced\n1 yellow capsicum, sliced\n2 tablespoons of olive oil\n2 cloves of garlic, minced\n1 tablespoon of soy sauce\n1 teaspoon of sesame oil\nSalt and pepper to taste', 'Heat olive oil in a large pan over medium heat\nAdd minced garlic and sauté for 1 minute until fragrant\nAdd sliced capsicum and cook for 3-4 minutes until slightly softened\nAdd chopped kale to the pan and stir fry for another 3-4 minutes until kale is wilted\nDrizzle soy sauce and sesame oil over the vegetables, season with salt and pepper, and stir well to combine\nCook for an additional 1-2 minutes, then remove from heat\nServe hot as a side dish or over rice for a complete meal', '/generated-images/Kale_and_Capsicum_Stir_Fry_20240501.png', '2024-05-01 09:57:40', '2024-05-01 09:57:40'),
(17, 'Roasted Asparagus and Tofu with Spinach', '30 mins', 'Medium', '1 bunch of asparagus, trimmed\r\n1 block of tofu, pressed and cubed\r\n2 cups of fresh spinach\r\n2 tablespoons of olive oil\r\n2 cloves of garlic, minced\r\nSalt and pepper to taste\r\n1 tablespoon of soy sauce\r\n1 tablespoon of balsamic vinegar', 'Preheat the oven to 400°F (200°C).\r\nPlace the trimmed asparagus and cubed tofu on a baking sheet. Drizzle with olive oil, minced garlic, salt, and pepper. Toss to coat evenly.\r\nRoast in the oven for 20-25 minutes, or until the asparagus is tender and the tofu is crispy.\r\nIn a large skillet, heat 1 tablespoon of olive oil over medium heat. Add the spinach and sauté until wilted.\r\nAdd the roasted asparagus and tofu to the skillet. Drizzle with soy sauce and balsamic vinegar. Toss to combine and heat through.\r\nServe hot and enjoy!', '/generated-images/Roasted_Asparagus_and_Tofu_with_Spinach_20240421.png', '2024-04-20 17:07:24', '2024-04-20 17:07:24'),
(18, 'Roasted Vegetable Medley', '45 mins', 'Medium', '1 cup of corn kernels\r\n1 cup of diced pumpkin\r\n1 red capsicum, sliced\r\n1 yellow capsicum, sliced\r\n2 tbsp olive oil\r\n1 tsp salt\r\n1/2 tsp black pepper\r\n1/2 tsp paprika\r\n1/2 tsp garlic powder', 'Preheat the oven to 200°C.\r\nIn a large bowl, toss the corn, pumpkin, and capsicum with olive oil, salt, pepper, paprika, and garlic powder until well coated.\r\nSpread the vegetables in a single layer on a baking sheet lined with parchment paper.\r\nRoast in the oven for 30-35 minutes, or until the vegetables are tender and slightly caramelized, stirring halfway through.\r\nRemove from the oven and let cool slightly before serving.\r\nEnjoy your delicious Roasted Vegetable Medley!', '/generated-images/Roasted_Vegetable_Medley_20240421.png', '2024-04-20 17:11:29', '2024-04-20 17:11:29'),
(23, 'Garlic Pumpkin Kale Asparagus Stir-Fry', '30 mins', 'Medium', '1 bunch of kale, stems removed and leaves chopped\r\n1 bunch of asparagus, trimmed and cut into 2-inch pieces\r\n3 cloves of garlic, minced\r\n1 small pumpkin, peeled and diced\r\n2 tablespoons of olive oil\r\nSalt and pepper to taste', 'Heat 1 tablespoon of olive oil in a large skillet over medium heat.\r\nAdd the diced pumpkin to the skillet and cook for 10-15 minutes, stirring occasionally, until the pumpkin is tender and slightly browned.\r\nIn a separate skillet, heat the remaining 1 tablespoon of olive oil over medium heat.\r\nAdd the minced garlic and sauté for 1-2 minutes until fragrant.\r\nAdd the chopped kale and asparagus to the skillet with the garlic, and sauté for another 5-7 minutes until the vegetables are tender but still slightly crisp.\r\nSeason with salt and pepper to taste.\r\nCombine the cooked pumpkin with the kale and asparagus mixture, and stir well to combine.\r\nServe hot and enjoy!', '/generated-images/Garlic_Pumpkin_Kale_Asparagus_Stir-Fry_20240421.png', '2024-04-20 17:53:53', '2024-04-20 17:53:53'),
(25, 'Roasted Beetroot and Garlic Salad', '45 mins', 'Medium', '3 medium-sized beetroots, peeled and diced\r\n4 cloves of garlic, minced\r\n1 red onion, thinly sliced\r\n2 tbsp olive oil\r\nSalt and pepper to taste\r\n1/4 cup balsamic vinegar\r\n1/4 cup crumbled feta cheese\r\nHandful of fresh parsley, chopped', 'Preheat the oven to 400°F (200°C).\r\nIn a large bowl, toss the diced beetroot, minced garlic, and red onion slices with olive oil, salt, and pepper until well coated.\r\nSpread the beetroot mixture on a baking sheet in a single layer and roast in the preheated oven for 30-35 minutes, or until the beetroot is tender and slightly caramelized.\r\nIn a small bowl, whisk together balsamic vinegar and a pinch of salt.\r\nOnce the beetroot is roasted, transfer it to a serving dish and drizzle with the balsamic vinegar dressing.\r\nTop the salad with crumbled feta cheese and chopped parsley before serving.\r\nEnjoy your delicious Roasted Beetroot and Garlic Salad!', '/generated-images/Roasted_Beetroot_and_Garlic_Salad_20240421.png', '2024-04-20 17:57:44', '2024-04-20 17:57:44'),
(28, 'Crispy Tofu Asparagus Stir Fry', '30 mins', 'Medium', '1 block of firm tofu, pressed and cubed\r\n1 bunch of asparagus, trimmed and cut into 2-inch pieces\r\n4 cloves of garlic, minced\r\n2 tablespoons of soy sauce\r\n1 tablespoon of cornstarch\r\n1 tablespoon of sesame oil\r\n1 teaspoon of ginger, minced\r\n1/4 cup of vegetable broth\r\nSalt and pepper to taste\r\nCooking oil', 'In a bowl, mix the cubed tofu with soy sauce and cornstarch until well coated. Let it marinate for 10 minutes.\r\nHeat some cooking oil in a pan over medium heat. Add the tofu cubes and cook until crispy on all sides. Remove from pan and set aside.\r\nIn the same pan, add a bit more oil if needed. Add the minced garlic and ginger, sauté until fragrant.\r\nAdd the asparagus pieces and vegetable broth to the pan. Cook until the asparagus is tender but still crisp.\r\nReturn the crispy tofu to the pan and stir to combine with the asparagus. Season with salt and pepper to taste.\r\nDrizzle sesame oil over the stir fry before serving.\r\nServe hot over rice or noodles. Enjoy!', '/generated-images/Crispy_Tofu_Asparagus_Stir_Fry_20240421.png', '2024-04-20 18:03:33', '2024-04-20 18:03:33'),
(31, 'Lettuce and Pea Salad', '15 mins', 'Easy', '1 head of lettuce, washed and chopped\r\n1 cup of peas, cooked\r\n1/4 cup of red onion, thinly sliced\r\n1/4 cup of feta cheese, crumbled\r\n1/4 cup of roasted sunflower seeds\r\nSalt and pepper to taste\r\nFor dressing: 1/4 cup of olive oil, 2 tablespoons of balsamic vinegar, 1 tablespoon of honey', 'In a large mixing bowl, combine the chopped lettuce, cooked peas, red onion, feta cheese, and sunflower seeds.\r\nIn a small bowl, whisk together the olive oil, balsamic vinegar, and honey to make the dressing.\r\nPour the dressing over the salad and toss until everything is well coated.\r\nSeason with salt and pepper to taste.\r\nServe the salad chilled and enjoy!', '/generated-images/Lettuce_and_Pea_Salad_20240421.png', '2024-04-20 19:39:31', '2024-04-20 19:39:31'),
(32, 'Roasted Beetroot Salad with Garlic and Onion', '45 mins', 'Medium', '3 medium-sized beetroots, peeled and diced\r\n4 cloves of garlic, minced\r\n1 large onion, thinly sliced\r\n2 tablespoons of olive oil\r\nSalt and pepper to taste\r\n1/4 cup of balsamic vinegar\r\n1/2 cup of crumbled feta cheese\r\nHandful of fresh parsley, chopped', 'Preheat the oven to 400°F (200°C).\r\nIn a mixing bowl, toss the diced beetroot with minced garlic, sliced onion, olive oil, salt, and pepper until well coated.\r\nSpread the beetroot mixture in a single layer on a baking sheet lined with parchment paper.\r\nRoast in the preheated oven for 30-35 minutes, or until the beetroot is tender and slightly caramelized.\r\nRemove the beetroot from the oven and drizzle with balsamic vinegar. Toss to combine.\r\nTransfer the roasted beetroot mixture to a serving platter and sprinkle with crumbled feta cheese and chopped parsley.\r\nServe the salad warm or at room temperature. Enjoy!', '/generated-images/Roasted_Beetroot_Salad_with_Garlic_and_Onion_20240421.png', '2024-04-20 21:30:44', '2024-04-20 21:30:44'),
(33, 'Kale and Chickpea Stuffed Sweet Potatoes', '45 mins', 'Medium', '2 large sweet potatoes\r\n1 bunch of kale, stems removed and chopped\r\n1 can of chickpeas, rinsed and drained\r\n1 small red onion, diced\r\n2 cloves of garlic, minced\r\n1 tablespoon olive oil\r\n1 teaspoon cumin\r\n1 teaspoon paprika\r\nSalt and pepper to taste\r\n1/4 cup of vegetable broth\r\n1/4 cup of crumbled feta cheese (optional)', 'Preheat the oven to 400°F (200°C).\r\nPierce the sweet potatoes with a fork and place them on a baking sheet. Bake for 40-45 minutes, or until tender.\r\nIn a large skillet, heat the olive oil over medium heat. Add the red onion and garlic, and sauté until softened.\r\nAdd the chopped kale to the skillet and cook until wilted, about 5 minutes.\r\nStir in the chickpeas, cumin, paprika, salt, and pepper. Cook for another 2-3 minutes.\r\nPour in the vegetable broth and simmer for 5 minutes, allowing the flavors to meld.\r\nOnce the sweet potatoes are cooked, slice them open and fluff the insides with a fork.\r\nDivide the kale and chickpea mixture among the sweet potatoes, and top with crumbled feta cheese if desired.\r\nServe hot and enjoy!', '/generated-images/Kale_and_Chickpea_Stuffed_Sweet_Potatoes_20240421.png', '2024-04-20 22:19:59', '2024-04-20 22:19:59'),
(34, 'Roasted Vegetable Salad', '40 mins', 'Medium', '1 red capsicum, sliced\r\n1 eggplant, diced\r\n2 cups kale, chopped\r\n2 tbsp olive oil\r\n1 tsp salt\r\n1/2 tsp black pepper\r\n1/2 tsp paprika\r\n1/4 tsp garlic powder', 'Preheat the oven to 200°C (400°F).\r\nIn a large bowl, toss the capsicum, eggplant, and kale with olive oil, salt, pepper, paprika, and garlic powder until well coated.\r\nSpread the vegetables in a single layer on a baking sheet lined with parchment paper.\r\nRoast in the preheated oven for 25-30 minutes, or until the vegetables are tender and slightly charred.\r\nRemove from the oven and let cool slightly before serving.\r\nEnjoy the roasted vegetable salad as a delicious and healthy vegetarian meal!', '/generated-images/Roasted_Vegetable_Salad_20240422.png', '2024-04-21 21:50:32', '2024-04-21 21:50:32'),
(36, 'Crispy Tofu and Spinach Salad', '25 mins', 'Medium', '1 block of firm tofu, drained and pressed\r\n2 cups of fresh spinach leaves\r\n1 tablespoon of soy sauce\r\n1 tablespoon of cornstarch\r\n1 teaspoon of garlic powder\r\n1/2 teaspoon of salt\r\n1/4 teaspoon of black pepper\r\n2 tablespoons of olive oil\r\n1 tablespoon of sesame seeds\r\n1 tablespoon of rice vinegar\r\n1 tablespoon of maple syrup', 'Preheat the oven to 400°F (200°C).\r\nCut the tofu into cubes and place in a bowl. Add soy sauce, cornstarch, garlic powder, salt, and black pepper. Toss gently to coat the tofu.\r\nHeat olive oil in a skillet over medium heat. Add the tofu cubes and cook until crispy and golden brown on all sides, about 5-7 minutes. Remove from the skillet and set aside.\r\nIn the same skillet, add sesame seeds and toast for 1-2 minutes until fragrant. Add the spinach leaves and cook until wilted, about 2-3 minutes.\r\nIn a small bowl, whisk together rice vinegar and maple syrup to make the dressing.\r\nIn a large salad bowl, combine the crispy tofu, sautéed spinach, and dressing. Toss gently to coat everything evenly.\r\nServe the crispy tofu and spinach salad immediately. Enjoy!', '/generated-images/Crispy_Tofu_and_Spinach_Salad_20240422.png', '2024-04-21 22:31:33', '2024-04-21 22:31:33'),
(37, 'Tofu and Vegetable Stir-Fry', '25 mins', 'Medium', '1 block of tofu, pressed and cubed\r\n2 cups of fresh spinach, washed and chopped\r\n1 bunch of asparagus, trimmed and cut into 2-inch pieces\r\n2 cloves of garlic, minced\r\n1 tablespoon of soy sauce\r\n1 tablespoon of sesame oil\r\n1 teaspoon of ginger, grated\r\n1 tablespoon of cornstarch\r\n1/4 cup of vegetable broth\r\nSalt and pepper to taste\r\nCooking oil', 'In a small bowl, mix together soy sauce, sesame oil, ginger, and cornstarch to make a sauce.\r\nHeat some cooking oil in a large pan over medium heat.\r\nAdd the tofu cubes and cook until golden brown on all sides. Remove from the pan and set aside.\r\nIn the same pan, add a bit more oil if needed and sauté the garlic until fragrant.\r\nAdd the asparagus pieces and cook for 3-4 minutes until slightly tender.\r\nAdd the spinach and cook until wilted.\r\nPour in the vegetable broth and the sauce mixture. Stir well and let it simmer for a few minutes until the sauce thickens.\r\nAdd the cooked tofu back into the pan and mix everything together.\r\nSeason with salt and pepper to taste.\r\nServe the tofu and vegetable stir-fry hot over rice or noodles.', '/generated-images/Tofu_and_Vegetable_Stir-Fry_20240422.png', '2024-04-21 22:33:03', '2024-04-21 22:33:03'),
(38, 'Asparagus and Tofu Stir-Fry', '25 mins', 'Medium', '1 bunch of asparagus, trimmed and cut into 2-inch pieces\r\n1 block of firm tofu, drained and cubed\r\n2 cloves of garlic, minced\r\n1 tablespoon of ginger, minced\r\n2 tablespoons of soy sauce\r\n1 tablespoon of sesame oil\r\n1 tablespoon of vegetable oil\r\nSalt and pepper to taste\r\nCooked rice for serving', 'In a large skillet, heat vegetable oil over medium heat.\r\nAdd tofu cubes and cook until golden brown on all sides, about 5-7 minutes. Remove from skillet and set aside.\r\nIn the same skillet, add sesame oil, garlic, and ginger. Cook for 1-2 minutes until fragrant.\r\nAdd asparagus to the skillet and stir-fry for 3-4 minutes until slightly tender but still crisp.\r\nReturn tofu to the skillet and add soy sauce. Stir well to combine and cook for another 2-3 minutes.\r\nSeason with salt and pepper to taste.\r\nServe hot over cooked rice. Enjoy your delicious asparagus and tofu stir-fry!', '/generated-images/Asparagus_and_Tofu_Stir-Fry_20240422.png', '2024-04-21 23:05:42', '2024-04-21 23:05:42'),
(39, 'Tofu and Spinach Stir-Fry', '20 mins', 'Easy', '1 block of tofu, cubed\r\n2 cups of fresh spinach\r\n2 cloves of garlic, minced\r\n1 tablespoon of soy sauce\r\n1 tablespoon of sesame oil\r\n1 teaspoon of ginger, grated\r\n1 tablespoon of vegetable oil\r\nSalt and pepper to taste', 'Press the tofu to remove excess moisture. Cut into cubes.\r\nHeat vegetable oil in a pan over medium heat. Add tofu cubes and cook until golden brown on all sides. Remove from pan and set aside.\r\nIn the same pan, add sesame oil, garlic, and ginger. Cook for 1-2 minutes until fragrant.\r\nAdd spinach to the pan and cook until wilted.\r\nReturn tofu to the pan and add soy sauce. Stir well to combine.\r\nSeason with salt and pepper to taste.\r\nServe hot and enjoy!', '/generated-images/Tofu_and_Spinach_Stir-Fry_20240423.png', '2024-04-22 17:35:51', '2024-04-22 17:35:51'),
(40, 'Peas, Capsicum, and Kale Stir-Fry', '20 mins', 'Easy', '1 cup of peas, thawed if frozen\n1 red capsicum, sliced\n2 cups of kale, chopped\n2 cloves of garlic, minced\n1 tablespoon of olive oil\n1 tablespoon of soy sauce\n1 teaspoon of sesame oil\nSalt and pepper to taste\nOptional: red chili flakes for extra heat', 'Heat olive oil in a large pan over medium heat.\nAdd minced garlic and sauté for 1-2 minutes until fragrant.\nAdd sliced capsicum to the pan and cook for 3-4 minutes until slightly softened.\nAdd peas and chopped kale to the pan, stirring constantly for another 3-4 minutes until the kale is wilted.\nDrizzle soy sauce and sesame oil over the vegetables, then season with salt, pepper, and red chili flakes if desired.\nContinue to stir-fry for another 2-3 minutes until everything is well combined and heated through.\nRemove from heat and serve hot as a side dish or over cooked rice for a complete meal.', '/generated-images/Peas,_Capsicum,_and_Kale_Stir-Fry_20240506.png', '2024-05-06 03:55:18', '2024-05-06 03:55:18'),
(41, 'Tofu and Asparagus Stir Fry', '25 mins', 'Medium', '1 block of firm tofu, cubed\n1 bunch of asparagus, trimmed and cut into 2-inch pieces\n2 cloves of garlic, minced\n1 tablespoon of soy sauce\n1 tablespoon of sesame oil\n1 tablespoon of vegetable oil\nSalt and pepper to taste', 'Press the tofu to remove excess water by wrapping it in paper towels and placing a heavy object on top for 15 minutes.\nHeat vegetable oil in a large pan over medium heat.\nAdd the tofu cubes and cook until golden brown on all sides, about 5-7 minutes.\nRemove the tofu from the pan and set aside.\nIn the same pan, add sesame oil and garlic. Cook until fragrant, about 1 minute.\nAdd the asparagus pieces and sauté for 5-7 minutes until tender-crisp.\nReturn the tofu to the pan, drizzle soy sauce over the mixture, and toss to combine.\nSeason with salt and pepper to taste.\nServe hot and enjoy!', '/generated-images/Tofu_and_Asparagus_Stir_Fry_20240506.png', '2024-05-06 04:02:29', '2024-05-06 04:02:29'),
(42, 'Garlic Beetroot Kale Stir-Fry', '30 mins', 'Medium', '3 cloves of garlic, minced\n2 medium beetroot, peeled and thinly sliced\n4 cups of kale, chopped\n2 tbsp olive oil\nSalt and pepper to taste', 'Heat olive oil in a large pan over medium heat.\nAdd minced garlic and sauté for 1-2 minutes until fragrant.\nAdd sliced beetroot to the pan and cook for 10-15 minutes until slightly tender.\nAdd chopped kale to the pan and continue cooking for another 5-7 minutes until kale is wilted.\nSeason with salt and pepper to taste.\nServe hot and enjoy your delicious Garlic Beetroot Kale Stir-Fry!', '/generated-images/Garlic_Beetroot_Kale_Stir-Fry_20240506.png', '2024-05-06 04:31:07', '2024-05-06 04:31:07');

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
(1, 10),
(1, 17),
(1, 18),
(1, 23);