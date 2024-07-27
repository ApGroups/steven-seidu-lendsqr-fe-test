Steven Seidu - Lendsqr
Overview
This project is a React-based frontend application for Lendsqr, a platform designed to handle various loan management and user authentication features. The application is deployed on Netlify and utilizes serverless functions to handle backend operations.

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
Local Development
Prerequisites
Node.js (v18 or later)
npm (v9 or later)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/ApGroups/steven-seidu-lendsqr-fe-test.git
cd steven-seidu-lendsqr-fe-test
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Running the Express Server Locally
To run the Express server locally, use:

bash
Copy code
node src/server.js
The server will be available at http://localhost:8000.

Deployment on Netlify
Configuration
The project uses Netlify for deployment. The configuration is specified in the netlify.toml file:

toml
Copy code
[build]
  base = "/"                  # Base directory for the build
  command = "npm run build"   # Build command
  publish = "build"           # Directory to publish

[functions]
  directory = "."              # Directory for serverless functions (root directory)

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true

  # Redirect API requests to serverless functions
  from = "/api/*"
  to = "/.netlify/functions/server/:splat"
  status = 200
  force = true
Accessing Serverless Functions
After deployment, the serverless functions are available at:

Get all users: https://ayomikunsteven-seidu-lendsqr-fe-test.netlify.app/.netlify/functions/server/users
Get user by index: https://ayomikunsteven-seidu-lendsqr-fe-test.netlify.app/.netlify/functions/server/users/:index
Authenticate user: https://ayomikunsteven-seidu-lendsqr-fe-test.netlify.app/.netlify/functions/server/users
API Endpoints
GET /users
Retrieves a list of all users.

GET /users/:index
Retrieves a user by their index.

POST /users
Authenticates a user by email and password.

Environment Variables
No specific environment variables are required for this project. Ensure that any sensitive data (if added later) is handled securely.

Troubleshooting
CORS Issues: Ensure that the cors middleware is properly configured in server.js.
Deployment Errors: Check Netlify build logs for errors related to deployment or serverless functions.
Contributing
Feel free to open issues or submit pull requests to improve the project.

License
This project is licensed under the MIT License.
