import { Router } from 'express';
import Product from '../models/Product.js';

const r = Router();

r.get('/new', async (req, res) => {
  const limit = Number(req.query.limit ?? 8);
  const docs = await Product.find({}).sort({ createdAt: -1 }).limit(limit);
  res.json(docs);
});

r.get('/best', async (req, res) => {
  const limit = Number(req.query.limit ?? 8);
  const docs = await Product.find({}).sort({ sales: -1 }).limit(limit);
  res.json(docs);
});

r.get('/meta', async (_req, res) => {
  const docs = await Product.find({}, 'brand category').lean();
  const brands = [...new Set(docs.map(d => d.brand).filter(Boolean))];
  const categories = [...new Set(docs.map(d => d.category).filter(Boolean))];
  res.json({ brands, categories });
});

r.get('/:id', async (req, res) => {
  const one = await Product.findById(req.params.id);
  if (!one) return res.status(404).json({ error: 'Not found' });
  res.json(one);
});

// (Optional) list all for catalog
r.get('/', async (_req, res) => {
  const docs = await Product.find({}).sort({ createdAt: -1 }).limit(100);
  res.json(docs);
});

export default r;
