<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="regForm" :rules="regRules" ref="regForm">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="regForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="regForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="请确认密码"
            v-model="regForm.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="regHandler" class="btn-reg" type="primary">注册</el-button>
          <el-link @click="$router.push('/login')" type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data () {
    const checkPassword = (rule, value, cb) => {
      if (value !== this.regForm.password) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    return {
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      regRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z][0-9a-zA-Z]{0,9}$/, message: '用户名必须是1-10位的字母数字, 不能以数字开头', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {},

  methods: {
    regHandler () {
      // 进行兜底校验
      this.$refs.regForm.validate(async valid => {
        if (!valid) return
        // console.log('通过校验, 执行注册')
        // this.$http.post('/api/reg', {
        //   // username: this.regForm.username,
        //   // password: this.regForm.password,
        //   // repassword: this.regForm.repassword
        //   ...this.regForm
        // })
        // 发送 ajax 请求进行注册
        const { data: res } = await this.$http.post('/api/reg', this.regForm)
        // console.log(res)
        // 判断结果, 如果失败就提示用户
        if (res.code !== 0) return this.$message.error(res.message)
        // this.$message({ type: 'error', message: res.message })
        // 成功也提示用户
        this.$message.success(res.message)
        // 编程式导航, 注册成功后, 跳转至登录页
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
