const { Router } = require("express");
const {
  getSuspiciousActivities,
} = require("../controllers/suspicious_activities.controllers");

const router = Router();

router.get("/suspicious_activities", getSuspiciousActivities);

module.exports = router;
