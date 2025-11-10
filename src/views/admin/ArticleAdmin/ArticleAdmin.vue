<script setup>
import { ref, onMounted } from 'vue'
import { ElButton, ElInput, ElSelect, ElOption, ElTable, ElTableColumn, ElPagination, ElDialog, ElForm, ElFormItem, ElSwitch, ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'
import { getArticleList } from '@/api/Article.js'

// 响应式数据
const articleList = ref([]) // 文章列表
const total = ref(0) // 总数
const currentPage = ref(1) // 当前页码
const pageSize = ref(10) // 每页条数
const showAddForm = ref(false) // 是否显示添加表单
const showEditForm = ref(false) // 是否显示编辑表单
const loading = ref(false) // 加载状态
const dialogLoading = ref(false) // 表单加载状态
const currentArticleId = ref(null) // 当前编辑的文章ID

// 表单数据
const formData = ref({
  title: '',
  brandName: '',
  articleCategoryName: '',
  content: '',
  publishStatus: 72 // 默认已发布
})

// 编辑表单数据
const editFormData = ref({
  title: '',
  brandName: '',
  articleCategoryName: '',
  content: '',
  publishStatus: 72
})

// 编辑表单引用
const editFormRef = ref(null)

// 表单验证规则
const formRules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 100, message: '标题长度在 1 到 100 个字符', trigger: 'blur' }
  ],
  brandName: [
    { required: true, message: '请选择文章品牌', trigger: 'change' }
  ],
  articleCategoryName: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

// 品牌选项
const brandOptions = [
  { label: '伊利', value: '伊利' },
  { label: '可口可乐', value: '可口可乐' },
  { label: '百事可乐', value: '百事可乐' },
  { label: '旺仔', value: '旺仔' }
]

// 文章分类选项
const articleCategoryOptions = [
  { label: '分类1', value: '分类1' },
  { label: '分类2', value: '分类2' },
  { label: '分类3', value: '分类3' }
]

// 表单引用
const formRef = ref(null)

// 筛选条件
const mainCategory = ref('') // 主分类
const subCategory = ref('') // 子分类
const searchKeyword = ref('') // 搜索关键词

// 主分类选项
const mainCategoryOptions = [
  { label: '王殿', value: '王殿' },
  { label: '百姓粽', value: '百姓粽' },
  { label: '铭记家点心', value: '铭记家点心' }
]

// 子分类选项
const subCategoryOptions = [
  { label: '食品行业知识', value: '食品行业知识' },
  { label: '品牌故事', value: '品牌故事' },
  { label: '节令美食推荐', value: '节令美食推荐' }
]

// 处理搜索和筛选
const handleSearch = () => {
  currentPage.value = 1 // 搜索时重置到第一页
  loadArticleList()
}

// 处理重置
const handleReset = () => {
  mainCategory.value = ''
  subCategory.value = ''
  searchKeyword.value = ''
  currentPage.value = 1
  loadArticleList()
}

// 显示添加表单
const showAddArticleForm = () => {
  // 重置表单
  resetForm()
  showAddForm.value = true
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  formData.value = {
    title: '',
    brandName: '',
    articleCategoryName: '',
    content: '',
    publishStatus: 72
  }
}

// 关闭表单
const closeForm = () => {
  showAddForm.value = false
  resetForm()
}

// 关闭编辑表单
const closeEditForm = () => {
  showEditForm.value = false
  currentArticleId.value = null
  // 重置编辑表单
  if (editFormRef.value) {
    editFormRef.value.resetFields()
  }
}

// 提交表单
const submitForm = async () => {
  try {
    // 表单验证
    await formRef.value.validate()
    
    dialogLoading.value = true
    
    // 模拟提交数据
    console.log('提交的表单数据:', formData.value)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    ElMessage.success('文章添加成功')
    
    // 关闭表单
    closeForm()
    
    // 重新加载列表
    loadArticleList()
    
  } catch (error) {
    if (error !== false) { // 排除表单验证失败的情况
      console.error('提交表单失败:', error)
      ElMessage.error('添加文章失败')
    }
  } finally {
    dialogLoading.value = false
  }
}

// 提交编辑表单
const submitEditForm = async () => {
  try {
    // 表单验证
    await editFormRef.value.validate()
    
    dialogLoading.value = true
    
    // 模拟提交数据
    const submitData = {
      ...editFormData.value,
      id: currentArticleId.value
    }
    console.log('提交的编辑数据:', submitData)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    ElMessage.success('文章编辑成功')
    
    // 关闭表单
    closeEditForm()
    
    // 重新加载列表
    loadArticleList()
    
  } catch (error) {
    if (error !== false) { // 排除表单验证失败的情况
      console.error('提交编辑表单失败:', error)
      ElMessage.error('编辑文章失败')
    }
  } finally {
    dialogLoading.value = false
  }
}

// 处理编辑
const handleEdit = (row) => {
  console.log('编辑文章:', row)
  // 设置当前编辑的文章ID
  currentArticleId.value = row.id
  // 填充编辑表单数据
  editFormData.value = {
    title: row.title,
    brandName: row.brandName,
    articleCategoryName: row.articleCategoryName,
    content: row.content || '',
    publishStatus: row.publishStatus
  }
  // 显示编辑表单
  showEditForm.value = true
}

// 处理删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除文章「${row.title}」吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    // 这里应该调用删除API
    ElMessage.success('删除成功')
    // 重新加载列表
    loadArticleList()
  } catch (error) {
    // 用户取消删除
    console.log('取消删除')
  }
}

// 处理页码变化
const handleCurrentChange = (current) => {
  currentPage.value = current
  loadArticleList()
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1 // 重置为第一页
  loadArticleList()
}

// 加载文章列表数据
const loadArticleList = async () => {
  loading.value = true
  try {
    // 构建筛选参数，确保包含必需的pageNum和pageSize
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      // 根据筛选条件添加可选参数
      ...(mainCategory.value && { mainCategory: mainCategory.value }),
      ...(subCategory.value && { subCategory: subCategory.value }),
      ...(searchKeyword.value && { title: searchKeyword.value }) // 根据API可能需要调整参数名
    }
    console.log('加载文章列表参数:', params)
    
    // 调用真实API
    const response = await getArticleList(params)
    
    // 根据API响应结构处理数据
    if (response && response.code === '200' && response.data) {
      articleList.value = response.data.records || []
      total.value = response.data.total || 0
      currentPage.value = response.data.current || 1
      
      console.log('文章列表加载成功:', articleList.value)
    } else {
      throw new Error(response?.msg || 'API响应格式异常')
    }
  } catch (error) {
    console.error('文章列表加载失败:', error)
    ElMessage.error('加载文章列表失败: ' + (error.message || '未知错误'))
    // 加载失败时显示空数据
    articleList.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 页面挂载时加载数据
onMounted(() => {
  loadArticleList()
})
</script>

<template>
  <div class="article-admin-container">
    <div class="header-section">
      <h1>文章管理</h1>
    </div>
    
    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-left">
        <!-- 主分类选择器 -->
        <el-select v-model="mainCategory" placeholder="请选择主分类" class="filter-item">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="option in mainCategoryOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
        
        <!-- 子分类选择器 -->
        <el-select v-model="subCategory" placeholder="请选择子分类" class="filter-item">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="option in subCategoryOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
        
        <!-- 搜索框 -->
        <el-input
          v-model="searchKeyword"
          placeholder="请输入文章标题搜索"
          class="filter-item search-input"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button @click="handleSearch" type="primary">搜索</el-button>
          </template>
        </el-input>
        
        <!-- 重置按钮 -->
        <el-button @click="handleReset">重置</el-button>
      </div>
      
      <!-- 右侧添加按钮 -->
      <div class="filter-right">
        <el-button type="primary" @click="showAddArticleForm">
          <Plus /> 添加文章
        </el-button>
      </div>
    </div>
    
    <!-- 文章列表表格 -->
    <div class="table-section">
      <el-table
        v-loading="loading"
        :data="articleList"
        style="width: 100%"
        border
        stripe
        highlight-current-row
      >
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="title" label="文章名字" min-width="200">
          <template #default="scope">
            <span class="article-title" :title="scope.row.title">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="brandName" label="文章品牌" width="120" align="center"></el-table-column>
        <el-table-column prop="articleCategoryName" label="文章分类" width="120" align="center"></el-table-column>
        <el-table-column prop="viewCount" label="查看人数" width="100" align="center"></el-table-column>
        <el-table-column prop="publishStatus" label="发布状态" width="120" align="center">
          <template #default="scope">
            <span :class="['status-tag', scope.row.publishStatus === 72 ? 'status-published' : 'status-draft']">
              {{ scope.row.publishStatus === 72 ? '已发布' : '草稿' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="150" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)" type="primary" plain>
              <Edit /> 编辑
            </el-button>
            <el-button size="small" @click="handleDelete(scope.row)" type="danger" plain>
              <Delete /> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    
    <!-- 添加文章表单对话框 -->
    <el-dialog
      v-model="showAddForm"
      title="添加文章"
      width="600px"
      :before-close="closeForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章品牌" prop="brandName">
          <el-select v-model="formData.brandName" placeholder="请选择文章品牌">
            <el-option v-for="option in brandOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章分类" prop="articleCategoryName">
          <el-select v-model="formData.articleCategoryName" placeholder="请选择文章分类">
            <el-option v-for="option in articleCategoryOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态" prop="publishStatus">
          <el-switch
            v-model="formData.publishStatus"
            active-value="72"
            inactive-value="88"
            active-text="已发布"
            inactive-text="草稿"
          ></el-switch>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            :rows="4"
            placeholder="请输入文章内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeForm">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="dialogLoading">
          确定
        </el-button>
      </template>
    </el-dialog>
    
    <!-- 编辑文章表单对话框 -->
    <el-dialog
      v-model="showEditForm"
      title="编辑文章"
      width="600px"
      :before-close="closeEditForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="editFormRef"
        :model="editFormData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="editFormData.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章品牌" prop="brandName">
          <el-select v-model="editFormData.brandName" placeholder="请选择文章品牌">
            <el-option v-for="option in brandOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章分类" prop="articleCategoryName">
          <el-select v-model="editFormData.articleCategoryName" placeholder="请选择文章分类">
            <el-option v-for="option in articleCategoryOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态" prop="publishStatus">
          <el-switch
            v-model="editFormData.publishStatus"
            active-value="72"
            inactive-value="88"
            active-text="已发布"
            inactive-text="草稿"
          ></el-switch>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input
            v-model="editFormData.content"
            type="textarea"
            :rows="4"
            placeholder="请输入文章内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeEditForm">取消</el-button>
        <el-button type="primary" @click="submitEditForm" :loading="dialogLoading">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 全局样式重置和基础样式 */
* {
  box-sizing: border-box;
}

.article-admin-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 头部样式 */
.header-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e4e7ed;
}

.header-section h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  color: #303133;
  font-family: 'Arial', sans-serif;
}

/* 筛选区域样式 */
.filter-section {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s ease;
}

.filter-section:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-right {
  display: flex;
  align-items: center;
}

.filter-item {
  width: 200px;
}

.search-input {
  width: 300px;
}

/* 表格区域样式 */
.table-section {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.table-section:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
}

/* 表格样式优化 */
:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table__header-wrapper th) {
  background-color: #fafafa;
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  height: 50px;
}

:deep(.el-table__body-wrapper td) {
  font-size: 14px;
  height: 48px;
  transition: background-color 0.2s ease;
}

:deep(.el-table__row:hover > td) {
  background-color: #f5f7fa !important;
}

/* 文章标题样式 */
.article-title {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #409eff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.article-title:hover {
  color: #66b1ff;
  text-decoration: underline;
}

/* 状态标签样式 */
.status-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status-published {
  background-color: #f0f9ff;
  color: #0094ff;
  border: 1px solid #0094ff;
}

.status-published:hover {
  background-color: #0094ff;
  color: #fff;
}

.status-draft {
  background-color: #fff7e6;
  color: #ff9900;
  border: 1px solid #ff9900;
}

.status-draft:hover {
  background-color: #ff9900;
  color: #fff;
}

/* 分页区域样式 */
.pagination-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

/* 按钮样式优化 */
:deep(.el-button) {
  transition: all 0.3s ease;
}

:deep(.el-button:hover) {
  transform: translateY(-1px);
}

:deep(.el-button--primary:hover) {
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

:deep(.el-button--danger:hover) {
  box-shadow: 0 2px 8px rgba(245, 108, 108, 0.3);
}

/* 表单样式优化 */
:deep(.el-dialog) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  background-color: #fafafa;
  border-bottom: 1px solid #ebeef5;
  padding: 20px 24px;
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

:deep(.el-dialog__body) {
  padding: 24px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

:deep(.el-input__inner),
:deep(.el-select__wrapper) {
  transition: all 0.3s ease;
}

:deep(.el-input__inner:hover),
:deep(.el-select__wrapper:hover) {
  border-color: #c0c4cc;
}

:deep(.el-input__inner:focus),
:deep(.el-select__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .filter-item {
    width: 180px;
  }
  
  .search-input {
    width: 250px;
  }
}

@media screen and (max-width: 992px) {
  .article-admin-container {
    padding: 16px;
  }
  
  .filter-section {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .filter-left {
    justify-content: center;
  }
  
  .filter-right {
    justify-content: center;
  }
  
  .filter-item,
  .search-input {
    width: 200px;
  }
}

@media screen and (max-width: 768px) {
  .filter-left {
    flex-direction: column;
    width: 100%;
  }
  
  .filter-item,
  .search-input {
    width: 100%;
  }
  
  .header-section h1 {
    font-size: 24px;
  }
  
  :deep(.el-dialog) {
    width: 90% !important;
    margin: 5vh auto !important;
  }
}

/* 加载状态样式 */
:deep(.el-loading-spinner .path) {
  stroke: #409eff;
}

/* 消息提示样式 */
:deep(.el-message) {
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
