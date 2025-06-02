const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const User = require("../controllers/userController");
const ConnectionRequest = require("../controllers/ConnectionRequestController");
const feeds = require("../controllers/feeds");

router.get("/", (req, res) => {
    res.send({"success": true})
})

router.post("/signup", User.signup)

router.post("/login", User.login)
router.get("/profile", User.profile)

router.get("/get-connection-requests", ConnectionRequest.getConnectionRequests)
router.post("/send-connection-request", ConnectionRequest.sendConnectionRequest)

router.get("/feeds", feeds.getFeeds)

module.exports = router;