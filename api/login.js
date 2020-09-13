const express = require("express");
const router = express.Router();
const { body, validationResult, matchedData } = require("express-validator");
const mysql = require("mysql");
const con = require("../config/mysql");
const jwt = require("jsonwebtoken");

// Login User
router.post(
  "/",
  [
    body("empcode", "Employee Code is Required")
      .trim()
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("Employee Code is required")
      .isLength({ max: 15 }),
    // Check password not empty | Between 8 - 50 | equals confirm_password
    body("password", "Password is requried")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is Empty"),
  ],
  (req, res) => {
    // get Validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //
      //  Response input values error
      //
      res.json({
        err: true,
        msg: errors.mapped(),
      });
    } else {
      // Get sanitized user Data into variables
      const user = matchedData(req);
      const { empcode, password } = user;

      // Query DB to check user Exist
      var getQuery = "SELECT * FROM `users` WHERE empcode = ?";
      var query = mysql.format(getQuery, [empcode]);
      con.query(query, function (err, dbData) {
        if (err) {
          //
          //  Response // error checking user in db
          //
          res.json({
            err: true,
            msg: "Connectivity Issue ERR - 200 ",
          });
        }
        // ON DB DATA
        // CHECK IF USER WITH EMAIL EXIST
        if (dbData.length > 0) {
          // Genrate Token JWT Token for 1hr

          if (dbData[0].isActive) {
            var token = jwt.sign(
              {
                empcode: empcode,
                name: dbData[0].empname,
                band: dbData[0].grade,
                dept: dbData[0].dept,
                subdept: dbData[0].subdept,
                ro: dbData[0].ro,
                designation: dbData[0].designation,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );
            //
            //  Response // Logged In successfully
            //
            res.json({ err: false, msg: token });
          } else {
            //
            //  Response // InActive User
            //
            res.json({ err: true, msg: "User Deactivated" });
          }
        } else {
          //
          //  Response // Logged In successfully
          //
          res.json({ err: true, msg: "Invalid Credentials" });
        }
      });
    }
  }
);

module.exports = router;
