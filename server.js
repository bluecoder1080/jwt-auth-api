import express from "express";
import { JWT_SECRET } from "./config.js";

import jwt from "jsonwebtoken";
import { jwtAuthMiddleware } from "./middlewares/jwtAuthMiddleware.js";
import { methodsMiddlewares } from "./middlewares/methodsMiddlewares.js";

const app = express();



app.use(express.json());

const database = [];

app.use(jwtAuthMiddleware);

app.use(methodsMiddlewares);

app.post("/signup", function (req, res) {
  const { username, password } = req.body;

  if (database.find((d) => d.username === username)) {
    return res.json({
      message: "You Are Already Signed up Man !!!",
    });
  }

  database.push({
    username: username,
    password: password,
  });

  // console.log(database);
  res.json({
    message: "You Are Signed In .",
  });
});
app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = database.find(function (u) {
    if (u.username == username && u.password == password) {
      return true;
    } else {
      return false;
    }
  });
  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );

    // console.log(database);
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "Invalid",
    });
  }
});

app.get("/me", function (req, res) {
  const foundUser = database.find(function (u) {
    if (u.username === req.username) {
      return true;
    } else {
      return false;
    }
  });

  if (foundUser) {
    res.send({
      username: foundUser.username,
      password: foundUser.password,
    });
  }
});

app.listen(3000);
