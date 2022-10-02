# Online store

This project is using MERN stack (Mongoose react, Express, React, Node).<br/>
Purpose of this project is to exercise with mongoose and React 🧾.

# Instructions (with docker 🐋)

After cloning the repository first make sure your docker is running.<br/>
Go to ``/frontend/`` folder and open ``package.json``, make sure the proxy is set to

```
"proxy": "http://server:5000"
```

Next you can run the following command in the main directory:

```
docker-compose up
```

This command will build the application without 2 functionalities that are not mandatory for running the application. <br/>
If you want the full experience you need to set the following environment variables in the main directory

``SENDER_EMAIL = XXXX``
``SENDER_EMAIL_PASSWORD``
``OPENWEATHER_API_KEY = XXXX``
<br/>

For instructions on what they are used for scroll down to 'Environment variables instructions'

# Instructions (without docker)

> ⚠️ Note! You need to have yarn and redis installed on your local machine to be able to run the project.

<br/>

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
npm install
```

Next run the following command 

```
npm run installPackages
```

This command will concurrently install the necessary npm packages for both backend and frontend 😍.

## Proxy instructions

Go to ``/frontend/`` folder and open ``package.json``, make sure the proxy is set to

```
"proxy": "http://localhost:5000"
```

## Openweather API

If you want your 'cart' tab to detect your current location you can go and get yourself an ``API`` key from https://openweathermap.org/ . <br/>
But dont worry it is not required for running the app 😄.

## Database instructions

This projects uses MongoDB as database, so to run it you will need to use local MongoDB database or MongoDB atlas. <br/>
After setting up your database and receiving your ``MONGO_URI`` you can continue to the next section ⬇. 

## Environment variables instructions

You will need to create .env file in the main directory and in the frontend directory. <br/>
Follow .env.example variables as an example and fill them with your own data. <br/>


### .env File in the main directory 

``PORT = XXXX`` - is used for backend server port <br/>
``MONGO_URI = XXXXX`` - is your database connection key <br/>
``JWT_SECRET_KEY = XXXX`` - key for generating JWT token <br/>
``SALT_ROUNDS = X`` - salt round for encrypting password (number) <br/>
<br/>
``SENDER_EMAIL = XXXX`` - gmail email used for nodemailer (not required) <br/>
``SENDER_EMAIL_PASSWORD`` - gmail app password used for nodemailer (not required) <br/>
``OPENWEATHER_API_KEY = XXXX`` - openweather API key (not required) <br/><br/>


### .env File in the frontend directory

``SKIP_PREFLIGHT_CHECK = true`` - there was some version conflict and this fixes it 🤞.

## Setting up nodemailer

As you can see there are two environment variables that require some gmail and password, usually they are used for sending an email for password reset. But dont worry they are not required and the project will not crash without them (hopefully) 😄. <br/>

But if you wanna try this feature you are gonna set up your gmail with the following requirements. <br/>
You need to activate ``Forwarding and POP/IMAP`` and get yourself gmail application password [app password instructions](https://support.google.com/accounts/answer/185833?hl=en). <br/>

## Importing data to database

After you are done with the last steps you can go to the main directory and run the following command.

```
npm run data:import
```

This command will automatically import the data stored in ``/backend/data/`` to your database 🔥.

## Running the project

After everything is set, next time if you want to start the project all you need to do is run this command `npm run dev` 
from the main directory which will start server side and back side concurrently.

You can start them independently with the following commands.

```
npm run server - start server side
npm run client - start frontend side
```
