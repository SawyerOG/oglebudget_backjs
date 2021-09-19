const { createPool } = require('mysql2');

console.log('is prod', process.env.dbHost);
console.log(process.env.NODE_ENV);
console.log(process.env.dbUser);

const pool = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
    waitForConnections: true,
    multipleStatements: true,
});

const db = pool.promise();

db.query('SELECT * FROM incomes')
    .then(([rows]) => {
        console.log(rows);
    })
    .catch((err) => {
        console.log('error inside');
        console.log(err);
    });

exports.db = pool.promise();
