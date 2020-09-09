const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const verifyToken = require("./authCheck/checkAuth");
const verifyHeaders = require("./authCheck/checkHeaders");

// Routes
const login = require("./api/login");

// Config BodyParser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Using body-parser
app.use(bodyParser.json());

// Setting up CORS
app.use(cors());

// Post login Check basic info
// app.use("/api", verifyHeaders, verifyToken, fetch_user_data);

app.get("/", (req, res) => {
  res.send("How u doin");
});

// Post login genrate Token
app.use("/api/login", verifyHeaders, login);

app.listen(process.env.PORT || 3000, () => {
  console.log("App Up and Running");
});
