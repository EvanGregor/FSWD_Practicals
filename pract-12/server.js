const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Kids Calculator</title>
      <style>
        body {
          font-family: Comic Sans MS, cursive, sans-serif;
          background-color: #fef9c3;
          text-align: center;
          padding-top: 50px;
        }
        h2 {
          color: #ff6f61;
        }
        form {
          background: #fff7e6;
          display: inline-block;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        input, select {
          padding: 8px;
          margin: 5px;
          font-size: 16px;
          border-radius: 8px;
          border: 2px solid #ffcc80;
        }
        button {
          background: #4caf50;
          color: white;
          font-size: 18px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background: #45a049;
        }
        a {
          display: inline-block;
          margin-top: 15px;
          text-decoration: none;
          color: #0077cc;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h2> Simple Calculator for Kids </h2>
      <form action="/calculate" method="post">
        <label>First Number: </label>
        <input type="text" name="num1" required><br><br>

        <label>Second Number: </label>
        <input type="text" name="num2" required><br><br>

        <label>Operation: </label>
        <select name="operation">
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (x)</option>
          <option value="divide">Divide (÷)</option>
        </select><br><br>

        <button type="submit">Calculate</button>
      </form>
    </body>
    </html>
  `);
});

// Handle calculation
app.post("/calculate", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;

  if (isNaN(num1) || isNaN(num2)) {
    return res.send(`
      <h3 style='color:red;'>Please enter valid numbers!</h3>
      <a href='/'>🔙 Try Again</a>
    `);
  }

  let result;
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return res.send("<h3 style='color:red;'>Cannot divide by zero!</h3><a href='/'>Go Back</a>");
      }
      result = num1 / num2;
      break;
    default:
      return res.send("<h3 style='color:red;'>Invalid operation selected!</h3><a href='/'>Go Back</a>");
  }

  res.send(`
    <h2 style="color:#4caf50;">Result: ${result}</h2>
    <a href="/">🔙 Try Again</a>
  `);
});

app.listen(port, () => {
  console.log(`Calculator running at http://localhost:${port}`);
});
