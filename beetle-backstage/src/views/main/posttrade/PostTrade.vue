<template>
  <div class="post-trade">
    <div class="title">{{title}}</div>
    <div class="goods-info">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="商品名称"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型"
                      prop="type">
          <el-select v-model="ruleForm.type"
                     placeholder="请选择商品类型">
            <el-option v-for="(item, index) in types"
                       :key="index"
                       :label="item.title"
                       :value="item.typeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格"
                      prop="price">
          <el-input v-model="ruleForm.price"
                    type="number"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="商品图片"
                      prop="img">
          <UploadFile @upload="upload($event, 'img')"
                      :img-src="ruleForm.img"
                      :size="5 * 1024">
          </UploadFile>
        </el-form-item>
        <el-form-item label="详情图片"
                      prop="detailImg">
          <UploadFile @upload="upload($event, 'detailImg')"
                      :img-src="ruleForm.detailImg"
                      :size="5 * 1024">
          </UploadFile>
        </el-form-item>
        <el-form-item label="商品状态"
                      prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="上架"></el-radio>
            <el-radio label="下架"
                      v-if="pid"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述"
                      prop="desc">
          <el-input class="goods-detail"
                    type="textarea"
                    :rows="6"
                    maxlength="250"
                    show-word-limit
                    resize="none"
                    clearable
                    v-model="ruleForm.desc">
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="block">
            <el-button @click="cancel('ruleForm')">
              取消
            </el-button>
            <el-button type="primary"
                       @click="postProducts('ruleForm')">
              提交
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'PostTrade',

    components: {
      UploadFile: () => import('@/components/UploadFile.vue')
    },

    data() {
      return {
        ruleForm: {
          name: '',
          type: '',
          price: '',
          img: '',
          detailImg: '',
          status: '',
          desc: '',
        },

        // 备份数据
        copyData: {},

        // 图片类型
        imgTypes: {
          imgType: '',
          detailImgType: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择商品类型',
            trigger: 'change'
          }, ],
          price: [{
            required: true,
            validator: this.validPrice,
            trigger: 'blur'
          }],
          img: [{
            required: true,
            message: '请上传商品图片',
            trigger: 'change'
          }],
          detailImg: [{
            required: true,
            message: '请上传详情图片',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择商品状态',
            trigger: 'change'
          }, ],
          desc: [{
            required: true,
            message: '请填写商品描述',
            trigger: 'blur'
          }]
        },
        title: '',
        pid: '',
      }
    },

    computed: {
      ...mapState({
        types: state => state.product.types,
        userInfo: state => state.user.userInfo
      })
    },

    mounted() {
      // 截取查询参数
      let pid = this.$route.query.pid
      if (pid) {
        this.title = '商品详情'
        this.pid = pid

        // 根据商品pid查询商品信息
        this.getProductByPid()
      } else {
        this.title = '发布商品'
      }
    },

    methods: {
      ...mapActions({
        updateProduct: 'product/updateProduct',
        probyid: 'product/probyid',
        postProduct: 'product/postProduct'
      }),

      /**
       * @description 取消
       * @param {formName: object} formName 校正表单
       */
      cancel(formName) {
        this.$refs[formName].resetFields()
        if (this.pid) {
          this.$router.push('Products')
        }
      },

      /**
       * @description 发布商品
       * @param {formName: object} formName 校正表单
       */
      postProducts(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 发布商品
            if (!this.pid) {
              this.post()
            } else {

              // 编辑商品
              this.update()
            }
          } else {
            return false
          }
        })
      },

      /**
       * @description 发布商品
       */
      post() {
        let product = Object.assign({}, this.ruleForm, this.imgTypes)
        product.img = product.img.replace(/^data:image\/[a-z]+;base64,/, '')
        product.detailImg = product.detailImg.replace(/^data:image\/[a-z]+;base64,/, '')
        this.postProduct(product).then(res => {
          if (res.data.status == 1034) {
            this.$router.push({
              name: 'Login'
            })
          }
          if (res.data.status == 1060) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.push({
              name: 'Products'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },

      /**
       * @description 编辑商品
       */
      update() {
        // 保存修改商品的数据
        let data = {}
        for (let key in this.ruleForm) {
          if (this.ruleForm[key] != this.copyData[key]) {
            data[key] = this.ruleForm[key]
          }
        }
        if (data.img) {
          data.img = data.img.replace(/^data:image\/[a-z]+;base64,/, '')
          data.imgType = this.imgTypes.imgType
        }
        if (data.detailImg) {
          data.detailImg = data.detailImg.replace(/^data:image\/[a-z]+;base64,/, '')
          data.detailImgType = this.imgTypes.detailImgType
        }

        // 如果没有编辑商品数据, 直接返回商品列表
        if (JSON.stringify(data) == '{}') {
          return this.$message({
            message: '数据未做修改，不能提交！',
            type: 'warning'
          })
        }
        data.pid = this.pid
        this.updateProduct(data).then(res => {
          if (res.data.status == 1034) {
            this.$router.push({
              name: 'Login'
            })
          }
          if (res.data.status == 1100) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$router.push({
              name: 'Products'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch((err) => {})
      },

      /**
       * @description 根据商品pid查询商品信息
       */
      getProductByPid() {
        this.probyid({
          userId: this.userInfo.userId,
          pid: this.pid
        }).then(res => {
          if (res.data.status == 1034) {
            this.$router.push({
              name: 'Login'
            })
          }
          if (res.data.status == 1070) {
            let data = res.data.data.result[0]
            this.ruleForm.name = data.name
            this.ruleForm.type = data.type_id
            this.ruleForm.price = data.price
            this.ruleForm.img = res.data.data.url + data.img
            this.ruleForm.detailImg = res.data.data.url + data.detail_img
            this.ruleForm.status = data.status
            this.ruleForm.desc = data.desc

            // 备份数据，以便修改商品数据
            this.copyData = Object.assign({}, this.ruleForm)
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {})
      },

      /**
       * @description 上传文件
       * @param {e: object} e 事件对象
       * @param {key: string} key 图片类型
       */
      upload(e, key) {
        this.ruleForm[key] = e.base64
        this.imgTypes[key + "Type"] = e.type
      },

      /**
       * @description 验证价格
       * @param {rule: RegExp} rule 校正正则
       * @param {value: string} value 校正值
       * @param {callback: Function} callback 回调函数
       */
      validPrice(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入商品价格'))
        }
        setTimeout(() => {
          let reg = /^(([1-9]\d*)|0)(\.[0-9]{1,2})?$/
          if (!reg.test(value)) {
            callback(new Error('价格只能填写数值'))
          } else {
            callback()
          }
        }, 400)
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './postTrade.scss';

</style>
