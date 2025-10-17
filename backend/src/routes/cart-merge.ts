// src/routes/cart-merge.ts
import { Router } from "express";
import Cart from "../models/Cart.js";

const r = Router();

r.post("/merge", async (req, res) => {
  const { user } = req as any;
  const { guestId } = (req as any).cartIdentity;

  if (!user) return res.status(401).json({ error: "Auth required" });
  if (!guestId) return res.json({ ok: true }); // nothing to merge

  const guestCart = await Cart.findOne({ guestId, status: "active" });
  const userCart = await Cart.findOne({ userId: user.id, status: "active" }) ||
                   await Cart.create({ userId: user.id, items: [] });

  if (guestCart) {
    for (const gi of guestCart.items) {
      const ui = userCart.items.find(i => i.product.toString() === gi.product.toString());
      if (ui) ui.qty += gi.qty;
      else userCart.items.push(gi);
    }
    await userCart.save();
    await guestCart.deleteOne();
  }
  res.json({ ok: true, cart: userCart });
});

export default r;
