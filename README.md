# Online store

This project is using MERN stack (Mongoose react, Express, React, Node).<br/>
This project is for exercise purpose 🧾.

List of used languages, technologies and frameworks in the project.

- Javascript/Typescript
- React
- React Query
- Bootstrap/React boostrap
- mongoDB/mongoose
- Nest JS/express
- Docker
- Redis

> The reason there are two back end folders in this project, is because the back end functionality got integrated from express to Nest JS.

# Instructions (with docker 🐋)

After cloning the repository first make sure your docker is running.<br/><br/>

> ⚠️ Because of configuration issues, you need to populate the `MONGO_URI` variable under `environment` server section in the `docker-compose.yml` file

Next you can run the following command in the main directory:

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

## Used API's

### Openweather API

If you want your 'cart' tab to detect your current location you can go and get yourself an `API` key from https://openweathermap.org/ . <br/>
But dont worry it is not required for running the app 😄.

### PayPayl API

This project uses PayPal as payment, so to enable this functionality you need to get an `API` key from https://developer.paypal.com/api/rest/ . <br/>
Not providing this key in the environment variables, will not implement the functionality for checkout.

## Database instructions

This projects uses MongoDB as database, so to run it you will need to use local MongoDB database or MongoDB atlas. <br/>
After setting up your database and receiving your `MONGO_URI` you can continue to the next section ⬇.

## Environment variables instructions

You will need to create .env file in the `backend-nest` directory and in the `frontend` directory. <br/>
Follow .env.example variables as an example and fill them with your own data. <br/>

### .env File in the backend-nest directory

`PORT=XXXX` - is used for backend server port <br/>
`MONGO_URI=XXXXX` - is your database connection key <br/>
`JWT_SECRET_KEY=XXXX` - key for generating JWT token <br/>
`SALT_ROUNDS=X` - salt round for encrypting password (number) <br/>
<br/>
`SENDER_EMAIL=XXXX` - gmail email used for nodemailer (not required) <br/>
`SENDER_EMAIL_PASSWORD=XXXX` - gmail app password used for nodemailer (not required) <br/>
`OPENWEATHER_API_KEY=XXXX` - openweather API key (not required) <br/><br/>

### .env File in the frontend directory

`SKIP_PREFLIGHT_CHECK=true` - there was some version conflict and this fixes it 🤞.<br/>
`REACT_APP_PAYPAL_CLIENT_ID=XXXX` PayPal API key required for checkout.

## Setting up nodemailer

As you can see there are two environment variables that require some gmail and password, usually they are used for sending an email for password reset. But dont worry they are not required and the project will not crash without them (hopefully) 😄. <br/>

But if you wanna try this feature you are gonna set up your gmail with the following requirements. <br/>
You need to activate `Forwarding and POP/IMAP` and get yourself gmail application password [app password instructions](https://support.google.com/accounts/answer/185833?hl=en). <br/>

## Importing data to database

After you are done with the last steps you can go to the main directory and run the following command.

```
npm run build:server
```

After that is finished run the following

```
npm run seed:refresh
```

This command will automatically import the data stored in `/backend-nest/data/` to your database 🔥.

## Running the project

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

For backend currently i have the following CRUD operations.

![Order and product routes](https://user-images.githubusercontent.com/80975936/199237831-27f7c572-a6e6-47ef-bd3d-c2c03a2fdb2e.png)

![User Routes](https://user-images.githubusercontent.com/80975936/199237902-42e6762b-50ed-4b75-a277-d2fdf21e7cf5.png)

![Cart, category, openweather and delivery routes](https://user-images.githubusercontent.com/80975936/199237755-da3ad07b-d7c4-412b-86ea-c19e2cdb50b8.png)

## Order routes

```
GET - /api/orders/:cartID                 # Get order information with provided cartID
GET - /api/orders/user/:cartID            # Get all user orders with provided cartID linked with user
DELETE - /api/orders/:cartID              # Deletes a order with provided cartID
POST - /api/odrers/                       # Create a new order
```

## Product routes

```
GET - /api/products/                      # Get all products
GET - /api/products/:id                   # Get single product with provided productID
GET - /api/products/category/:category    # Recieve products in specific category with provided category name
GET - /api/products/sort/:attribute       # Recieve products sorted by provided product attribute
GET - /api/products/regex/:pattern        # Recieve products filtered by provided string
PUT - /api/products/:id                   # Update a product with provided productID
POST - /api/products/                     # Create a new product
DELETE - /api/products/                   # Delete a product with provided productID
```

## User routes

```
GET - /api/users/                         # Get all users
GET - /api/users/user/:_id                # Get user info with provided userID
GET - /api/users/current                  # Get current user info (JWT token required)
PUT - /api/users/user/:_id                # Update user info with provided userID
PUT - /api/users/current                  # Update current user info (JWT token required)
PUT - /api/users/current/change-password  # Update current user password (JWT token required)
POST - /api/users/                        # Create a new user
POST - /api/users/password-reset          # Reset user password
POST - /api/users/login                   # Login a user
DELETE - /api/users/                      # Delete a user with provided userID

```

## Cart routes

```
GET - /api/carts/                         # Get cart info with provided cartID
GET - /api/carts/products/:cartID         # Get cart products with provided cartID
PUT - /api/carts/products                 # Delete or decrement product quantity from cart
POST - /api/carts/                        # Add product to a cart
DELETE - /api/carts/:cartiD               # Delete a cart with provide cartID
```

## Category routes

```
GET - /api/categories/                    # Get all categories
GET - /api/categories/                    # Get category info with provided categoryID
PUT - /api/categories/                    # Update category info with provided categoryID
POST - /api/categories/                   # Create a new category
DELETE - /api/categories/                 # Delete a category with provided categoryID
```

## Openweather routes

```
GET - /api/openweather/city               # Get name of city by providing lon and lat coordinates
```

## Delivery routes

```
GET - /api/deliveries/                   # Get all deliveries
```
