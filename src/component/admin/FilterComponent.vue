<script setup>
import { ref, watch } from 'vue'

// 定义props，允许父组件传递筛选选项和默认值
// 注意：在不使用TypeScript的情况下，不能使用withDefaults，直接在defineProps中设置默认值
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [], // 空默认值，在模板中处理无数据情况
  },
  placeholder: {
    type: String,
    default: '请选择产品类型',
  },
})

// 定义emits
const emit = defineEmits(['update:modelValue', 'confirm', 'reset', 'search'])

// 内部值，与v-model绑定
const value = ref(props.modelValue)
// 查询关键词
const searchKeyword = ref('')

// 监听内部值变化，更新v-model
watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})

// 处理确定按钮点击
const handleConfirm = () => {
  console.log('筛选条件确认:', value.value)
  // 即使是静态数据，也要正常发射确认事件
  emit('confirm', value.value)
}

// 处理重置按钮点击
const handleReset = () => {
  console.log('筛选条件重置')
  // 重置值并发射相应事件
  value.value = ''
  searchKeyword.value = ''
  emit('update:modelValue', '')
  emit('reset')
}

// 处理查询按钮点击
const handleSearch = () => {
  console.log('执行查询:', searchKeyword.value)
  emit('search', searchKeyword.value)
}
</script>

<template>
  <!-- 筛选组件 -->
  <div class="filter-container">
    <!-- 筛选内容区域 -->
    <div class="filter-content">
      <!-- 无论是否有数据，都显示选择器 -->
      <el-select v-model="value" :placeholder="placeholder" style="width: 240px">
        <!-- 使用options数据或静态默认数据 -->
        <template v-if="options && options.length > 0">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </template>
        <template v-else>
          <!-- 静态默认选项，确保即使没有数据也能显示 -->
          <el-option label="全部产品" value="all" />
          <el-option label="热销产品" value="hot" />
          <el-option label="新品上市" value="new" />
          <el-option label="促销产品" value="promotion" />
        </template>
      </el-select>
    </div>
    <!-- 操作按钮区域 -->
    <div class="filter-actions">
      <el-button type="primary" @click="handleConfirm">确定</el-button>
      <el-input
        v-model="searchKeyword"
        placeholder="请输入查询产品名字"
        style="width: 200px"
        clearable
        @keyup.enter="handleSearch"
      />
      <el-button @click="handleSearch">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleConfirm">
        <slot></slot>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.filter-actions {
  display: flex;
  gap: 8px;
  /* 移除margin-left: auto，使按钮位于选项旁边 */
}

/* 响应式样式 */
@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-actions {
    margin-left: 0;
    justify-content: flex-end;
    margin-top: 12px;
  }
}
</style>
