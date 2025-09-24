// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;


app.use(cors());
let Database = require("./Database.js");
const authRoutes = require("./src/Auth/Route/Auth.route.js");
const Customer = require("./src/Customer/Route/Customer.route.js");
const Item = require("./src/Item/Route/Item.routes.js");
const Sales = require("./src/Sales/Routes/Sales.route.js")



// Middleware
app.use(express.json());

// Mount routes
app.use("/V1/auth", authRoutes);
app.use("/V1",Customer);
app.use("/V1", Item);
app.use("/V1",Sales);


Database.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
