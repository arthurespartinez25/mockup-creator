const router = require("express").Router();

router.post("/login", (req, res) => {
  return res.status(200).json({ message: "call to login" });
});

router.post("/register", (req, res) => {
  return res.status(200).json({ message: "call to reg" });
});

module.exports = router;
