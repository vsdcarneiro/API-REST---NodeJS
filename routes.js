import express from "express";
import fileJson from "./data.json" assert { type: "json" };

let data = fileJson;
const app = express.Router();

app.post("/users", (req, res) => {
  const user = req.body;

  if (user) {
    data.users.push(user);
    res.status(201).json(user);
  } else {
    res.send("Missing request body");
  }
});

app.get("/users", (req, res) => {
  res.json(data);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = data.users.find((user) => user.id === parseInt(id));

  if (user) {
    res.json(user);
  } else {
    res.send("User not found");
  }
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = data.users.find((user) => user.id === parseInt(id));

  if (user) {
    const { username } = req.body;

    user.username = username;
    res.json(user);
  } else {
    res.send("User not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  if (data.users.some((user) => user.id === parseInt(id))) {
    const user = data.users.find((user) => user.id === parseInt(id));
    user.isDeleted = true;

    data = { users: data.users.filter((user) => user.id !== parseInt(id)) };
    res.json(user);
  } else {
    res.send("User not found");
  }
});

export default app;
