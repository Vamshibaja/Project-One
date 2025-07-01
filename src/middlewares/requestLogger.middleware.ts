import { Request, Response, NextFunction } from "express";
export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  console.log(`🚀 [${req.method}] ${req.originalUrl} called at ${new Date().toISOString()}`);
  next();
};
