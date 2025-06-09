const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS options
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Middlewares
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors()); // allows all origins — OK for local dev
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({message:"Backend is running!"});
});

// Routes
const home = require("./Routes/Home");
const user = require("./Routes/User");
const raffle = require("./Routes/raffle");

app.use("/api", home);
app.use("/api", user);
app.use("/api", raffle);

  const PORT = process.env.PORT ||3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
