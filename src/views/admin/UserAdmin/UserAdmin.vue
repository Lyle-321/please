<script setup>
import { ref } from 'vue'
import PaginationAdmin from '@/component/admin/PaginationAdmin.vue'

const searchText = ref('')

// 模拟用户数据
const tableData = ref([
  { id: 1, username: 'user1', email: 'user1@example.com', registerTime: '2024-01-01', status: 'active' },
  { id: 2, username: 'user2', email: 'user2@example.com', registerTime: '2024-01-02', status: 'active' },
  { id: 3, username: 'user3', email: 'user3@example.com', registerTime: '2024-01-03', status: 'inactive' },
  { id: 4, username: 'user4', email: 'user4@example.com', registerTime: '2024-01-04', status: 'active' },
  { id: 5, username: 'user5', email: 'user5@example.com', registerTime: '2024-01-05', status: 'active' }
])

const handleSearch = () => {
  console.log('搜索内容:', searchText.value)
  // 这里可以添加搜索逻辑
}

const handleEdit = (user) => {
  console.log('编辑用户:', user)
  // 这里可以添加编辑逻辑
}

const handleDelete = (user) => {
  console.log('删除用户:', user)
  // 这里可以添加删除逻辑
}
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
      <el-table :data="tableData" border fit style="width: 100%;">
        <el-table-column prop="id" label="用户ID" width="120" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="registerTime" label="注册时间" width="120" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <div style="display: flex; justify-content: center; gap: 10px;">
              <el-button type="primary">查看</el-button>
              <el-button>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <PaginationAdmin />
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
