const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
});

router.get("/add", (req, res) => {
    res.render("add");
});

router.post("/add", async (req, res) => {
    const { name, age, class: studentClass, email } = req.body;
    await Student.create({ name, age, class: studentClass, email });
    res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render("edit", { student });
});

router.post("/edit/:id", async (req, res) => {
    const { name, age, class: studentClass, email } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, age, class: studentClass, email });
    res.redirect("/");
});

router.post("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;
