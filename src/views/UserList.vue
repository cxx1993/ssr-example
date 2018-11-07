<template>
    <div id="userlist">
        <div style="margin-bottom:15px;text-align:right">
            <Button @click="drawer = true" type="primary">查询</Button>
        </div>

        <Drawer title="查询" width="550" :closable="false" v-model="drawer">
            <Search :cbQuery="dealQuery" />
        </Drawer>
        <!-- {{tableData}} -->
        <Table :data="tableList" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalCount" :current="currentPage" @on-change="changePage"></Page>
            </div>
        </div>
    </div>

</template>
<script>
import Search from '@/components/userList/search.vue'
import moment from 'moment'
import tableListMix from '@/mixins/tableList'
// import axios from 'axios'
export default {
    components: {
        Search
    },
    mixins: [tableListMix],
    data() {
        return {
            url: '/user/list',
            drawer: false,
            query: {},   // 数据查询项
            tableColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '性别',
                    key: 'gender',
                    render: (h, params) => {
                        let text
                        switch (params.row.gender) {
                            case 0:
                                text = '男'
                                break;
                            case 1:
                                text = '女'
                                break;
                            default:
                                break;
                        }
                        return h('span', text)
                    }
                },
                {
                    title: '角色',
                    key: 'role',
                    render: (h, params) => {
                        let text
                        switch (params.row.role) {
                            case 0:
                                text = '超级管理员'
                                break;
                            case 1:
                                text = '管理员'
                                break;
                            case 2:
                                text = '普通用户'
                                break;
                            default:
                                break;
                        }
                        return h('span', text)
                    }
                },
                {
                    title: '注册时间',
                    key: 'createDate',
                    render: (h, params) => {
                        const date = moment(params.row.createDate).format("YYYY-MM-DD hh:mm:ss")
                        return h('div', date);
                    }
                },
                {
                    title: '备注',
                    width: 200,
                    key: 'content',
                    render: (h, params) => {
                        let text
                        if (params.row.content) {
                            text = params.row.content.length > 20 ? params.row.content.substring(0, 15) + '...' : params.row.content
                        }
                        return h('span', text)
                    }
                },
                {
                    title: '操作',
                    key: "_id",
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: "ios-search",
                                    shape: "circle"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.findOneById(params.index)
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small',
                                    icon: "ios-create-outline",
                                    shape: "circle"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updateOneById(params.index)
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small',
                                    icon: 'ios-trash-outline',
                                    shape: 'circle'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small',
                                    icon: "md-key",
                                    shape: "circle"
                                },
                                on: {
                                    click: () => {
                                        this.updateOneById(params.index)
                                    }
                                }
                            })
                        ]);
                    }
                }
            ]
        }
    },
    methods: {
        dealQuery(query) {
            this.query = query
            this.drawer = false
            this.getList()
        },
        findOneById() { // id

        },
        updateOneById() {

        },
        removeOneById() {

        },
    },
    created() {
        this.getList()
    }
}
</script>
