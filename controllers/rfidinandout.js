const { StatusCodes } = require('http-status-codes')
const Item = require('../model/model')
const User = require('../model/user')
const data = require('./id.json')
var name
//yahan error dalna hai if the item is exist
//if the item is already rented
//if the person exist
const rentingtheitem = async (req, res) => {
    // res.send('rent')
    const { itemid, userid } = req.body
    if (userid){
    const finduser = await User.findOne({ userid },{name:1, _id:0});
    name = finduser.name
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
    console.log(req.body)
    const product = await Item.findOneAndUpdate({ itemid: itemid }, updatedata, {
        new: true,
        runValidators: true,
    });
    

    res.status(StatusCodes.OK).json({ product });
}
}


const gettingbackrenteditem = async (req, res) => {
    // res.send('get back')
    // const status = not_rented
    const { itemid } = req.body
    const result = await Item.findOne({ itemid: itemid });

    if (!result) {
        return res.status(400).json('There is no item with this itemid')
    }
    const product = await Item.findOneAndUpdate({ itemid: itemid }, data, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.OK).json({ product });
}


module.exports = {
    rentingtheitem,
    gettingbackrenteditem
}