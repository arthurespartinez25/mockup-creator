const router = require("express").Router();

var Users = require('./users');
const dboperations = require('./dboperations');

router.post("/login", (req, res) => {
  dboperations.getUsers().then(result => {
    Users = result[0][0];
    console.log("PersonID: " + result[0][0].PersonID);
    console.log("Username: " + result[0][0].Username);
    console.log("Password: " + result[0][0].Password);
    console.log("LastName: " + result[0][0].LastName);
    console.log("FirstName: " + result[0][0].FirstName);
    console.log("Email: " + result[0][0].Email);
  })
  return res.status(200).json({ message: "call to login" });
});

router.post("/register", (req, res) => {
  return res.status(200).json({ message: "call to reg" });
});


module.exports = router;
