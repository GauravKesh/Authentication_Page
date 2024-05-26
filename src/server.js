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

// Render signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Creating a new user
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Checking if user exists in the database
    const existingUser = await db
      .collection("users")
      .findOne({ name: data.name });
    const existingEmail = await db
      .collection("users")
      .findOne({ email: data.email });

    if (existingUser || existingEmail) {
      if (existingUser) {
        res
          .status(409)
          .json({ message: "Username already taken. Try another username." });
      } else {
        res
          .status(409)
          .json({ message: "Email already taken. Try another email." });
      }
      return;
    }

    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(data.password, saltRounds); // Hashing the user password for security layers
    data.password = hashedPwd; // Replace the original password with the hashed password

    const result = await db.collection("users").insertOne(data);
    res.status(201).json({ message: "User registered successfully", result });
  } catch (err) {
    console.error("Error during signup:", err);
    res
      .status(500)
      .json({ message: "Error during signup. Please try again later." });
  }
});

// Sign in
app.post("/signin", async (req, res) => {
  try {
    const user = await db.collection("users").findOne({ name: req.body.name });

    if (!user) {
      res.status(401).json({ message: "Wrong details. User not found." });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordMatch) {
      res.status(200).json({ message: "Logged in" });
      console.log("User logged in");
    } else {
      res.status(401).json({ message: "Wrong password. Try again." });
    }
  } catch (err) {
    console.error("Error during signin:", err);
    res
      .status(500)
      .json({ message: "Error during signin. Please try again later." });
  }
});
