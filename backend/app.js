import express from "express";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("backend is working");
});

app.listen(port, () => {
  console.log("backend is running");
});
