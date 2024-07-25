// middlewares/validators/userValidator.js
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

const validateUser = [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Enter a valid email").isEmail(),
  check(
    "password",
    "Password must contain at least 8 characters, including a mix of uppercase, lowercase, numbers, and symbols."
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  check("email", "Enter a valid email").isEmail(),
  check("password", "Password is required").notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUser, validateLogin };
