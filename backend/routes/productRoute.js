import express from 'express';
import db from '../postgres_init.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { page = 1, pageSize = 10, minPrice = -1, maxPrice = -1, productString = ''} = req.query;
        const offset = (page - 1) * pageSize;
        const conditions = ['1=1'];
        const params = [];
        let paramIndex = 1;
        let sortStatement = '';

        if (minPrice >= 0) {
            conditions.push(`price >= $${paramIndex++}`);
            params.push(minPrice);
        }
        if (maxPrice >= 0) {
            conditions.push(`price <= $${paramIndex++}`);
            params.push(maxPrice);
        }
        if (productString) {
            conditions.push(`(description LIKE $${paramIndex} OR name LIKE $${paramIndex})`);
            params.push(`%${productString}%`);
            paramIndex++;
        }

        const whereClause = conditions.join(' AND ');

        const countQuery = await db.one(`SELECT COUNT(*) AS total FROM product WHERE ${whereClause}`, params);
        const result = await db.any(`SELECT * FROM product WHERE ${whereClause}
             LIMIT $${paramIndex} OFFSET $${paramIndex + 1}` , [...params, pageSize, offset]);
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
