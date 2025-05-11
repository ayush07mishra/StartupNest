const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Project", ProjectSchema);
