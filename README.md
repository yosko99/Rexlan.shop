# Online store (under development, again)

This project is for exercise purpose 🧾.
List of used languages, technologies and frameworks in the project.

- Javascript/Typescript
- React
- React Query
- Bootstrap/React boostrap
- Prisma IO/postgresql
- Nest JS
- Docker

> The reason there are three back end folders in this project, is so i can practice in other frameworks/languages. Currently the project is using `backend-nest` folder.

# Instructions (with docker 🐋)

First build the the project with:

```
docker-compose build 
```

After the build is done, run the project:

```
docker-compose up 
```

This command will build the application in production without 3 functionalities that are not mandatory for running the application. <br/>
If you want the full experience you need to set the following environment variables.

`SENDER_EMAIL`
`SENDER_EMAIL_PASSWORD`
`OPENWEATHER_API_KEY`
`REACT_APP_PAYPAL_CLIENT_ID`
<br/>

For instructions on what they are used for go [here](#environment-variables-instructions)

# Instructions (without docker)

<br/>

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
npm install
```

Next run the following command

```
npm run install-packages
```

This command will concurrently install the necessary npm packages for both backend and frontend.

## Used API's

### Openweather API

If you want your 'cart' tab to detect your current location you can go and get yourself an `API` key from https://openweathermap.org/ . <br/>
The key is not required for running the app.

### PayPayl API

This project uses PayPal as payment, so to enable this functionality you need to get an `API` key from https://developer.paypal.com/api/rest/ . <br/>
Not providing this key in the environment variables, will not implement the functionality for checkout.

## Environment variables instructions

You will need to create .env file in the `backend-nest` directory and in the `frontend` directory. <br/>
Follow .env.example variables as an example and fill them with your own data. <br/>

### .env File in the backend-nest directory

`PORT=XXXX` - is used for backend server port <br/>
`DATABASE_URL=XXXXX` - is your database connection key <br/>
`JWT_SECRET_KEY=XXXX` - key for generating JWT token <br/>
`SALT_ROUNDS=X` - salt round for encrypting password (number) <br/>
<br/>
`SENDER_EMAIL=XXXX` - gmail email used for nodemailer (not required) <br/>
`SENDER_EMAIL_PASSWORD=XXXX` - gmail app password used for nodemailer (not required) <br/>
`OPENWEATHER_API_KEY=XXXX` - openweather API key (not required) <br/><br/>

### .env File in the frontend directory

`SKIP_PREFLIGHT_CHECK=true` - there was some version conflict and this fixes it 🤞.<br/>
`REACT_APP_PAYPAL_CLIENT_ID=XXXX` PayPal API key for checkout (not required).

## Setting up nodemailer

As you can see there are two environment variables that require some gmail and password, usually they are used for sending an email for password reset. But dont worry they are not required and the project will not crash without them (hopefully) 😄. <br/>

But if you wanna try this feature you are gonna set up your gmail with the following requirements. <br/>
You need to activate `Forwarding and POP/IMAP` and get yourself gmail application password [app password instructions](https://support.google.com/accounts/answer/185833?hl=en). <br/>

## Importing dummy data to database

First you need to have set `DATABASE_URL=XXXXX` in `backend-nest/.env` and to have dependencies installed before running the following commands.

```
npm run build:server
```

After that is finished run the following

```
npm run seed:refresh
```

This command will automatically import the data stored in `/backend-nest/data/` to your database 🔥.

## Running the project (without docker)

### Running in development 

After everything is set, next time if you want to start the project all you need to do is run this command `npm run dev`
from the main directory which will start server side and back side concurrently.

You can start them independently with the following commands.

```
npm run server - start server side
npm run client - start frontend side
```

### Running in production

First you need to build the projects in production with the following command from the main directory.

```
npm run build:all
```

After everything is finished you can run the project in production build with the following command in the main directory.

```
npm run start
```

# Routes

All the routes are documented with the swagger API. You can check it under `localhost:5000/api`

# Database schema

![Screenshot from 2023-08-31 13-45-37](https://github.com/yosko99/Rexlan.shop/assets/80975936/02856bff-d61b-47bf-9b2a-0be8ce296cea)



