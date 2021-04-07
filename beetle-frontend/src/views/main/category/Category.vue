<template>
  <div class="hot-product">
    <el-row class="title">
      <h2>{{productTitle}}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, magnam.</p>
    </el-row>
    <section class="product-item infinite-list"
             v-infinite-scroll="load"
             v-if="products.length>0">
      <product v-for="(item,index) in products"
               :key="index"
               :productItem="item"
               class="infinite-list-item" />
    </section>
    <section class="emtype"
             v-else
             :style="{height: `${h-headerHeight-footerHeight}px`}">
      <i class="el-icon-info emtype-icon"></i>
      <h1 class="emtype-title">抱歉，甲壳虫未能找到你想要的商品！</h1>
    </section>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: 'Category',
    components: {
      Product: () => import('@/components/Product.vue')
    },
    computed: {
      ...mapState({
        types: state => state.product.types,
        products: state => state.product.products,
        productTitle: state => state.product.productTitle,
        h: state => state.h,
        headerHeight: state => state.header.headerHeight,
        footerHeight: state => state.footer.footerHeight
      }),

      typeId() {
        return this.$route.params.type_id
      }
    },
    watch: {
      typeId(val) {
        if (val) {
          this.types.map(item => {
            if (item.typeId === val) {
              this.updateProductTitle({
                productTitle: item.title
              })
            }
          })
        }
      }
    },
    mounted() {
      if (this.typeId) {
        this.types.map(item => {
          if (item.typeId === this.typeId) {
            this.updateProductTitle({
              productTitle: item.title
            })
          }
        })
      }
    },
    methods: {
      ...mapMutations({
        updateProductTitle: 'product/updateProductTitle'
      }),

      /**
       * @description 滚动加载数据
       */
      load() {}
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './category.scss';

</style>
