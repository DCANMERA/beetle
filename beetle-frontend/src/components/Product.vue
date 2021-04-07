<template>
  <div class="card"
       @click="goDetail">
    <el-tooltip class="item"
                effect="dark"
                :open-delay="200"
                :content="productItem.name"
                placement="top">
      <el-card :body-style="{ padding: '0px' }"
               shadow="hover">
        <el-image :src="productItem.img"
                  lazy>
        </el-image>
        <div class="card-body">
          <h4 class="card-title">{{productItem.name}}</h4>
          <ul class="list-inline product-meta">
            <li class="list-inline-item">
              <i class="el-icon-price-tag"></i>
              <span>{{productItem.title}}</span>
            </li>
            <li class="list-inline-item">
              <i class="el-icon-alarm-clock"></i>
              <span>{{date}}</span>
            </li>
          </ul>
          <p class="card-text">{{productItem.desc}}</p>
          <div class="product-ratings">
            <el-rate v-model="rate"
                     disabled
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
          </div>
        </div>
      </el-card>
    </el-tooltip>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: 'Product',

    props: {
      productItem: {
        type: Object
      }
    },

    computed: {
      date() {
        let date = new Date(this.productItem.updated_at)
        date = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        return date
      },
      rate() {
        return this.productItem.rate - 0
      }
    },

    methods: {
      ...mapMutations({
        updateDetail: 'product/updateDetail'
      }),

      /**
       * @description 去往详情页
       */
      goDetail() {
        this.updateDetail({
          detail: this.productItem
        })
        let routeUrl = this.$router.resolve({
          name: "Detail",
          params: {
            pid: this.productItem.pid,
            item: JSON.stringify(this.productItem)
          },
          query: {
            item: JSON.stringify(this.productItem)
          }
        })
        window.open(routeUrl.href, '_blank')
      },
    }
  }

</script>

<style lang="scss"
       scoped>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 285px;
    word-wrap: break-word;
    background-color: $white;
    background-clip: border-box;
    cursor: pointer;
    user-select: none;

    .el-image {
      width: 100%;
      height: 220px;
    }

    .card-body {
      flex: 1 1 auto;
      padding: 20px;

      .card-title {
        font-size: 18px;
        margin-bottom: 5px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .product-meta {
        margin-bottom: 15px;

        .list-inline-item {
          display: inline-block;
        }

        li {
          margin-right: 15px;
          font-size: 12px;
          color: $subTextColor;

          i {
            margin-right: 2px;
          }
        }
      }

      .card-text {
        height: 42px;
        vertical-align: inherit;
        color: $normalTextColor;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 15px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }

</style>
