const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();

const dataFile = path.join(__dirname, "data.json");

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "librarySecret",
    resave: false,
    saveUninitialized: true,
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("login", { error: null });
});

app.post("/login", (req, res) => {
    const { username } = req.body;
    if (username && username.trim() !== "") {
        req.session.username = username;
        req.session.loginTime = new Date(); 
        res.redirect("/profile");
    } else {
        res.render("login", { error: "Please enter a valid name!" });
    }
});

app.get("/profile", (req, res) => {
    if (req.session.username) {
        const loginTime = new Date(req.session.loginTime);

        res.render("profile", {
            username: req.session.username,
            loginTime: loginTime.toLocaleString("en-IN", { 
                dateStyle: "medium", 
                timeStyle: "medium" 
            })
        });
    } else {
        res.redirect("/");
    }
});


app.get("/logout", (req, res) => {
    if (req.session.username) {
        const loginTime = new Date(req.session.loginTime);
        const logoutTime = new Date();

        const activeMs = logoutTime - loginTime;
        const minutes = Math.floor(activeMs / 60000);
        const seconds = Math.floor((activeMs % 60000) / 1000);
        const duration = `${minutes} min ${seconds} sec`;

        const userLog = {
            username: req.session.username,
            loginTime: loginTime.toLocaleString(),
            logoutTime: logoutTime.toLocaleString(),
            activeTime: duration
        };

        let logs = [];
        if (fs.existsSync(dataFile)) {
            logs = JSON.parse(fs.readFileSync(dataFile, "utf8"));
        }
        logs.push(userLog);

        fs.writeFileSync(dataFile, JSON.stringify(logs, null, 2));

        req.session.destroy(err => {
            if (err) console.error(err);
            res.render("logout", { username: userLog.username, duration: userLog.activeTime });
        });
    } else {
        res.redirect("/");
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
