const express = require('express');
const router = express.Router();
const db = require(`../../db`)
const albionOffers = require(`../../models/Albion`)
const wowOffers = require(`../../models/Offers`)
router.get(`/allOffers`, async (req, res) => {
    try {
        const wow = await wowOffers.find({});
        const albion = await albionOffers.find({})
        const allOffers = [...wow, ...albion].map((offer) => {
            return {
                _id: offer._id,
                name: offer.name,
                price: offer.price,
                img: offer.img.data.toString('base64'), // convert binary data to base64
            };
        })
        res.json(allOffers)
    }
    catch (error) {
        console.log(`error fetching all offers`, error);
    }
})
module.exports = router;