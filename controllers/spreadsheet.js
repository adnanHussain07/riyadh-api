const Item = require('../model/model')
var XLSX = require('xlsx');
const History = require('../model/history')
// var path = require('path');
// const {Parser} = require('json2csv')

const spreadsheet = async (req, res) => {
  const {
    type,
    SerialNo,
    status,
    present_storenumber,
    rentee,
    name,
    itemid,
    rentee_id
  } = req.query
  const queryObject = {};
  if (type && type == 'logs') {
    if (SerialNo) {
      queryObject.SerialNo = SerialNo
    }
    if (itemid) {
      queryObject.itemid = itemid
    }
    if (rentee) {
      queryObject.rentee = rentee
    }
    if (rentee_id) {
      queryObject.rentee_id = rentee_id
    }
    if (name) {
      queryObject.name = name
    }
  }
  else {
    if (SerialNo) {
      queryObject.SerialNo = SerialNo
    }
    if (present_storenumber) {
      queryObject.present_storenumber = present_storenumber
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
  }

  let result = type && type == 'logs' ? History.find(queryObject) : Item.find(queryObject)
  const products = await result
  // const json2csvParser = new Parser()
  // const csv = json2csvParser.parse(products)
  var wb = XLSX.utils.book_new(); //new workbook
  var temp = JSON.stringify(products);
  temp = JSON.parse(temp);
  var ws = XLSX.utils.json_to_sheet(temp);
  var down = type && type == 'logs' ? './logsdata.xlsx' : './itemdata.xlsx'
  console.log(__dirname)
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  XLSX.writeFile(wb, down);
  res.download(down);
  //    res.attachment(down)
  //    res.status(200).send(XLSX.writeFile(wb,down))
  //    res.send("File Downloaded")


  // Item.find((queryObject), function (err,data){
  //     if(err){
  //         console.log(err)
  //     }else{
  //         var temp = JSON.stringify(data);
  //         temp = JSON.parse(temp);
  //         var ws = XLSX.utils.json_to_sheet(temp);
  //         var down = 'E:/CV/exportdata.xlsx'
  //        // C:/Users/Hussain Computer/Downloads/Documents
  //         console.log(__dirname)
  //        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
  //        XLSX.writeFile(wb,down);
  //        res.download(down);
  //     }
  // });
  // console.log(__dirname)
  // res.send("spreadsheet")
}

module.exports = {
  spreadsheet
};
