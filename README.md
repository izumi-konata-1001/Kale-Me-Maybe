# Kale Me Maybe 🥬


## Introduction
Welcome to "Kale Me Maybe" – an innovative AI-driven recipe generator tailored specifically for vegetarians. This platform revolutionizes home cooking by simplifying the process of meal preparation. With just a few clicks, users can input the ingredients they have available, and "Kale Me Maybe" instantly crafts a personalized recipe suited to their tastes and available resources. Whether you're a seasoned vegetarian or just exploring meatless options, "Kale Me Maybe" ensures that your meals are not only nutritious but also delicious and easy to prepare.

## Table of Contents
- [Key Features](#key-features)
- [Installation](#installation)
- [Version Control](#version-control)
- [Project Management](#project-management)
- [Deployment](#deployment)
- [Testing](#testing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Key Features
* **Personalized Recipe Generator**: Select the ingredients you have, and our AI will craft a recipe tailored just for you.
* **Recipe Browsing**: Browse recipes you've previously viewed, ensuring you never lose track of a favored dish.
* **Account and Collections**: Create your own account to organize recipes into customizable collections categorized by meal type, ingredients, or any other preference.
* **Discover Recipes**: Explore and discover recipes shared by other users across the platform.
* **Recipe Filtering**: Filter recipes based on their cooking difficulty and duration to find the perfect match for your time and skills.
* **Dark Mode**: Allow users to switch to dark mode by clicking on a button.

## Installation
Steps to install the project locally:

1. Ensure you have Git installed on your system. Open a terminal and run the following command to clone the repository:

   ```
   ~ git clone https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins
   ```
2. Navigate to the frontend directory, install the dependencies, and start the development server:

   ```
cd project-group-dapper-dolphins/KaleMeMaybe/frontend/kalememaybe-frontend
npm install
npm run dev

   ```
3. Install backend dependencies:
   
   ```
cd project-group-dapper-dolphins/KaleMeMaybe/backend
npm install
npm start
   ```

## Version Control
- **Repository**: [Dapper Dolphins - Github](https://github.com/UOA-CS732-SE750-Students-2024/project-group-dapper-dolphins)
- **Branch Naming Guidelines**: 
	- main: always reflects a production-ready state
	- feature branch: username-filename-committype-date (one feature branch should at most live for one day), eg. 'tina-recipedetail-addresponsive-0430'
- **Commit Message Guidelines**:
	- Start with a short, descriptive summary in the imperative mood, e.g., "Add", "Fix".
Use a blank line separating the summary from any detailed explanation if necessary.
	- Reference issue IDs if applicable, e.g., "Fix issue 19".
	- Example: git commit -m "Implement user profile caching\n\nThis update adds caching to user profile data to improve loading times. Addresses performance concerns raised in issue #123."


## Testing
- **Testing Frameworks**: Jest
- **How to Run Tests**:

  ```
  npm test
  ```
- **Test Coverage**: Describe the levels of test coverage expected for submissions.
- **API Testing with Postman**: Outline any testing best practices or conventions.



## Deployment
This section outlines the steps taken to deploy the "Kale Me Maybe" application across various AWS services, including AWS Amplify for the frontend and database, and AWS EC2 along with Elastic Beanstalk for the backend and APIs.
#### Frontend Deployment on AWS S3
#### Database Deployment on AWS Amplify
#### Backend and API Deployment on AWS Elastic Beanstalk 

## Project Management
- **Tools**: Jira, Confluence, Github Issues
- **Workflow**: Our project follows the Agile methodology, which supports iterative development and frequent reassessment of plans. This flexible approach allows us to adapt to changes quickly and efficiently.
- **Issue Tracking**: Jira is employed for managing day-to-day development tasks within sprints, allowing for detailed task breakdowns and progress tracking.
GitHub Issues is used specifically for identifying and tracking bugs and defects found during testing sessions or reported by users.
- **Milestones**: We use Jira Epic issue and Sprints to mark the milestones.
- **Meeting Minutes**: Detailed records of all team meetings are maintained in Confluence, ensuring that decisions and discussions are well-documented for future reference and for team members who could not attend. Access our meeting notes [here](https://aucklanduni-team-mxaz1h0vswrm.atlassian.net/wiki/spaces/KMM/pages/66009/Meeting+notes+in+space).

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
- **AWS Free Tier Products**: This project is hosted and run using several AWS Free Tier products, including AWS Amplify for the frontend and AWS EC2 for our backend services. These AWS services provide scalable solutions that help us manage our application's deployment and operational needs efficiently. Learn more about AWS Free Tier [here](https://aws.amazon.com/free/).

- Additional thanks to all developers and contributors of the open-source libraries and tools that have made this project possible.
