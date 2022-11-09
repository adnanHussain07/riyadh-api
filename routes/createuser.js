const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const  { createuser, deleteuser, showUser, changeuser } = require('../controllers/createuser')


// const use = fn => (req,res,next)=>
//     Promise.resolve(fn(req,res,next).catch(next))

// router.post('/create',authenticateUser, createuser)
// router.delete('/create',authenticateUser, deleteuser)

router
  .route('/create')
  .post(authenticateUser, createuser)
router
  .route('/create')
  .delete(authenticateUser, deleteuser)
  router
  .route('/create')
  .patch(authenticateUser, changeuser)  
router
  .route('/create')
  .get(authenticateUser, showUser)  

module.exports = router;
