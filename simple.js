const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/', (req, res) => {
    const data = req.query
    console.log(data)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})