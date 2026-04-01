const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  markAttendance,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.post("/", createEvent);
router.post("/:id/attendance", markAttendance);

module.exports = router;