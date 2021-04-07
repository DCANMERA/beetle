<template>
  <section class="login">
    <div class="col-wrap">
      <div class="login-layout">
        <div class="title">用户登录</div>
        <div class="form">
          <el-form :model="userInfo"
                   status-icon
                   ref="userInfo"
                   :rules="rules"
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
            <el-form-item label="点击验证">
              <div class="verify"
                   @click="jadge"
                   :style="isVerify ? 'border: none' : ''">
                <div v-show="!isVerify">
                  <div class="icon">
                    <span class="logo"></span>
                  </div>
                  <span class="verify-text">点击完成验证</span>
                </div>
                <div class="classic-tips"
                     v-show="isVerify">
                  <span class="logo"></span>
                  <span>验证成功</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="form-group"
                          label="">
              <el-button class="login-btn"
                         type="primary"
                         @click="submitForm('userInfo')">
                登录
              </el-button>
            </el-form-item>
            <el-form-item label="">
              <div class="login-hint">
                <router-link class="link"
                             target="_blank"
                             to="register">免费注册</router-link>
                <router-link to="forgot"
                             class="link"
                             target="_blank">忘记密码?</router-link>
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
    name: 'Login',

    data() {
      return {

        // 用户注册信息
        userInfo: {
          email: '',
          password: ''
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
          }]
        },

        // 正则
        reg: {
          emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          psdReg: /^[A-Za-z]\w{5,15}$/,
        },

        // 是否通过点击验证
        isVerify: false
      }
    },

    methods: {
      ...mapActions({
        login: 'user/login'
      }),

      /**
       * @description 登录
       * @param {formName: object} formName 校正表单
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) return false
          if (!this.isVerify) {
            this.$message.error('请点击完成认证')
            return
          }
          this.login({
            email: this.userInfo.email,
            password: this.userInfo.password
          }).then(res => {
            if (res.status == 1030) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              // 将token保存再cookie中
              for (let key in res.data) {
                this.$cookies.set(key, res.data[key], '1d')
              }
              let timer = setTimeout(() => {
                this.$router.push({
                  name: 'Home'
                })
                clearTimeout(timer)
              }, 1500)
              return
            }
            this.$message.error(res.msg)
            this.isVerify = false
          })
        })
      },

      /**
       * @description 验证是否通过
       */
      jadge() {
        let timer = setTimeout(() => {
          this.isVerify = true
          clearTimeout(timer)
        }, 300)
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
      }
    }
  }

</script>

<style lang="scss"
       scoped>
  @import './login.scss';

</style>
