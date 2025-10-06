const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.render("error", { errorMsg: "All fields are required!" });
  }

  try {
    // Setup transporter (use Gmail or any SMTP service)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // your app password
      }
    });

    // Mail options
    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      text: message,
      html: `<h3>New Contact Request</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    };

    await transporter.sendMail(mailOptions);
    res.render("success", { name });

  } catch (error) {
    console.error(error);
    res.render("error", { errorMsg: "Failed to send message. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
