const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = 5000;
const JWT_SECRET = "super_secret_key_12345";

const cors = require("cors");
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/project-marketplace", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

// Models
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

const Project = mongoose.model("Project", new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer (file upload) config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes

// User Signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

// Upload Project (with image)
app.post("/api/projects", verifyToken, upload.single("image"), async (req, res) => {
  const { title, description, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
  const project = new Project({
    title,
    description,
    price,
    image: imagePath,
    createdBy: req.userId,
  });
  await project.save();
  res.json(project);
});

// Get all projects
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find().populate("createdBy", "username email");
  res.json(projects);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
