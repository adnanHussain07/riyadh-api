const Item = require('../model/model')
var XLSX = require('xlsx');
const History = require('../model/history')
// var path = require('path');
// const {Parser} = require('json2csv')

const spreadsheet = async (req,res) =>{
  
    
        //yahan jis feature ko search krogy us feature k products show hongy mere case mein feature (true or false)
        //hain, true search krny pr sirf ture feature waly products result mein aengy
        const { type} = req.query
      //   const { SerialNo, status, present_storenumber, rentee, name, itemid, pageNo, count,  } = req.query
        ///console.log(req.query)
        //console.log(featured)
      //   const queryObject = {}
      //   //yahan jis feature ko search krogy us feature k products show hongy mere case mein feature (true or false)
      //   //hain, true search krny pr sirf ture feature waly products result mein aengy
      //   if (SerialNo){
      //       queryObject.SerialNo = SerialNo
      //   }
      //   if (present_storenumber) {
      //       queryObject.present_storenumber = present_storenumber
      //   }
      //   if (itemid) {
      //       queryObject.itemid = itemid
      //   }
      //   if (rentee) {
      //       queryObject.rentee = rentee
      //   }
      //   //yahan jis company ka search krogy us company k products show honge
      //   if (status) {
      //       queryObject.status = status
      //   }
      //   //yahan jis name se search krogy us name k sary products result mein aengy
      //   if (name) {
      //       queryObject.name = { $regex: name, $options: 'i' }
      //   }
      

        
        let result = type && type == 'logs' ? History.find({}) : Item.find({})
      


      //   const page = Number(pageNo) || 1
      //   const limit = Number(count) || 10
      //   const skip = (page - 1) * limit

      //   result = result.skip(skip).limit(limit)

        //console.log(queryObject)
        const products = await result
        // res.status(200).json({ products })
    // console.log(item)
    // const json2csvParser = new Parser()
    // const csv = json2csvParser.parse(products)
    var wb = XLSX.utils.book_new(); //new workbook
    var temp = JSON.stringify(products);
    temp = JSON.parse(temp);
    var ws = XLSX.utils.json_to_sheet(temp);
    var down =type && type == 'logs' ?'./logsdata.xlsx' : './itemdata.xlsx'
           // C:/Users/Hussain Computer/Downloads/Documents
            console.log(__dirname)
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
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
  