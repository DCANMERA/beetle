<template>
  <header class="header"
          :class="{'is-home': isHome}">
    <nav :style="{height: headerHeight + 'px', 'min-width': container + 'px'}">
      <router-link to="/home">
        <el-tooltip class="item"
                    effect="dark"
                    :open-delay="200"
                    content="甲壳虫专注校园二手"
                    placement="right">
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="currentColor"
               class="bi bi-bug logo"
               viewBox="0 0 16 16">
            <path
                  d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z" />
          </svg>
        </el-tooltip>
      </router-link>
      <el-menu class="el-menu-demo"
               mode="horizontal"
               v-loading.fullscreen.lock="fullscreenLoading"
               :default-active="active"
               @select="handleSelect">
        <el-menu-item index="1"
                      :style="{height: headerHeight+'px'}">首页</el-menu-item>
        <el-submenu index="2"
                    :style="{height: headerHeight+'px'}">
          <template slot="title">商品分类</template>
          <el-menu-item :index="`2-${index + 1}`"
                        v-for="(item,index) in types"
                        :key="index">
            {{item.title}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3"
                      :style="{height: headerHeight+'px'}">发布中心</el-menu-item>
        <el-menu-item index="4"
                      :style="{height: headerHeight+'px'}">
          <el-avatar v-if="isLogin"
                     shape="circle"
                     :size="46"
                     fit="cover"
                     :src="userInfo.avatar">
          </el-avatar>
          <router-link v-if="!isLogin"
                       to="login">
            <el-button size="small"
                       plain>登录</el-button>
          </router-link>
          <router-link v-if="!isLogin"
                       to="register"
                       target="_blank">
            <el-button size="small"
                       type="success"
                       icon="el-icon-circle-plus">
              注册
            </el-button>
          </router-link>
        </el-menu-item>
      </el-menu>
    </nav>
  </header>
</template>

<script>
  import {
    mapActions,
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        paths: {
          '1': '/home',
          '2': '/category',
          '3': '/posttrade',
          '4': '/profile'
        },
        fullscreenLoading: false
      }
    },
    computed: {
      ...mapState({
        container: state => state.container,
        active: state => state.header.active,
        headerHeight: state => state.header.headerHeight,
        isLogin: state => state.user.isLogin,
        userInfo: state => state.user.userInfo,
        types: state => state.product.types
      }),
      isHome() {
        return !this.paths['1'].includes(this.$route.name.toLowerCase())
      }
    },
    watch: {
      '$route.path'(val) {
        for (let key in this.paths) {
          if (this.paths[key].indexOf(val.toLowerCase()) > -1) {
            this.updateActive({
              active: key
            })
          }
        }
        this.regExpRoute(false)
      }
    },
    mounted() {
      this.types.map((item, index) => {
        this.paths[`2-${index + 1}`] = this.paths['2'] + '/' + item.typeId
      })
      for (let key in this.paths) {
        if (this.paths[key].indexOf(this.$route.path.toLowerCase()) > -1) {
          this.updateActive({
            active: key
          })
        }
      }
      this.regExpRoute(false)
    },
    methods: {
      ...mapMutations({
        updateActive: 'header/updateActive',
        updateProducts: 'product/updateProducts'
      }),
      ...mapActions({
        getProducts: 'product/getProducts'
      }),

      /**
       * @description 处理导航栏点击跳转
       * @param {string} active 选中菜单项的 index,
       * @param {string} query 选中菜单项的 index path
       */
      handleSelect(active, query) {
        if (this.active === active) return
        this.fullscreenLoading = true
        this.updateActive({
          active
        })
        this.regExpRoute()
      },

      /**
       * @description 匹配路由，更新active
       * @param {boolean} isRouter 是否开启路由跳转
       */
      regExpRoute(isRouter = true) {
        if (this.isLogin) {
          if (this.active.includes('2')) {
            document.title = this.types[this.active.split('-')[1] - 1 + ''].title
            this.getProducts({
              type_id: this.types[this.active.split('-')[1] - 1 + ''].typeId
            }).then(res => {
              setTimeout(() => {
                this.fullscreenLoading = false
                this.updateProducts({
                  products: res.data.result
                })
              }, 1000)
            })
            if (isRouter) {
              this.$router.push({
                path: `${this.paths['2']}/${this.types[this.active.split('-')[1] - 1 + ''].typeId}`
              })
            }
          } else {
            switch (this.active) {
              case '1':
                document.title = '首页'
                break
              case '3':
                document.title = '发布中心'
                break
              case '4':
                document.title = '个人中心'
                break
              default:
                document.title = '甲壳虫专注校园二手'
                break
            }
            setTimeout(() => {
              this.fullscreenLoading = false
            }, 1000)
            if (isRouter) {
              this.$router.push({
                path: this.paths[this.active]
              })
            }
          }
        }
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;

    &.is-home {
      position: sticky;
      background-color: $navBgColor;
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        width: 40px;
        color: $white;
      }

      /deep/ .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
      /deep/ .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
      /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background-color: transparent;
      }

      /deep/ .el-menu.el-menu--horizontal {
        border-bottom: none;
      }

      /deep/ .el-menu--horizontal {
        .el-submenu,
        .el-menu-item {
          color: $white;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0;

          .el-avatar {
            background: $white;

            &>img {
              margin: 0 auto;
            }
          }

          .el-submenu__title {
            color: $white;
            height: 100%;

            &:hover,
            &:hover i {
              color: $activeTextColor;
            }

            i {
              color: $white;
            }
          }
        }
      }

      /deep/ .el-menu-demo {
        background-color: transparent;

        .el-menu-item {
          &:hover {
            color: $activeTextColor;
          }

          .el-button {
            height: 36px;
            margin-left: 10px;

            i {
              color: unset;
            }
          }
        }
      }
    }
  }

  /deep/ .el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
  /deep/ .el-menu--horizontal>.el-menu-item.is-active {
    color: $activeTextColor !important;
    border-bottom-color: $activeTextColor !important;
  }

  /deep/ .el-menu--horizontal>.el-submenu.is-active .el-submenu__title i {
    border-bottom-color: $activeTextColor !important;
    color: $activeTextColor !important;
  }

</style>
