import express, { json } from "express";
import db from './postgres_init.js';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("backend is working");
});

app.get("/products", async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query; // Default values if not provided
        const offset = (page - 1) * pageSize;
        const countQuery = await db.one('SELECT COUNT(*) AS total FROM product');
        const result = await db.any('SELECT * FROM product LIMIT $1 OFFSET $2', [pageSize, offset]);
        if (result.length > 0) {
            res.send({
                payload: result,
                count: Number(countQuery.total),// how many records are in the database
                hasPrev: (page > 1) ? true : false, 
                hasNext: (page * pageSize < countQuery.total) ? true : false,
                pageCount:  Math.ceil(Number(countQuery.total / pageSize)) //how many pages do we have (ceiling)

            });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const result = await await db.one('SELECT * FROM product WHERE id = $1', req.params.id);
        res.send(result);
        } catch (error) {
        res.status(500).send({error: error.message});
    }
});

app.listen(port, () => {
  console.log("backend is running");
});
