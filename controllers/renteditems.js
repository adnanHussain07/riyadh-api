const { StatusCodes } = require('http-status-codes')
const Item = require('../model/model')

const getallrenteditems = async (req, res) => {
    const { status, storenumber, rentee, name, itemid, pageNo, count } = req.query
    ///console.log(req.query)
    //console.log(featured)
    const queryObject = {}
    //yahan jis feature ko search krogy us feature k products show hongy mere case mein feature (true or false)
    //hain, true search krny pr sirf ture feature waly products result mein aengy
    if (storenumber) {
        queryObject.storenumber = storenumber
    }
    if (itemid) {
        queryObject.itemid = itemid
    }
    if (rentee) {
        queryObject.rentee = rentee
    }
    //yahan jis company ka search krogy us company k products show honge
    if (status) {
        queryObject.status = status
    }
    //yahan jis name se search krogy us name k sary products result mein aengy
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    // if (numericFilters){
    //     const operatorMap = {
    //         '>': '$gt',
    //         '>=': '$gte',
    //         '=': '$eq',
    //         '<': '$lt',
    //         '<=': '$lte',
    //       };
    //       const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    //       let filters = numericFilters.replace(
    //         regEx,
    //         (match) => `-${operatorMap[match]}-`
    //       );
    //       const options = ['price', 'rating'];
    // filters = filters.split(',').forEach((item) => {
    //   const [field, operator, value] = item.split('-');
    //   if (options.includes(field)) {
    //     queryObject[field] = { [operator]: Number(value) };
    //   }
    // });
    // }

    const length = await Item.countDocuments(queryObject);
    let result = Item.find(queryObject)
    //yahan sorting ho ri hai sary products ascending aur descending order mein by price ya by name search krny
    //pr
    // if (sort){
    //     const sortList = sort.split(',').join(' ') 
    //     result = result.sort(sortList)
    // }
    // else{
    //     result = result.sort('createdAt')
    // }
    //yahan jo field search krogy wahi show hoga sirf agr company search kro to sirf companies aengi ya product
    //ya price wagera show no hogi on companies
    // if (fields){
    //     const fieldsList = fields.split(',').join(' ')
    //     result = result.select(fieldsList)
    // }


    const page = Number(pageNo) || 1
    const limit = Number(count) || 10
    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    //console.log(queryObject)
    const products = await result
    res.status(200).json({ products, nbHits: products.length, total: length ? length : 0 })
}

const getallrenteditemsbyeachstore = async (req, res) => {
    // const item = await Item.create(req.body)

    // res.status(StatusCodes.CREATED).json({item} )
}


module.exports = { getallrenteditems, getallrenteditemsbyeachstore }