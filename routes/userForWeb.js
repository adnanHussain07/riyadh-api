const express = require('express');
const router = express.Router();

const { register, login, logout, showCurrentUser, updatepassword, showRegisterUsers , 
deleteuser, changeRegsiterUser } = require('../controllers/userForWeb');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.post('/register',authenticateUser, authorizePermissions('admin' || 'superadmin'), register);
router.post('/login', login);
router.get('/logout',logout);
router.get('/showregisterusers',authenticateUser, showRegisterUsers);
router.get('/showMe', authenticateUser, showCurrentUser)
router.patch('/updatepassword', authenticateUser, updatepassword)
router.delete('/showregisterusers/:id',authenticateUser, deleteuser)
router.patch('/showregisterusers/:id',authenticateUser, changeRegsiterUser)


module.exports = router;
