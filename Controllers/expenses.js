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
			FROM expense_group
			LEFT JOIN expenses
				ON expense_group.ID = expenses.groupID
			LEFT JOIN expense_types
				ON expenses.typeID = expense_types.ID
			ORDER BY expense_group.date DESC
			LIMIT 10;SELECT MAX(ID) AS 'ID' FROM expense_group; SELECT * FROM expense_types;`
        );

        // console.log(rows);

        //Create the obj for expense IDs to group expenses created on the same receipt.
        // console.log(rows);
        const expenseData = {
            expenses: [],
            maxGroupID: rows[1][0].ID,
            expenseTypes: {},
            // expensesCats: {},
        };

        let curExp = { groupID: 0, expenses: [], expenseTypes: [], total: 0, tax: 0, note: '' };

        for (let i = 0; i < rows[0].length; i++) {
            const ref = rows[0][i];

            if (curExp.groupID === ref.groupID) {
                curExp.expenses.push({ type: ref.type, amount: ref.amount });
                curExp.expenseTypes.push(ref.type);
                curExp.total += parseFloat(ref.amount);
            } else {
                //New expense goup

                if (curExp.expenses.length > 0) {
                    curExp.total = parseFloat(curExp.total.toFixed(2));
                    expenseData.expenses.push(curExp);
                    curExp = { groupID: 0, expenses: [], expenseTypes: [], total: 0, tax: 0, note: '' };
                }
                curExp.groupID = ref.groupID;
                curExp.expenses.push({ type: ref.type, amount: ref.amount });
                curExp.expenseTypes.push(ref.type);
                curExp.total = parseFloat(ref.amount) + parseFloat(ref.tax);
                curExp.note = ref.note;
                curExp.tax = ref.tax;
                curExp.date = DateTime.fromJSDate(ref.date).toLocaleString(DateTime.DATE_SHORT);
            }
        }

        for (let i = 0; i < rows[2].length; i++) {
            expenseData.expenseTypes[rows[2][i].type] = rows[2][i].ID;
        }

        res.status(200).send(expenseData);
    } catch (err) {
        console.log(err);
    }
};

exports.createExpense = async (req, res) => {
    const { date, note, tax, expenses } = req.body;

    const saveDate = DateTime.fromISO(date).toSQLDate();
    const newDate = DateTime.fromISO(date).toLocaleString();

    const insertGroupID = `INSERT INTO expense_group (date, tax, note) VALUES ('${saveDate}', ${tax}, '${note}');`;

    try {
        const [rows] = await db.query(insertGroupID);
        const groupID = rows.insertId;
        const eees = [];
        for (let i = 0; i < expenses.length; i++) {
            eees.push(`${expenses[i].amount}, ${expenses[i].typeID}, ${groupID}`);
        }
        const insertExpenses = `INSERT INTO expenses (amount, typeID, groupID) VALUES (${eees.join('), (')});`;

        await db.query(insertExpenses);
        res.status(200).json({ groupID, newDate });
    } catch (err) {
        console.error(err);
    }
};

exports.deleteExpense = async (req, res) => {
    const { ID } = req.params;

    try {
        await db.query(`DELETE FROM expense_group WHERE ID = ${ID}`);
        res.status(200).send();
    } catch (err) {
        console.error(err);
    }
};
