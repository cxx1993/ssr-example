const Router = require("koa-router");
var controller = require("../controller/user.c");

var router = new Router({
  prefix: "/manage/user"
});
// 项目列表页 list
// 新增一条数据
router.post("/add", controller.addOne);
// 修改一条数据
router.post("/update/:id", controller.updateOne);
// 获取一条by id
router.get("/:id", controller.getOneById);
// 获取列表list
router.post("/list", controller.getList);
// 删除单个by id
router.delete("/delete/:id", controller.deleteOneById);
// 删除多个by ids
router.post("/delete", controller.deleteMutiByIds);

module.exports = router;
