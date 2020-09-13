const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = require("../../config/mysql");

// POST DTA Day Entry
router.post("/post_dta", (req, res) => {
  // Get Data from post
  //var { empcode } = req.user;
  var {
    empcode,
    name,
    band,
    dept,
    subdept,
    ro,
    designation,
    plantcode,
    division,
  } = req.user;

  // Things to Save
  //   empcode          ✔️
  //   dept             ✔️
  //   subdept          ✔️
  //   plantcode        ✔️
  //   division         ✔️
  //   Date
  //   tasktype
  //   ractivity
  //   prolist
  //   proact
  //   finaltime
  //   remarks
  //   numin
  //   freetime
  //   routine
  //   ininimp
  //   unplanned
  //   draft            ✔️
  //   submission       ✔️
  //   approval         ✔️

  // Fetch Values from FORM
  // Sanitize
  // Query DB to get status

  var {
    tarikh,
    tasktype,
    ractivity,
    prolist,
    proact,
    finaltime,
    remarks,
    numin,
    freetime,
    routine,
    ininimp,
    unplanned,
  } = req.body.formData;

  var getQuery =
    "INSERT INTO dta (empcode,dept,subdept,plant,division,tarikh,tasktype,routineact,projectlist,projectact,timeduration,remarks,numericinput,freetime,routine,ininimp,unplanned,draft,submission,approval ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var query = mysql.format(getQuery, [
    empcode,
    dept,
    subdept,
    plantcode,
    division,
    tarikh,
    tasktype,
    ractivity,
    prolist,
    proact,
    finaltime,
    remarks,
    numin,
    freetime,
    routine,
    ininimp,
    unplanned,
    "1",
    "0",
    "0",
  ]);
  con.query(query, function (err, dbData) {
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
  });
});

// POST DTA Submission
router.post("/post_dta_submission", (req, res) => {
  // Get Data from post

  var { empcode } = req.user;
  // var { empcode, name, band, dept, subdept, ro, designation } = req.user;

  // Get Form DATA from Body
  var { tarikh, late, summary, fieldName, monthEmp } = req.body.formData;

  if (req.params.month) {
    // Query DB to get status
    var getQuery = `UPDATE dta SET submission = '1' ,late = ? WHERE empcode = ? AND tarikh = ?`;
    var query = mysql.format(getQuery, [late, empcode, tarikh]);
    con.query(query, function (err, dbData) {
      // console.log(" Database Data : ", dbData);

      if (err) {
        //
        //  Response // error checking user in db
        //
        res.json({
          err: true,
          msg: "Connectivity Issue ERR - 501 ",
        });
      } else {
        var checkMonthEmp = "SELECT ID FROM dtasummary WHERE monthEmp = ?";
        var queryVerify = mysql.format(checkMonthEmp, [monthEmp]);
        con.query(queryVerify, function (err1, dbDataVerify) {
          if (err1) {
            //
            //  Response // error checking user in db
            //
            res.json({
              err: true,
              msg: "Connectivity Issue ERR - 501 ",
            });
          } else {
            var updateSummary = "";
            if (dbDataVerify.length > 0) {
              updateSummary = "UPDATE dtasummary SET ? = ? WHERE monthEmp = ?";
              var updateQueryVerify = mysql.format(updateSummary, [
                fieldName,
                summary,
                monthEmp,
              ]);
            } else {
              updateSummary =
                "INSERT INTO dtasummary (?,empcode,monthEmp) VALUES (?,?,?)";
              var updateQueryVerify = mysql.format(updateSummary, [
                fieldName,
                summary,
                empcode,
                monthEmp,
              ]);
            }
            con.query(updateQueryVerify, function (err2, dbDataVerifyFinal) {
              if (err2) {
                //
                //  Response // error checking user in db
                //
                res.json({
                  err: true,
                  msg: "Connectivity Issue ERR - 501 ",
                });
              } else {
                //
                //  Response // error checking user in db
                //
                res.json({
                  err: false,
                  msg: dbDataVerifyFinal,
                });
              }
            });
          }
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
