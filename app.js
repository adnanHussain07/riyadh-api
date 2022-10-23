//console.log('E-Commerce API');
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser');


const connectDB = require('./db/connect')

//routers
const  rfidinandout = require('./routes/rfidinandout')
const  createitem = require('./routes/createitem')
const  createuser = require('./routes/createuser')
const authRouter = require('./routes/userForWeb');


//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


//adding cors
app.use(cors());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:4200');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

///app.use(morgan('tiny'))


app.get('/', (req,res)=>{
    res.send('hello store app is running')
})
//controllers
app.use('/api/v1', rfidinandout)
app.use('/api/v1/item', createitem)
app.use('/api/v1/user', createuser)
app.use('/api/v1/auth',authRouter)



app.use(notFoundMiddleware)
app.use(errorMiddleware)

// app.use(function(err,req,res,next){
//     res.status(500).send({msg:'something went wrong'})
// })

const port = 3001 || process.env.PORT

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening to the ${port}`)
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

start()
