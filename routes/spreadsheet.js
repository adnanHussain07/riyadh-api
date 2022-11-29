const express = require('express');
const router = express.Router();
const { spreadsheet } = require('../controllers/spreadsheet');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

// authenticateUser,
router.get('/spreadsheet',  spreadsheet);



module.exports = router;