const express = require("express");
const path =  require("path")
const bodyParser =  require("body-parser");
const { connectToDo, getDb } = require("./database");
const bcrypt =  require("bcrypt")
const port = 2000;

// init app & middleware
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.set('view engine','ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended:true
}))


// db connection
let db;
connectToDo((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`app is listening at ${port}`);
    });
    db = getDb();
  } else {
    console.error("Error connecting to database:", err);
  }
});

const static_path = path.join("public")

// for accessing sign in and signUP forms.

app.get("/",(req,res)=>{
  res.render("./public/login.html");
})

app.get("/signup",(req,res)=>{
  res.render("signup")
})

// creating  a new user
app.post("/signup", async (req, res) => {
  const data = {
    name:req.body.username,
    email:req.body.email,
    password:req.body.password
  }
  const existingUser  = await  db.collection('users').findOne({name:data.name});
  if(existingUser){
    res.send("user name already taken Try another user name")
  }else{
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(data.password);
    data.password =  hashedPwd; /// hashed password replaced the original password 
     db.collection("users")
       .insertMany(data)
       .then((result) => {
         res.status(201).json(result);
         console.log("data uploaded");
       })
       .catch((err) => {
         res.status(500).json({ err: "Couldn't create a new request" });
       });
    
  }
 
});


// sign in 
 app.post("/sigin",async (req,res)=>{
  try{
    const check =  await db.collection({name:qs.body.username});
    const isPasswordMatch =  await bcrypt.compare(req.body.password,check.password);
    if(isPasswordMatch){
      res.render("")

    }else{
      res.send("Wrong password try again");
    }
  }
  catch{
    res.send("Wrong Details");
    }

  }
 )

