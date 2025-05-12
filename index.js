const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "adityamade1c";

const app = express();
const dashboard = [];
let todos = [];

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

function logger(req, res, next) {
  console.log(req.method + " request came !!!");
  next();
}

app.use(logger);

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: "You Are Logged Out",
    });
  }
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  todos: [];

  dashboard.push({
    username: username,
    password: password,
  });

  console.log(dashboard);

  res.json({
    message: "You Are Signed up",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const founduser = dashboard.find(function (d) {
    if (d.username === username && d.password === password) {
      const token = jwt.sign(
        {
          username: d.username,
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
    }
  });
});

app.get("/me", auth, function (req, res) {
  // req = {status, headers...., username, password, userFirstName, random; ":123123"}

  // const token = req.headers.token;
  // const decodedData = jwt.verify(token, JWT_SECRET);
  // const currentUser = decodedData.username

  const founduser = dashboard.find(function (u) {
    if (u.username === req.username) {
      return true;
    } else {
      return false;
    }
  });
  res.json({
    username: founduser.username,
    password: founduser.password,
  });
});

// app.post("/todo", auth, function (req, res) {
//   const title = req.body.title;
//   const description = req.body.description;

//   const newTodo = {
//     id: Date.now(),
//     title: title,
//     description: description,
//     completed: false,
//   };

//   todos.push(newTodo);

//   res.json({
//     message: "Todos Added !!!! ✅",
//   });


// });
app.listen(3000);
