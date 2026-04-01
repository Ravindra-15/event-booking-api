const express = require("express");
const router = express.Router();
const { bookTicket } = require("../controllers/bookingController");

// GET handler (for clean response)
router.get("/", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Method not allowed. Use POST to create booking."
  });
});

//POST booking
router.post("/", bookTicket);

module.exports = router;