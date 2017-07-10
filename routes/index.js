'use strict';

const express = require('express');
const router = express.Router();

router.get('/', require('./welcome'));
router.get('/login', require('./login'));
router.get('/user', require('./user'));
router.all('/tunnel', require('./tunnel'));
router.get('/list', require('./list'));
router.get('/searchid', require('./searchid'));
router.get('/searchname', require('./searchname'));
router.get('/searchuser', require('./searchuser'));

module.exports = router;