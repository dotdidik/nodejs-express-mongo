const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const UserFistSchema = mongoose.Schema({
    namadepan: {type: String, required: true, max: 100},
    namabelakang: {type: String, required: true, max: 225},
});

module.exports = mongoose.model('UserFirst', UserFistSchema);