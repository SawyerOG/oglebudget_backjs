const { db } = require('../config/db');

exports.getRecentExpenses = async (req, res) => {
	/**
	 * While getting the recent expenses also get the recent ID for the group ID
	 * to create new expenses with.
	 * Also get the expense types
	 */

	try {
		const [rows] = await db.query(
			`SELECT * FROM expenses ORDER BY date DESC LIMIT 10; SELECT MAX(ID) AS 'ID' FROM expense_group; SELECT * FROM expense_types;`
		);

        //Create the obj for expense IDs

        for (const i = 0; i <= row[0].length; i++) {

        }

		const expenseData = {

        };

		console.log(rows);

		res.status(200).send(rows);
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
