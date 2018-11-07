/**
 * 集中调用中间件
 * 
 */

const fs = require("fs");
const path = require("path");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const router = require("../router/index.r.js");

// 连接数据库
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mp");

// 获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("../../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../../dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve("../../src/index.temp.html"), "utf-8"),
  clientManifest: clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}

const resolve = file => path.resolve(__dirname, file);
// 使用中间件
module.exports = app => {
  app.use(koaStatic(resolve("../../dist"))); // 指定dist为资源目录
  app.use(bodyParser());
  app.use(json());

  // 先匹配前端的路由
  app.use(async (ctx, next) => {
    try {
      const context = {
        title: "ssr",
        url: ctx.url
      };
      // 将 context 数据渲染为 HTML
      const html = await renderToString(context);
      ctx.body = html;
      // 设置请求头
      ctx.set("Content-Type", "text/html");
      ctx.set("Server", "Koa2 server side render");
    } catch (e) {
      next();
    }
  });

  // 后端路由
  router(app);

  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500;
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack);
      }
    }
  });
};
