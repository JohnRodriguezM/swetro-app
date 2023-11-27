const { spawn } = require("child_process");
const path = require("path");
/**
 * Controller file for handling suspicious activities.
 * @module suspicious_activities.controllers
 */
const {
  HTTP_STATUS_SERVER_ERROR,
  ERROR_RUNNING_SCRIPT,
  NO_RESULT_FROM_SCRIPT,
} = require("../constants/constants");

module.exports.getSuspiciousActivities = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  /**
   * The path to the Python script file.
   * @type {string}
   */
  const pythonScriptPath = path.join(__dirname, "../../utils/src/index.py");
  const python = spawn("python", [pythonScriptPath, page, limit]);

  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.on("error", (error) => {
    console.error(`Error running python script: ${error}`);
    return res
      .status(HTTP_STATUS_SERVER_ERROR)
      .json({ error: ERROR_RUNNING_SCRIPT });
  });

  python.on("close", (code) => {
    if (code !== 0) {
      return res
        .status(HTTP_STATUS_SERVER_ERROR)
        .json({ error: ERROR_RUNNING_SCRIPT });
    }
    if (!result) {
      return res
        .status(HTTP_STATUS_SERVER_ERROR)
        .json({ error: NO_RESULT_FROM_SCRIPT });
    }
    try {
      const parsedResult = JSON.parse(result);
      const data = JSON.parse(parsedResult.data);
      res.json({
        totalData: data.length,
        data: data,
        image: parsedResult.image,
      });
    } catch (error) {
      console.error(`Error parsing result: ${error}`);
      return res
        .status(HTTP_STATUS_SERVER_ERROR)
        .json({ error: ERROR_RUNNING_SCRIPT });
    }
  });
};

