import express from "express";
import cors from "cors";

import pool from "./db.js";

// Middleware
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Connect to DB
pool.connect();

app.listen(5000, () => {
  console.log("listening on port 5000");
});

// Routes

// Add email and Password
app.post("/register", async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    await pool.query(
      "insert into users(name, email, password) values($1, $2, $3) Returning *",
      [name,email, password]
    );

    res.send("Login details received");
    console.log(req.body);
  } catch (error) {
    console.error(error.message);
  }
});


// Sign In

app.post("/login", async (req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;
    const result = await pool.query(
      "select * from users where  email = $1 ",[email] 
    )
    if (result.rows.length > 0){
      const user = result.rows[0]
      const dbpassword = user.password

      if (password === dbpassword){
        res.status(200).json({message:"Login Succesful"})  
      }else{
        res.status(401).json({message:"Login Failed"})
      }
    }else{
      res.status(401).json({ message: "User not found" })
    }
    console.log(result)
  }catch(error){
    console.log(error)
  }
})
// show usernames
