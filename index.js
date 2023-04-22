import express from "express";
import users from "./routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(users);

app.listen(port, () => console.log("Server running on port", port));
