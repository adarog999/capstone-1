const express = require('express')
const app = express()
const cors = require('cors')
const cookieParses = require('cookie-parser')
const bodyParser = require('body-parser')
const PORT = 5000
const userRoute = require('./routes/User')
const api = require('./routes/Api')
const chatRoute = require('./routes/Chat')
const playlist = require('./routes/Playlist')



app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
    ))
    app.use(express.static('public'));
app.use(cookieParses())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',userRoute)
app.use('/api',api)
app.use('/chat',chatRoute)
app.use('/list',playlist)


app.listen(PORT,()=> {
    console.log('running')
})