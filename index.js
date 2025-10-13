// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // Add this import
const PORT = 8080;

app.use(cors());
let Database = require("./Database.js");
const authRoutes = require("./src/Auth/Route/Auth.route.js");
const Customer = require("./src/Customer/Route/Customer.route.js");
const Item = require("./src/Item/Route/Item.routes.js");
const Sales = require("./src/Sales/Routes/Sales.route.js");
const Supplier = require("./src/Supplier/Route/Supplier.Route.js");
const purchase = require("./src/Purchase/Route/purchase.route.js")

// Middleware
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routes
app.use("/V1/auth", authRoutes);
app.use("/V1", Customer);
app.use("/V1", Item);
app.use("/V1", Sales);
app.use("/V1",Supplier);
app.use("/V1",purchase)



Database.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);

    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });