const { Router } = require("express");
/**
 * Retrieves suspicious activities.
 * @function getSuspiciousActivities
 * @memberof module:controllers/suspicious_activities.controllers
 * @returns {Array} Array of suspicious activities.
 */
const {
  getSuspiciousActivities,
} = require("../controllers/suspicious_activities.controllers");

const router = Router();

router.get("/suspicious_activities", getSuspiciousActivities);

module.exports = router;
