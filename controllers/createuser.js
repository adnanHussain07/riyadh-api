const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const BadRequestError = require('../errors')

//var useras = []
const createuser = async (req, res, next) => {

  const { userid, name, department, collegeid } = req.body
  if (!collegeid || !department || !name || !userid) {
    return res.status(400).json("Please enter complete information")
  }
  // useras = req.body
  const userNameAlreadyExists = await User.findOne({ userid });
  if (userNameAlreadyExists) {
    //   res.send(email)
    // throw new BadRequestError.BadRequestError('Please provide email and password');
    return res.status(400).json('There is a user with this userid')
    // throw new BadRequestError('Email already exists');

  }
  const isCollegeidExists = await User.findOne({ collegeid });
  if (isCollegeidExists) {
    //   res.send(email)
    // throw new BadRequestError.BadRequestError('Please provide email and password');
    return res.status(400).json('There is a user with this college id')
    // throw new BadRequestError('Email already exists');

  }
  //const job = req.body
  // console.log(req.body)

  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ user })

}
// console.log(useras)
//yahan b error dalna hai
const deleteuser = async (req, res) => {
  const { id: userid } = req.params
  // const { userid: id } = req.body
  // console.log(req.query)
  //console.log(featured)
  const result = await User.findOne({ _id: userid });

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

const showUser = async (req, res) => {

  try {
    const { department, userid, name, pageNo, count, isall } = req.query
    ///console.log(req.query)
    //console.log(featured)
    const queryObject = {}
    //yahan jis feature ko search krogy us feature k products show hongy mere case mein feature (true or false)
    //hain, true search krny pr sirf ture feature waly products result mein aengy
    if (department) {
      queryObject.department = department
    }
    if (userid) {
      queryObject.userid = userid
    }
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' }
    }
    //yahan jis company ka search krogy us company k products show honge
    // if (status) {
    //     queryObject.status = status
    // }
    //yahan jis name se search krogy us name k sary products result mein aengy
    // if (name) {
    //     queryObject.name = { $regex: name, $options: 'i' }
    // }



    const length = await User.countDocuments(queryObject);
    let result = User.find(queryObject).sort({ createdAt: 'desc' });




    if (!isall) {
      const page = Number(pageNo) || 1
      const limit = Number(count) || 10
      // const page = Number(req.query.page) || 1
      // const limit = Number(req.query.limit) || 10
      const skip = (page - 1) * limit

      result = result.skip(skip).limit(limit)
    }

    //console.log(queryObject)
    const users = await result
    res.status(200).json({ users, nbHits: users.length, total: length ? length : 0 })
  } catch (ex) {
    res.status(200).json({ error: "API_CRASHED" })
  }
}

const changeuser = async (req, res) => {
  const { userid, name, department, newuserid } = req.body

  const ifauserisalready = await User.findOne({ userid: newuserid })

  if (ifauserisalready) {
    return res.status(400).json('There is a user with this new userid')
  }

  const user = await User.findOne({ userid })

  if (!user) {
    //   res.send(email)
    // throw new BadRequestError.BadRequestError('Please provide email and password');
    return res.status(400).json('There is no user with this userid')
    // throw new BadRequestError('Email already exists');

  }



  user.userid = newuserid

  await user.save()

  res.status(StatusCodes.OK).json({ msg: "Success! User Rifd Updated" });

}


module.exports = { createuser, deleteuser, showUser, changeuser }