const { createPool } = require('mysql2');

const dev = false;

const pool = createPool({
    host: dev ? process.env.dbHostdev : process.env.dbHostprod,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
    waitForConnections: true,
    multipleStatements: true,
});

exports.db = pool.promise();
