import jsonFile from "./data.json" assert { type: "json" };

let data = jsonFile;

const getUsers = (req, res) => {
  res.json(data);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = data.users.find((user) => user.id === parseInt(id));

  if (user) {
    res.json(user);
  } else {
    res.send("User not found");
  }
};

const createUser = (req, res) => {
  const user = req.body;

  if (user) {
    data.users.push(user);
    res.status(201).json(user);
  } else {
    res.send("Missing request body");
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = data.users.find((user) => user.id === parseInt(id));

  if (user) {
    const { username } = req.body;

    user.username = username;
    res.json(user);
  } else {
    res.send("User not found");
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (data.users.some((user) => user.id === parseInt(id))) {
    const user = data.users.find((user) => user.id === parseInt(id));
    user.isDeleted = true;

    data = { users: data.users.filter((user) => user.id !== parseInt(id)) };
    res.json(user);
  } else {
    res.send("User not found");
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
