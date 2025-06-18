const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/feedback-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Feedback Schema
const Feedback = mongoose.model("Feedback", {
  course: String,
  faculty: String,
  comments: String,
  rating: Number,
  studentName: String,
});

// POST feedback
app.post("/feedback", async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.send({ message: "Feedback submitted" });
});

// GET all feedbacks
app.get("/feedback", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.send(feedbacks);
});

app.listen(5000, () => console.log("Server running on port 5000"));
