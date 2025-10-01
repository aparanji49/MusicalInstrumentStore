// backend/src/graphql/resolvers.ts
import Product from "../models/Product.js";

export const resolvers = {
  Query: {
    product: async (_:unknown, { id }:{ id:string }) => {
      return Product.findById(id);
    },
    products: async (_:unknown, { filter, limit }:{ filter?: any, limit?: number }) => {
      const q: any = {};
      if (filter?.brand) q.brand = filter.brand;
      if (filter?.category) q.category = filter.category;
      if (typeof filter?.isNewArrival === "boolean") q.isNewArrival = filter.isNewArrival;
      return Product.find(q).sort({ createdAt: -1 }).limit(limit ?? 20);
    },
    allProducts: async (_:unknown, { limit }:{ limit?: number }) => {
      return Product.find({}).sort({ createdAt: -1 }).limit(limit ?? 20);
    },
    featuredProducts: async (_:unknown, { limit }:{ limit?: number }) => {
      return Product.find({}).sort({ sales: -1 }).limit(limit ?? 8);
    },
  newProducts: async (
      _: any,
      { limit, isNewArrival }: { limit: number; isNewArrival?: boolean }
    ) => {
      const query: any = {};
      if (isNewArrival !== undefined) {
        query.isNewArrival = isNewArrival; // acts like WHERE isNewArrival=true
      }
      return Product.find(query).sort({ createdAt: -1 }).limit(limit);
    },
  },
};
