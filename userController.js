import data from "./data.json" assert { type: "json" };

const getUsers = (req, res) => {
  res.json(data);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  if (id) {
    const user = data.users.find((user) => user.id === id);

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
};

const createUser = (req, res) => {
  const user = req.body;

  if (user && Object.keys(user).length > 0) {
    data.users.push(user);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { body } = req;

  if (id && Object.keys(body).length > 0) {
    const userIndex = data.users.findIndex((user) => user.id === id);
    const user = data.users[userIndex];

    if (user) {
      data.users[userIndex] = { ...user, ...body };
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  if (id) {
    const userIndex = data.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      data.users.splice(userIndex, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
