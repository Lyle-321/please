<script setup>
// 品牌产品页面的组件逻辑
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FilterComponent from '@/component/admin/FilterComponent.vue'
import PaginationAdmin from '@/component/admin/PaginationAdmin.vue'

const route = useRoute()
const brandId = ref(null)
onMounted(() => {
  // 获取品牌ID参数
  brandId.value = route.params.id
  console.log(`加载品牌ID: ${brandId.value} 的产品`)
  // 实际项目中这里会调用API获取产品数据
})

//表格数据 - 注意：el-table需要数组类型的数据
const tableData = ref([
  {
    id: 1,
    name: '产品1',
    image: 'product1.jpg',
    description: '这是产品1的描述',
    category: '分类A',
  },
  {
    id: 2,
    name: '产品2',
    image: 'product2.jpg',
    description: '这是产品2的描述',
    category: '分类B',
  },
  {
    id: 3,
    name: '产品3',
    image: 'product3.jpg',
    description: '这是产品3的描述',
    category: '分类A',
  },
])
</script>

<template>
  <div class="brand-products-container">
    <!-- 品牌产品页面内容 -->
    <h2>品牌产品管理</h2>
    <h3>{{ brandId }}</h3>
    <div class="content-area">
      <!-- 产品列表将在这里显示 -->
      <!-- 筛选组件 -->
      <FilterComponent> 添加产品 </FilterComponent>
    </div>
    <!-- 产品列表将在这里显示 -->
    <div class="product-list" style="padding: 10px">
      <!-- 产品列表将在这里显示 -->
      <el-table :data="tableData" border style="width: 100%" fit>
        <el-table-column prop="name" label="产品名字" min-width="120" />
        <el-table-column prop="image" label="产品图片" min-width="100" />
        <el-table-column prop="description" label="产品描述" min-width="200" />
        <el-table-column prop="category" label="产品分类" min-width="100" />
        <el-table-column label="操作" min-width="160">
          <template #default="scope">
            <el-button type="primary">编辑</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <PaginationAdmin />
    </div>
  </div>
</template>

<style scoped>
.brand-products-container {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.content-area {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* 产品列表容器样式 - 确保响应式占满父容器 */
.product-list {
  width: 100%;
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1px;
  box-sizing: border-box;
  display: block;
}

/* 优化表格宽度控制 */
.product-list > .el-table {
  width: 100% !important;
  box-sizing: border-box !important;
  table-layout: fixed;
}

/* 确保表格内容正常显示 */
.product-list :deep(.el-table__header th),
.product-list :deep(.el-table__body td) {
  box-sizing: border-box !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 增加表格行高 */
.product-list :deep(.el-table__header th),
.product-list :deep(.el-table__body td) {
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  height: 60px !important;
  min-height: 60px !important;
}

/* 操作列按钮居中 */
.product-list :deep(.el-table__body td:last-child) {
  text-align: center !important;
}
/* 操作列表头居中 */
.product-list :deep(.el-table__header th:last-child) {
  text-align: center !important;
}
.product-list :deep(.el-table__row) {
  height: 60px !important;
  min-height: 60px !important;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .product-list :deep(.el-table__header th),
  .product-list :deep(.el-table__body td) {
    font-size: 14px;
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}

@media (max-width: 768px) {
  .brand-products-container {
    padding: 10px;
  }

  .product-list {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 4px;
  }
  
  /* 移动设备上优化表格显示 */
  .product-list :deep(.el-table__header th),
  .product-list :deep(.el-table__body td) {
    font-size: 12px;
    padding-left: 4px !important;
    padding-right: 4px !important;
    height: 50px !important;
    min-height: 50px !important;
  }
  
  .product-list :deep(.el-button) {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
