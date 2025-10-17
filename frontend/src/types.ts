export type Product = {
  _id: string;
  name: string;
  brand?: string;
  price?: number;
  images?: string[];
  rating?: number;
  reviewsCount?: number;
  isNewArrival?: boolean;
};
