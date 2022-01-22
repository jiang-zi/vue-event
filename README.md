# 大事件项目纪要

## 所需的前置知识

1.  **Vue 基础**

-   vue-cli、指令、组件、路由、vuex

2.  **axios**

-   baseURL、拦截器

3.  **element-ui**

-   安装与配置、常用的组件

4.  **npm 与 模块化**

-   能使用 npm 维护项目中的依赖包
-   ES6 模块化语法

## 项目初始化

### 基于 vue-cli 初始化 Vue2 模板的项目

> 目的：为后面的项目开发做准备。

一 、创建项目 vue create 项目名称

二 、vue-cli 手动选择要安装的功能，选择第三个
-   Default ([Vue 2] babel, eslint)
-   Default (Vue 3) ([Vue 3] babel, eslint)
-   **Manually select features**
    三 、初始化 vue-cli 的核心步骤：
1.  Manually select features

    -   **(*) Choose Vue version**
    -   **(*) Babel**
    -   ( ) TypeScript
    -   ( ) Progressive Web App (PWA) Support
    -   **(*) Router**
    -   **(*) Vuex**
    -   **(*) CSS Pre-processors**
    -   **(*) Linter / Formatter**
    -   ( ) Unit Testing
    -   ( ) E2E Testing

2.  Choose a version of Vue.js that you want to start the project with (Use arrow keys)

    -   **2.x**
    -   3.x

3.  Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)

    -   **n**

4.  Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)

    -   Sass/SCSS (with dart-sass)
    -   Sass/SCSS (with node-sass)
    -   **Less**
    -   Stylus

5.  Pick a linter / formatter config: (Use arrow keys)

    -   ESLint + Airbnb config
    -   **ESLint + Standard config**
    -   ESLint + Prettier

6.  Pick additional lint features: (Press `<space> `to select,` <a>` to toggle all, `<i>` to invert selection)

    -   **(*) Lint on save**
    -   ( ) Lint and fix on commit

7.  Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)

    -   **In dedicated config files**
    -   In package.json

8.  Save this as a preset for future projects? (y/N)

    -   **N**

## 注册功能

### 路由实现组件切换

1. 新建两个页面组件

   在 views 下新建 Reg/Reg.vue 和 Login/Login.vue

2. 在 router/index.js 中配置路由规则

3. 在 App.vue 中使用 router-view 组件配置路由出口

4. 在浏览器输入 http://localhost:8081/#/login 或 http://localhost:8081/#/reg 实现切换

### 渲染注册表单

1. 去官网复制 form 组件的前四行, 补上结束标签
2. 根据需求完善数据项的设置
3. 美化样式

### 注册表单校验

1. 检查复制过来的表单组件中重要的属性是否存在
   - model
   - rules
   - ref
   - prop (form-item)
2. 在 rules 对象中写校验规则（复制官网代码进行修改）
3. 注册按钮点击事件中做兜底校验

### 注册功能实现

1. 通过兜底校验后发送 ajax 请求, 携带数据对象
2. 获取服务器返回的结果后根据状态码进行判断, 并提示用户
3. 注册成功后使用编程式导航跳转至登录页



## 登录功能

### 渲染登录页面和跳转注册

1. 去笔记中直接复制(课后练习建议从头来一遍)
2. 给 `el-link` 添加点击事件, 编程式导航跳转至 `/reg`

### 点击按钮发起请求

1. 给登录按钮绑定点击事件, 做兜底校验
2. 如果通过校验就发起请求
3. 获取请求结果, 进行判断并提示用户成功或失败

### 存储 token 至 Vuex

1. 在 `store/index.js` 中定义子模块及数据, 并开启命名空间
2. 定义 mutation 函数, 用于修改 Vuex 中的 token
3. 登录成功时触发 mutation 的函数, 并传递 token

### token 持久化

1. 手动 (自己实现)
   - 在 mutation 函数中使用 `localStorage.setItem()` 存储 token
   - 在 state 初始化值的时候使用 `localStorage.getItem()` 取出 token

2. 插件 (自动实现)

   > 安装该插件后, 会自动持久化存储 Vuex 中所有的数据, 如需进行进一步的配置, 请查看官网

   - 下包 `yarn add vuex-persistedstate`
   - 导入
   - 安装插件

### 登录成功跳转至首页

1. 登录成功后使用编程式导航跳转至 `/` 后台主页
2. 配置路由规则, 新建 `Main.vue` 首页
3. 将笔记中 `Main.vue` 的结构样式复制过来

### 退出登录

1. 找到退出登录按钮, 给 `menu-item` 绑定点击事件
2. 用户点击退出时使用 `$confirm` 确认框提醒用户是否真的要退出
3. 用户确认退出时, 清空 Vuex 中的 token 并跳转至 `/login` 登录页



## 侧边栏菜单

### 渲染用户信息

1. 去笔记中复制静态页面及 CSS 样式
2. 在 Vuex 中定义 `userInfo` 数据
3. 在 `actions` 中封装一个获取用户信息的函数
4. 发起请求获取用户信息 (通过 `context` 可以获取到 `state`)
5. 将获取到的用户信息传递给 `mutations` 进行修改 `userInfo`
6. 在 `Main.vue` 的 created 中使用 `this.$store.dispatch()` 触发 `actions` 函数执行
7. 将数据导入 `Main.vue` (使用辅助函数)
8. 渲染数据

### 渲染侧边菜单布局

1. 去官网复制 el-menu 的代码并进行学习
   - el-menu: 导航菜单容器
     - default-active: 默认高亮的菜单项
   - el-menu-item: 没有子菜单的项目
     - index: 菜单项的唯一标识
   - el-submenu: 有子菜单的项目
2. 复制笔记中的样式进行美化

### 渲染侧边菜单数据

1. 在 Main.vue 中封装 getMenus 函数, 在 created 中调用, 发起请求获取菜单数据并存入 data
2. 由于循环渲染的菜单项有两种类型, 所以需要使用 template 标签包裹
3. 在 template 标签上写 v-for 循环渲染
   - template 是虚拟标签, 不能绑定 key, 需要将 key 设置在子元素上
4. 在两个子菜单标签上通过 v-if 进行判断具体显示哪个菜单项
5. 使用插值表达式和 v-bind 动态渲染内容
   - 动态绑定 index 属性, 用于导航高亮
6. el-submenu 还需要继续使用 v-for 渲染子菜单
7. 开启路由模式方便后续开发

### 优化请求 token

1. 在 main.js 中给 axios 添加请求拦截器
2. 拦截时携带 token 给请求头
   - 在 main.js 中可以直接使用 store 对象获取到 Vuex 中的数据

3. 之前手动携带 token 的地方可以删除请求头配置

### 权限控制

#### 未登录禁止访问首页 - 导航守卫

1. 在 router/index.js 中配置全局前置导航守卫
2. 判断条件有 2 个需要进行拦截:
   1. 本地没有 token
   2. 不是访问 /login 和 /reg 页面时

#### 已登录但 Token 过期 - axios 的响应拦截器

1. 添加 axios 响应拦截器, 判断状态码为 401 的情况
2. 给用户友好的提示
3. 跳转至 /login 页面并清空 token 和 userInfo

### 渲染首页

1. 创建 views/Menus/Home/Home.vue 组件, 复制笔记中的代码
2. 观察代码发现需要 echarts, 所以下载 echarts 包
3. 希望访问 /home 时切换到该组件显示, 配置 Main 的子路由
4. 在 Main.vue 中写一个 router-view 作为路由出口
5. 给 Main 路由规则配置重定向



## 个人中心 - 基本资料

### 使用路由渲染组件

1. 创建 views/Menus/User/UserInfo.vue 组件, 复制笔记中的代码
2. 配置路由规则, 同 Home 组件

### 渲染表单

1. 去官网找到 form 组件进行复制
2. 根据需求修改成项目需要的样式
3. 在 UserInfo.vue 中导入辅助函数并映射 userInfo 数据
4. 在 created 中将 userInfo 赋值给 userForm, 需要使用浅拷贝, 确保两个对象互不影响
4. 在 userRules 中添加表单校验规则

### 重置表单

1. 给重置按钮绑定点击事件
2. 调用表单对象的 `resetFields()` 方法

### 更新用户信息

1. 点击提交进行兜底校验
2. 校验通过后发送请求更新用户信息
3. 获取结果进行判断, 并提醒用户
4. 如果更新成功, 重新发起请求获取最新的用户信息



## 个人中心 - 更换头像

### 使用路由渲染组件

1. 创建 views/Menus/User/UserAvatar.vue 组件, 复制笔记中的代码
2. 配置路由规则, 同上

### 选择图片

1. 添加文件选择框在按钮上方, 但由于文件选择框太丑, 所以将其隐藏
2. 给选择图片按钮绑定点击事件, 触发文件选择框的点击事件
3. 给文件框绑定 change 事件
4. 当用户选择图片时触发 change 事件, 并获取 e.target.files
5. 根据 files 的长度来判断用户是否选择了图片

### 渲染预览图片

1. 使用 FileReader 将 File 对象转换为 BASE64 字符串

   ```js
   // 使用 FileReader 将 File 对象转换为 BASE64 并设置给 avatar
   // 创建 FileReader
   const fr = new FileReader()
   // 读取 File 对象
   fr.readAsDataURL(e.target.files[0])
   // 绑定事件, 必须使用箭头函数, 因为要访问 data 中的数据
   fr.onload = e => {
   // console.log(e.target.result)
   // 触发事件后赋值
   	this.avatar = e.target.result
   }
   ```

2. 转换为 BASE64 后将字符串赋值给 avatar

3. 准备两个 img 根据 avatar 的值进行 v-if 选择渲染

4. 渲染完成后对上传按钮的 disabled 进行判断

### 更新用户头像

1. 给按钮绑定点击事件, 发送请求携带 avatar 数据
2. 根据响应的状态提示用户
3. 重新获取用户信息



## 个人中心 - 修改密码

### 使用路由渲染组件

1. 创建 views/Menus/User/UserPwd.vue 组件, 复制笔记中的代码
2. 配置路由规则, 同上

### 表单校验

1. 编写基础表单校验规则 (如果非常熟练可复制)
2. 使用自定义校验规则进行两次密码相同校验

### 重置表单

1. 给重置按钮绑定点击事件
2. 调用表单对象的 `resetFields()` 方法

### 修改用户密码

1. 给按钮绑定点击事件, 点击时进行兜底校验
2. 校验通过后发起请求
3. 获取结果并根据状态提示用户
4. 重置表单



## 文章管理 - 文章分类

### 使用路由渲染组件

1. 创建 views/Menus/Article/ArtCate.vue 组件, 复制笔记中的代码
2. 配置路由规则, 同上

### 获取分类数据

1. 在 created 中发起请求
2. 获取数据判断结果
3. 将数据存入 data 中

### 渲染表格

1. 去 Element-UI 的官网复制表格代码
2. 根据需求改造表格代码并渲染数据
   - table-column 设置 type 为 index 就是序号列
3. 修改样式注意权重问题

### 渲染添加分类 Dialog

1. 去 Element-UI 的官网复制最基础的 dialog 代码
2. 根据需求修改绑定的数据和样式
3. 在 dialog 中添加一个 form 组件, 两者结合使用
4. 数据绑定并新增校验规则

### 关闭时重置表单

1. 给 dialog 绑定事件: closed
2. 事件触发时调用表单的重置方法即可

### 添加文章分类功能实现

1. 给添加按钮绑定点击事件, 事件触发时进行兜底校验
2. 校验通过后发起请求将用户输入的内容提交给后台
3. 获取响应结果, 根据结果提醒用户
4. 重新发起请求渲染页面
5. 关闭 dialog

### 渲染修改分类 Dialog

1. 将添加分类的 dialog 完整的复制一份
2. 根据需求修改或添加所有的文本和数据变量
3. ~~点击编辑按钮让 dialog 显示 (先不考虑功能实现, 仅做展示)~~
4. 给编辑按钮绑定点击事件, 传入当前行数据 (作用域插槽: scope.row)
5. 判断 id 是否为 1 或 2 并提醒用户不允许修改
6. 将 row 浅拷贝给 editForm, 展示当前点击编辑的分类数据
7. 将 editVisible 设置为 true (显示 dialog)

### 编辑文章分类功能实现

1. 给确定按钮绑定点击事件, 事件触发时进行兜底校验
2. 校验通过后发起请求将用户输入的内容提交给后台
3. 获取响应结果, 根据结果提醒用户
4. 重新发起请求渲染页面
5. 关闭 dialog

### 删除文章分类

1. 给删除按钮绑定点击事件, 传入 id
2. 事件触发判断 id 是否为 1 或 2 并提醒用户不允许修改
3. 发起请求给后台进行删除 (查询参数)
4. 获取响应结果, 根据结果提醒用户
5. 重新发起请求渲染页面



## 文章管理 - 发表文章

### 使用路由渲染组件

1. 创建 views/Menus/Article/ArtList.vue 组件, 复制笔记中的代码
2. 配置路由规则, 同上

### 弹出发表文章 Dialog

1. 去 Element-UI 官网复制 Dialog 组件代码, 设置 fullscreen 属性变成全屏 dialog
2. 绑定 :before-close 属性, 做关闭前的回调, 确保用户点击关闭不会直接关掉 dialog
3. 当用户关闭时 this.$confirm 提醒用户, 是否确定关闭
4. 如果确定关闭就关闭 dialog

### 渲染文章标题和文章分类表单

1. 去 Element-UI 官网复制 Form 组件的代码
2. 根据需求修改为我们想要的效果
3. 双向绑定数据并设置表单校验规则

### 渲染文章分类数据

1. 发送请求获取分类列表数据
2. 使用 v-for 循环渲染 el-option
3. 动态绑定 value 和 label

### 渲染富文本编辑器

1. 下包 vue-quill-editor
2. 按照官方文档导入并全局注册
3. 使用组件, 并双向绑定数据
4. 使用深度选择器修改样式 (min-height)
5. 添加表单校验规则

### 渲染文章封面

1. 去笔记中将静态结构复制到指定区域
2. 添加 form-item
3. 写 img 标签并修改样式
4. 准备一个文件选择框, 将其设置为隐藏
5. 准备一个按钮

### 用户选择图片

1. 给选择封面按钮绑定点击事件, 用户点击时触发文件选择框的点击事件
2. 给文件选择框绑定 change 事件
3. 在 change 事件中使用事件对象获取用户选择的文件对象
4. 判断用户选择的文件对象, 进行存储到表单或清空表单的封面图片

### 渲染预览图片

1. 当用户选择图片后, 使用 FileReader 将图片对象转成 BASE64 字符串
2. 设置给预览图片的 src
3. 当用户取消选择后, 导入本地的默认图片, 将其设置给图片的 src

### 发布前准备工作

1. 渲染两个按钮, 并绑定点击事件
2. 事件触发时进行表单的兜底校验
3. 通过校验后设置 state 为 `'已发布'` 或 `'草稿'`
4. 关闭 dialog 时清空所有表单数据及预览的图片

### 发布文章

1. 使用 FormData 填装参数
2. 发起请求, 携带 FormData
3. 根据结果提醒用户
4. 关闭 dialog
5. 将来实现了文章列表功能后, 还需要重新发请求获取最新的文章列表数据



## 文章管理 - 文章列表

### 渲染列表数据

1. 封装获取列表数据的函数, 在 created 中调用获取数据存入 data 中
2. 去 Element-UI 官网复制 Table 组件进行数据渲染
3. 发表文章完成后, 调用封装的获取列表函数, 重新渲染页面

### 格式化日期

1. 下包 dayjs
2. 引入到组件中
3. 封装一个 formatDate 的函数
4. 在函数中格式化日期后返回
5. 使用作用域插槽获取日期数据, 调用函数, 传入日期数据并使用插值表达式渲染

### 分页功能

1. 去 Element-UI 官网复制 Pagination 组件
2. 根据需求进行修改 (q.pagenum / q.pagesize / total)
3. 获取数据时将 total 存入 data 中
4. 结合 current-change 和 size-change 事件实现分页功能
5. 当前页发生变化时将 q 的 pagenum 重新赋值并发起请求
6. pagesize 同理

### 筛选功能

1. 渲染文章分类的下拉菜单, 进行双向绑定 q 的属性
2. 当用户点击筛选按钮时触发点击事件
3. 点击事件中将 q.pagenum 设置为 1 后重新发起请求渲染数据

### 重置筛选

1. 给重置按钮绑定点击事件
2. 事件触发时将所有请求参数清空
3. 重新发起请求渲染数据

### 预览文章 - 获取文章数据

1. 使用作用域插槽将文章标题改为 el-link 组件
2. 给标题绑定点击事件, 并传入 id
3. 事件触发时根据 id 获取文章详情数据, 存入 data 中
4. 将 dialog 显示出来

### 预览文章 - 渲染数据

1. 将获取到的数据使用插值表达式渲染到对应的区域
2. 设置样式

### 删除文章

1. 使用作用域插槽将文章 id 传递给删除按钮点击事件的处理函数中
2. 使用 $confirm 提醒用户是否删除
3. 用户确定删除后发起请求删除数据
4. 重新发起请求渲染页面
5. 越界处理 (当最后一页删没了需要让 pagenum--)

### 删除文章

1.  使用作用域插槽包裹 el-button
2.  给 el-button 绑定点击事件, 并传入 id
3.  事件触发时根据 id 删除文章
4.  重新发起请求渲染文章列表数据

### 优化删除的操作

发起请求删除文章完成以后,做如下判断在渲染文章列表
```
this.$message.success('删除成功!')

  // 如果在刷新数据之前,当前页的数据只有 1 条，
  // 而且，当前的页码值 > 1，
  // 则说明当前页已没有数据可显示，需要让页码值 -1
+ if (this.artList.length === 1 && this.q.pagenum > 1) {
+   this.q.pagenum--
+ }
  // 重新发起请求渲染文章列表数据
  this.initArtList()
```
## 打包发布

### 生成打包报告

打开 `package.json` 配置文件，为 `scripts` 节点下的 `build` 命令添加 `--report` 参数：

```
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build --report",
    "lint": "vue-cli-service lint"
  }
}
```

重新运行打包的命令：

```
npm run build 或 yarn bulid
```

打包完成后，发现在 `dist` 目录下多了一个名为 `report.html` 的文件。在浏览器中打开此文件，会看到详细的打包报告。



### 基于 externals 配置 CDN 加速

0.  未配置 `externals` 之前：

    0.  凡是 `import` 导入的第三方模块，在最终打包完成后，会被合并到 `chunk-vendors.js` 中
    1.  **缺点**：导致单个文件的体积过大

1.  配置了 `externals` 之后：

    0.  webpack 在进行打包时，会把 `externals` 节点下声明的第三方包排除在外
    1.  因此最终打包生成的 js 文件中，不会包含 `externals` 节点下的包
    2.  **好处**：优化了打包后项目的体积。

### 初步配置 externals 节点

1. 在项目根目录下创建 `vue.config.js` 配置文件，在里面新增 `configureWebpack` 节点如下：

   ```
   module.exports = {
     // 省略其它代码...
   
     // 增强 vue-cli 的 webpack 配置项
     configureWebpack: {
       // 打包优化
       externals: {
         // import导包的包名: window全局的成员名称
         echarts: 'echarts',
         vue: 'Vue',
         'vue-router': 'VueRouter',
         vuex: 'Vuex',
         axios: 'axios',
         dayjs: 'dayjs',
         'element-ui': 'ELEMENT',
         'vue-quill-editor': 'VueQuillEditor',
         'vuex-persistedstate': 'createPersistedState'
       }
     }
   }
   ```

2. 在 `/public/index.html` 文件中，新增如下的资源引用：

```
 <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.7/dayjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuex-persistedstate@4.1.0/dist/vuex-persistedstate.umd.js"></script>

```

3. 在 `main.js` 中注释掉 `element-ui` 的样式和 `quill` 的样式：

   ```
   // 1. 导入 element-ui 组件库的样式
   // import 'element-ui/lib/theme-chalk/index.css'
   
   // 2. 导入 quill 的样式
   // import 'quill/dist/quill.core.css'
   // import 'quill/dist/quill.snow.css'
   // import 'quill/dist/quill.bubble.css'
   ```

4. 在 `/public/index.html` 文件的 `<title></title>` 标签之后，引入需要的 css 样式：

```

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.core.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.bubble.css">
```

### 配置路由懒加载 优化性能

> **参考 vue-router 的官方文档，进行**[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)**的配置**

**配置路由懒加载的核心步骤：**

1. 运行如下的命令，安装 babel 插件：

   ```
   npm install --save-dev @babel/plugin-syntax-dynamic-import
   ```

2. 修改项目根目录下的 `babel.config.js` 配置文件，新增 `plugins` 节点：

   ```
   module.exports = {
     presets: ['@vue/cli-plugin-babel/preset'],
     // 实现路由组件按需导入的 babel 插件
   + plugins: ['@babel/plugin-syntax-dynamic-import']
   }
   ```

3. 在 `/src/router/index.js` 模块中，基于 `const 组件 = () => import('组件的存放路径')` 语法，改造每个路由组件的导入方式。例如：

   ```
   // 路由懒加载 vue 异步组件技术 导入
   const Reg = () => import('@/views/Reg/Reg.vue')
   const Login = () => import('../views/Login/login.vue')
   const Main = () => import('@/views/main/main')
   const Home = () => import('../views/menus/Home/Home.vue')
   const UserInfo = () => import('../views/menus/User/UserInfo.vue')
   const UserAvatar = () => import('../views/menus/User/UserAvatar.vue')
   const UserPwd = () => import('../views/menus/User/UserPwd.vue')
   const ArtCate = () => import('../views/menus/Article/ArtCate.vue')
   const ArtList = () => import('../views/menus/Article/ArtList.vue')
   ```