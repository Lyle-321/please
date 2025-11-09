<template>
  <div class="classification-management">
    <h1>分类管理</h1>
    
    <!-- 上面盒子：分类筛选和添加分类按钮 -->
    <div class="filter-box">
      <div class="filter-section">
        <el-input 
          v-model="searchKeyword" 
          placeholder="请输入分类名称搜索" 
          clearable 
          prefix-icon="el-icon-search"
          class="search-input"
        />
        <el-select 
          v-model="selectedBrand" 
          placeholder="选择分类品牌" 
          clearable
          class="brand-select"
        >
          <el-option label="全部品牌" value="" />
          <el-option 
            v-for="brand in brandList" 
            :key="brand.id" 
            :label="brand.name" 
            :value="brand.id"
          />
        </el-select>
      </div>
      <div class="action-section">
        <el-button type="primary" @click="showAddDialog = true">
          <i class="el-icon-plus"></i> 添加分类
        </el-button>
      </div>
    </div>
    
    <!-- 下面盒子：分类表单 -->
    <div class="table-box">
      <el-table :data="filteredCategories" border style="width: 100%" fit>
        <el-table-column prop="id" label="分类ID" width="80" />
        <el-table-column prop="name" label="分类名字" min-width="150" />
        <el-table-column prop="brandId" label="分类品牌" min-width="120">
          <template #default="scope">
            {{ getBrandName(scope.row.brandId) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editCategory(scope.row)">编辑</el-button>
            <el-button size="small" @click="deleteCategory(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 分页组件 -->
    <div class="pagination-section">
      <PaginationAdmin 
        :total="categoryList.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    
    <!-- 添加/编辑分类对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingCategory ? '编辑分类' : '添加分类'"
      width="500px"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="formData.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类品牌">
          <el-select v-model="formData.brandId" placeholder="请选择分类品牌">
            <el-option 
              v-for="brand in brandList" 
              :key="brand.id" 
              :label="brand.name" 
              :value="brand.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="saveCategory">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PaginationAdmin from '@/component/admin/PaginationAdmin.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

// 响应式数据
const searchKeyword = ref('')
const selectedBrand = ref('')
const showAddDialog = ref(false)
const editingCategory = ref(null)
const currentPage = ref(1)
const pageSize = ref(100)

// 品牌列表
const brandList = ref([
  { id: 1, name: '品牌A' },
  { id: 2, name: '品牌B' },
  { id: 3, name: '品牌C' },
  { id: 4, name: '品牌D' }
])

// 分类列表数据
const categoryList = ref([
  { id: 1, name: '食品分类1', brandId: 1 },
  { id: 2, name: '食品分类2', brandId: 1 },
  { id: 3, name: '食品分类3', brandId: 2 },
  { id: 4, name: '食品分类4', brandId: 3 },
  { id: 5, name: '食品分类5', brandId: 2 },
  { id: 6, name: '食品分类6', brandId: 4 },
  { id: 7, name: '食品分类7', brandId: 1 },
  { id: 8, name: '食品分类8', brandId: 3 }
])

// 表单数据
const formData = ref({
  name: '',
  brandId: ''
})

// 计算属性：筛选后的分类列表
const filteredCategories = computed(() => {
  let result = categoryList.value
  
  // 根据关键词筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(cat => cat.name.toLowerCase().includes(keyword))
  }
  
  // 根据品牌筛选
  if (selectedBrand.value) {
    result = result.filter(cat => cat.brandId === selectedBrand.value)
  }
  
  // 分页处理
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return result.slice(startIndex, endIndex)
})

// 获取品牌名称
const getBrandName = (brandId) => {
  const brand = brandList.value.find(b => b.id === brandId)
  return brand ? brand.name : '未设置'
}

// 编辑分类
const editCategory = (category) => {
  editingCategory.value = { ...category }
  formData.value = { ...category }
  showAddDialog.value = true
}

// 删除分类
const deleteCategory = (id) => {
  ElMessageBox.confirm('确定要删除这个分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = categoryList.value.findIndex(cat => cat.id === id)
    if (index !== -1) {
      categoryList.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 保存分类
const saveCategory = () => {
  if (!formData.value.name) {
    ElMessage.warning('请输入分类名称')
    return
  }
  
  if (editingCategory.value) {
    // 编辑模式
    const index = categoryList.value.findIndex(cat => cat.id === editingCategory.value.id)
    if (index !== -1) {
      categoryList.value[index] = { ...formData.value }
      ElMessage.success('更新成功')
    }
  } else {
    // 添加模式
    const newId = Math.max(...categoryList.value.map(cat => cat.id), 0) + 1
    categoryList.value.push({
      id: newId,
      ...formData.value
    })
    ElMessage.success('添加成功')
  }
  
  showAddDialog.value = false
  resetForm()
}

// 重置表单
const resetForm = () => {
  formData.value = {
    name: '',
    brandId: ''
  }
  editingCategory.value = null
}

// 分页相关方法
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1 // 重置为第一页
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<style scoped>
.classification-management {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

/* 筛选盒子样式 */
.filter-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-section {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  width: 300px;
}

.brand-select {
  width: 200px;
}

/* 表格盒子样式 */
.table-box {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1px;
  box-sizing: border-box;
}

/* 分页部分样式 */
.pagination-section {
  margin-top: 20px;
  padding: 0 20px 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .classification-management {
    padding: 10px;
  }
  
  .filter-box {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .search-input,
  .brand-select {
    width: 100%;
  }
  
  .pagination-section {
    padding: 0 10px 15px;
  }
}
</style>
