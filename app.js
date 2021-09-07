const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();

dotenv.config({ path: './.env' });

const expenses = require('./Routes/expenses');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Well done!');
});

app.use('/api/expenses', expenses);

app.listen(4000, () => console.log('running'));
