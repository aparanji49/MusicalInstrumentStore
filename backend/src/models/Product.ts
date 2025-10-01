import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  price: Number,
  images: [String],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  isNewArrival: { type: Boolean, default: false },
  sales: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default model('Product', ProductSchema);
