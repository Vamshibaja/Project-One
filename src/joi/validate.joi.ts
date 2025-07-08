import Joi from "joi";
import { Response, Request, NextFunction } from "express";
import { deflate } from "zlib";

export const joiValidator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        msg: "Validation error in joi",
        details: error.details.map((d) => d.message),
      });
      return;
    }
    req.body = value;
    next();
  };
};
