import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string | null;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    logout(cb: (err?: any) => void): void;
    isAuthenticated(): boolean;
  }
}
