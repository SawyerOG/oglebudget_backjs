const { createPool } = require('mysql2');

const prod = process.NODE_ENV === 'production';

const pool = createPool({
    host: prod ? process.env.dbHostdev : process.env.dbHostprod,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
    waitForConnections: true,
    multipleStatements: true,
});

exports.db = pool.promise();
