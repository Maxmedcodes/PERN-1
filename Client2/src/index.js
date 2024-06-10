import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
// import { Pool } from "pg";

import cors from "cors";

// import pg from "pg";
// import pool from "./Server/db.js";

// Middleware

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
