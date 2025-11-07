<!-- 分页组件 -->
<script setup>
import { ref, watch } from 'vue'

// 组件属性定义
const props = defineProps({
  // 当前页码
  currentPage: {
    type: Number,
    default: 1,
  },
  // 每页显示条数
  pageSize: {
    type: Number,
    default: 10,
  },
  // 总条数
  total: {
    type: Number,
    required: true,
  },
  // 每页显示条数选择器选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  // 分页布局
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  // 分页尺寸
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'small', 'large'].includes(value),
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否为分页按钮添加背景色
  background: {
    type: Boolean,
    default: true,
  },
})

// 定义事件
const emit = defineEmits(['size-change', 'current-change', 'update:currentPage', 'update:pageSize'])

// 内部页码和每页条数状态
const currentPageLocal = ref(props.currentPage)
const pageSizeLocal = ref(props.pageSize)

// 监听props变化，更新内部状态
watch(
  () => props.currentPage,
  (newVal) => {
    currentPageLocal.value = newVal
  },
)

watch(
  () => props.pageSize,
  (newVal) => {
    pageSizeLocal.value = newVal
  },
)

// 处理每页条数变化
const handleSizeChange = (val) => {
  pageSizeLocal.value = val
  emit('size-change', val)
  emit('update:pageSize', val)
}

// 处理页码变化
const handleCurrentChange = (val) => {
  currentPageLocal.value = val
  emit('current-change', val)
  emit('update:currentPage', val)
}
</script>

<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPageLocal"
      v-model:page-size="pageSizeLocal"
      :page-sizes="pageSizes"
      :size="size"
      :disabled="disabled"
      :background="background"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
  margin-top: 10px;
}

/* 确保分页组件在小屏幕下正确显示 */
@media (max-width: 768px) {
  .pagination-container {
    justify-content: center;
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px 0;
  }
}
</style>
