var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    image: String
});

// Schema.index({ name: 'text', });
module.exports = mongoose.model('vegetable', Schema)