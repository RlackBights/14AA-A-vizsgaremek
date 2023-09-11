const express = require("express");
const router = express.Router();
const savedata = require("../services/savedata");

/* GET save data. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await savedata.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting save data `, err.message);
    next(err);
  }
});

module.exports = router;
