import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const uri = process.env.MONGO_URI!;

async function run() {
  await mongoose.connect(uri);
  await Product.deleteMany({});
  await Product.insertMany([
    { name:'Yamaha FG800 Acoustic Guitar', brand:'Yamaha', category:'Guitars', price:229.99, rating:4.7, reviewsCount:128, stock:12, isNewArrival:true, sales:210 },
    { name:'Fender Player Stratocaster', brand:'Fender', category:'Guitars', price:849.99, rating:4.8, reviewsCount:92, stock:5, isNewArrival:true, sales:350 },
    { name:'Roland FP-30X Digital Piano', brand:'Roland', category:'Keyboards', price:749.99, rating:4.6, reviewsCount:77, stock:7, sales:180 },
    { name:'Shure SM58 Microphone', brand:'Shure', category:'Microphones', price:99, rating:4.9, reviewsCount:900, stock:30, sales:1200 },
    { name:'Korg Minilogue XD Synth', brand:'Korg', category:'Synths', price:679.99, rating:4.5, reviewsCount:65, stock:4, isNewArrival:true, sales:95 }
  ]);
  console.log('✅ Seeded products');
  await mongoose.disconnect();
}
run().catch(e => { console.error(e); process.exit(1); });
