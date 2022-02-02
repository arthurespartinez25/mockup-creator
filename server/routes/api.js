const router = require("express").Router();

var Users = require('./users');
const dboperations = require('./dboperations');

router.post("/login", (req, res) => {
  dboperations.getUsers().then(result => {
    console.log("Here's johnny " + result);
  })
  return res.status(200).json({ message: "call to login" });
});

router.post("/register", (req, res) => {
  return res.status(200).json({ message: "call to reg" });
});


module.exports = router;
