const { Router } = require('express'),
    r = Router();

const { getRundown } = require('../Controllers/monthlyRundown');

r.get('/monthlyRundown', getRundown);

module.exports = r;
