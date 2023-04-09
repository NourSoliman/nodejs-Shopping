const express = require('express');
const router = express.Router();
const db = require(`../../db`)
const authenticate =  require(`../../middleware/auth`)
router.get(`/wowOffer`, authenticate , async (req, res) => {
    try {
        const wowOffers = await db.getAllWowOffers();
        res.json(wowOffers);
    } catch (error) {
        console.log('Error retrieving WoW offers from MongoDB:', error);
        res.status(500).send('Error retrieving WoW offers from MongoDB');
    }

});
module.exports = router;