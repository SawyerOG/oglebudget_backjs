const { Router } = require('express'),
    r = Router();

const { createExpense, getRecentExpenses, deleteExpense } = require('../Controllers/expenses');

r.get('/getRecentExpenses', getRecentExpenses);

r.post('/createExpense', createExpense);

r.delete('/delete/:ID', deleteExpense);

module.exports = r;
