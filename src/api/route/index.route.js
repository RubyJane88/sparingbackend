const express = require("express");
const indexRouter = express.Router();
const  sparingRoute  = require("./sparing.route");

indexRouter.use("/sparing", sparingRoute);

module.exports = indexRouter;
