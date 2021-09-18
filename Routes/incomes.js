const { Router } = require('express'),
    r = Router();

const { createIncome, getRecentIncomes, deleteIncome } = require('../Controllers/incomes');

r.get('/getRecentIncomes', getRecentIncomes);

r.post('/createIncome', createIncome);

r.delete('/deleteIncome/:ID', deleteIncome);

module.exports = r;
