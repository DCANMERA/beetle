<template>
  <div class="upload-file">
    <label class="label-content">
      <input type="file"
             @change="upload" />
      <i class="el-icon-plus"></i>
      <img class="auto-img pro-img"
           :src="imgSrc"
           v-show="imgSrc" />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'UploadFile',

    props: {
      size: {
        type: [Number, String],
        // 单位：KB
        default: 120
      },
      type: {
        type: Array,
        default () {
          return ['jpg', 'jpeg', 'png', 'gif']
        }
      },

      // 图片路径
      imgSrc: {
        type: String,
        default: ''
      }
    },

    methods: {
      /**
       * @description 上传文件
       * @param {object} e 事件对象
       */
      upload(e) {
        const self = this
        const file = e.target.files[0]

        // 判断文件是否为图片类型
        const type = file.type.split('/')[1]
        if (this.type.indexOf(type) === -1) {
          e.target.value = ''
          return this.$message.error(`文件格式只支持${this.type.join(',')}`)
        }

        // 判断图片大小是否合法
        if (file.size / 1024 > this.size) {
          e.target.value = ''
          return this.$message.error(`文件大小不能超过${this.size >= 1024 ? this.size / 1024 + 'M': this.size + 'KB'}`)
        }
        const fileReader = new FileReader()
        fileReader.onload = function () {

          // 触发一个自定义事件，并且携带base64传递给父组件
          self.$emit('upload', {
            base64: this.result,
            type
          })
        }
        if (file) {
          fileReader.readAsDataURL(file)
        }
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  .upload-file {
    width: 100px;
    height: 100px;
    border: 1px dashed $borderColor;
    border-radius: 10px;
    overflow: hidden;

    .label-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: $borderColor;
      position: relative;
      cursor: pointer;

      &>i {
        font-size: 36px;
      }

      &>input[type="file"] {
        display: none;
      }

      &>img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
