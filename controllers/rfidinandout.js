const { StatusCodes } = require('http-status-codes')
const Logs = require('../model/log')
const Item = require('../model/model')
const User = require('../model/user')
const data = require('./id.json')
//const { logs } = require('./logs')
var name
var id
//yahan error dalna hai if the item is exist
//if the item is already rented
//if the person exist
const rentingtheitem = async (req, res) => {
    // res.send('rent')
    const { itemid, userid, original_storenumber,present_storenumber } = req.body
    
    if (userid){
    const finduser = await User.findOne({ userid },{name:1, _id:0});
    name = finduser.name
    id = userid
    console.log(name)
    if (!finduser) {
        return res.status(400).json('There is no user with this userid')
    }
    res.status(StatusCodes.OK).json({ finduser});

    }
    if(itemid){
    const finditem = await Item.findOne({ itemid });

    if (!finditem) {
        return res.status(400).json('There is no item with this itemid')
    }
    const status = "rented"
    const queryObject = { itemid, status }
    const updatedata = {}
    // queryObject.status = "rented"
    // if (itemid){
    //     queryObject.itemid = itemid
    //     updatedata.itemid = itemid
    //     //queryObject.status = "rented"
    // }
    let isitemrented = await Item.findOne(queryObject)
    if (isitemrented) {
        return res.status(400).json('Item is alreday rented')

    }
    updatedata.status = "rented"
    updatedata.rentee = name
    updatedata.rentee_id = id
    // updatedata.present_storenumber = present_storenumber
    console.log(req.body)
    const product = await Item.findOneAndUpdate({ itemid: itemid }, updatedata, {
        new: true,
        runValidators: true,
    });
    // await Item.findOne({ itemid: itemid }).populate('logs');

    // await Logs.create( req.body )
    await Logs.create(req.body)

    res.status(StatusCodes.OK).json({ product });
}
}


const gettingbackrenteditem = async (req, res) => {
    // res.send('get back')
    // const status = not_rented
    const { itemid,present_storenumber } = req.body
    const result = await Item.findOne({ itemid: itemid });

    if (!result) {
        return res.status(400).json('There is no item with this itemid')
    }
    const updatedata = {}
    updatedata.present_storenumber = present_storenumber
    var material= Object.assign(data, updatedata);//merge the two object
    const product = await Item.findOneAndUpdate({ itemid: itemid }, material, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.OK).json({ product });
}

const maintenance = async (req, res) => {
    // res.send('get back')
    
}


module.exports = {
    rentingtheitem,
    gettingbackrenteditem,
    maintenance
    
}