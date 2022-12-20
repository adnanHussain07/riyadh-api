const express = require('express');
const router = express.Router();

const {  rentingtheitem,
    gettingbackrenteditem, maintenance, gettingbackrenteditemfromarduino} = require('../controllers/rfidinandout')

const {
        authenticateUser,
        authorizePermissions,
      } = require('../middleware/authentication');


const {getallrenteditems, getallrenteditemsbyeachstore } = require('../controllers/renteditems')

// const use = fn => (req,res,next)=>
//     Promise.resolve(fn(req,res,next).catch(next))

// router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)
router.post('/renting', rentingtheitem);
router.post('/arduinogetting', gettingbackrenteditemfromarduino);
router.post('/getting', gettingbackrenteditem);
router.post('/maintenance', maintenance);
router.route('/static').get(authenticateUser, getallrenteditems)

module.exports = router;
