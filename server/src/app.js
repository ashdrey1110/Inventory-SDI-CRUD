const express = require("express");
const app = express();
const PORT = 8081;
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../knexfile.js")["development"]);
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(
    `Server (knex and express app) running successfully at http://localhost:${PORT}`
  );
});

/*

READ - GET

*/

app.get("/", (req, res) => {
  res.send("Server up and running!");
});

app.get("/users", (req, res) => {
  knex("users")
    .select("*")
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(404).json({
        message: "User data not available",
      })
    );
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  knex("users")
    .select("*")
    .where("id", id)
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(404).json({
        message: `User data with ID ${id} not available`,
      })
    );
});

app.get("/items", (req, res) => {
  knex("items")
    .select("*")
    .then((items) => res.status(200).json(items))
    .catch((err) =>
      res.status(404).json({
        message: "Item data not available",
      })
    );
});

app.get("/items/:id", (req, res) => {
  let id = req.params.id;
  knex("items")
    .select("*")
    .where("id", id)
    .then((items) => res.status(200).json(items))
    .catch((err) =>
      res.status(404).json({
        message: `Item data with ID ${id} not available`,
      })
    );
});

app.get("/items/byuser/:userId", (req, res) => {
  let userId = req.params.userId;
  knex("items")
    .select("*")
    .where("userId", userId)
    .then((items) => res.status(200).json(items))
    .catch((err) =>
      res.status(404).json({
        message: `Item data with user ID ${userId} not available`,
      })
    );
});

//do a join to get the name with ea item so u can search by item or name
app.get("/items/search/:searchterm", (req, res) => {
  let searchTerm = req.params.searchterm;
  knex("items")
    .join("users", "userId", "=", "users.id")
    .select("items.*", "users.firstName", "users.lastName", "users.username")
    .where(function () {
      this.where("itemName", "ilike", `%${searchTerm}%`)
        .orWhere("description", "ilike", `%${searchTerm}%`)
        .orWhere("users.firstName", "ilike", `%${searchTerm}%`)
        .orWhere("users.lastName", "ilike", `%${searchTerm}%`)
        .orWhere("users.username", "ilike", `%${searchTerm}%`);
    })
    .then((items) => res.status(200).json(items))
    .catch((err) =>
      res.status(404).json({
        message: `Item including keyword ${searchTerm} not found`,
      })
    );
});

app.get("/fullitems", (req, res) => {
  knex("items")
    .join("users", "userId", "=", "users.id")
    .select("items.*", "users.firstName", "users.lastName", "users.username")
    .then((items) => res.status(200).json(items))
    .catch((err) =>
      res.status(404).json({
        message: "Item data not available",
      })
    );
});

/*

CREATE - POST

*/
app.post("/users", (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  bcrypt.hash(password, 10).then((hashedPassword) => {
    knex("users")
      .insert({ firstName, lastName, username, password: hashedPassword })
      .returning("id")
      .then(() => res.status(201).json({ message: `User added successfully` }))
      .catch((err) =>
        res.status(500).json({
          message: "User could not be added",
        })
      );
  });
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  knex("users")
    .where({ username })
    .first()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            return res.status(200).json({ message: "Login successful!" });
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "User could not be logged in",
      })
    );
});

app.post("/items", (req, res) => {
  const { userId, itemName, description, quantity } = req.body;
  knex("items")
    .insert({ userId, itemName, description, quantity })
    .returning("id")
    .then(() => res.status(201).json({ message: `Item added successfully` }))
    .catch((err) =>
      res.status(500).json({
        message: "Item could not be added",
      })
    );
});

/*

UPDATE - PATCH

*/
// app.patch('/users/:id', (req, res) => {
//     let id = req.params.id;
//     const { firstName, lastName, username, password } = req.body;
//     knex('users')
//         .where("id", id)
//         .update({ firstName, lastName, username, password })
//         .then((count) => {
//             if(count >0){
//                 res.status(200).json({message: `User info updated successfully`});
//             }
//             else{
//                 res.status(404).json({error: "User not found"});
//             }
//         })
//         .catch(err =>
//             res.status(500).json({
//                 message: 'User could not be updated'
//             })
//         );
// })

app.patch("/items/:id", (req, res) => {
  let id = req.params.id;
  const { userId, itemName, description, quantity } = req.body;
  knex("items")
    .where("id", id)
    .update({ userId, itemName, description, quantity })
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Item info updated successfully` });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "Item could not be updated",
      })
    );
});

/*

DELETE - DELETE

*/

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  knex("items")
    .where({ id })
    .del()
    .then(() => {
      res.status(201).json({
        message: "Item removed successfully!",
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Item could not be removed",
      })
    );
});
