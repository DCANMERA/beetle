<template>
  <section class="profile">
    <el-row :style="{'max-width': container + 'px'}">
      <el-col :span="6"
              class="mr-30">
        <div class="widget user-profile">
          <div class="profile-thumb">
            <el-image class="rounded-circle"
                      :src="userInfo.avatar"
                      fil="cover"
                      :preview-src-list="[userInfo.avatar]"></el-image>
          </div>
          <h5 class="text-center">{{userInfo.nickName}}</h5>
          <p>用户ID: {{userInfo.userId}}</p>
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="small"
                     @click="showEditorView"
                     v-if="!isSwitch">编辑个人资料</el-button>
        </div>
        <div class="widget user-menu">
          <div class="item"
               v-for="(item,index) in menu"
               :key="index"
               :class="{active: index === active}"
               @click="selectMenu(index, item)">
            <div class="flex">
              <span :class="item.icon"></span>
              <span class="text">{{item.name}}</span>
            </div>
            <span class="num"
                  v-if="index < 3 && item.count">{{item.count > 99 ? '99+': item.count}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="widget my-adslist">
          <h3 class="widget-header">{{title}}</h3>
          <el-divider></el-divider>
          <div class="user-product"
               v-if="!isSwitch">
            <div class="content">
              <Product class="product"
                       v-for="(item,index) in products"
                       :key="index"
                       :productItem="item" />
              <section class="emtype"
                       v-if="products.length === 0">
                <i class="el-icon-info emtype-icon"></i>
                <h1 class="emtype-title">{{`还没有${menu[active].name}商品哟`}}</h1>
              </section>
            </div>
            <el-pagination background
                           v-if="pagination.total > pagination.pageCount"
                           layout="prev, pager, next"
                           :total="pagination.total"
                           :pager-count="pagination.page"
                           :page-size="pagination.pageCount"
                           @current-change="currentChange">
            </el-pagination>
          </div>
          <div class="user-layout"
               v-if="isSwitch">
            <div class="upload">
              <i class="el-icon-s-custom upload-icon"
                 title="上传头像"></i>
              <div class="upload-btn">
                <el-button size="mini"
                           type="primary">
                  上传头像
                  <UploadFile class="upload-none"
                              :size="3 * 1024"
                              @upload="handleAvatarSuccess($event)" />
                </el-button>
                <div class="el-upload__tip">只能上传jpg、jpeg、png、gif文件，且不超过3M</div>
              </div>
            </div>
            <div class="item"
                 v-for="(item, index) in user"
                 :key="index">
              <label :for="item.id">{{item.name}}</label>
              <el-input :placeholder="item.tip"
                        :id="item.id"
                        size="medium"
                        :disabled="item.disabled"
                        v-model="userInfo[item.id]">
                <el-tooltip slot="suffix"
                            :content="index !== 0 ? `修改${item.name}` : `${item.name}做为登录方法，不可修改`"
                            placement="right">
                  <i class="el-input__icon icon el-icon-edit-outline"
                     @click="editorUserInfo(item)"></i>
                </el-tooltip>
              </el-input>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapActions
  } from 'vuex'
  import {
    utils
  } from '@/utils/utils'

  export default {
    name: 'Profile',
    components: {
      Product: () => import('@/components/Product.vue'),
      UploadFile: () => import('@/components/UploadFile.vue')
    },
    data() {
      return {
        active: 0,
        title: '',
        isSwitch: false,
        menu: [{
            name: '我的商品',
            icon: 'el-icon-user',
            count: 0
          },
          {
            name: '收藏',
            icon: 'el-icon-star-off',
            count: 0
          },
          {
            name: '加购',
            icon: 'el-icon-shopping-bag-2',
            count: 0
          },
          {
            name: '登出',
            icon: 'el-icon-setting',
            path: '/login'
          }
        ],
        user: [{
            id: 'email',
            icon: 'el-icon-edit-outline',
            value: '请输入您的邮箱',
            name: '邮箱',
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            errorMessage: '请正确填写您的邮箱格式',
            disabled: true
          },
          {
            id: 'nickName',
            icon: 'el-icon-edit-outline',
            tip: '请输入您的昵称',
            name: '昵称',
            pattern: /[^\\x00-\\xff]/g,
            errorMessage: '请正确填写您的昵称',
            disabled: true
          },
          {
            id: 'phone',
            icon: 'el-icon-edit-outline',
            tip: '请输入您的手机号',
            name: '手机号',
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            errorMessage: '请正确填写您的手机号码！',
            disabled: true
          },
          {
            id: 'sex',
            icon: 'el-icon-edit-outline',
            tip: '请输入您的性别',
            name: '性别',
            pattern: /^男$|^女$|^保密$/,
            errorMessage: '请正确填写您的性别 - (男、女、保密)',
            disabled: true
          }
        ],
        pagination: {
          total: 0,
          pageCount: 4,
          page: 5,
          offset: 0,
        }
      }
    },
    computed: {
      ...mapState({
        container: state => state.container,
        userInfo: state => state.user.userInfo,
        products: state => state.product.products
      })
    },
    async mounted() {
      await this.initSearchData()
      this.title = this.menu[this.active].name
    },
    methods: {
      ...mapMutations({
        updateIsLogin: 'user/updateIsLogin',
        updateUserInfo: 'user/updateUserInfo',
        updateProducts: 'product/updateProducts'
      }),
      ...mapActions({
        count: 'product/count',
        search: 'product/search',
        shopcartCount: 'product/shopcartCount',
        shopcartProducts: 'product/shopcartProducts',
        likeCount: 'product/likeCount',
        findLike: 'product/findLike',
        setUserInfo: 'user/setUserInfo',
        getUserInfo: 'user/getUserInfo',
      }),

      /**
       * @description 初始化搜索商品数据
       */
      async initSearchData() {
        this.pagination.offset = 0
        switch (this.active) {
          case 0:
            this.myProducts()
            break
          case 1:
            this.likeProducts()
            break
          case 2:
            this.shopcart()
            break
        }
        await this.getProductCount()
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
      },

      /**
       * @description 选择菜单项
       * @param {number} index 选择下标
       * @param {object} item 菜单项
       */
      selectMenu(index, item) {
        if (this.active === index) return
        this.active = index
        this.pagination.offset = 0
        if (item.name === '登出') {
          this.logout()
          return
        }
        this.title = this.menu[this.active].name
        this.pagination.total = this.menu[index].count
        this.isSwitch = false
        switch (this.active) {
          case 0:
            this.myProducts()
            break
          case 1:
            this.likeProducts()
            break
          case 2:
            this.shopcart()
            break
        }
      },

      /**
       * @description 显示编辑个人信息
       */
      showEditorView() {
        if (this.title === '编辑个人信息') return
        this.title = '编辑个人信息'
        this.isSwitch = true
        this.active = -1
      },

      /**
       * @description 上传头像
       * @param {e: object} e 事件对象
       */
      handleAvatarSuccess(e) {
        this.setUserInfo({
          userId: this.userInfo.userId,
          avatar: e.base64.replace(/^data:image\/[a-z]+;base64,/, ''),
          imgType: e.type
        }).then(res => {
          if (res.data.status === 1042) {
            this.$message({
              type: 'success',
              message: '头像上传成功',
              offset: 100
            })
            this.getUserInfo()
          }
        })
      },

      /**
       * @description 编辑用户信息
       * @param {object} item 编辑项
       */
      editorUserInfo(item) {
        if (item.id === 'email') return
        this.$prompt(item.tip, `${item.name}修改`, {
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改',
          inputPattern: item.pattern,
          inputErrorMessage: item.errorMessage
        }).then(({
          value
        }) => {
          if (this.userInfo[item.id] === value) {
            return this.$message({
              type: 'warning',
              message: '该信息不能和原来的一样',
              offset: 100
            })
          }
          let info = {}
          info[item.id] = value
          info['userId'] = this.userInfo.userId
          this.setUserInfo(info).then(res => {
            if (res.data.status === 1042) {
              this.getUserInfo().then(result => {
                this.updateUserInfo({
                  info: result.data.data.result[0]
                })
              })
              this.$message({
                type: 'success',
                message: `已成功修改${item.name}`,
                offset: 100
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg,
                offset: 100
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: res.data.msg,
              offset: 100
            })
          })
        }).catch(() => {})
      },

      /**
       * @description 商品数目
       */
      async getProductCount() {
        // 我的商品
        await this.count({
          status: '上架',
          userId: this.userInfo.userId
        }).then(res => {
          if (res.data.status == 1080) {
            this.menu[0].count = res.data.result[0].count
          }
        }).catch(() => {})
        // 收藏商品
        await this.likeCount({
          userId: this.userInfo.userId
        }).then(res => {
          if (res.data.status === 1166) {
            this.menu[1].count = res.data.result
          }
        })
        // 加购商品
        await this.shopcartCount({
          userId: this.userInfo.userId
        }).then(res => {
          if (res.data.status === 1176) {
            this.menu[2].count = res.data.result
          }
        })
        this.pagination.total = this.menu[this.active].count
      },

      /**
       * @description 用户商品
       */
      myProducts() {
        let params = Object.assign({
          offset: this.pagination.offset,
          count: this.pagination.pageCount,
        })
        params.userId = this.userInfo.userId
        params.status = '上架'
        this.search(params).then(res => {
          if (res.data.status === 1034) {
            this.$router.push({
              name: "Login"
            })
          }
          if (res.data.status == 1070) {
            res.data.data.result.map((v, i) => {
              v.img = res.data.data.url + v.img
              v.detail_img = res.data.data.url + v.detail_img
              v.avatar = res.data.data.url + v.avatar
              v.num = i + 1
              v.updated_at = utils.formatDate(
                v.updated_at,
                "yyyy-MM-dd hh:mm:ss"
              )
            })
            this.updateProducts({
              products: res.data.data.result
            })
          }
        }).catch(() => {})
      },

      /**
       * @description 用户收藏商品
       */
      likeProducts() {
        let params = Object.assign({
          offset: this.pagination.offset,
          count: this.pagination.pageCount,
        })
        params.userId = this.userInfo.userId
        this.findLike(params).then(res => {
          if (res.data.status === 1034) {
            this.$router.push({
              name: "Login"
            })
          }
          if (res.data.status === 1165) {
            res.data.result.forEach(v => {
              v.img = res.data.url + v.img
              v.detail_img = res.data.url + v.detail_img
              v.avatar = res.data.url + v.avatar
              v.updated_at = utils.formatDate(
                v.updated_at,
                "yyyy-MM-dd hh:mm:ss"
              )
            })
            this.updateProducts({
              products: res.data.result
            })
          }
        })
      },

      /**
       * @description 用户加购商品
       */
      shopcart() {
        let params = Object.assign({
          offset: this.pagination.offset,
          count: this.pagination.pageCount,
        })
        params.userId = this.userInfo.userId
        this.shopcartProducts(params).then(res => {
          if (res.data.status === 1034) {
            this.$router.push({
              name: "Login"
            })
          }
          if (res.data.status === 1174) {
            res.data.result.forEach(v => {
              v.img = res.data.url + v.img
              v.detail_img = res.data.url + v.detail_img
              v.avatar = res.data.url + v.avatar
              v.updated_at = utils.formatDate(
                v.updated_at,
                "yyyy-MM-dd hh:mm:ss"
              )
            })
            this.updateProducts({
              products: res.data.result
            })
          }
        })
      },

      /**
       * @description 切换分页数据
       * @param {number} e 页码
       */
      async currentChange(e) {
        // 累加偏移量
        this.pagination.offset = (e - 1) * this.pagination.pageCount
        if (this.active === 0) {
          this.myProducts()
        }
        if (this.active === 1) {
          this.shopcart()
        }
        if (this.active === 2) {
          this.likeProducts()
        }
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './Profile.scss';

</style>
