const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = require("../../config/mysql");

// Fetch DTA Fav Tasks
router.post("/fetch_task", (req, res) => {
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

// Fetch Project's of Employee
router.post("/fetch_project_ids", (req, res) => {
  // Get Data from post

  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Query DB to get status
  var getQuery = "SELECT projectid  FROM `dtaprolist` WHERE employeecode = ?";
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
});

// Fetch Project Details By ID
router.post("/fetch_project_details/:proID", (req, res) => {
  // Get Data from post
  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Get project ID
  var proID = req.params.proID;

  if (req.params.proID && typeof req.params.proID === Number) {
    // Query DB to get status
    var getQuery = "SELECT *  FROM `dtaproject` WHERE ID = ? AND status = '1'";
    var query = mysql.format(getQuery, [proID]);
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
        //  Response // No Project Details OR Project may be not-active
        //
        res.json({
          err: true,
          msg: "Project Not Active",
        });
      }
    });
  } else {
    res.json({
      err: true,
      msg: "Invalid Project ID",
    });
  }
});

// Fetch All Project Tasks
router.post("/fetch_all_project_tasks", (req, res) => {
  // Get Data from post
  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Query DB to get status
  var getQuery = "SELECT *  FROM `dtaprotasks` WHERE employeecode = ?";
  var query = mysql.format(getQuery, [empcode]);
  con.query(query, function (err, dbData) {
    //console.log(" Database Data : ", dbData);
    if (dbData.length > 0) {
      if (err) {
        //
        //  Response // error checking user in db
        //
        res.json({
          err: true,
          msg: "Connectivity Issue ERR - 503 ",
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
      //  Response // No Projects Assigned
      //
      res.json({
        err: true,
        msg: "No Data",
      });
    }
  });
});

// Fetch Project Task by Project ID
router.post("/fetch_project_task/:proID", (req, res) => {
  // Get Data from post
  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Get project ID
  var proID = req.params.proID;

  if (req.params.proID && typeof req.params.proID === Number) {
    // Query DB to get status
    var getQuery =
      "SELECT *  FROM `dtaprotasks` WHERE employeecode = ? AND projectid = ?";
    var query = mysql.format(getQuery, [empcode, proID]);
    con.query(query, function (err, dbData) {
      console.log(" Database Data : ", dbData);
      if (dbData.length > 0) {
        if (err) {
          //
          //  Response // error checking user in db
          //
          res.json({
            err: true,
            msg: "Connectivity Issue ERR - 504 ",
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
        //  Response // No Bank Data
        //
        res.json({
          err: true,
          msg: "Un-auth Project",
        });
      }
    });
  } else {
    res.json({
      err: true,
      msg: "Invalid Project ID",
    });
  }
});
module.exports = router;
