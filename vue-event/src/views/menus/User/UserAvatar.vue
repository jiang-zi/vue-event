<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="avatar" :src="avatar" alt="" />
      <img v-else src="../../../assets/images/avatar.jpg" alt="" />

      <!-- 按钮区域 -->
      <div class="btn-box">
          <input @change="updateAvatar" ref="inp" type="file" accept="image/*" hidden>
        <el-button @click="$refs.inp.click()" type="primary" icon="el-icon-plus">选择图片</el-button>
        <el-button @click="uploadAvatar" type="success" icon="el-icon-upload" :disabled="avatar === ''">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    updateAvatar (e) {
    //   // e.target.files
    //   console.log(e.target.files)
      if (e.target.files.length === 0) {
        this.avatar = ''
      } else {
        console.log(e.target.files[0])
        const fr = new FileReader()
        // 2. 调用 readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(e.target.files[0])
        // 3. 监听 fr 的 onload 事件
        fr.onload = e => {
        // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
          this.avatar = e.target.result
        }
      }
    },
    async uploadAvatar () {
      const { data: res } = await this.$http.patch('/my/update/avatar', { avatar: this.avatar })
      if (res.code !== 0) return this.$message.error('上传头像失败！')
      this.$message.success('上传头像成功！')
      this.$store.dispatch('user/getUserInfo')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
</style>
