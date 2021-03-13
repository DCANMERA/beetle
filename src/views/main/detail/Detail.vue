<template>
  <section class="detail">
    <el-row :style="{'max-width': container + 'px'}">
      <el-col :md="16">
        <div class="product-details">
          <h1 class="product-title">{{item.name}}<span @click="buyOpen">购买</span></h1>
          <div class="product-meta">
            <ul class="list-inline">
              <li class="list-inline-item">
                <i class="el-icon-user"></i>
                <span>提供者：{{item.email}}</span>
              </li>
              <li class="list-inline-item">
                <i class="el-icon-folder-opened"></i>
                <span>类别：{{item.title}}</span>
              </li>
            </ul>
          </div>
          <el-tooltip content="点击可查看图片细节"
                      placement="top">
            <el-image :src="img[0]"
                      fit="contain"
                      :preview-src-list="img">
            </el-image>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :md="7">
        <div class="sidebar">
          <div class="widget price text-center">
            <h4>价格</h4>
            <p>￥{{item.price}}</p>
          </div>
          <div class="widget user">
            <el-image class="rounded-circle"
                      :src="item.avatar"
                      fit="cover"
                      :preview-src-list="[item.avatar]">
            </el-image>
            <h4>{{item.email}}</h4>
            <div class="list-inline">
              <el-button @click="handleLike"
                         type="text"
                         :icon="isLike ? 'el-icon-star-on' : 'el-icon-star-off'">
                {{isLike ? '已收藏' : '收藏'}}
              </el-button>
              <el-button @click="handleShopcart"
                         type="text"
                         :icon="isShopcart ? 'el-icon-s-goods' : 'el-icon-goods'">
                {{isShopcart ? '已加购' : '加购'}}
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :style="{'max-width': container + 'px'}">
      <div class="content">
        <nav class="nav">
          <span class="nav-item">产品详情</span>
        </nav>
        <section class="tab-content">
          <el-divider class="tab-title"
                      content-position="center">产品描述</el-divider>
          <p>{{item.desc}}</p>
        </section>
      </div>
    </el-row>
  </section>
</template>

<script>
  import {
    mapActions,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: 'Detail',

    data() {
      return {
        isLike: false,
        isShopcart: false
      }
    },

    computed: {
      ...mapState({
        container: state => state.container,
        detail: state => state.product.detail,
        userInfo: state => state.user.userInfo
      }),
      pid() {
        return this.$route.query.pid
      },
      item() {
        this.updateDetail({
          detail: JSON.parse(this.$route.query.item)
        })
        return JSON.parse(this.$route.query.item)
      },
      img() {
        let img = []
        img.push(this.detail.img, this.detail.detail_img, )
        return img
      }
    },

    async mounted() {
      document.title = this.item.name
      this.updateActive({
        active: ''
      })
      await this.getUserInfo()
      this.getProductIsLikeOrIsShopcart()
    },

    methods: {
      ...mapMutations({
        updateDetail: 'product/updateDetail',
        updateActive: 'header/updateActive'
      }),
      ...mapActions({
        getUserInfo: 'user/getUserInfo',
        like: 'product/like',
        removeLike: 'product/removeLike',
        findLike: 'product/findLike',
        addShopcart: 'product/addShopcart',
        removeShopcart: 'product/removeShopcart',
        shopcartProducts: 'product/shopcartProducts'
      }),

      /**
       * @description 查找是否商品已收藏
       */
      getProductIsLikeOrIsShopcart() {
        this.findLike({
          pid: this.item.pid,
          userId: this.userInfo.userId,
          offset: 0,
          count: 1
        }).then(res => this.isLike = res.data.result.length !== 0)
        this.shopcartProducts({
          pid: this.item.pid,
          userId: this.userInfo.userId,
          offset: 0,
          count: 1
        }).then(res => this.isShopcart = res.data.result.length !== 0)
      },

      /**
       * @description 收藏处理
       */
      handleLike() {
        if (!this.isLike) {
          this.like({
            pid: this.item.pid,
            userId: this.userInfo.userId
          }).then(res => {
            if (res.data.status === 1160) {
              this.isLike = true
              this.$message({
                message: '收藏成功',
                type: 'success',
                offset: 100
              })
            }
          })
          return
        }
        this.removeLike({
          pid: this.item.pid,
          userId: this.userInfo.userId
        }).then(res => {
          if (res.data.status === 1162) {
            this.isLike = false
            this.$message({
              message: '取消收藏成功',
              type: 'success',
              offset: 100
            })
          }
        })
      },

      /**
       * @description 加购处理
       */
      handleShopcart() {
        if (!this.isShopcart) {
          this.addShopcart({
            pid: this.item.pid,
            userId: this.userInfo.userId,
            count: 1
          }).then(res => {
            if (res.data.status === 1170) {
              this.isShopcart = true
              this.$message({
                message: '加购成功',
                type: 'success',
                offset: 100
              })
            }
          })
          return
        }
        this.removeShopcart({
          pid: this.item.pid,
          userId: this.userInfo.userId
        }).then(res => {
          if (res.data.status === 1172) {
            this.isShopcart = false
            this.$message({
              message: '取消加购成功',
              type: 'success',
              offset: 100
            })
          }
        })
      },

      /**
       * @description 购买处理
       */
      buyOpen() {
        this.$confirm('本平台推荐双方见面交易，买家通过邮箱联系卖家喔', '建议', {
          confirmButtonText: '确定'
        }).then(() => {}).catch(() => {})
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './detail.scss';

</style>
