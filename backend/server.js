const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
import { fileURLToPath } from "url"; // only if using ES modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS options
const corsoption = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors(corsoption));
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
