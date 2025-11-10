<script setup>
import {ref} from 'vue'
import { updateProductClassification,addProductClassification,deleteProductClassification,getProductClassificationPage } from '@/api/Product'

//分类列表
const categoryList = ref([])

// 弹窗控制和表单数据
const showAddDialog = ref(false)
const editingCategory = ref(null)
const formData = ref({
  name: '',
  brandId: ''
})
const loading = ref(false)

// 关闭弹窗的方法
const closeDialog = () => {
  showAddDialog.value = false
  formData.value = { name: '', brandId: '' }
  editingCategory.value = null
}

// 分页
const page = ref({
  pageNum: 1,//当前页码
  pageSize: 20,//每页显示条数

})
// 总数
const total = ref({})
// 当前页码
const pageCurrent = ref({})




const getCategoryList = async () => {
  try {
    // const res = await getProductClassification()
    const res = await getProductClassificationPage(page.value.pageNum, page.value.pageSize)
    categoryList.value = res.data
    total.value = res.data.total
    pageCurrent.value = res.data.current
    console.log('获取分类列表成功:', res)
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

// 打开编辑弹窗并回显数据
const onEditChannel = (row) => {
  console.log('编辑分类:', row)
  editingCategory.value = row.id
  formData.value = {
    id: row.id,
    name: row.name,
    brandId: row.brandId
  }
  showAddDialog.value = true
}

// 删除分类
const onDelChannel = async (row) => {
  console.log('删除分类:', row)
  try {
    // 使用confirm对话框确认删除
    if (confirm(`确定要删除分类"${row.name}"吗？`)) {
      loading.value = true
      // 调用删除API
      const res = await deleteProductClassification(row.id)
      console.log('删除分类成功:', res)
      alert('分类删除成功')
      // 重新加载分类列表
      getCategoryList()
    }
  } catch (error) {
    console.error('删除分类失败:', error)
    alert('删除分类失败，请重试')
  } finally {
    loading.value = false
  }
}

// 保存分类
const saveCategory = async () => {
  // 表单验证
  if (!formData.value.name.trim()) {
    alert('请输入分类名称')
    return
  }
  
  loading.value = true
  try {
    console.log('保存分类:', formData.value)
    // 区分新增和编辑操作
    if (editingCategory.value) {
      // 编辑操作 - 调用更新API
      const res = await updateProductClassification(formData.value)
      console.log('更新分类成功:', res)
      alert('分类更新成功')
    } else {
      // 新增操作 - 调用新增API
      const res = await addProductClassification(formData.value)
      console.log('新增分类成功:', res)
      alert('分类添加成功')
    }
    
    // 关闭弹窗并重置表单
    showAddDialog.value = false
    // 重置表单
    formData.value = { name: '', brandId: '' }
    editingCategory.value = null
    // 重新加载分类列表
    getCategoryList()
  } catch (error) {
    console.error('保存分类失败:', error)
    alert('保存分类失败，请重试')
  } finally {
    loading.value = false
  }
}

getCategoryList()
</script>

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
          <el-option label="王殿" value="1" />
          <el-option label="百姓粽" value="2" />
          <el-option label="铭记家点心" value="3" />
        </el-select>
      </div>
      <div class="action-section">
        <el-button type="primary" @click="showAddDialog = true">
          <i class="el-icon-plus"></i> 添加分类
        </el-button>
      </div>
    </div>
    
    <!-- 下面盒子：分类表单 -->
    <div class="table-box" >
      <el-table :data="categoryList.records"  style="width: 100%" fit>
        <el-table-column prop="id" label="分类ID" width="80" />
        <el-table-column prop="name" label="分类名字" min-width="50" />
        <el-table-column prop="brandId" label="分类品牌" min-width="80">
          <template #default="{ row }">
            <span v-if="row.brandId === 1 || row.brandId === '1'">王殿</span>
            <span v-else-if="row.brandId === 2 || row.brandId === '2'">百姓粽</span>
            <span v-else-if="row.brandId === 3 || row.brandId === '3'">铭记家点心</span>
            <span v-else>{{ row.brandId || '-' }}</span>
          </template>
        </el-table-column>
           <el-table-column label="操作" width="120" align="center">
             <template #default="{row, $index}">
               <div class="action-buttons">
                 <el-button @click="onEditChannel(row, $index)"  class="action-btn">编辑</el-button>
                 <el-button @click="onDelChannel(row, $index)"  class="action-btn">删除</el-button>
               </div>
             </template>
           </el-table-column>
      </el-table>
    </div>
    

    
    <!-- 添加/编辑分类对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingCategory ? '编辑分类' : '添加分类'"
      width="500px"
      @close="closeDialog"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="formData.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类品牌">
          <el-select v-model="formData.brandId" placeholder="请选择分类品牌">
            <el-option label="王殿" value="1" />
            <el-option label="百姓粽" value="2" />
            <el-option label="铭记家点心" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveCategory" :loading="loading">确定</el-button>
      </template>
    </el-dialog>
    <!-- <el-pagination
      v-model:current-page="page.value.pageNum"
      v-model:page-size="page.value.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
  </div>
</template>



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

/* 操作按钮容器样式 */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

:deep(.action-btn) {
  padding: 0 12px;
}
</style>
