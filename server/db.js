const mongoose = require(`mongoose`)
//Offers
const WowGold = require(`./Public/wowcoins`)
const AlbionGold = require(`../src/Components/albionOffers/AlbionGold`)
//Schemas
const offers = require(`./models/Offers`)
const albionSchema = require(`./models/Albion`)

const fs = require(`fs`);
const path = require(`path`);


//database mongoose
mongoose.set(`strictQuery` , true)
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log(`db Connected`))
.catch((err)=> console.log((err)))

//Insert wow offers into Mongodb
const insertWowOffers = async(WowOffers) => {
    try {
        const existoffers = await offers.find();
        const existOffersNames = existoffers.map((offer) => offer.name);
        const newOffers = WowGold.filter((offer) => !existOffersNames.includes(offer.name))
        if(newOffers.length === 0 ) {
            console.log(`no new wow offers to insert`)
            return;
        }
        console.log(WowOffers);
        const result = await Promise.all(WowGold.map(async (offer) => {
            const imgPath = path.join(__dirname, `../src/Components/wowOffers`,offer.img.toString())
            const imgData = fs.readFileSync(imgPath)
            const imgContentType = `image/${path.extname(imgPath).substring(1)}`
            const newOffer = new offers({
                ...offer,
                img:{
                    data:imgData,
                    contentType:imgContentType
                }
            })
            return newOffer.save()

        }))
    } catch(error) {
        console.log(error);
    }
}
const getAllWowOffers = async() => {
    try {
        const WowOffers  = await offers.find().maxTimeMS(20000);
        return WowOffers
    } catch(error) {
        console.log(error);
    }
}

////Insert Albion offers into Mongodb
const InsertAllAlbion = async(albionOffers) => {
    try {
        const existoffers = await albionSchema.find();
        const existOffersNames = existoffers.map((offer)=> offer.name)
        const newOffers = AlbionGold.filter((offer) => !existOffersNames.includes(offer.name))
        if(newOffers.length === 0 ) {
            console.log(`No new albion Offers to Insert`);
            return;
        }
        const result = await Promise.all(AlbionGold.map(async(offer)=> {
            const imgPath = path.join(__dirname,`../src/Components/albionOffers` , offer.img.toString())
            const imgData = fs.readFileSync(imgPath)
            const imgContentType = `image/${path.extname(imgPath).substring(1)}`
            const newAlbionOffers = new albionSchema({
                ...offer,
                img:{
                    data:imgData,
                    contentType:imgContentType
                }
            })
            return newAlbionOffers.save()
        }))
        console.log('Valorant offers inserted into MongoDB:')
    }
    catch(error){
        console.log(error);
    }
}
const getAllAlbionOffers = async()=>{
    try {
        const AlbionOffers = await albionSchema.find();
        return AlbionOffers
    }
    catch(error) {
        console.log(`Error getting albion offers` , error);
    }
}
module.exports = { insertWowOffers, getAllWowOffers , getAllAlbionOffers , InsertAllAlbion };
