const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

app.get("/suspicious_activities", (req, res) => {
  const pythonScriptPath = path.join(__dirname, "../utils/src/index.py");
  const python = spawn("python", [pythonScriptPath]);
  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Error running python script" });
    }
    const parsedResult = JSON.parse(result);
    res.json({
      data: JSON.parse(parsedResult.data),
      image: parsedResult.image,
    });
    console.log("Python script finished");
    console.log(result.length);
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