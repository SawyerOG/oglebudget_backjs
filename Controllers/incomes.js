const { db } = require('../config/db'),
    { DateTime } = require('luxon');

exports.createIncome = async (req, res) => {
    console.log(req.body);

    const { income, tax, typeID, note, date } = req.body;

    try {
        const [rows] = await db.query(`INSERT INTO incomes (income, tax, typeID, date, note) VALUES (
            ${income}, ${tax}, ${typeID}, '${DateTime.fromISO(date).toSQLDate()}', '${note}'
        )`);

        const ID = rows.insertId;
        res.status(201).send({ ID });
    } catch (err) {
        console.error(err);
    }
};

exports.getRecentIncomes = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT
        incomes.ID,
        income,
        tax,
        income_types.type AS 'type',
        DATE_FORMAT(date, '%m/%d/%Y') AS 'date',
        note
        FROM incomes
        INNER JOIN income_types
            ON incomes.typeID = income_types.ID
        ORDER BY date LIMIT 10; SELECT * FROM income_types;`);

        const typeIDs = {};
        const types = [];

        for (let i = 0; i < rows[1].length; i++) {
            typeIDs[rows[1][i].type] = rows[1][i].ID;
            types.push(rows[1][i].type);
        }

        res.status(200).send({ recentIncomes: rows[0], typeIDs, types });
    } catch (err) {
        console.error(err);
    }
};

// CREATE TABLE `oglebudget`.`income_types` (
//     `ID` INT NOT NULL AUTO_INCREMENT ,
//     `type` VARCHAR(50) NOT NULL,
//     PRIMARY KEY (`ID`)
// ) ENGINE = InnoDB

// CREATE TABLE `oglebudget`.`incomes`
// ( `ID` INT NOT NULL AUTO_INCREMENT ,
// `income` DECIMAL((5,2)) NULL ,
// `tax` DECIMAL((5,2)) NULL ,
// `typeID` INT NULL ,
// `date` DATE NULL ,
// `note` VARCHAR(255) NULL ,
// PRIMARY KEY (`ID`)
// FOREIGN KEY (`typeID`) REFERENCES `oglebudget`.`income_types` (`ID`)
// ) ENGINE = InnoDB;
