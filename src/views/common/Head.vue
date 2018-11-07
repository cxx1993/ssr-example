<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <router-link to="/" tag="div" class="layout-logo">
                <Icon type="ios-ionitron-outline" />
                <span>manage</span>
            </router-link>
            <div class="layout-nav">
                <router-link to="/userList" tag="li" class="ivu-menu-item">
                    <Icon type="md-apps" />
                    用户管理
                </router-link>
                <!-- <MenuItem name="4"  class="my">
                    <Dropdown>
                        <a href="javascript:void(0)" >
                            <Icon type="md-person" />
                            我的
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><Icon type="ios-build" /> 修改信息</DropdownItem>
                            <DropdownItem><Icon type="md-refresh" /> 刷新缓存</DropdownItem>
                            <DropdownItem divided><Icon type="md-power" /> 注销</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </MenuItem> -->
            </div>
        </Menu>
    </Header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.layout-logo {
  cursor: pointer;
  width: 150px;
  height: 40px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 12px;
  left: 20px;
  font-size: 22px;
  color: white;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  i {
    font-size: 32px;
    margin-right: 5px;
    position: relative;
    top: -3px;
  }
}
.layout-nav {
  width: auto;
  float: right;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
<style lang="scss">
.my a {
  color: rgba(255,255,255,.7);
  &:hover ,&.active{
    color: white;
  }
}
</style>

