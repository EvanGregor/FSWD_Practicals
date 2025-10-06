const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const logFilePath = path.join(__dirname, "error.txt");

app.get("/", (req, res) => {
  fs.readFile(logFilePath, "utf8 ", (err, data) => {
    if (err) {
      console.error("Error reading log file:", err.message);
      return res.status(500).send(`
        <h1>Log Viewer</h1>
        <p style="color:red;">Unable to read log file: ${err.message}</p>
      `);
    }
    res.send(`
      <h1>Log Viewer</h1>
      <pre style="background:#111;color:#0f0;padding:10px;border-radius:5px;white-space:pre-wrap;">${data}</pre>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
