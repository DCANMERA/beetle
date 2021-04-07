<template>
  <div class="menu-tree">
    <el-menu background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :default-active="active"
             :unique-opened="true"
             class="el-menu-vertical-demo">
      <el-submenu :index="item.id + ''"
                  v-for="(item,index) in menu"
                  :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="item.id+'-'+v.id"
                      v-for="(v,i) in item.children"
                      @click="goPage(v.route)"
                      :key="i">
          {{v.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'MenuTree',

    props: {
      active: {
        type: String
      },
      menu: {
        type: Array
      }
    },

    methods: {
      /**
       * @description 跳转路由
       */
      goPage(name) {
        if (this.$route.name == name) return
        this.$router.push({
          name
        })
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  .menu-tree {
    .el-menu {
      border: none;
      height: 100%;
    }

    .el-submenu__title i {
      color: $white;
    }
  }

</style>
