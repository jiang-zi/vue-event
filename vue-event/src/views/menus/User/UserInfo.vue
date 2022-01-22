<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="userForm"
      :rules="userRules"
      ref="userForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录名称">
        <el-input disabled v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit"
          >立即修改</el-button
        >
        <el-button @click="$refs.userForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserInfo',
  data () {
    return {
      userForm: {},
      userRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      // 1. 验证表单的合法性
      this.$refs.userForm.validate(async valid => {
        // 2. 验证失败
        if (!valid) return
        // 3. 验证通过，发起请求
        const { data: res } = await this.$http.put('/my/userinfo', this.userForm)
        if (res.code !== 0) return this.$message.error(res.message)
        // 4. 更新用户信息成功，刷新 Vuex 中的数据
        this.$message.success(res.message)
        this.$store.dispatch('updateUserInfo')
      })
    }
  },
  created () {
    this.userForm = {
      ...this.userInfo
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
