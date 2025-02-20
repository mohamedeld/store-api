const express = require("express");
const {getAllStoreStatic} = require("../controllers/storeController");
const router = express.Router();

router.route("/").get(getAllStoreStatic)

module.exports = router;