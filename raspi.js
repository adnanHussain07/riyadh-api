const { json } = require('express')
const express = require('express')
let request = require('request');
const app = express()
const port = 5000

app.use(express.json())
var temp



// request.post(
//     // const data = { itemid:"11", userid:"315"}
//     'https://jic.mtaconsulting.org/api/v1/renting',
//     { json: { itemid: '12', userid:'315' } },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//         }
//     }
// );
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/getting', (req, res) => {
    const {itemid } = req.body
    // temp = data;
    console.log(itemid)
    request.post(
      'https://jic.mtaconsulting.org/api/v1/getting',
      { json: { itemid: itemid } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  );

   res.send("getting the item")
// res.sendStatus(200);
})
app.post('/renting', (req, res) => {
    const {itemid } = req.body
    // temp = data;
    console.log(itemid)
    request.post(
      'https://jic.mtaconsulting.org/api/v1/renting',
      { json:  req.body },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  );

   res.send("getting the item")
// res.sendStatus(200);
})
// app.post('/renting', (req, res) => {
//   const data = req.body
//   // temp = data;
//   console.log(data)
//  res.send("renting the item")
// // res.sendStatus(200);
// })
app.post('/data', (req, res) => {
  let {values }= req.body
  let  v  = values[0].v
  let v2 = values[1].vs
  //  let { v } = values[0]
  temp = values[1].v
  console.log(v) 
  console.log(v2)
  // const {data } = req.body
  // console.log(data)

// res.sendStatus(200);
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})