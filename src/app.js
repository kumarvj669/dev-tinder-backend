const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to dev tinder banckend")
})


app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`))