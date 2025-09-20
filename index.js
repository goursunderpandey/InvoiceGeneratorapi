// server.js
const express = require("express");
const app = express();
const PORT = 8080;

let Database = require("./Database.js");
const authRoutes = require("./src/Auth/Route/Auth.route.js");


// Middleware
app.use(express.json());

// Mount routes
app.use("/V1/auth", authRoutes);


Database.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
