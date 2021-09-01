const { Router } = require('express'),
	r = Router();

const { create, getRecentExpenses } = require('../Controllers/expenses');

r.get('/getRecentExpenses', getRecentExpenses);

r.post('/createExpense', create);

module.exports = r;
