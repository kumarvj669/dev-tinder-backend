const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());
const router = require("./routes/routes");
const {userAuth} = require("./middlewares/auth")
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(userAuth);
app.use(router);
app.use((req, res) => {
    res.status(404).send({"Success": false, "Message": "Endpoint Not Found"});
});

app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send(err?.message);
    }
});
const connectDB = mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connection established")
    app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`))
})
.catch((err) => {
    throw new Error(`DB connection error: ${err.message}`);
})
