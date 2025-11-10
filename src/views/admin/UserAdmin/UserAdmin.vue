<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserList } from '@/api/User.js'

// 响应式数据
const searchText = ref('')
const tableData = ref([])
const loading = ref(false)

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 加载用户列表
const loadUserList = async () => {
  loading.value = true
  try {
    // 确保传入必需的参数
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
    
    // 如果有搜索文本，添加到参数中
    if (searchText.value.trim()) {
      params.username = searchText.value.trim()
    }
    
    const response = await getUserList(params)
    console.log('获取用户列表响应:', response)
    if (response.code === '200' && response.data) {
      tableData.value = response.data.records || []
      total.value = response.data.total || 0
    } else {
      ElMessage.error('获取用户列表失败')
    }
  } catch (error) {
    console.error('获取用户列表错误:', error)
    ElMessage.error('获取用户列表时发生错误')
  } finally {
    loading.value = false
  }
}

// 搜索功能
const handleSearch = () => {
  currentPage.value = 1 // 重置到第一页
  loadUserList()
}

// 分页变更
const handleCurrentChange = (val) => {
  currentPage.value = val
  loadUserList()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1 // 重置到第一页
  loadUserList()
}

// 查看用户
const handleView = (row) => {
  ElMessage.info(`查看用户: ${row.username}`)
  // 这里可以添加查看用户详情的逻辑
}

// 删除用户
const handleDelete = (row) => {
  ElMessage.warning(`删除用户: ${row.username}`)
  // 这里可以添加删除用户的逻辑
}

// 初始加载
onMounted(() => {
  loadUserList()
})
</script>

<template>
  <div class="user-admin-container">
    <h2>用户管理</h2>
    <!-- 上面盒子：三个卡片 -->
    <div class="top">
      <div class="showcard-1">
        <div class="pc-1">
          <img src="@/assets/adminimg/peop.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num">12345</span>
          <p>用户注册数量</p>
        </div>
      </div>
      <div class="showcard-2">
        <div class="pc-2">
          <img src="@/assets/adminimg/book.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num card-num-2">67890</span>
          <p>用户浏览文章数量</p>
        </div>
      </div>
      <div class="showcard-3">
        <div class="pc-3">
          <img src="@/assets/adminimg/goods.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num card-num-3">54321</span>
          <p>用户浏览产品详情数量</p>
        </div>
      </div>
    </div>
    
    <!-- 下面部分：搜索区域 -->
    <div class="search-section">
      <el-input v-model="searchText" placeholder="请输入用户名或ID搜索" style="width: 300px; margin-right: 15px;">
        <template #append>
          <el-button @click="handleSearch" type="primary">查找</el-button>
        </template>
      </el-input>
    </div>
    
    <!-- 表单区域：用户表格 -->
    <div class="user-list" style="padding: 10px;">
      <!-- 用户列表 -->
      <el-table 
        :data="tableData" 
        border 
        fit 
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="email" label="邮箱" min-width="200" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <el-button type="primary" @click="handleView(scope.row)">查看</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-container" style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-admin-container {
  padding: 20px;
}

.user-admin-container h2 {
  margin-bottom: 20px;
  color: #333;
}

/* 卡片样式 */
.top {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.showcard-1, .showcard-2, .showcard-3 {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.pc-1, .pc-2, .pc-3 {
  margin-right: 15px;
}

.con {
  flex: 1;
}

.card-num {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  display: block;
  margin-bottom: 5px;
}

.card-num-2 {
  color: #67c23a;
}

.card-num-3 {
  color: #e6a23c;
}

.con p {
  color: #606266;
  margin: 0;
}

/* 搜索区域样式 */
.search-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

/* 用户列表样式 */
.user-list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style>
