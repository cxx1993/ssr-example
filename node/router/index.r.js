const router = require("koa-router")();

const userRouter = require("./user.r");

module.exports = app => {
  app.use(userRouter.routes()).use(userRouter.allowedMethods());
};
