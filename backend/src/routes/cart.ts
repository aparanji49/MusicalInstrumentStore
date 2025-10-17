import { Router } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";

const r = Router();

function where(identity: any) {
  const { userId, guestId } = identity;
  return userId ? { userId, status: "active" } : { guestId, status: "active" };
}

async function getOrCreateCart(identity: any) {
  let cart = await Cart.findOne(where(identity));
  if (!cart) cart = await Cart.create({ ...where(identity), items: [] });
  return cart;
}


// GET current cart
r.get("/", async (req, res) => {
  const cart = await getOrCreateCart((req as any).cartIdentity);
  res.json(cart);
});

r.post("/items", async (req, res) => {
  const { productId, qty = 1 } = req.body as { productId: string; qty?: number };
  const cart = await getOrCreateCart((req as any).cartIdentity);

  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) existing.qty += qty;
  else {
    const p = await Product.findById(productId).lean();
    if (!p) return res.status(404).json({ error: "Product not found" });
    cart.items.push({ product: p._id, qty, priceSnapshot: p.price });
  }
  await cart.save();
  res.json(cart);
});

r.patch("/items/:productId", async (req, res) => {
  const { productId } = req.params;
  const { qty } = req.body as { qty: number };
  const cart = await getOrCreateCart((req as any).cartIdentity);

  const it = cart.items.find(i => i.product.toString() === productId);
  if (!it) return res.status(404).json({ error: "Item not in cart" });

  if (qty <= 0) {
    const itemToRemove = cart.items.find(i => i.product.toString() === productId);
    if (itemToRemove) cart.items.pull(itemToRemove._id);
  } else {
    it.qty = qty;
  }

  await cart.save();
  res.json(cart);
});

r.delete("/items/:productId", async (req, res) => {
  const { productId } = req.params;
  const cart = await getOrCreateCart((req as any).cartIdentity);
  const itemToRemove = cart.items.find(i => i.product.toString() === productId);
  if (itemToRemove) cart.items.pull(itemToRemove._id);
  await cart.save();
  res.json(cart);
});

export default r;