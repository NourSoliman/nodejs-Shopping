const express = require('express');
const router = express.Router();
const db = require(`../../db`)
const authenticate = require(`../../middleware/auth`)
router.get(`/albionOffer`, authenticate ,  async(req, res) =>{
    try {
        const albionOffers = await db.getAllAlbionOffers();
        res.json(albionOffers)
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router