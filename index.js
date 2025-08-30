const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/mangroveApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: { type: String, enum: ["community", "NGO", "admin"], default: "community" },
  points: { type: Number, default: 0 },
  badges: [String],
});

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lat: Number,
  lng: Number,
  photoUrl: String,
  category: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

const AuditLogSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  action: String,
  reviewer: String,
  timestamp: { type: Date, default: Date.now },
});

// Models
const User = mongoose.model("User", UserSchema);
const Report = mongoose.model("Report", ReportSchema);
const AuditLog = mongoose.model("AuditLog", AuditLogSchema);

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

// Routes
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, photoUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

app.post("/api/reports", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.json({ success: true, report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get("/api/reports", async (req, res) => {
  const reports = await Report.find().populate("userId");
  res.json(reports);
});

app.put("/api/reports/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const log = new AuditLog({
      reportId: req.params.id,
      action: req.body.status,
      reviewer: req.body.reviewer || "system",
    });
    await log.save();
    res.json({ success: true, report, log });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
