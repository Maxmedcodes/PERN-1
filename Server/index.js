import express from "express";
import cors from "cors";

import pool from "./db.js";
import bcrypt from "bcrypt";




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
    const checkemail =  await pool.query(
      "select email from users where email=$1",
      [email]
    );
    if(checkemail.rows.length > 0){
      res.send("Email exists Try Logging in ")
    }else{
      bcrypt.hash(password, 10, async(err, hash)=>{
        if(err){
          console.log("Issue Hashing Password",err)
        }else{ 
          const result = await pool.query(
            "insert into users(name, email,password) values ($1,$2,$3)",[name,email,hash]
          )
          res.send("Login details received");
        }
      })
    }

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

      bcrypt.compare(password,dbpassword, async(err,result)=>{
        if (err){
          console.log(err)
        }else{
          if(!result){
          res.status(401).json({message:"Login Failed"})
          }
        else{
          if(result)
          res.status(200).json({message:"Login Succesful"})
        }
      }
      })
    }else{
      res.status(401).json({ message: "Incorrect Login Details" })
    }
    
  }catch(error){
    console.log(error)
  }
})

