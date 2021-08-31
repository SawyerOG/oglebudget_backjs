const { db } = require('../config/db');

exports.getRecentExpenses = async (req, res) => {
    /**
     * While getting the recent expenses also get the recent ID for the group ID
     * to create new expenses with.
     * Also get the expense types
     */

    try {
        const [rows] = await db.query(
            `SELECT 
			expenses.ID,
			expenses.date,
			expenses.amount,
			expenses.tax,
			expenses.note,
			expense_types.type,
			expenses.groupID
			FROM expenses
			LEFT JOIN expense_types
				ON expenses.typeID = expense_types.ID
			ORDER BY date DESC
			LIMIT 10;SELECT MAX(ID) AS 'ID' FROM expense_group; SELECT * FROM expense_types;`
        );

        console.log(rows);

        //Create the obj for expense IDs to group expenses created on the same receipt.
        // console.log(rows);
        const expenseData = {
            expenses: {},
            maxGroupID: rows[1][0].ID,
            expenseTypes: rows[2],
        };

        for (let i = 0; i < rows[0].length; i++) {
            expenseData.expenses[rows[0][i].groupID]
                ? expenseData.expenses[rows[0][i].groupID].push(rows[0][i])
                : (expenseData.expenses[rows[0][i].groupID] = [rows[0][i]]);
        }

        console.log(expenseData);

        res.status(200).send(expenseData);
    } catch (err) {
        console.log(err);
    }
};

exports.create = async (req, res) => {
    console.log('this route has been hit!');
    const [rows] = await db.query(`SELECT MAX(ID) FROM expense_group;`);

    console.log(rows);
    console.log(req.body);

    res.status(200).send();
};
