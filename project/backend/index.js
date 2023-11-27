require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/suspicious_activities.routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

app.set("port", port);

//* declarar rutas

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
