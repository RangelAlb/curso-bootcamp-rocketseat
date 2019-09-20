const express = require("express");

const server = express();
server.use(express.json());

//Parametros:
//Query params: ?teste=1
// server.get("/teste", (req, res) => {
//   const nome = req.query.nome;

//   return res.json({ message: `Hello ${nome}` });
// });
//-----------------------------------------------------------------------------
//Request body: { "name": "Rangel" }

//Route params: /users/1

// CRUD - Create, Read, Update, Delete

//GET
const users = ["Diego", "Rangel", "Victor"];

//Middleware
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url} `);

  next();

  console.timeEnd("Request");
});

function checkUsersExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: `User name is require` });
  }

  return next();
}

function checkUsersInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: `User does not exists` });
  }
  req.user = user;

  return next();
}
// -------- Fim do Middleware

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUsersInArray, (req, res) => {
  return res.json(req.user);
});

//POST

server.post("/users", checkUsersExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//PUT

server.put("/users/:index", checkUsersExists, checkUsersInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});

// DELETE

server.delete("/users/:index", checkUsersInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
