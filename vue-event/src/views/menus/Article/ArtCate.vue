<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button @click="addVisible = true" type="primary" size="mini"
          >添加分类</el-button
        >
      </div>
      <el-table border stripe :data="cateList" style="width: 100%">
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="分类名称" prop="cate_name"> </el-table-column>
        <el-table-column label="分类别称" prop="cate_alias"> </el-table-column>
        <el-table-column label="操作">
          <template  v-slot="{ row }">
            <el-button @click="editDialogHandler(row)" size="mini" type="primary">修改</el-button>
            <el-button @click="deleteCateHandler(row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加文章分类dialog -->
    <el-dialog @closed="$refs.addForm.resetFields()" title="添加文章分类" :visible.sync="addVisible" width="35%">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="70px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addCateHandler"
          >添加</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改文章分类dialog -->
    <el-dialog @closed="$refs.editForm.resetFields()" title="修改文章分类" :visible.sync="editVisible" width="35%">
      <el-form
        :model="editForm"
        :rules="addRules"
        ref="editForm"
        label-width="70px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="editForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="editForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editCateHandler"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArtCate',
  data () {
    return {
      list: [],
      addVisible: false,
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      editVisible: false,
      editForm: {
        cate_name: '',
        cate_alias: ''
      },
      addRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // updateList () {
    //   this.list = this.cateList
    //   this.$store.dispatch('artCate/getCateList')
    // },// 不能实时更新
    ...mapActions('artCate', ['getCateList']),
    addCateHandler () {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/my/cate/add', this.addForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.getCateList()
        this.addVisible = false
      })
    },
    editDialogHandler (row) {
      if (row.id < 3) return this.$message.error('未获取管理员权限,不能修改')
      this.editForm = { ...row }
      this.editVisible = true
    },
    editCateHandler () {
      this.$refs.editForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('/my/cate/info', this.editForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.getCateList()
        this.editVisible = false
      })
    },
    async deleteCateHandler (id) {
      if (id === 1 || id === 2) return this.$message.error('管理员不允许删除这个分类！')
      const res = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        const { data: res } = await this.$http.delete(`/my/cate/del?id=${id}`)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.getCateList()
      }
    }
  },
  created () {
    this.getCateList()
  },
  computed: {
    ...mapState('artCate', ['cateList'])
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
