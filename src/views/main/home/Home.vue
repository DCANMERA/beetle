<template>
  <section class="home">
    <div class="banner">
      <div class="slide_tips">
        <i class="s_line"></i>
        <span class="txt">滑动</span>
      </div>
      <div class="banner-tip"
           :style="{'min-height': bgHeight + 'px'}">
        <h1>在您附近买卖</h1>
        <div class="join">
          <h3>加入</h3>
          <h3>甲壳虫中每天互相买卖的数百万人中</h3>
        </div>
      </div>
    </div>
    <div class="search">
      <el-form :inline="true"
               :model="searchCondition">
        <el-form-item class="search-item">
          <el-input v-model="searchCondition.name"
                    prefix-icon="el-icon-search"
                    placeholder="请输入您要搜索的商品名"
                    @change="search" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="search"
                     v-loading.fullscreen.lock="loading">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Category></Category>
  </section>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'Home',

    components: {
      Category: () => import('../category/Category.vue')
    },

    data() {
      return {
        bgHeight: 500,
        loading: false,
        searchCondition: {
          name: '',
          type_id: '-1',
        },
        disable: true
      }
    },

    computed: {
      ...mapState({
        h: state => state.h,
        sh: state => state.sh,
        headerHeight: state => state.header.headerHeight,
        products: state => state.product.products,
        productTitle: state => state.product.productTitle,
      })
    },

    mounted() {
      this.updateProductTitle({
        productTitle: '热卖推荐'
      })
      this.bgHeight = this.sh < 568 ? this.h : this.sh
      this.getProducts()
    },

    watch: {
      sh() {
        this.bgHeight = this.sh < 568 ?
          this.h :
          this.sh
      }
    },

    methods: {
      ...mapMutations({
        updateProductTitle: 'product/updateProductTitle'
      }),
      ...mapActions({
        getProducts: 'product/getProducts'
      }),

      /**
       * @description 搜索
       */
      search() {
        if (!this.searchCondition.name) {
          return this.$message({
            message: '请输入您要搜索的商品名',
            type: 'warning',
            offset: this.h / 2
          })
        }
        this.loading = true
        this.getProducts(this.searchCondition).then(res => {
          if (res.data.status === 1120) {
            setTimeout(() => this.loading = false, 600)
            if (res.data.result.length === 0) {
              this.$message('暂无商品')
            }
          }
        })
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './home.scss';

</style>
