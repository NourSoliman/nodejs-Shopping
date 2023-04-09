const express = require(`express`)
const path = require(`path`)
const app = express()
const port = process.env.PORT || 8000;
const wowOffers = require(`./Public/wowcoins`)
const albionOffers = require(`./Public/AlbionGold`)
const db = require(`./db`)
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();

// add body-parser middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));


db.insertWowOffers(wowOffers)
db.InsertAllAlbion(albionOffers)

//routers 
const wowRouter= require(`./Routers/api/wowOffer`)
const AlbionRouter= require(`./Routers/api/albionOffer`)
const allOffers = require(`./Routers/api/allOffers`)
const userRouter = require(`./Routers/api/userSign`)
app.use(`/api` , wowRouter)
app.use(`/api` , AlbionRouter)
app.use(`/api` , allOffers)
app.use(`/api` , userRouter)

app.listen(port , ()=> console.log(`server running on port ${port}`))
app.use(express.static(path.join(__dirname, 'src')));



