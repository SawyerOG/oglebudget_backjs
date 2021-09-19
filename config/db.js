const { createPool } = require('mysql2');

const pool = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
    waitForConnections: true,
    multipleStatements: true,
});

exports.db = pool.promise();
