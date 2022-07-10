const express = require("express");

//init express app
const app = express();
//save types json
app.use(express.json());

//Routers
const { usersRouter } = require("./routes/user.routes");
const { gameRouter } = require("./routes/game.routes");
const { consoleRouter } = require("./routes/console.routes");
const { reviewRouter } = require("./routes/review.routes");

////global error Controller
const { globalErrorHandler } = require("./controllers/error.controller");

//utils
const { AppError } = require("./utils/appError.util");

//Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/consoles", consoleRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };
