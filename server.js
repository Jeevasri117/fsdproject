const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/facultyDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Faculty = mongoose.model("Faculty", {
  name: String,
  subject: String,
  hours: Number
});
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.get("/api/faculty", async (req, res) => {
  res.json(await Faculty.find());
});

app.post("/api/faculty", async (req, res) => {
  const data = new Faculty(req.body);
  await data.save();
  res.json(data);
});

app.put("/api/faculty/:id", async (req, res) => {
  const updated = await Faculty.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/api/faculty/:id", async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));