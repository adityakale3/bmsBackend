const jwt = require("jsonwebtoken");

// Function to check jwt
var verifyToken = async (req, res, next) => {
  // Must have special header

  var token = req.headers["x-access-token"] || "";
  console.log("Middlware Token", token);
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    console.log("Env secret", process.env.JWT_SECRET);
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Dcrypt ", decrypt);
    req.user = {
      empcode: decrypt.empcode,
      name: decrypt.empname,
      band: decrypt.grade,
      dept: decrypt.dept,
      subdept: decrypt.subdept,
      ro: decrypt.ro,
      designation: decrypt.designation,
    };

    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
