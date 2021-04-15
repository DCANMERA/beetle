<template>
  <el-container class="main">
    <el-header class="nav box-shadow">
      <el-popover placement="bottom"
                  width="300"
                  trigger="click">
        <section>
          <div>sex: {{userInfo && userInfo.sex ? userInfo.sex : '保密'}}</div>
          <div>email: {{userInfo && userInfo.email ? userInfo.email : '保密'}}</div>
          <div>phone: {{userInfo && userInfo.phone ? userInfo.phone : '未填写'}}</div>
        </section>
        <section class="flex"
                 slot="reference">
          <el-avatar shape="circle"
                     :size="46"
                     fit="cover"
                     :src="userInfo && userInfo.avatar">
          </el-avatar>
          <el-link class="nickname"
                   :underline="false">{{userInfo && userInfo.nickName}}</el-link>
        </section>
      </el-popover>
      <h1 class="project-name">甲壳虫管理系统</h1>
      <el-button class="logout"
                 type="primary"
                 @click="logout">退出</el-button>
    </el-header>
    <el-container class="context">
      <el-aside>
        <MenuTree :menu="menuTreeData"
                  :active="active">
        </MenuTree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: 'Main',

    components: {
      MenuTree: () => import('@/components/MenuTree.vue')
    },

    data() {
      return {
        active: '',
        menuTreeData: [{
            id: 1,
            name: '需求管理',
            icon: 'el-icon-edit-outline',
            children: [{
              id: 1,
              name: '发布商品',
              route: 'PostTrade'
            }]
          },
          {
            id: 2,
            name: '商品管理',
            icon: 'el-icon-menu',
            children: [{
              id: 1,
              name: '商品列表',
              route: 'Products'
            }]
          },
          {
            id: 3,
            name: '订单管理',
            icon: 'el-icon-s-order',
            children: [{
              id: 1,
              name: '订单列表',
              route: '404'
            }]
          },
          {
            id: 4,
            name: '角色管理',
            icon: 'el-icon-user-solid',
            children: []
          },
          {
            id: 5,
            name: '权限管理',
            icon: 'el-icon-s-help',
            children: []
          },
          {
            id: 6,
            name: '财务管理',
            icon: 'el-icon-s-platform',
            children: []
          },
          {
            id: 7,
            name: '数据管理',
            icon: 'el-icon-s-data',
            children: []
          },
          {
            id: 8,
            name: '用户设置',
            icon: 'el-icon-s-tools',
            children: []
          }
        ]
      }
    },

    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },

    watch: {
      '$route.name'(val) {
        this.updateActive(val)
      }
    },

    mounted() {
      this.updateActive(this.$route.name)
    },

    methods: {
      ...mapMutations({
        updateIsLogin: 'user/updateIsLogin',
        updateUserInfo: 'user/updateUserInfo'
      }),

      /**
       * @description 更新菜单栏的激活索引
       * @param {string} urlName 路由名称
       */
      updateActive(urlName) {
        this.menuTreeData.map(item => {
          item.children.map(value => {
            if (value.route && value.route == urlName) {
              this.active = item.id + '-' + value.id
            }
          })
        })
      },

      /**
       * @description 退出登录
       */
      logout() {
        this.$confirm('是否退出帐户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.updateIsLogin({
            isLogin: false
          })
          this.updateUserInfo({
            userInfo: {}
          })
          // 清除cookie
          this.$cookies.keys().map(cookieName => {
            this.$cookies.remove(cookieName)
          })
          this.$router.push({
            name: 'Login'
          })
        }).catch(() => {})
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './index.scss';

</style>
