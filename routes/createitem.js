const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const  { createitem, deleteitem } = require('../controllers/createitem')

// const use = fn => (req,res,next)=>
//     Promise.resolve(fn(req,res,next).catch(next))

// router.post('/create', [authenticateUser, authorizePermissions('admin')], createitem)
router
  .route('/create')
  .post(authenticateUser, createitem)
  router
  .route('/create')
  .delete(authenticateUser, deleteitem)

module.exports = router;
