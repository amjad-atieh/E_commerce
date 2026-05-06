import express, { json } from "express";
import cors from 'cors';
import productRoute from './routes/productRoute.js';

const app = express();
const port = 8000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("backend is working");
});

app.use('/products', productRoute);

app.listen(port, () => {
  console.log("backend is running");
});
