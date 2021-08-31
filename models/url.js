const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLshortSchema = new Schema({
    original_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
    }
});

const URLshort = mongoose.model('urlShort', URLshortSchema);

module.exports = URLshort;