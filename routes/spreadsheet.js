const express = require('express');
const router = express.Router();
const { spreadsheet } = require('../controllers/spreadsheet');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');


router.get('/spreadsheet', authenticateUser, spreadsheet);



module.exports = router;