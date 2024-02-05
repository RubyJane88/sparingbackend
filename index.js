require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;

const errorHandler = require("./src/middleware/errorHandler.middleware");
const indexRouter = require("./src/api/route/index.route");
const allowedOrigins = [
  process.env.CORS_ORIGIN_1,
  process.env.CORS_ORIGIN_2
];


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true 
}));


app.use(indexRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
