<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {
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
      })
    },

    mounted() {
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
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  a,
  a:hover,
  a:active,
  a:visited,
  a:link {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Muli", sans-serif;
    font-weight: 600;
    color: $primaryTextColor;
    line-height: 1.2;
    vertical-align: inherit;
  }

  html,
  body {
    height: 100%;
  }

  #app {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  .widget {
    background: $white;
    box-shadow: 0px 1px 3px 0px rgba($color: $black, $alpha: .1);
    padding: 25px 30px 30px;
    margin-bottom: 30px;
    border-radius: 2px;
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
