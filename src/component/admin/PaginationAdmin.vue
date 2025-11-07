<script>
export default {
  name: 'PaginationAdmin',
  props: {
    // 用于控制是否禁用分页
    disabled: {
      type: Boolean,
      default: false,
    },
    // 分页大小
    size: {
      type: String,
      default: 'default',
    },
    // 是否显示背景
    background: {
      type: Boolean,
      default: true,
    },
    // 自定义总数，默认显示400条
    total: {
      type: Number,
      default: 400,
    },
    // 自定义每页显示的数量选项
    pageSizes: {
      type: Array,
      default: () => [100, 200, 300, 400],
    },
    // 自定义当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 自定义每页显示数量
    pageSize: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      // 本地状态，用于双向绑定
      currentPage4: this.currentPage,
      pageSize4: this.pageSize,
    }
  },
  watch: {
    // 监听props变化，更新本地状态
    currentPage(newVal) {
      this.currentPage4 = newVal
    },
    pageSize(newVal) {
      this.pageSize4 = newVal
    },
  },
  methods: {
    // 处理每页显示数量变化
    handleSizeChange(val) {
      this.pageSize4 = val
      this.$emit('size-change', val)
    },
    // 处理当前页码变化
    handleCurrentChange(val) {
      this.currentPage4 = val
      this.$emit('current-change', val)
    },
  },
}
</script>

<template>
  <!-- 分页组件 -->
  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="pageSizes"
    :size="size"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style scoped>
/* 分页组件样式 */
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
