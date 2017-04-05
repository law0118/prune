const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

const CategorySchema = new Schema({
  name:{
    type: String,
    required: [true, 'Name is require']
  },
  description:{
    type: String,
  },
  geometry: GeoSchema
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;
