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

exports.db = pool.promise();
