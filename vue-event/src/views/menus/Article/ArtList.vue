<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="cate_id" placeholder="请选择分类" size="small">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.cate_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="filterHandler" type="primary" size="small"
              >筛选</el-button
            >
            <el-button @click="restHandler" type="info" size="small"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          @click="pubVisible = true"
          type="primary"
          size="small"
          class="btn-pub"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%">
        <el-table-column label="文章标题">
          <template v-slot="{ row }">
            <el-link @click="detailHandler(row.id)" type="success">{{
              row.title
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="分类"> </el-table-column>
        <el-table-column label="发表时间">
          <template v-slot="scoped">
            {{ fromDate(scoped.row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button @click="removeArt(row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="q.pagenum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="q.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 发布文章页面 -->
    <el-dialog
      fullscreen
      title="添加文章"
      :visible.sync="pubVisible"
      width="30%"
      :before-close="handleClose"
      @closed="onDialogClosed"
    >
      <el-form
        :model="addArtForm"
        :rules="addArtrules"
        ref="addArtForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="addArtForm.title"
            placeholder="请选输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="addArtForm.cate_id"
            placeholder="请选择文章分类"
            style="width: 100%"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor @change="$refs.addArtForm.validateField('content')" v-model="addArtForm.content">
          </quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <!-- 图片展示方法1 -->
          <!-- <img v-if="addArtForm.cover_img" :src="base_img" alt="" class="cover-img" ref="imgRef" />
          <img v-else src="../../../assets/images/cover.jpg" alt="" class="cover-img" /> -->
          <!-- 图片展示方法2 -->
          <img :src="previewImg" alt="" class="cover-img" />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            @change="updateImg"
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFile"
          />
          <!-- 选择封面的按钮 -->
          <el-button @click="$refs.iptFile.click()" type="text"
            >+ 选择封面</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            ref="btnPub"
            type="primary"
            @click="publishArticle('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="publishArticle('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 文章详情页面 -->
    <el-dialog
      title="文章预览"
      :visible.sync="detailVisible"
      width="80%"
    >
      <h1 class="title">{{ artDetail.title }}</h1>

  <div class="info">
    <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
    <span>发布时间：{{ fromDate (artDetail.pub_date)}}</span>
    <span>所属分类：{{ artDetail.cate_name }}</span>
    <span>状态：{{ artDetail.state }}</span>
  </div>

  <!-- 分割线 -->
  <el-divider></el-divider>

  <!-- 文章的封面 -->
  <img :src="'http://www.liulongbin.top:3008' + artDetail.cover_img" alt="" />

  <!-- 文章的详情 -->
  <div v-html="artDetail.content" class="detail-box"></div>
</el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import coverImg from '../../../assets/images/cover.jpg'
import dayjs from 'dayjs'
export default {
  name: 'ArtList',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      addArtForm: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: '',
        state: ''
      },
      // base_img: '',//方法1
      previewImg: coverImg,
      addArtrules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ],
        cover_img: [
          { required: true, message: '请选择文章封面', trigger: 'change' }
        ]
      },
      pubVisible: false,
      artList: [],
      total: 0,
      cate_id: '',
      state: '',
      detailVisible: false,
      artDetail: {}
    }
  },
  methods: {
    async handleClose (done) {
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm(
        '此操作将导致文章信息丢失, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      // 取消了关闭
      if (confirmResult === 'confirm') done()
      // 确认关闭
    },
    updateImg (e) {
      console.log('111')
      if (e.target.files.length === 0) {
        this.addArtForm.cover_img = ''
        this.previewImg = coverImg
      } else {
        // const fr = new FileReader()
        // fr.readAsBinaryString(e.target.files[0])
        // fr.onload = (event) => {
        // 文件里的文本会在这里被打印出来
        // this.addArtForm.cover_img = event.target.result
        this.addArtForm.cover_img = e.target.files[0]
        this.previewImg = URL.createObjectURL(e.target.files[0]) // url方法装url格式
        // 方法1转base64格式
        // const fr = new FileReader()
        // fr.readAsDataURL(e.target.files[0])
        // fr.onload = (e) => {
        //   this.base_img = e.target.result
        // }

        this.$refs.addArtForm.validateField('cover_img')
      }
      // this.base_img = 'data:image/png;base64,' + window.btoa(event.target.result)
      // }
    },
    publishArticle (state) {
      this.$refs.addArtForm.validate(async (valid) => {
        if (!valid) return
        const fd = new FormData()
        this.addArtForm.state = state
        Object.keys(this.addArtForm).forEach((key) => {
          fd.append(key, this.addArtForm[key])
        })
        const { data: res } = await this.$http.post('/my/article/add', fd)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.pubVisible = false
        this.getArtList()
      })
    },
    onDialogClosed () {
      this.$refs.addArtForm.resetFields()
      this.addArtForm.content = ''
      this.addArtForm.cover_img = ''
      this.addArtForm.state = ''
      this.$refs.iptFile.value = ''
      this.previewImg = coverImg
    },
    // addValidate () {
    //   this.$refs.addArtForm.validateField('content')
    // },
    async getArtList () {
      const { data: res } = await this.$http.get('/my/article/list', {
        params: this.q
      })
      if (res.code === 0) {
        this.artList = res.data
        this.total = res.total
      }
    },
    fromDate (date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (newSize) {
      this.q.pagesize = newSize
      // 重新发起请求
      this.getArtList()
    },
    handleCurrentChange (newPage) {
      // 为页码值赋值
      this.q.pagenum = newPage
      // 重新发起请求
      this.getArtList()
    },
    filterHandler () {
      this.q.pagenum = 1
      this.q.cate_id = this.cate_id
      this.q.state = this.state
      this.getArtList()
    },
    restHandler () {
      this.q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
      this.cate_id = ''
      this.state = ''
      this.getArtList()
    },
    async detailHandler (id) {
      const { data: res } = await this.$http.get(`/my/article/info?id=${id}`)
      if (res.code === 0) {
        this.artDetail = res.data
        this.detailVisible = true
      }
    },
    removeArt (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`/my/article/info?id=${id}`)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        if (this.artList === 1) {
          this.q.pagenum--
        }
        this.getArtList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    // this.$store.dispatch('artCate/getCateList')
    this.getArtList()
  },
  computed: {
    ...mapState('artCate', ['cateList'])
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
/deep/ .ql-editor {
  min-height: 300px;
}
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
.el-pagination {
  margin-top: 15px;
}
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
/deep/ .detail-box {
  img {
    width: 500px;
  }
}
</style>
