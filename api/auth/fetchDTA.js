const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = require("../../config/mysql");

// Fetch DTA Months DTA
router.post("/fetch_months", (req, res) => {
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

// Fetch Monthly DTA Hrs
router.post("/fetch_monthly_summary/:month", (req, res) => {
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

// Fetch Day DTA by date / employeeCode
router.post("/fetch_day_dta/:dayDate", (req, res) => {
  // Get Data from post
  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Get Summary Day
  // Day Format : 2020-09-01
  var dayDate = req.params.dayDate;

  if (req.params.dayDate) {
    // Query DB to get status
    var getQuery = `SELECT tarikh,tasktype,routineact,projectlist,projectact,timeduration,remarks,submission,approval,late  FROM dta WHERE empcode = ? AND tarikh = ? `;
    var query = mysql.format(getQuery, [empcode, dayDate]);
    con.query(query, function (err, dbData) {
      //console.log(" Database Data : ", dbData);
      if (dbData.length > 0) {
        if (err) {
          //
          //  Response // error checking user in db
          //
          res.json({
            err: true,
            msg: "Connectivity Issue ERR - 502 ",
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
        //  Response
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

// Fetch Day TimeDuration
router.post("/fetch_day_duration/:dayDate", (req, res) => {
  // Get Data from post
  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Get Summary Day
  // Day Format : 2020-09-01
  var dayDate = req.params.dayDate;

  if (req.params.dayDate) {
    // Query DB to get status
    var getQuery = `SELECT SUM(timeduration) AS tt FROM dta WHERE empcode = ? AND tarikh = ? `;
    var query = mysql.format(getQuery, [empcode, dayDate]);
    con.query(query, function (err, dbData) {
      //console.log(" Database Data : ", dbData);
      if (dbData.length > 0) {
        if (err) {
          //
          //  Response // error checking user in db
          //
          res.json({
            err: true,
            msg: "Connectivity Issue ERR - 502 ",
          });
        } else {
          //
          //  Response // Success , Sending all Data
          //
          res.json({
            err: false,
            msg: dbData[0].tt,
          });
        }
      } else {
        //
        //  Response
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
