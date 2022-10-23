const Logs = require('../model/log')
const User = require('../model/user')
const Item = require('../model/model')
// var name


const logs = async (req,res)=>{
    const { itemid, userid, original_storenumber,present_storenumber } = req.body
    const logs = await Logs.find()
    res.status(200).json({ logs})




}




module.exports = { logs

}