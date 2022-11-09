const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const {logs}  = require('../controllers/logs');

router.route('/logs').get(authenticateUser, logs)


module.exports = router;
