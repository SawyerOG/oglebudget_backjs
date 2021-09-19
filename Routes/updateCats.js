const { Router } = require('express'),
    r = Router();

const { getCats } = require('../Controllers/updateCats');

r.get('/getCats', getCats);

module.exports = r;
