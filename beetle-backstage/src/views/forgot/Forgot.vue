<template>
  <section class="forgot">
    <div class="col-wrap">
      <div class="forgot-layout">
        <div class="title">忘记密码</div>
      </div>
      <el-form :model="info"
               :rules="rules"
               class="demo-ruleForm"
               status-icon
               ref="info"
               label-width="80px"
               label-position="right"
               :hide-required-asterisk="true">
        <el-row>
          <el-steps :active="active"
                    align-center
                    process-status="finish">
            <el-step title="填写帐号"></el-step>
            <el-step title="身份验证"></el-step>
            <el-step title="设置新密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-row>
        <el-row class="fotgot-item"
                v-show="active == 0">
          <el-form-item prop="email"
                        label="邮箱地址">
            <el-input type="text"
                      v-model="info.email"
                      autocomplete="off"
                      placeholder="输入邮箱">
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
        </el-row>
        <el-row class="fotgot-item"
                v-show="active == 1">
          <el-form-item prop="validcode"
                        label="验证码">
            <div class="send-code">
              <el-input v-model="info.validcode"
                        autocomplete="off"
                        class="validcode"
                        placeholder="输入6位数字验证码">
              </el-input>
              <el-button class="send"
                         type="primary"
                         plain
                         :disabled="isSend"
                         @click="sendCode">
                {{text}}
              </el-button>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="fotgot-item"
                v-show="active == 2">
          <el-form-item prop="password"
                        label="密码">
            <el-input type="password"
                      v-model="info.password"
                      autocomplete="off"
                      show-password
                      placeholder="输入密码(6-16位)">
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword"
                        label="确认密码">
            <el-input type="password"
                      v-model="info.repassword"
                      autocomplete="off"
                      show-password
                      placeholder="输入确认密码">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row class="fotgot-item"
                v-show="active == 3">
          <i class="el-icon-success reset-success-icon"></i>
          <div class="success-text">重置密码成功</div>
        </el-row>
        <el-row class="next-wrap">
          <el-button type="primary"
                     v-if="active < 3"
                     @click="submitForm('info')">确定</el-button>
        </el-row>
      </el-form>
    </div>
  </section>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'Forgot',

    data() {
      return {
        active: 0,

        // 用户信息
        info: {
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
        codeId: '',

        // 是否通过点击验证
        isVerify: false
      }
    },

    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },

    methods: {
      ...mapActions({
        jadgeCode: 'user/jadgeCode',
        sendEmail: 'user/sendEmail',
        getUserInfoForEmail: 'user/getUserInfoForEmail',
        setUserInfo: 'user/setUserInfo',
      }),

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
       * @description 表单验证
       * @param {formName: object} formName 校正表单
       * @param {formItem: array} formItem 校正表单单项
       * @param {callback: Function} callback 回调函数
       */
      jadgeForm(formName, formItem, callback) {
        this.$refs[formName].validateField(formItem, emailError => {
          if (!emailError) {
            if (!this.isVerify) {
              this.$message.error('请点击完成认证')
              return false
            }
            callback && callback()
          } else {
            return false
          }
        })
      },

      /**
       * @description 发送验证码
       */
      sendCode() {
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
        this.sendEmail({
          email: this.info.email
        }).then(res => {
          if (res.data.status == 1010) {
            this.codeId = res.data.cid
            sessionStorage.setItem('codeId', res.data.cid)
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
       * @description 发起修改密码
       * @param {formName: object} formName 校正表单
       */
      submitForm(formName) {
        let codeId = this.codeId ?
          this.codeId :
          sessionStorage.getItem('codeId')
        let email = this.info.email ?
          this.info.email :
          sessionStorage.getItem('email')
        switch (this.active) {
          case 0:
            this.jadgeForm(formName, 'email', () => {
              this.getUserInfoForEmail({
                email: this.info.email
              }).then(res => {
                if (res.data.status === 1040 && res.data.result.length > 0) {
                  this.active++
                  return false
                }
                this.$message.error(`${this.info.email} 该用户不存在！`)
              })
              sessionStorage.setItem('email', this.info.email)
            })
            break
          case 1:
            this.jadgeForm(formName, 'validcode', () => {
              this.jadgeCode({
                validcode: this.info.validcode,
                codeId,
                email,
              }).then(res => {
                if (res.data.status === 1035) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500
                  })
                  setTimeout(() => this.active++, 2000)
                }
                if (res.data.status === 1031) {
                  this.$message.error(res.data.msg)
                }
              }).catch(err => {
                this.$message.error(err)
              })
            })
            break
          case 2:
            this.jadgeForm(formName, 'repassword', () => {
              this.setUserInfo({
                userId: this.userInfo.userId,
                password: this.info.password,
                validcode: this.info.validcode
              }).then(res => {
                if (res.data.status == 1042) {
                  this.active++
                  this.$message({
                    message: res.data.msg + '，3秒后自动跳往登陆页',
                    type: 'success'
                  })
                  setTimeout(() => this.$router.push('Login'), 3000)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            })
            break
        }
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
          if (value != this.info.password) {
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
  @import './forgot.scss';

</style>
