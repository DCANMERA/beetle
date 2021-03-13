<template>
  <section class="register">
    <div class="col-wrap">
      <div class="register-layout">
        <div class="title">账号注册</div>
        <div class="form">
          <el-form :model="userInfo"
                   :rules="rules"
                   class="demo-ruleForm"
                   status-icon
                   ref="userInfo"
                   label-width="90px"
                   label-position="left"
                   :hide-required-asterisk="true">
            <el-form-item prop="email"
                          label="邮箱地址">
              <el-input type="text"
                        v-model="userInfo.email"
                        autocomplete="off"
                        placeholder="输入邮箱">
              </el-input>
            </el-form-item>
            <el-form-item prop="password"
                          label="密码">
              <el-input type="password"
                        v-model="userInfo.password"
                        autocomplete="off"
                        show-password
                        placeholder="输入密码(6-16位)">
              </el-input>
            </el-form-item>
            <el-form-item prop="repassword"
                          label="确认密码">
              <el-input type="password"
                        v-model="userInfo.repassword"
                        autocomplete="off"
                        show-password
                        placeholder="输入确认密码">
              </el-input>
            </el-form-item>
            <el-form-item prop="validcode"
                          label="验证码">
              <div class="send-code">
                <el-input v-model="userInfo.validcode"
                          autocomplete="off"
                          placeholder="输入6位数字验证码">
                </el-input>
                <el-button class="send"
                           :disabled="isSend"
                           @click="sendCode">
                  {{text}}
                </el-button>
              </div>
            </el-form-item>
            <el-form-item class="form-group"
                          label="">
              <el-button class="register-btn"
                         type="primary"
                         @click="submitForm('userInfo')">
                注册
              </el-button>
            </el-form-item>
            <el-form-item label="">
              <div class="login-text">
                <router-link class="link"
                             target="_blank"
                             to="login">
                  已有账号，立即登录
                </router-link>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'Register',

    data() {
      return {

        // 用户注册信息
        userInfo: {
          email: '',
          password: '',
          repassword: '',
          validcode: ''
        },

        //验证表单规则
        rules: {
          email: [{
            validator: this.validEmail,
            trigger: 'blur'
          }],
          password: [{
            validator: this.validPassword,
            trigger: 'blur'
          }],
          repassword: [{
            validator: this.validRepassword,
            trigger: 'blur'
          }],
          validcode: [{
            validator: this.validCode,
            trigger: 'blur'
          }]
        },

        // 正则
        reg: {
          emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          psdReg: /^[A-Za-z]\w{5,15}$/,
          codeReg: /^\d{6}$/
        },

        // 发送验证文本
        text: '发送验证码',

        // 是否发送验证码
        isSend: false,

        // 验证码id
        codeId: ''

      }
    },

    methods: {
      ...mapActions({
        sendEmail: 'user/sendEmail',
        register: 'user/register'
      }),

      /**
       * @description 发送验证码
       */
      sendCode() {
        // 验证邮箱格式是否正确
        if (!this.reg.emailReg.test(this.userInfo.email)) return
        let time = 60
        this.text = `${time}s后重新发送`
        this.isSend = true
        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer)
            timer = null
            this.text = '发送验证码'
            this.isSend = false
          } else {
            time--
            this.text = `${time}s后重新发送`
          }
        }, 1000)

        // 发送验证码
        this.sendEmail(this.userInfo.email).then(res => {
          if (res.data.status == 1010) {
            this.codeId = res.data.cid
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            return
          }
          this.$message.error(res.data.msg)
        }).catch(err => {
          this.$message.error(err)
        })
      },

      /**
       * @description 注册
       * @param {formName: object} formName 校正表单
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return false
          this.register({
            email: this.userInfo.email,
            password: this.userInfo.password,
            codeId: this.codeId,
            validcode: this.userInfo.validcode
          }).then(res => {
            if (res.data.status == 1000) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              let timer = setTimeout(() => {
                this.$router.push({
                  name: 'Login'
                })
                clearTimeout(timer)
              }, 1500)
              return
            }
            this.$message.error(res.data.msg)
          })
        })
      },

      /**
       * @description 验证邮箱
       * @param {rule: RegExp} rule 校正正则
       * @param {value: string} value 校正值
       * @param {callback: Function} callback 回调函数
       */
      validEmail(rule, value, callback) {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (!this.reg.emailReg.test(value)) {
            callback(new Error('邮箱格式不正确'))
          } else {
            callback()
          }
        }, 400)
      },

      /**
       * @description 验证密码(首字符为字母, 字母数字_组合, 6-16位)
       * @param {rule: RegExp} rule 校正正则
       * @param {value: string} value 校正值
       * @param {callback: Function} callback 回调函数
       */
      validPassword(rule, value, callback) {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        setTimeout(() => {
          if (!this.reg.psdReg.test(value)) {
            callback(new Error('密码必须以字母开头，可包含字母数字_'))
          } else {
            callback()
          }
        }, 400)
      },

      /**
       * @description 验证确认密码
       * @param {rule: RegExp} rule 校正正则
       * @param {value: string} value 校正值
       * @param {callback: Function} callback 回调函数
       */
      validRepassword(rule, value, callback) {
        if (!value) {
          return callback(new Error('确认密码不能为空'))
        }
        setTimeout(() => {
          if (value != this.userInfo.password) {
            callback(new Error('两次密码不一致'))
          } else {
            callback()
          }
        }, 400)
      },

      /**
       * @description 验证验证码
       * @param {rule: RegExp} rule 校正正则
       * @param {value: string} value 校正值
       * @param {callback: Function} callback 回调函数
       */
      validCode(rule, value, callback) {
        if (!value) {
          return callback(new Error('验证码不能为空'))
        }
        setTimeout(() => {
          if (!this.reg.codeReg.test(value)) {
            callback(new Error('验证码必须为6位数字'))
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
  @import './register.scss';

</style>
