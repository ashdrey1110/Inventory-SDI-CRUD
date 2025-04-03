# Inventory Supra Coders SDI CRUD Application

Author: Ashley Reynolds

## How to Run

### Setting up your own database

Be aware that a PostgreSQL database is needed to run this app. Be sure to create a database before you start the server. If you don't already have a Postgres Container and Database set up, then run the following in a terminal. Be aware of the use of Docker:

```sh
docker pull postgres

mkdir -p $HOME/docker/volumes/postgres

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker ps -a

docker exec -it <container_id> bash

psql -U postgres

CREATE DATABASE your_database;
```

### Clone the repository

```sh
  git clone https://github.com/ashdrey1110/Inventory-SDI-CRUD.git
```

### Navigate to the project directory

```sh
  cd Inventory-SDI-CRUD
```

### Open up project in VS Code and cd into server

```sh
  cd server
```

### Install

```sh
  npm install
```

### Check the knexfile.js and adjust as needed. (You will likely need to change the database name to whatever you created before). Here is what it should most likely look like:

```
development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      password: <your-password>,
      user: 'postgres',
      port: 5432,
      database: 'inventory'
    }
  }
```

### Go ahead and migrate and seed data to get your database initialized

```sh
  npx knex migrate:latest
  npx knex seed:run
```

### Save your files and run your server

```sh
  npm start
```

### Now in another terminal jump into your client directory

```sh
  cd client
```

### Install

```sh
  npm install
```

### And then just get it started!

```sh
  npm run dev
```

If you run into issues with npm run dev, try npm install again. However, if you get the message that your app is running on http://localhost:5173 then you're good to go!

## Stories

- As an inventory manager I want to be able to create an account so that I can track my inventory.

- As an inventory manager I want to be able to log into my account so that I can see my inventory of items.

- After logging in, the inventory manager should be redirected to their inventory of items.
- As an inventory manager I want to be able to create a new item so that I can share my item details with the world.

- After the item is created, the inventory manager should be redirected to their inventory of items.
- An item displays name, description, and quantity.
  -As an inventory manager I want to be able to see a my entire inventory of items.

- The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.
- As an inventory manager I want to be able to see any individual item I have added.

- The full item information should be displayed.
- As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.

- When the user toggles edit mode, the page remains the same and the fields become editable.
- As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.

- When the user deletes the item they should be redirected to their inventory of items.
- As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.

- Unauthenticated users should be able to view all items, and any single item.
- The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.
- As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.

- Unauthenticated users should be able to view all items, and any single item.
- As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.

- Unauthenticated users should be able to view all items, and any single item.

## ERD

![ERD](/client/public/erd-crud-app.jpg)
