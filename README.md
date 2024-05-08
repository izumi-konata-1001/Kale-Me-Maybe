<img width="1465" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/01ea019f-4ab0-4179-b9ac-e0e63b3b334b"># Kale Me Maybe 🥬
<img width="500" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/75cfa3d8-71d3-4eae-8e4b-07b1643b6201">


## Introduction
Welcome to "Kale Me Maybe" – an innovative AI-driven recipe generator tailored specifically for vegetarians. This platform revolutionizes home cooking by simplifying the process of meal preparation. With just a few clicks, users can input the ingredients they have available, and "Kale Me Maybe" instantly crafts a personalized recipe suited to their tastes and available resources. Whether you're a seasoned vegetarian or just exploring meatless options, "Kale Me Maybe" ensures that your meals are not only nutritious but also delicious and easy to prepare.

The live "Kale Me Maybe" application is accessible via this link:

[**Kale Me Maybe - Live Application**](http://kale-me-maybe-frontend.s3-website-ap-southeast-2.amazonaws.com/)

## Table of Contents
- [Key Features](#key-features)
- [Installation](#installation)
- [Deployment](#deployment)
- [Version Control](#version-control)
- [Project Management](#project-management)
- [Testing](#testing)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)

## Key Features
<img width="569" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/37800fa4-4c90-4be9-ad05-6949ecadd4cf">

* **Personalized Recipe Generator**: Select the ingredients you have, and our AI will craft a recipe tailored just for you.
* **Recipe Browsing**: Browse recipes you've previously viewed, ensuring you never lose track of a favoured dish.
* **Account and Collections**: Create your own account to organize recipes into customizable collections categorized by meal type, ingredients, or any other preference.
* **Discover Recipes**: Explore and discover recipes shared by other users across the platform.
* **Recipe Filtering**: Filter recipes based on their cooking difficulty and duration to find the perfect match for your time and skills.
* **Dark Mode**: Allow users to switch to dark mode by clicking on a button.
* **Responsive Design**: Adapt to various screen sizes for seamless browsing across devices.

## Installation
Steps to install the project locally:

1. **Clone the Repository:**
   - Ensure you have Git installed on your system.
   - Open a terminal and run the following command to clone the repository:
   ```
   $ git clone https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins
   ```
   
2. **Set Up the Frontend:**
   - Navigate to the frontend directory, install the dependencies, and start the development server:
   ```
   $ cd KaleMeMaybe/frontend/kalememaybe-frontend
   $ npm install
   $ npm run dev
   ```

3. **Set Up the MySQL Database:**
   - **Find the SQL Script:** It's located at `KaleMeMaybe/backend/sql/project_database_mysql.sql`.
   - **Run the SQL Script:**
     - Open a terminal or MySQL Workbench to connect to your database.
     - Execute the script to create and populate the database tables.
   - **Edit `.env` Configurations:**
     - In `KaleMeMaybe/backend/.env`, update the following configurations with your MySQL database settings:
     ```env
     # MySQL database
     DB_HOST= YOUR_HOST
     DB_PORT=3306
     DB_USER= YOUR_USERNAME
     DB_PASS= YOUR_PASSWORD
     DB_NAME= YOUR_DATABASE_NAME
     ```
   
4. **Set Up and Run the Backend:**
   - Install backend dependencies and start the server:
   ```
   $ cd KaleMeMaybe/backend
   $ npm install
   $ npm start
   ```
   - If you see `App listening on port 3000! Connected to MySQL database.` after running the app, you're good to go!

## Deployment

"Kale Me Maybe" is deployed across several AWS services, working together to provide a scalable, secure, and responsive experience:

<img width="637" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/9f942935-fcf2-48aa-97c5-66e267041f04">

1. **Frontend: AWS S3 and CloudFront**  
   - **AWS S3:** Hosts static frontend files, including HTML, CSS, and JavaScript.
   - **AWS CloudFront:** Serves as a global content delivery network (CDN) in front of S3, caching static assets at edge locations to provide faster content delivery to users.

2. **Backend and API: AWS EC2 and Elastic Beanstalk**  
   - **AWS EC2:** Hosts backend services and APIs to handle user requests.
   - **Elastic Beanstalk:** Manages EC2 instances, orchestrating scaling, load balancing, and deployment for efficient backend management.

3. **Database: AWS RDS**  
   - **AWS RDS (MySQL):** Provides a managed MySQL database, storing user data, recipes, and other dynamic content.

4. **Data Flow Overview:**  
   - Users access the application through CloudFront, which fetches static content from S3.
   - Dynamic requests (e.g., personalized recipes) are handled by the backend APIs hosted on EC2.
   - The backend interacts with the RDS database to retrieve or update user data and returns the results via the API.
   - Elastic Beanstalk ensures the backend services remain scalable, stable, and up-to-date.



## Version Control
<img width="1455" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/f8c9a2cb-e145-4919-8189-854b9624389c">

- **Repository**: [Dapper Dolphins - Github](https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins)
- **Branch Naming Guidelines**: 
	- main: always reflects a production-ready state
	- feature branch: username-filename-committype-date (one feature branch should at most live for one day), eg. 'tina-recipedetail-addresponsive-0430'
- **Commit Message Guidelines**:
	- Start with a short, descriptive summary in the imperative mood, e.g., "Add", "Fix".
Use a blank line separating the summary from any detailed explanation if necessary.
	- Reference issue IDs if applicable, e.g., "Fix issue 19".
	- Example: git commit -m "Implement user profile caching\n\nThis update adds caching to user profile data to improve loading times. Addresses performance concerns raised in issue #123."

## Project Management
<img width="500" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/779b6aed-7634-4e48-8f5d-2501f08f46c0">
<img width="500" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/45d207d0-be00-45b9-abc8-017c408305b5">

- **Tools**: Jira, Confluence, Github Issues
- **Workflow**: Our project follows the Agile methodology, which supports iterative development and frequent reassessment of plans. This flexible approach allows us to adapt to changes quickly and efficiently.
- **Issue Tracking**: Jira is employed for managing day-to-day development tasks within sprints, allowing for detailed task breakdowns and progress tracking.
GitHub Issues is used specifically for identifying and tracking bugs and defects found during testing sessions or reported by users.
- **Milestones**: We use Jira Epic issue and Sprints to mark the milestones.
- **Meeting Minutes**: Detailed records of all team meetings are maintained in Confluence, ensuring that decisions and discussions are well-documented for future reference and for team members who could not attend. Access our meeting notes [here](https://aucklanduni-team-mxaz1h0vswrm.atlassian.net/wiki/spaces/KMM/pages/66009/Meeting+notes+in+space).

## Testing
- **Testing Frameworks**  
  The backend code is tested using the Jest framework.

- **How to Run Tests**  
  To execute the tests for the backend:
  ```
  $ cd KaleMeMaybe/backend/tests
  $ npm test
  ```
  This command will run all the tests using Jest and provide a summary of the results.

- **Test Coverage**
  <img width="1226" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins/assets/89385715/5071f107-c981-4f90-9968-40beeadafef3">

  - The backend code currently achieves 70.19% coverage of all statements, 70.58% of functions, and 70.03% of lines.
  - Coverage is broken down as follows:
    - **Overall Backend Directory**: 92.3% of statements covered.
    - **Data**: 71.78% of statements covered.
    - **Routes**: 67.33% of statements covered.

## Contributors
* [Elsa Jiang ](https://github.com/XJIA357) (xjia357)
* [Lyvia Huang](https://github.com/kesesek) (lhua518)
* [Tina Wang](https://github.com/wl0218) (lwan626)
* [Jennie Zhu](https://github.com/izumi-konata-1001) (yzhu791)
* [Yutian Sun](https://github.com/Yutian1024-nz) (ysun461)
* [Zishuai Liu](https://github.com/zliu702) (zliu702)


## Acknowledgments

- **GPT 3.5 & DALL·E 2 API**: Special thanks to the GPT API for enabling advanced natural language processing capabilities in our application. More information can be found at [OpenAI's official documentation](https://openai.com/api/).
- **Passport.js**: We appreciate Passport.js for providing authentication middleware that made it possible to implement third party login features easily. Check out their [official website](http://www.passportjs.org/) for more details.
Acknowledging AWS, particularly the use of its free tier products like Amplify and EC2, is also important. This not only gives credit to AWS services that facilitate the hosting and scaling of your application but also informs others about the infrastructure backbone supporting your project. Here's how you could acknowledge AWS and its free tier products in your README:
- **Tailwind CSS**: Our project makes extensive use of Tailwind CSS for styling. This utility-first CSS framework significantly speeds up the development process and allows us to maintain a clean and consistent design across the website. For more information about Tailwind CSS, visit their [official website](https://tailwindcss.com/).
- **React Icons**: We utilize React Icons to incorporate scalable vector icons into our application. React Icons provides easy access to a wide range of icons from various icon libraries, enhancing the UI without sacrificing performance. More details can be found on their [GitHub repository](https://github.com/react-icons/react-icons).
- **AWS Free Tier Products**: This project is hosted and run using several AWS Free Tier products, including AWS S3 for the frontend and AWS EC2 for our backend services. These AWS services provide scalable solutions that help us manage our application's deployment and operational needs efficiently. Learn more about AWS Free Tier [here](https://aws.amazon.com/free/).

- Additional thanks to all developers and contributors of the open-source libraries and tools that have made this project possible.
