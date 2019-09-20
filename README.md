# node-rest-api-example
This project is a REST API in Node.js

In order to run the project on your machine:

1)Download the zip.

2)Extract it.

3)Enter the extracted directory in terminal: $cd node-rest-api-example

4)Copy .env_test file content and create .env file with that content (OPTIONAL): $cp .env_test .env

Example Content:

LANGUAGE="en"
DB_URL="mongodb://localhost/test_db"

NOTE: You do not have to create .env file. The only reason can be to override the current database url and language configuration.

5)Install necessary packages: $npm install

6)Before starting the server, you need to install PM2 process manager globally: $npm install pm2 -g

7)Start the server: $npm start

8)Kill the server: $pm2 delete node_rest_api

9)Run all the tests: $npm test

When the server is running, you can see the API documentation and try it from browser by Swagger UI:
http://localhost:3000/api/swagger/api-docs/
