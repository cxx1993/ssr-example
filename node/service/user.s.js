const User = require('../model/user.m.js')
const _static = require('../../utils/static.js')

const search = {
  match: {},
  skip: 0,
  limit: _static.list.limit
}

module.exports = {
  /**
   * 查找符合条件的list
   */
  list: function(query = {}, skip, limit, field) {
    limit = limit || _static.list.limit

    return new Promise((resolve, reject) => {
      User.find(query, field)
        .skip(skip)
        .limit(limit)
        .then(res => resolve({ code: 1, res: res }))
        .catch(err => reject({ code: 0, err: err }))
    })
  },
  // 根据id返回单条数据 field：筛选返回的字段，不传返回所有
  findOneById(id, field) {
    return new Promise((resolve, reject) => {
      User.findById(id, field)
        .then(res => resolve({ code: 1, res: res }))
        .catch(err => reject({ code: 0, err: err }))
    })
  },
  // 查找多个by 参数
  // findMutiByParams(params) {
  //   return new Promise((resolve, reject) => {
  //     User.find(params)
  //       .then(res => resolve({ code: 1, res: res }))
  //       .catch(err => reject({ code: 0, err: err }));
  //   });
  // },
  // 删除一条数据by id
  deleteOneById(id) {
    return new Promise((resolve, reject) => {
      User.findByIdAndDelete(id)
        .then(res => {
          resolve({ code: 1, res: res })
        })
        .catch(err => {
          reject({ code: 0, err: err })
        })
    })
  },
  // 删除多个
  deletes(ids) {
    return new Promise((resolve, reject) => {
      User.remove({ _id: { $in: ids } })
        .then(res => {
          resolve({ code: 1, res: res })
        })
        .catch(err => {
          reject({ code: 0, err: err })
        })
    })
  },
  // 新增一条数据
  addOne(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
        .then(res => {
          resolve({ code: 1, res: res })
        })
        .catch(err => {
          reject({ code: 0, err: err })
        })
    })
  },
  // 修改一条数据by id
  updateOneById(id, params) {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(id, {
        $set: params
      })
        .then(res => {
          resolve({ code: 1, res: res })
        })
        .catch(err => {
          reject({ code: 0, err: err })
        })
    })
  }
}
