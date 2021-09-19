const { db } = require('../config/db');

exports.getCats = async (req, res) => {
    const { type } = req.query;

    try {
        const [rows] = await db.query(`SELECT * FROM ${type}_types`);

        res.status(200).send({ cats: rows });
    } catch (err) {
        console.error(err);
    }
};
