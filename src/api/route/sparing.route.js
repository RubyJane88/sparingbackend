const router = require("express").Router();
const controller = require("../controller/sparing.controller");

router.post("/", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const response = await controller.getSparingData(payload);

  return res.status(response.status).json(response);
});

router.get("/group", async (req, res) => {
  const response = await controller.getUniqueGroups();

  return res.status(response.status).json(response);
});

module.exports = router;
