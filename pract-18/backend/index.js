const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const notesRoutes = require("./routes/notes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
}).catch(err => console.error(err));
