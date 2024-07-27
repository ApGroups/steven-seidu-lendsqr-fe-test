Steven Seidu - Lendsqr

Overview

This project is a React-based frontend application for Lendsqr, a platform designed for managing loans and user authentication. The application is deployed on Netlify and Vercel, which support static sites and serverless functions but do not support traditional backend servers. Therefore, backend operations are handled via serverless functions on these platforms, and the Express server is intended for local development only. Due to limitations with Netlify and Vercel, the db.json file cannot be read and hosted on these platforms and must be hosted locally for development purposes.


Project Structure
/src: Contains all source files for the React application.
/components: React components used throughout the application.
/styles: SCSS files for styling the components.
/netlify/functions: Contains serverless functions for handling backend operations.
server.js: Express server handling routes and interacting with db.json.
Technologies Used
React: JavaScript library for building user interfaces.
Express: Web application framework for Node.js used in serverless functions.
Serverless HTTP: Middleware to integrate Express with Netlify functions.
SCSS: Sassy CSS for advanced styling.
ApexCharts: Library for rendering charts.
Netlify: Platform for hosting the application and serverless functions.
Vercel: Platform for hosting the application and serverless functions.
Local Development
Prerequisites
Node.js (v18 or later)
npm (v9 or later)
Installation
Clone the repository:

bash
Copy code:
git clone https://github.com/ApGroups/steven-seidu-lendsqr-fe-test.git
cd steven-seidu-lendsqr-fe-test
Install dependencies:

bash
Copy code : 
npm install
Start the development server:

bash
Copy code : 
npm start
The application will be available at http://localhost:3000.

Running the Express Server Locally
To run the Express server locally for development purposes, use:

bash
Copy code
node src/server.js
The server will be available at http://localhost:8000.


Deployment on Vercel
Configuration
The project can also be deployed on Vercel. Ensure that the vercel.json file is configured correctly:


Accessing Serverless Functions
After deployment, the serverless functions are available at:

Get all users: https://steven-seidu-lendsqr-fe-test.vercel.app/api/users
Get user by index: https://steven-seidu-lendsqr-fe-test.vercel.app/api/users/:index
Authenticate user: https://steven-seidu-lendsqr-fe-test.vercel.app/api/users
API Endpoints
GET /users: Retrieves a list of all users.
GET /users/
: Retrieves a user by their index.
POST /users: Authenticates a user by email and password.
Environment Variables
No specific environment variables are required for this project. Ensure that any sensitive data (if added later) is handled securely.



Deployment on Netlify
Configuration
The project uses Netlify for deployment. The configuration is specified in the netlify.toml file:


Accessing Serverless Functions
After deployment, the serverless functions are available at:

Get all users: https://ayomikunsteven-seidu-lendsqr-fe-test.netlify.app/.netlify/functions/server/users
Get user by index: https://ayomikunsteven-seidu-lendsqr-fe-test.netlify.app/.netlify/functions/server/users/:index
Authenticate user: https://ayomikunsteven-seidu-lendsqr-fe-test.netlify.app/.netlify/functions/server/users
Troubleshooting
CORS Issues: Ensure that the CORS middleware is properly configured in server.js.
Deployment Errors: Check Netlify or Vercel build logs for errors related to deployment or serverless functions.
Contributing
Feel free to open issues or submit pull requests to improve the project.

License
This project is licensed under the MIT License.
