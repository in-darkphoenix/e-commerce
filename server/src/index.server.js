const express = require("express");
const env = require("dotenv").config(); // for using .env's constants
const mongoose = require("mongoose");

// local imports
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// express's instance
const app = express();

// parsing
app.use(express.urlencoded({ extended: true }));

// database connect
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ecmcluster0.uvmfj.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected with Atlas");
  });

//
app.use("/api/user", authRoutes);
app.use("/api/user", adminRoutes);
app.use("/api/user", categoryRoutes);
app.use("/api/user", productRoutes);

app.listen(process.env.PORT, function () {
  console.log("Server is running at port", process.env.PORT);
});
