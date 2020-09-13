const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = require("../../config/mysql");

// POST DTA Day Entry
router.post("/post_dta", (req, res) => {
  // Get Data from post
  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Query DB to get status
  var getQuery = "SELECT *  FROM `dtafav` WHERE empcode = ? OR empcode = ?";
  var query = mysql.format(getQuery, [empcode, "common"]);
  con.query(query, function (err, dbData) {
    // console.log(" Database Data : ", dbData);
    if (dbData.length > 0) {
      if (err) {
        //
        //  Response // error checking user in db
        //
        res.json({
          err: true,
          msg: "Connectivity Issue ERR - 500 ",
        });
      } else {
        //
        //  Response // Success , Sending all Data
        //
        res.json({
          err: false,
          msg: dbData,
        });
      }
    } else {
      //
      //  Response // No Fav Tasks
      //
      res.json({
        err: true,
        msg: "No Data",
      });
    }
  });
});

// POST DTA Submission
router.post("/post_dta_submission/", (req, res) => {
  // Get Data from post

  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Get Summary Month
  // Month Format : 2020-09
  var month = req.params.month;

  if (req.params.month) {
    // Query DB to get status
    var getQuery = `SELECT tarikh,tasktype,routineact,projectlist,projectact,timeduration,remarks,submission,approval,late  FROM dta WHERE empcode = ? AND tarikh LIKE '${month}-%' `;
    var query = mysql.format(getQuery, [empcode]);
    con.query(query, function (err, dbData) {
      // console.log(" Database Data : ", dbData);
      if (dbData.length > 0) {
        if (err) {
          //
          //  Response // error checking user in db
          //
          res.json({
            err: true,
            msg: "Connectivity Issue ERR - 501 ",
          });
        } else {
          //
          //  Response // Success , Sending all Data
          //
          res.json({
            err: false,
            msg: dbData,
          });
        }
      } else {
        //
        //  Response // No Projects
        //
        res.json({
          err: true,
          msg: "No Data",
        });
      }
    });
  } else {
    //
    //  Response // No Projects
    //
    res.json({
      err: true,
      msg: "Invalid Date",
    });
  }
});

module.exports = router;
