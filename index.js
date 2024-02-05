require("dotenv").config();


const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;
console.log("Port is registered..");
const errorHandler = require("./src/middleware/errorHandler.middleware");
console.log("Error handler middleware is registered");
const indexRouter = require("./src/api/route/index.route");
console.log("Index router is registered");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);
console.log("Error handler middleware is registered");

app.use(cors({ origin: "*" }));
console.log("Cors is registered");
app.use(indexRouter);
console.log("Index router is registered");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
