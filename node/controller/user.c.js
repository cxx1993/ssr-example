// 引入 service 文件
const service = require('../service/user.s')
// const moment = require("moment");
const resp = require('../utils/response')
const verify = require('../../utils/verify.js')
const tools = require('../utils/tools')
// const User = require("../model/user.m.js");

/**
 *  fnArr:[{key:'',value:''}]
 *  循环调用verify检测
 *
 */
const verifyFuns = function(a) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = a.length; i < len; i++) {
      if (!a[i].value) {
        reject(`${a[i].title}缺失！`)
      } else if (
        typeof verify[a[i].fnName] === 'function' &&
        !verify[a[i].fnName](a[i].value)
      ) {
        reject(`${a[i].title}不合规！`)
      }
    }
    resolve(1)
  })
}

module.exports = {
  addOne: async function(ctx) {
    // 校验基本参数
    const {
      username,
      password,
      mobile
      // signature,
      // gender,
      // email,
      // city,
      // desc,
      // role
    } = ctx.request.body

    try {
      const testArr = [
        {
          value: username,
          title: '用户名',
          fnName: 'isUsername'
        },
        {
          value: password,
          title: '密码',
          fnName: 'isPasswordWeak'
        },
        {
          value: mobile,
          title: '手机号',
          fnName: 'isMobile'
        }
      ]
      const verify = await verifyFuns(testArr)
      if (verify === 1) {
        // 验证通过存入数据库
        const result = await service.addOne(ctx.request.body)

        if (!result.code) {
          throw '新增失败'
        }
        ctx.body = resp.success({
          payload: { message: '新增成功' }
        })
      } else {
        // 验证失败返回错误信息
        throw verify
      }
    } catch (err) {
      ctx.body = resp.fail({
        payload: { message: err }
      })
    }
  },
  updateOne: async function(ctx) {
    const { id } = ctx.params
    try {
      // 检查
      // ...
      const result = await service.updateOneById(id, ctx.request.body)
      if (!result.code) {
        throw '修改失败'
      }
      ctx.body = resp.success({
        payload: { message: '修改成功' }
      })
    } catch (err) {
      ctx.body = resp.fail({
        payload: { message: err }
      })
    }
  },
  getOneById: async function(ctx) {
    const { id } = ctx.params
    try {
      if (!id) throw 'id不能为空'
      const result = await service.findOneById(id)
      if (!result.code) {
        throw result.err
      }
      ctx.body = resp.success({
        payload: { result: result.res }
      })
    } catch (err) {
      ctx.body = resp.fail({
        payload: { message: err }
      })
    }
  },
  getList: async function(ctx, next) {
    try {
      let params = {}
      // console.log("==2==");
      // console.log(ctx.request);
      // console.log("==2==");
      const { page, limit, field } = ctx.request.body

      const query = ctx.request.body.query || {}
      let { username, role, gender, sdate, edate } = query
      const skip = tools.dealSkip(page, limit)

      // 校验
      // ...

      // 拼接params
      if (username) {
        params.username = new RegExp(username, 'i') // 模糊查询username
      }
      if (role) {
        params.role = role
      }
      if (gender) {
        params.gender = gender
      }
      // 时间区间
      const dateRage = tools.dealDate(sdate, edate)
      if (dateRage != -1) {
        params['$and'] = [
          { createDate: { $gte: dateRage[0] } },
          { createDate: { $lte: dateRage[1] } }
        ]
      }

      const result = await service.list(params, skip, limit, field)
      const total = await service.list(params, 0, 10000) // 获取总个数
      if (!result.code) {
        throw result.err
      }

      ctx.body = resp.success({
        payload: {
          result: {
            list: result.res,
            totalCount: total.res.length || 0
          }
        }
      })
    } catch (err) {
      ctx.body = resp.fail({
        payload: { message: err }
      })
    }
  },
  deleteOneById: async function(ctx) {
    const { id } = ctx.params

    try {
      if (!id) throw 'id不能为空'
      const result = await service.deleteOneById(id)
      if (!result.code) {
        throw '删除失败'
      }
      ctx.body = resp.success({
        payload: { message: '删除成功' }
      })
    } catch (err) {
      ctx.body = resp.fail({
        payload: { message: err }
      })
    }
  },
  /**
   * 删除多个by ids
   * ids为arr
   * eg: {"ids":"5bcfc9418948ee1e628858f3,5bcfc93d8948ee1e628858f2"}
   */
  deleteMutiByIds: async function(ctx) {
    try {
      let { ids } = ctx.request.body
      if (!ids) throw 'ids不能为空'
      ids = ids.split(',')

      const result = await service.deletes(ids)
      if (!result.code) {
        throw '删除失败'
      }
      ctx.body = resp.success({
        payload: { message: '删除成功' }
      })
    } catch (err) {
      ctx.body = resp.fail({
        payload: { message: err }
      })
    }
  }
}
