# Online store

This project is using MERN stack (Mongoose react, Express, React, Node).<br/>
Purpose of this project is to exercise with mongoose and React 🧾.

# Instructions

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
yarn install
```

Next run the following command 

```
npm run installPackages
```

This command will concurrently install the necessary npm packages for both backend and frontend 😍.

## Database instructions

This projects uses MongoDB as database, so to run it you will need to use local MongoDB database or MongoDB atlas. <br/>
After setting up your database and receiving your MONGO_URI you can continue to the next section ⬇. 

## Environment variables instructions

You will need to create .env file in the main directory and in the frontend directory. <br/>
Follow .env.example variables as an example and fill them with your own data. <br/>

### .env File in the main directory 

``PORT = XXXX`` - is used for backend server port <br/>
``MONGO_URI = XXXXX`` - is your database connection key <br/>
``JWT_SECRET_KEY = XXXX`` - key for generating JWT token <br/>
``SALT_ROUNDS = X`` - salt round for encrypting password (number) <br/>

### .env File in the frontend directory

``SKIP_PREFLIGHT_CHECK = true`` - there was some version conflict and this fixes it 🤞

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
