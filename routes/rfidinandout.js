const express = require('express');
const router = express.Router();

const {  rentingtheitem,
    gettingbackrenteditem, } = require('../controllers/rfidinandout')


const {getallrenteditems, getallrenteditemsbyeachstore } = require('../controllers/renteditems')

// const use = fn => (req,res,next)=>
//     Promise.resolve(fn(req,res,next).catch(next))

// router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)
router.post('/renting', rentingtheitem);
router.post('/getting', gettingbackrenteditem);
router.route('/static').get(getallrenteditems)

module.exports = router;
