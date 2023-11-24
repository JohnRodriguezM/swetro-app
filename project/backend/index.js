const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

app.get("/suspicious_activities", (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Obtén los parámetros de paginación de la URL
  const pythonScriptPath = path.join(__dirname, "../utils/src/index.py");
  const python = spawn("python", [pythonScriptPath, page, limit]); // Pasa los parámetros al script de Python

  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Error running python script" });
    }
    if (!result) {
      return res.status(500).json({ error: "No result from python script" });
    }
    const parsedResult = JSON.parse(result);
    res.json({
      data: JSON.parse(parsedResult.data),
      image: parsedResult.image,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*mport React, { useState, useEffect } from 'react';

function MyComponent() {
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    // Aquí deberías hacer la solicitud a tu servidor y establecer 'imageBase64' con la respuesta
    fetch('url-de-tu-api')
      .then(response => response.json())
      .then(data => setImageBase64(data.image));
  }, []);

  return <img src={`data:image/png;base64,${imageBase64}`} alt="My image" />;
}*/
