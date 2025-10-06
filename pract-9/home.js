module.exports = (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Product Site</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding-top: 50px;
          }
          h1 {
            color: #333;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to our site</h1>
      </body>
    </html>
  `);
};
