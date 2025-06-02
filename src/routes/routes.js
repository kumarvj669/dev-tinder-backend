const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const User = require("../controllers/userController");

router.get("/", (req, res) => {
    res.send({"success": true})
})

router.post("/signup", User.signup)

router.post("/login", User.login)
router.get("/profile", User.profile)

module.exports = router;