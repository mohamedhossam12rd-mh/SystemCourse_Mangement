// Req Router
const router = require("express").Router();

const profileController = require("../controllers/profileController")

router.put("/:id" , profileController.UpdateProfile)

module.exports = router