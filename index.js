const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const verifyToken = require("./authCheck/checkAuth");
const verifyHeaders = require("./authCheck/checkHeaders");
var morgan = require('morgan'); 
// Routes
const login = require("./api/login");
const fetchBasics = require("./api/auth/fetchBasics");
const fetchDTA = require("./api/auth/fetchDTA");
const postDTA = require("./api/auth/postDTA");

// Middleware for loggin Dev dep
app.use(morgan('dev'));
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

// Post Fetch Basics
app.use("/api/fetch/", verifyHeaders, verifyToken, fetchBasics);

// Post Fetch DTA
app.use("/api/fetch/", verifyHeaders, verifyToken, fetchDTA);

// Post DTA Data
app.use("/api/post/", verifyHeaders, verifyToken, postDTA);

app.listen(process.env.PORT || 3000, () => {
  console.log("App Up and Running");
});
