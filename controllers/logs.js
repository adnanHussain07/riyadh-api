const History = require('../model/history')
const User = require('../model/user')
const Item = require('../model/model')
// var name


const logs = async (req,res)=>{
    // const { itemid, userid, original_storenumber,present_storenumber } = req.body
    // const logs = await Logs.find()
    const history = await History.create(req.body)
    res.status(200).json({ history})




}




module.exports = { logs

}