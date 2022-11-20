const { StatusCodes } = require('http-status-codes')
const Item = require('../model/model')
const { MongoClient } = require("mongodb");

const dashboard = async (req, res) => {

    // res.send("dash")
    const query = { status: "rented" };
    const countTotalRented = await Item.find(query).countDocuments().exec()

    const query2 = { status: "available" };
    const countTotalNotRented = await Item.find(query2).countDocuments().exec()

    const query3 = { status: "available", present_storenumber: "1" };
    const countNotRentedStoreOne = await Item.find(query3).countDocuments().exec()

    const query4 = { status: "rented", present_storenumber: "1" };
    const countRentedStoreOne = await Item.find(query4).countDocuments().exec()
  
    const query5 = { status: "available", present_storenumber: "2" };
    const countNotRentedStoreTwo = await Item.find(query5).countDocuments().exec()
  
    const query6 = { status: "rented", present_storenumber: "2" };
    const countRentedStoreTwo = await Item.find(query6).countDocuments().exec()

    const query7 = { status: "available", present_storenumber: "3" };
    const countNotRentedStoreThree = await Item.find(query7).countDocuments().exec()
  
    const query8 = { status: "rented", present_storenumber: "3" };
    const countRentedStoreThree = await Item.find(query8).countDocuments().exec()

    const query9 = { status: "available", present_storenumber: "4" };
    const countNotRentedStoreFour = await Item.find(query9).countDocuments().exec()
  
    const query10 = { status: "rented", present_storenumber: "4" };
    const countRentedStoreFour = await Item.find(query10).countDocuments().exec()

    res.status(StatusCodes.OK).json({ countTotalNotRented, countTotalRented ,
        countNotRentedStoreOne ,countRentedStoreOne ,countNotRentedStoreTwo, 
        countRentedStoreTwo, countNotRentedStoreThree ,countRentedStoreThree,
        countNotRentedStoreFour ,countRentedStoreFour });
}

module.exports = {
    dashboard
}