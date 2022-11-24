const { StatusCodes } = require('http-status-codes')
const Item = require('../model/model')
const BadRequestError = require('../errors')


const createitem = async (req, res, next) => {

  const { itemid, original_storenumber, name } = req.body
  if (!original_storenumber || !itemid || !name){
    return res.status(400).json("Please enter complete information")
 }
  const itemNameAlreadyExists = await Item.findOne({ itemid });
  if (itemNameAlreadyExists) {
    //   res.send(email)
    // throw new BadRequestError.BadRequestError('Please provide email and password');
    return res.status(400).json('There is a item with this itemid')
    // throw new BadRequestError('Email already exists');

  }
  //const job = req.body
  // console.log(req.body)
  const updatedata = {}
  updatedata.present_storenumber = original_storenumber
  present_storenumber = original_storenumber
  var material = Object.assign(req.body, updatedata);//merge the two object

  const item = await Item.create(material)
  res.status(StatusCodes.CREATED).json({ item })

}
//yahan b error dalna hai
const deleteitem = async (req, res) => {
  const { id: itemId } = req.params
  // console.log(req.query)
  //console.log(featured)
  const result = await Item.findOne({ _id: itemId })

  if (!result) {
    return res.status(400).json('There is no item with this itemid')
  }

  await result.remove();
  // const page = Number(req.query.page) || 1
  // const limit = Number(req.query.limit) || 10
  // const skip = (page - 1)*limit

  // result = result.skip(skip).limit(limit)

  //console.log(queryObject)
  // const products = await result
  res.status(200).json('item is removed')
}


module.exports = { createitem, deleteitem }