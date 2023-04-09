const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true
  },
  albionOfferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AlbionOffer',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('CartItem', cartItemSchema);