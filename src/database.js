const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const dot = require("dotenv").config();

let dbConnection;
console.log(process.env.API_URI); 

// MongoDB URI  ANOTHER METHODS

// const uri = `mongodb+srv://${process.env.ACCESS_ID}:${process.env.ACCESS_KEY}@cluster0.ribtrjl.mongodb.net/${process.env.ACCESS_COLLECTION}?retryWrites=true&w=majority`;  

const uri = process.env.API_URI; // url to connect with database


// Connecting remotely
const connectToDo = (cb) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      dbConnection = client.db();
      console.log("Connected to MongoDB online");
      cb(null); // Pass null for the error parameter to indicate successful connection
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      cb(err); // Pass the error to the callback function
    });
};

const getDb = () => dbConnection;

// Mongoose connection
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoose connected to MongoDB"))
  .catch((err) => console.error("Mongoose connection error:", err));

module.exports = { connectToDo, getDb };
