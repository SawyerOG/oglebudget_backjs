const { db } = require('../config/db');

exports.getRundown = async (req, res) => {
    console.log('route hit');
    try {
        const [rows] = await db.query(`SELECT 
        expense_types.type,
        SUM(amount) AS 'sum'
    FROM expenses
    INNER JOIN expense_group
        ON expenses.groupID = expense_group.ID
    INNER JOIN expense_types
        ON expenses.typeID = expense_types.ID
    GROUP BY expenses.typeID; SELECT SUM(tax) AS 'tax' FROM expense_group;`);
        res.status(200).send({ expenses: rows[0], tax: rows[1][0].tax });
    } catch (err) {
        console.error(err);
    }
};
