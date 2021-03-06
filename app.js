const dotenv = require('dotenv'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    { join, resolve } = require('path');

dotenv.config({ path: './.env' });

const expenses = require('./Routes/expenses'),
    incomes = require('./Routes/incomes'),
    rundown = require('./Routes/monthlyRundown'),
    updateCats = require('./Routes/updateCats');

app.use(cors());
app.use(express.json());
app.use(express.static(join('public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/expenses', expenses);
app.use('/api/incomes', incomes);
app.use('/api/rundown', rundown);
app.use('/api/updateCats', updateCats);

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
