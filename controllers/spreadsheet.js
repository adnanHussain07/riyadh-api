const Item = require('../model/model')
var XLSX = require('xlsx');


const spreadsheet = async (req,res) =>{
    console.log('spreadsheet')
    const { status, present_storenumber, rentee, name, itemid, pageNo, count,  } = req.query
    const item = Item.find(req.query)
    var wb = XLSX.utils.book_new(); //new workbook

    Item.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/public/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
    console.log(__dirname)
    res.send("spreadsheet")
    
  
  
  }
  
  module.exports = {
    spreadsheet
  };
  