export default {
  data() {
    return {
      totalCount: 0, // 总页数
      currentPage: 1, // 当前页数  默认是1
      tableList: [], // 原始数据list
      loadMoreIng: false // 是否正在加载
    }
  },
  methods: {
    getList(query, cb, fb) {
      const params = {
        page: this.currentPage - 1,
        query: this.query
      }
      this.axios
        .post(`${this.url}`, params)
        .then(res => {
          const { list, totalCount } = res.data.result
          this.tableList = list
          this.totalCount = totalCount
          typeof cb === 'function' && cb(res)
        })
        .catch(err => {
          this.$Message.error('获取列表失败，刷新重试！')
          typeof fb === 'function' && cb(err)
        })
    },
    changePage(page) {
      this.currentPage = page
      this.getList()
    }
  }
}
