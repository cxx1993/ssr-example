<template>
    <Form :model="formItem" :label-width="100">
        <FormItem label="用户名：">
            <Input clearable v-model="formItem.username" placeholder="输入关键字模糊查询..."></Input>
        </FormItem>
        <FormItem label="性别：">
            <Select v-model="formItem.gender">
                <Option value="-1">全部</Option>
                <Option value="0">女</Option>
                <Option value="1">男</Option>
            </Select>
        </FormItem>
        <FormItem label="角色：">
            <Select v-model="formItem.role">
                <Option value="-1">全部</Option>
                <Option value="0">超级管理员</Option>
                <Option value="1">管理员</Option>
                <Option value="2">普通用户</Option>
            </Select>
        </FormItem>
        <FormItem label="注册时间：">
            <DatePicker type="daterange" style="width:100%" v-model="formItem.dateRange" width="100%"></DatePicker>
        </FormItem>
        <FormItem label="备注：">
            <Input clearable v-model="formItem.content" placeholder="输入关键字..."></Input>
        </FormItem>
        <FormItem>
            <Button @click="submit" type="primary">搜索</Button>
            <Button @click="reset" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
import moment from "moment"

const _formItem = {
    username: '',
    gender: '-1',
    role: '-1',
    dateRange: ['', ''],
    content: '',
}

export default {
    props: ['cbQuery'],
    data() {
        return {
            formItem: { ..._formItem }
        }
    },
    methods: {
        submit() {
            // 处理一波formItem
            const formItem = { ...this.formItem }

            const { gender, role, dateRange } = formItem
            if (gender === '-1') {
                formItem.gender = ''
            } else {
                formItem.gender = parseInt(gender)
            }
            if (role === '-1') {
                formItem.role = ''
            } else {
                formItem.gender = parseInt(role)
            }
            // 处理时间
            if (dateRange[0] !== '' && dateRange[1] !== "") {
                formItem.sdate = moment(dateRange[0]).format("YYYY-MM-DD")
                formItem.edate = moment(dateRange[1]).format("YYYY-MM-DD")
            } else {
                delete formItem.sdate
                delete formItem.edate
            }
            delete formItem.dateRange
            this.cbQuery(formItem)
        },
        reset() {
            this.formItem = { ..._formItem }
        }
    }
}

// const _formItem = {
//     input: '',
//     gender: '-1',
//     role: '-1',
//     dateRange: '',
//     content: '',
// }

// import searchMixin from '@/mixins/search'
// export default {
//     mixins: [searchMixin],
//     data() {
//         return {
//             formItem: {
//                 input: '',
//                 gender: '-1',
//                 role: '-1',
//                 dateRange: '',
//                 content: '',
//             }
//         }  
//     }
// }

</script>
