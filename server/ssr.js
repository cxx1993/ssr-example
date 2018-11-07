// server/ssr.js
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");

const koaStatic = require("koa-static");
const path = require("path");
const resolve = file => path.resolve(__dirname, file);

const app = new Koa();

const userRoute = require("../node/router/user.r.js");

// 连接数据库
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mp");

// ====中间件====
// 开放目录
app.use(koaStatic(resolve("../dist")));
app.use(bodyParser());
app.use(json());

const isDev = process.env.NODE_ENV !== "production";
const router = isDev ? require("./dev.ssr") : require("./pro.server");
app.use(router.routes()).use(router.allowedMethods());
app.use(userRoute.routes()).use(userRoute.allowedMethods()); //前端路由

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

module.exports = app;
