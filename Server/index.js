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

// show usernames
