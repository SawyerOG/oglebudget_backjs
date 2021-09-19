const dotenv = require('dotenv'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    { join, resolve } = require('path');

dotenv.config({ path: './.env' });

const expenses = require('./Routes/expenses'),
    incomes = require('./Routes/incomes'),
    rundown = require('./Routes/monthlyRundown');

app.use(cors());
app.use(express.json());
app.use(express.static(join('public')));

app.use('/api/expenses', expenses);
app.use('/api/incomes', incomes);
app.use('/api/rundown', rundown);

app.use((req, res) => {
    res.sendFile(resolve(resolve(), 'public', 'index.html'));
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    console.log(error);
    res.status(error.code || 400).json({ message: error.message || 'An unkown error occured' });
});

app.listen(4000, () => console.log('running'));
