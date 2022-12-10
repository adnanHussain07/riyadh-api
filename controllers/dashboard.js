const { StatusCodes } = require('http-status-codes')
const Item = require('../model/model')
const { MongoClient } = require("mongodb");

const dashboard = async (req, res) => {

    // res.send("dash")
    const query = { status: "rented" };
    const countTotalRented = await Item.find(query).countDocuments().exec()

    const query2 = { status: "available" };
    const countTotalNotRented = await Item.find(query2).countDocuments().exec()

    const queryMainAll = { status: "maintenance" };
    const countTotalMaintained = await Item.find(queryMainAll).countDocuments().exec()

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

    const query11 = { status: "maintenance", present_storenumber: "1" };
    const countMaintenanceStoreOne = await Item.find(query11).countDocuments().exec()

    const query12 = { status: "maintenance", present_storenumber: "2" };
    const countMaintenanceStoreTwo = await Item.find(query12).countDocuments().exec()

    const query13 = { status: "maintenance", present_storenumber: "3" };
    const countMaintenanceStoreThree = await Item.find(query13).countDocuments().exec()

    const query14 = { status: "maintenance", present_storenumber: "4" };
    const countMaintenanceStoreFour = await Item.find(query14).countDocuments().exec()

    res.status(StatusCodes.OK).json({ countTotalNotRented, countTotalRented ,
        countNotRentedStoreOne ,countRentedStoreOne ,countNotRentedStoreTwo, 
        countRentedStoreTwo, countNotRentedStoreThree ,countRentedStoreThree,
        countNotRentedStoreFour ,countRentedStoreFour,countMaintenanceStoreOne,
        countMaintenanceStoreTwo, countMaintenanceStoreThree, countMaintenanceStoreFour, countTotalMaintained });
}

module.exports = {
    dashboard
}