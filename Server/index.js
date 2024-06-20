import express from "express";
import cors from "cors";

import pool from "./db.js";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";



// Middleware
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials:true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  // Add other headers here as needed
  next();
});

app.use(express.json());
app.use(session({
  secret:"TOPSECRET",
  resave: false,
  saveUninitialized:true,
  cookie:{secure: false}
}))

app.use(passport.initialize())
app.use(passport.session())
// Connect to DB
pool.connect();



// Re-Routes  Non Logged In Users
app.get("/posts", passport.authenticate("local",{
  successRedirect:"http://localhost:3000/posts",
  failureRedirect:"http://localhost:3000/"
}))

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

app.post("/login", (req, res, next) => {
  console.log("Request body:", req.body); // Logging request body for debugging
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Login failed" });
      }
      console.log("Authentication successful:", user);
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

// LogOut
app.post("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect("/")
  })
})



passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function (username, password, done) {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1", [username]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const dbpassword = user.password;

      bcrypt.compare(password, dbpassword, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return done(err);
        }
        if (!isMatch) {
          console.log("Password mismatch for user:", username);
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        console.log("Password match for user:", username);
        return done(null, user);
      });
    } else {
      console.log("User not found:", username);
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  } catch (error) {
    console.error("Error during database query:", error);
    return done(error);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (error) {
    done(error);
  }
});
app.listen(5000, () => {
  console.log("listening on port 5000");
});
