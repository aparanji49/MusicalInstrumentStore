// backend/src/graphql/schema.ts
import { gql } from "graphql-tag";

export const typeDefs = gql/* GraphQL */ `
  type Product {
    _id: ID!
    name: String!
    brand: String
    category: String
    price: Float
    images: [String!]
    rating: Float
    reviewsCount: Int
    stock: Int
    isNewArrival: Boolean
    sales: Int
    createdAt: String
  }

  input ProductsFilter {
    brand: String
    category: String
    isNewArrival: Boolean
  }

  type Query {
    # one-by-id
    product(id: ID!): Product

    # generic list (with filters & limit)
    products(filter: ProductsFilter, limit: Int = 20): [Product!]!
 
    # generic list (with limit)
    allProducts(limit: Int = 20): [Product!]!

    # convenience queries for homepage
    newProducts(limit: Int!, isNewArrival: Boolean): [Product!]!
    featuredProducts(limit: Int!): [Product!]!
  }
`;
