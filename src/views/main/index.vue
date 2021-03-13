<template>
  <main :style="{'min-width': container + 'px'}">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </main>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'Main',

    components: {
      Header: () => import('@/components/Header.vue'),
      Footer: () => import('@/components/Footer.vue')
    },

    computed: {
      ...mapState({
        container: state => state.container
      })
    },

    methods: {
      ...mapActions({
        getUserInfo: 'user/getUserInfo',
        getTypes: 'product/getTypes'
      }),
    },

    mounted() {
      this.getUserInfo()
      this.getTypes()
    },
  }

</script>

<style lang="scss"
       scoped>
  @import './index.scss';

</style>
