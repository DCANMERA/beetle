<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    name: 'App',

    methods: {
      ...mapMutations({
        updateWindowWidth: 'updateWindowWidth',
        updateWindowHeight: 'updateWindowHeight',
        updateWindowScrollWidth: 'updateWindowScrollWidth',
        updateWindowScrollHeight: 'updateWindowScrollHeight',
      }),
      ...mapActions({
        getTypes: 'product/getTypes',
        getUserinfo: 'user/getUserInfo'
      })
    },

    mounted() {
      this.getTypes()
      this.getUserinfo()
      this.updateWindowWidth({
        w: window.innerWidth
      })
      this.updateWindowHeight({
        h: window.innerHeight
      })
      window.onresize = () => {
        this.updateWindowScrollWidth({
          sw: window.innerWidth
        })
        this.updateWindowScrollHeight({
          sh: window.innerHeight
        })
      }
    }
  }

</script>


<style lang="scss">
  html,
  body {
    height: 100%;
  }

  #app {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a,
  a:hover,
  a:active,
  a:visited,
  a:link {
    text-decoration: none;
  }

  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }

  .atuo-img {
    display: block;
    width: 100%;
  }

  .box-shadow {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6),
      0 2px 4px 0 rgba(232, 237, 250, .5);
  }

  //mac风格滚动条样式
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, .3);
  }

  ::-webkit-scrollbar-track {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, .1);
  }

</style>
