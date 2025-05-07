const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "adityahadmadec";

app.use(express.json());

const database = [];

function signupHandler(req, res) {
  const { username, password } = req.body;

  if (database.find((d) => d.username === username)) {
    res.json({
      message: "You Are Already Signed up Man !!!",
    });
  }
  database.push({
    username: username,
    password: password,
  });

  console.log(database);
  res.json({
    message: "You Are Signed In .",
  });
}

function signinpHandler(req, res) {
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

    console.log(database);
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "Invalid",
    });
  }
}

function authorization(req, res) {
  const token = req.headers.token;

  const decodedInformation = jwt.verify(token, JWT_SECRET); //{It stores username: aditya1221}
  const username = decodedInformation.username;

  const foundUser = database.find(function (u) {
    if (u.username === username) {
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
  } else {
    res.send({
      message: "Invalid Token",
    });
  }
}

app.post("/signup", signupHandler);
app.post("/signin", signinpHandler);
app.get("/me", authorization);

app.listen(3000);
