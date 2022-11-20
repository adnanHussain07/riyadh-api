const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const  { dashboard } = require('../controllers/dashboard')


// const use = fn => (req,res,next)=>
//     Promise.resolve(fn(req,res,next).catch(next))

// router.post('/create',authenticateUser, createuser)
// router.delete('/create',authenticateUser, deleteuser)

router.get('/dashboard', authenticateUser, dashboard);


module.exports = router;
