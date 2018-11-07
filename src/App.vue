<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
    <div id="app">
        <div class="layout">
            <Layout>
                <Head/>
                <Content :style="{padding: '40px 50px 0'}">
                    <!-- <Breadcrumb :style="{margin: '20px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> -->
                    <!-- <router-link to="/">Home1</router-link> |
                    <router-link to="/about">About1</router-link> |
                    <router-link to="/userList">userList1</router-link> -->
                    <Card>
                        <div style="min-height: 400px;">
                            <router-view></router-view>
                        </div>
                    </Card>
                </Content>
                <Foot/>
            </Layout>
        </div>
    </div>
</template>
<script>
    import Head from '@/views/common/Head.vue'
    import Foot from '@/views/common/Foot.vue'
    export default {
        components:{
          Head,
          Foot
        }
    }
</script>
