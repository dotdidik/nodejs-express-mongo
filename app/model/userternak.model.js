const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const ProductSchema = mongoose.Schema({
    nama: {type: String, required: true, max: 100},
    alamat: {type: String, required: true, max: 225},
    keterangan: {type: String, required: true, max: 400},
    gambar: {type: String, required: true, max: 425},
    harga: {type: Number, required: true},
});

module.exports = mongoose.model('Product', ProductSchema);



// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// const Role = require('./role.model.js');

// var ProductSchema = new Schema({
//     nama: {type: String, required: true, max: 100},
//     alamat: {type: String, required: true, max: 225},
//     keterangan: {type: String, required: true, max: 400},
//     gambar: {type: String, required: true, max: 425},
//     harga: {type: Number, required: true},
//     roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
// });


// // Export the model
// module.exports = mongoose.model('Product', ProductSchema);