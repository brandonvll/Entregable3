const { body, validationResult } = require("express-validator");

const { AppError } = require("../utils/appError.util");

const checkResault = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidators = [
  body("name").notEmpty().withMessage("name cannot be emty"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .isAlphanumeric()
    .withMessage("the password must contend leters and numbers"),
  checkResault,
];

const createReviewValidators = [
  body("userId").isNumeric().withMessage("the UserId must be at numeric"),
  body("GameId").isNumeric().withMessage("the GameId must be at numeric"),
  checkResault,
];


module.exports = { createUserValidators, createReviewValidators };
