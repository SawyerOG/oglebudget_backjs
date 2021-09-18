const dotenv = require('dotenv'),
    cors = require('cors'),
    express = require('express'),
    app = express();

dotenv.config({ path: './.env' });

const expenses = require('./Routes/expenses'),
    incomes = require('./Routes/incomes'),
    rundown = require('./Routes/monthlyRundown');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Well done!');
});

app.use('/api/expenses', expenses);
app.use('/api/incomes', incomes);
app.use('/api/rundown', rundown);

app.listen(4000, () => console.log('running'));
