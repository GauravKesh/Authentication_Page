const express = require("express");
const path = require("path");
const { connectToDo, getDb, Login, SignUp } = require("./database");
const bcrypt = require("bcrypt");
const hbs = require("hbs");

const port = 2000;
const templatePath = path.join(__dirname, "templates"); // Ensure this path is correct

// Initialize app & middleware
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.set("view engine", "hbs");
app.set("views", templatePath); // Correctly set the views directory

// Database connection
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

// Middleware for serving static files
const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

// Routes for accessing sign-in and sign-up forms
app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

// Creating a new user
app.post("/signup", async (req, res) => {
  try {
    const username =  req.body.name;
    const email =  req.body.email;
    const password =  req.body.password;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ err: "Username, email, and password are required." });
    }

    // Check if the username is already taken
    const existingUser = await SignUp.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("Username already taken. Try another username.");
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with hashed password
    const newUser = new SignUp({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    // Handle any errors that occur during the signup process
    console.error("Error creating new user:", err);
    res
      .status(500)
      .json({ err: "Couldn't create a new user", detail: err.message });
  }
});

// Sign in
app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("Username and password are required.");
      return;
    }

    const user = await SignUp.findOne({ username });
    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      res.render("home");
    } else {
      res.status(400).send("Wrong password. Try again.");
    }
  } catch (err) {
    res.status(500).send("An error occurred during sign-in");
  }
});
