require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;

const errorHandler = require("./src/middleware/errorHandler.middleware");
const indexRouter = require("./src/api/route/index.route");
const allowedOrigins = [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2];

const cleanOrigins = allowedOrigins.map((origin) => origin.replace(/\/$/, ""));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    // origin: function (origin, callback) {
    //   if (!origin || cleanOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     console.log("Blocked origin:", origin);
    //     callback(new Error("Not allowed by CORS"));
    //   }
    // },
    // credentials: true,
  })
);

app.use(indexRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
