const { db } = require('../config/db'),
    { DateTime } = require('luxon');

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
			CAST(expense_group.date AS datetime) AS date,
			expenses.amount,
			expense_group.tax,
			expense_group.note,
			expense_types.type,
			expenses.groupID
			FROM expenses
			LEFT JOIN expense_types
				ON expenses.typeID = expense_types.ID
			LEFT JOIN expense_group
				ON expenses.groupID = expense_group.ID
			ORDER BY date DESC
			LIMIT 10;SELECT MAX(ID) AS 'ID' FROM expense_group; SELECT * FROM expense_types;`
        );

        // console.log(rows);

        //Create the obj for expense IDs to group expenses created on the same receipt.
        // console.log(rows);
        const expenseData = {
            expenses: {},
            maxGroupID: rows[1][0].ID,
            expenseTypes: {},
            // expensesCats: {},
        };

        for (let i = 0; i < rows[0].length; i++) {
            const ref = rows[0][i];
            const amt = parseFloat(ref.amount);

            if (expenseData.expenses[ref.groupID]) {
                //Expense that has been handled. Add amount to total and expense to expenses array
                expenseData.expenses[ref.groupID].expenses.push({ type: ref.type, amount: amt });
                expenseData.expenses[ref.groupID].expenseTypes.push(ref.type);
                expenseData.expenses[ref.groupID].total += amt;
            } else {
                expenseData.expenses[ref.groupID] = {
                    total: amt + parseFloat(ref.tax),
                    tax: parseFloat(ref.tax),
                    date: DateTime.fromJSDate(ref.date).toLocaleString(DateTime.DATETIME_SHORT),
                    note: ref.note,
                    expenses: [{ type: ref.type, amount: amt }],
                    expenseTypes: [ref.type],
                };
            }
        }

        for (let i = 0; i < rows[2].length; i++) {
            expenseData.expenseTypes[rows[2][i].type] = rows[2][i].ID;
        }

        // console.log(expenseData);
        // console.log(expenseData.expenses['1'].expenses);

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
