const { StatusCodes } = require('http-status-codes')
const History = require('../model/history')
const Item = require('../model/model')
const User = require('../model/user')
const data = require('./id.json')
//const { logs } = require('./logs')
// var name
// var id
//yahan error dalna hai if the item is exist
//if the item is already rented
//if the person exist
const rentingtheitem = async (req, res) => {
    // res.send('rent')
    const { itemid, userid, original_storenumber,present_storenumber } = req.body
    
    if (userid){
    const finduser = await User.findOne({ userid },{name:1, _id:0});
     rentee = finduser.name
    //id = userid
    console.log(rentee)
    if (!finduser) {
        return res.status(400).json('There is no user with this userid')
    }
    //res.status(StatusCodes.OK).json({ finduser});

    }
    if(itemid){
    const finditem = await Item.findOne({ itemid },{name:1, _id:0});
    const item = finditem.name;

    if (!finditem) {
        return res.status(400).json('There is no item with this itemid')
    }
    const status = "rented"
    const queryObject = { itemid, status }
    const updatedata = {}
    let isitemrented = await Item.findOne(queryObject)
    if (isitemrented) {
        return res.status(400).json('Item is alreday rented')
    }
    // let isitemonmiantenance = await Item.findOne(queryObject)
    // if (isitemonmiantenance) {
    //     return res.status(400).json('Item is on Maintenance')
    // }
    
    // updatedata.rented_at = Date.now()
    updatedata.rented_at = new Date()
    updatedata.rentee = rentee
    updatedata.rentee_id = userid
    updatedata.name = item
    updatedata.status = "rented"
    console.log(item)
    updatedata.present_storenumber = present_storenumber
    console.log(req.body)
    const product = await Item.findOneAndUpdate({ itemid: itemid }, updatedata, {
        new: true,
        runValidators: true,
    });
    // await Item.findOne({ itemid: itemid }).populate('logs');

    // await Logs.create( req.body )
    const mergingobject= Object.assign(req.body, updatedata);//merge the two object

    const history = await History.create( mergingobject )

    res.status(StatusCodes.OK).json({product, history });
}
}


const gettingbackrenteditem = async (req, res) => {
    // res.send('get back')
    // const status = not_rented
    const { itemid,present_storenumber,comment } = req.body
   

    const result = await Item.findOne({ itemid: itemid });

    if (!result) {
        return res.status(400).json('There is no item with this itemid')
    }

    const status = "available"
    const queryObject_for_rented_item = { itemid, status }
    const updatedata_for_cheacking_rented_item = {}
    let isitemrented = await Item.findOne(queryObject_for_rented_item)
    if (isitemrented) {
        return res.status(400).json('Item is not rented')

    }

    const query =  itemid 
    const queryObject = {}
    if(itemid){
        queryObject.itemid = itemid
        queryObject.return_at = null
       
    }
    console.log(queryObject)
    const result2 = await History.findOne(queryObject);
    // const result2 = await History.find({ queryObject},{itemid:1});
    if (!result2) {
        return res.status(400).json('The item is already return')
    }
    // console.log(result2.id)
    //if (result2){
    const id = result2.id
    //}
   
    // const historyCheck = await History.findOne({ queryObject },{ _id:1})
    // var dat = historyCheck._idss
    // console.log(historyCheck._id)
    const updatedata = {}
    updatedata.present_storenumber = present_storenumber
    updatedata.comment = comment
    

    const material= Object.assign(data, updatedata);//merge the two object
    const product = await Item.findOneAndUpdate({ itemid: itemid }, material, {
        new: true,
        runValidators: true,
    });
    const newdata = {}
    newdata.return_at = Date.now()
    newdata.comment = comment
    const history = await History.findOneAndUpdate({_id:id }, newdata, {
        new: true,
        runValidators: true,
    });
    

    res.status(StatusCodes.OK).json({ product, history });
}

const maintenance = async (req, res) => {
     // res.send('rent')
     const { itemid, userid, original_storenumber,present_storenumber } = req.body
    
     if (userid){
     const finduser = await User.findOne({ userid },{name:1, _id:0});
      rentee = finduser.name
     id = userid
     console.log(rentee)
     if (!finduser) {
         return res.status(400).json('There is no user with this userid')
     }
     res.status(StatusCodes.OK).json({ finduser});
 
     }
     if(itemid){
     const finditem = await Item.findOne({ itemid },{name:1, _id:0});
     const item = finditem.name;
 
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
     // updatedata.rented_at = Date.now()
     updatedata.rented_at = new Date()
     updatedata.rentee = rentee
     updatedata.rentee_id = id
     updatedata.name = item
     updatedata.status = "maintenance"
     console.log(item)
     updatedata.present_storenumber = present_storenumber
     console.log(req.body)
     const product = await Item.findOneAndUpdate({ itemid: itemid }, updatedata, {
         new: true,
         runValidators: true,
     });
     // await Item.findOne({ itemid: itemid }).populate('logs');
 
     // await Logs.create( req.body )
     const mergingobject= Object.assign(req.body, updatedata);//merge the two object
 
     const history = await History.create( mergingobject )
 
     res.status(StatusCodes.OK).json({product, history });
 }
    // res.send('get back')
    
}


module.exports = {
    rentingtheitem,
    gettingbackrenteditem,
    maintenance
    
}