const User = require('../model/userForWeb');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
  
  const { email, name, password,role  } = req.body;
  if (!email || !name || !password || !role){
    return res.status(400).json("Please enter complete information")
 }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(400).json('Email already exists')

    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  // const isFirstAccount = (await User.countDocuments({})) === 0;
  // const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });

  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ name });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).json({error: 'Please provide email and password'})
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({error: 'No user with this name'})
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(200).json({error: 'Invalid Credentials'})
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const showCurrentUser = async (req,res) => {
  res.status(StatusCodes.OK).json({user:req.user})
}

const updatepassword = async (req,res) => {
  const {oldpassword, newpassword} = req.body
  if (!oldpassword || !newpassword) {
    return res.status(400).json({error: 'Please provide both values'})
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({_id: req.user.userId})
  // console.log(user)
  // if (user){
  //   const id = user.id
  //   }

  const isPasswordCorrect = await user.comparePassword(oldpassword);

  if (!isPasswordCorrect){
    return res.status(401).json({error: 'Old Password is Wrong'})

  }

  user.password = newpassword

  await user.save()

  res.status(StatusCodes.OK).json({ msg:"Success! Password Updated" });

}

const showRegisterUsers = async (req,res) =>{
//   try {
    const {  name,  pageNo, count } = req.query
   
    const queryObject = {}
    
   
   
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
   
    
  

    const length = await User.countDocuments(queryObject);
    let result = User.find(queryObject).sort({ createdAt: 'desc' });
    
   


    const page = Number(pageNo) || 1
    const limit = Number(count) || 10
    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

//     //console.log(queryObject)
    const user = await result
    res.status(200).json({ user, nbHits: user.length, total: length ? length : 0 })
// } catch (ex) {
//     res.status(200).json({ error: "API_CRASHED" })

}

const deleteuser = async (req,res) =>{
  const { id:userId } = req.params

  const user = await User.findOne({_id:userId})

  if (!user){
    return res.status(401).json("No user with this ID")

  }
  const rol = await User.findOne({_id:userId},{role:1, _id:0})
  console.log(rol.role)

  if (rol.role == "superadmin"){
    return res.status(200).json({ msg:"Success! Super Admin cannot be Deleted"})
  }
  
  await user.remove()
  res.status(200).json({ msg:"Success! Register User Removed"})

}

const changeRegsiterUser = async (req,res) =>{
  const { id:userId } = req.params
  console.log(req.params)
  const {email, password, name} = req.body
  const user = await User.findOne({_id:userId})

  if (!user){
    return res.status(401).json("No user with this ID")

  }

  user.password = password
  user.name = name
  user.email = email
  await user.save()

  res.status(200).json({ msg:"Success! Register User Changed"})


}

module.exports = {
  register,
  login,
  logout,
  showCurrentUser,
  updatepassword,
  showRegisterUsers,
  deleteuser,
  changeRegsiterUser
};
