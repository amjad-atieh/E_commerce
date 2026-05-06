import express from 'express';
import db from '../postgres_init.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const offset = (page - 1) * pageSize;
        const countQuery = await db.one('SELECT COUNT(*) AS total FROM product');
        const result = await db.any('SELECT * FROM product LIMIT $1 OFFSET $2', [pageSize, offset]);
        if (result.length > 0) {
            res.send({
                payload: result,
                count: Number(countQuery.total),
                hasPrev: (page > 1) ? true : false, 
                hasNext: (page * pageSize < countQuery.total) ? true : false,
                pageCount:  Math.ceil(Number(countQuery.total / pageSize))

            });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

router.get("/:id", async (req, res) => {
    try {
        const result = await db.one('SELECT * FROM product WHERE id = $1', req.params.id);
        res.send(result);
        } catch (error) {
        res.status(500).send({error: error.message});
    }
});


export default router;
