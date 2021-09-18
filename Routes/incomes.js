const { Router } = require('express'),
    r = Router();

const { createIncome, getRecentIncomes } = require('../Controllers/incomes');

r.get('/getRecentIncomes', getRecentIncomes);

r.post('/createIncome', createIncome);

module.exports = r;
