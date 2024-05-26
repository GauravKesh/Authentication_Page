const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { connectToDo, getDb } = require("./database");
const bcrypt = require("bcrypt");
const port = 9000;

// init app & middleware
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data


// db connection
let db;
connectToDo((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App is listening at ${port}`);
    });
    db = getDb();
  } else {
    console.error("Error connecting to database:", err);
  }
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// creating a new user
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data)

  try {
    // checking if user exits or not in data base 
    const existingUser = await db
      .collection("users")
      .findOne({ name: data.name, });
        const existingEmail = await db
          .collection("users")
          .findOne({ email: data.email });
    if (existingUser || existingEmail) {
      if (existingUser) {
        res.status(409).send("Username already taken. Try another username");
      } else {
        res.status(409).send("Email already taken. Try another email");
      }

      return;
    } else {
      console.log(data);
      const saltRounds = 10;
      const hashedPwd = await bcrypt.hash(data.password, saltRounds); // hashing the user password for security layers
      data.password = hashedPwd; // replace the original password with the hashed password
      const result = await db.collection("users").insertOne(data);
      res.status(201).json(result);
      console.log("User registered successfully");
    }
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ err: "Error hashing password" });
  }
});

// sign in
app.post("/signin", async (req, res) => {
  try {
    const check = await db.collection("users").findOne({ name: req.body.name });
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.send("Logged in");
      console.log("User logged in");
    } else {
      res.send("Wrong password. Try again");
    }
  } catch (err) {
    res.send("Wrong details");
  }
});
