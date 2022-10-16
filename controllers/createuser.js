const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const  BadRequestError  = require('../errors')

//var useras = []
const createuser = async(req,res,next)=>{
  
    const {userid} = req.body
   // useras = req.body
    const userNameAlreadyExists = await User.findOne({ userid });
    if (userNameAlreadyExists) {
      //   res.send(email)
      // throw new BadRequestError.BadRequestError('Please provide email and password');
    return res.status(400).json('There is a user with this userid')
      // throw new BadRequestError('Email already exists');
      
    }  
    //const job = req.body
    // console.log(req.body)
    
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({user} )

}
// console.log(useras)
//yahan b error dalna hai
const deleteuser = async(req,res)=>{
    const { userid: id } = req.body
    // console.log(req.query)
    //console.log(featured)
    const result = await User.findOne({ userid: id });

  if (!result) {
    return res.status(400).json('There is no user with this userid')
  }

  await result.remove();
    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 10
    // const skip = (page - 1)*limit
    
    // result = result.skip(skip).limit(limit)

    //console.log(queryObject)
    // const products = await result
    res.status(200).json('User is removed')
}


module.exports ={ createuser, deleteuser }