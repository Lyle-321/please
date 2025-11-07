<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router'

// 格式化浏览量显示
const formatViewCount = (count) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count.toString()
}

// 主分类和子分类状态
const activeCategory = ref('食品行业知识')
const activeSubCategory = ref('全部')

// 模拟内容数据
const infoList = ref([
  {
    id: 1,
    title: '传统节日食品文化传承与创新发展研究',
    date: '2023-10-15',
    num: '001',
    viewCount: 2568,
  },
  { id: 2, title: '健康饮食理念在现代生活中的应用探讨', date: '2023-10-10', viewCount: 1892 },
  { id: 3, title: '中国传统糕点制作工艺的历史演变', date: '2023-09-28', viewCount: 1456 },
  { id: 4, title: '食品安全与质量控制体系建设', date: '2023-09-20', viewCount: 2134 },
  { id: 5, title: '地方特色小吃的文化内涵与市场发展', date: '2023-09-15', viewCount: 1789 },
  { id: 6, title: '现代食品科技对传统饮食的影响', date: '2023-09-10', viewCount: 1923 },
  { id: 7, title: '饮食文化与地域特色的关联分析', date: '2023-09-05', viewCount: 1345 },
  { id: 8, title: '传统与现代结合的创新美食开发', date: '2023-09-01', viewCount: 1657 },
])

// 分类数据映射 - 用于模拟不同分类下的数据
const categoryDataMap = {
  食品行业知识: [
    {
      id: 1,
      title: '传统节日食品文化传承与创新发展研究',
      date: '2023-10-15',
      num: '001',
      viewCount: 2568,
    },
    { id: 2, title: '健康饮食理念在现代生活中的应用探讨', date: '2023-10-10', viewCount: 1892 },
    { id: 3, title: '食品安全与质量控制体系建设', date: '2023-09-20', viewCount: 2134 },
    { id: 4, title: '现代食品科技对传统饮食的影响', date: '2023-09-10', viewCount: 1923 },
    { id: 5, title: '食品添加剂的安全使用与管理规范', date: '2023-08-25', viewCount: 1654 },
    { id: 6, title: '农产品质量追溯体系建设方案', date: '2023-08-20', viewCount: 1432 },
    { id: 7, title: '餐饮行业标准化服务流程设计', date: '2023-08-15', viewCount: 1289 },
    { id: 8, title: '食品企业质量管理体系认证指南', date: '2023-08-10', viewCount: 1567 },
    { id: 9, title: '食品企业质量管理体系认证指南', date: '2023-08-10', viewCount: 1567 },
  ],
  品牌故事: [
    { id: 11, title: '百年老字号的传承与创新之路', date: '2023-10-12', viewCount: 3210 },
    { id: 12, title: '王殿品牌创始人的创业历程', date: '2023-10-08', viewCount: 2890 },
    { id: 13, title: '百姓棕的品牌文化与核心价值观', date: '2023-10-05', viewCount: 2567 },
    { id: 14, title: '铭记家点心的品牌故事与发展历程', date: '2023-10-01', viewCount: 2345 },
    { id: 15, title: '从传统工艺到现代化生产的转变', date: '2023-09-25', viewCount: 2109 },
    { id: 16, title: '品牌危机管理与声誉维护策略', date: '2023-09-20', viewCount: 1987 },
    { id: 17, title: '企业文化建设与员工凝聚力提升', date: '2023-09-15', viewCount: 1765 },
    { id: 18, title: '品牌营销策略创新与实践案例', date: '2023-09-10', viewCount: 1654 },
  ],
  节令美食推荐: [
    { id: 21, title: '中秋月饼品鉴与制作技巧分享', date: '2023-09-20', viewCount: 4567 },
    { id: 22, title: '春节传统美食文化与创新做法', date: '2023-09-15', viewCount: 3987 },
    { id: 23, title: '端午节粽子种类与健康搭配指南', date: '2023-09-10', viewCount: 3456 },
    { id: 24, title: '清明节传统小吃与文化渊源', date: '2023-09-05', viewCount: 2890 },
    { id: 25, title: '冬至节气饮食养生与传统习俗', date: '2023-09-01', viewCount: 2678 },
    { id: 26, title: '元宵节汤圆制作与创意馅料推荐', date: '2023-08-25', viewCount: 2456 },
    { id: 27, title: '腊八节腊八粥的营养搭配与熬制技巧', date: '2023-08-20', viewCount: 2234 },
    { id: 28, title: '小年祭灶传统美食与文化意义', date: '2023-08-15', viewCount: 2012 },
  ],
}

const switchCategory = (category) => {
  // 只有当点击的不是当前激活的分类时才执行切换
  if (activeCategory.value !== category) {
    activeCategory.value = category
    // 获取该分类下的数据
    fetchData()
  }
}

const switchSubCategory = (subCategory) => {
  // 只有当点击的不是当前激活的子分类时才执行切换
  if (activeSubCategory.value !== subCategory) {
    activeSubCategory.value = subCategory
    // 获取该子分类下的数据
    fetchData()
  }
}

// 移除分页相关函数

// 获取数据的方法
const fetchData = async () => {
  // 模拟API调用
  console.log(`获取数据: 分类=${activeCategory.value}, 子分类=${activeSubCategory.value}`)

  // 模拟根据分类获取数据
  const categoryData = categoryDataMap[activeCategory.value] || []

  // 模拟子分类筛选
  let filteredData = [...categoryData]
  if (activeSubCategory.value !== '全部') {
    // 这里简单模拟子分类筛选，实际项目中应该根据实际业务逻辑筛选
    // 例如可以根据标题是否包含子分类名称来筛选
    filteredData = categoryData.filter((item) => item.title.includes(activeSubCategory.value))
  }

  // 直接显示所有数据，不再进行分页
  infoList.value = filteredData
}

// 组件挂载时获取数据
onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- 图片 -->
  <div class="container">
    <div class="breadcrumb-nav">
      <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link :to="{ name: 'information-center' }" class="breadcrumb-link"
        >资讯中心</router-link
      >
    </div>
  </div>

  <div class="container-fluid banner-container">
    <img src="@/assets/bg.png" alt="资讯图片" class="info-banner-img" />
  </div>
  <!-- 内容 -->
  <div class="content">
    <!-- 主分类切换 -->
    <div class="main-categories">
      <div
        v-for="category in ['食品行业知识', '品牌故事', '节令美食推荐']"
        :key="category"
        :class="['category-tab', { active: activeCategory === category }]"
        @click="switchCategory(category)"
      >
        {{ category }}
      </div>
    </div>

    <!-- 子分类 -->
    <div class="sub-categories">
      <div
        v-for="subCategory in ['全部', '王殿', '百姓棕', '铭记家点心']"
        :key="subCategory"
        :class="['sub-category', { active: activeSubCategory === subCategory }]"
        @click="switchSubCategory(subCategory)"
      >
        {{ subCategory }}
      </div>
    </div>

    <!-- 内容展示区 -->
    <div class="info-list-container">
      <div class="info-list">
        <!-- 动态渲染内容行 -->
        <div
          v-for="item in infoList"
          :key="item.id"
          class="info-item"
          @click="router.push(`/article`)"
        >
          <div class="info-title">{{ item.title }}</div>
          <div class="info-meta">
            <div class="info-date">{{ item.date }}</div>
            <div class="info-views">浏览量:{{ formatViewCount(item.viewCount) }}</div>
          </div>
        </div>

        <!-- 空状态提示 -->
        <div v-if="infoList.length === 0" class="empty-state">
          <p>暂无相关资讯</p>
        </div>
      </div>
    </div>

    <!-- 分页功能 -->
    <div class="example-pagination-block">
      <el-pagination :page-size="20" :pager-count="5" layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>
<style scoped>
.banner-container {
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.info-banner-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-banner-img {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .info-banner-img {
    height: 180px;
  }
}
/* 内容区域样式 */
.content {
  max-width: 1260px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 主分类样式 */
.main-categories {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.category-tab {
  padding: 10px 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.category-tab:hover {
  color: #e34949;
}

.category-tab.active {
  color: #e34949;
  border-bottom: 2px solid #e34949;
}

/* 子分类样式 */
.sub-categories {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.sub-category {
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.sub-category:hover {
  background-color: #f8e0e0;
  color: #e34949;
}

.sub-category.active {
  background-color: #e34949;
  color: #fff;
}

/* 内容列表容器 */
.info-list-container {
  margin-bottom: 40px;
}

/* 空状态样式 */
.empty-state {
  padding: 80px 0;
  text-align: center;
  color: #999;
  font-size: 16px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* 内容项样式 */
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  min-height: 84px;
  padding: 20px 40px; /* 增加上下左右内边距 */
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s ease;
}

.info-item:hover {
  background-color: #fafafa;
  cursor: pointer;
}

.info-title {
  flex: 1;
  font-size: 16px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 30px;
  text-align: left;
}

.info-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-left: 30px;
  min-width: 120px;
}

.info-date {
  font-size: 14px;
  color: #999;
  text-align: right;
}

.info-views {
  font-size: 11px;
  color: #666;
  text-align: right;
}

/* 分页样式 */
.example-pagination-block {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

/* 红色盒子样式的分页组件 */
:deep(.el-pagination) {
  background-color: #fff;
  border-radius: 0;
  font-size: 14px;
}

/* 页码按钮样式 */
:deep(.el-pager li) {
  background-color: #fff;
  border: 1px solid #e34949;
  color: #e34949;
  margin: 0 5px;
  min-width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 0;
  transition: all 0.2s ease;
}

:deep(.el-pager li:hover:not(.disabled)) {
  background-color: #fde8e8;
  color: #e34949;
}

:deep(.el-pager li.active) {
  background-color: #e34949;
  color: #fff;
  border-color: #e34949;
}

/* 上一页/下一页按钮样式 */
:deep(.btn-prev),
:deep(.btn-next) {
  background-color: #fff;
  border: 1px solid #e34949;
  color: #e34949;
  min-width: 36px;
  height: 36px;
  border-radius: 0;
  transition: all 0.2s ease;
}

:deep(.btn-prev:hover),
:deep(.btn-next:hover) {
  background-color: #fde8e8;
  color: #e34949;
}

/* 禁用状态样式 */
:deep(.btn-prev.is-disabled),
:deep(.btn-next.is-disabled) {
  background-color: #f5f5f5;
  border-color: #dcdfe6;
  color: #c0c4cc;
}

/* 移动响应式调整 */
@media (max-width: 767px) {
  :deep(.el-pager li) {
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    margin: 0 3px;
  }

  :deep(.btn-prev),
  :deep(.btn-next) {
    min-width: 30px;
    height: 30px;
    font-size: 12px;
  }
}

/* 移动端响应式样式优化 */
@media (max-width: 767px) {
  /* 分页组件响应式 */
  .example-pagination-block {
    margin-top: 30px;
    padding: 0 15px;
  }

  /* 确保小屏幕上分页组件不溢出容器 */
  .el-pagination {
    flex-wrap: wrap;
    gap: 10px;
  }

  /* 优化移动端上的按钮和页码样式 */
  .el-pagination .btn-prev,
  .el-pagination .btn-next {
    min-width: 32px;
    height: 32px;
    padding: 0;
    font-size: 12px;
  }

  .el-pagination .el-pager li {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
  }
}

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    padding: 20px 15px;
  }

  .main-categories {
    gap: 10px;
  }

  .category-tab {
    padding: 8px 15px;
    font-size: 14px;
  }

  .sub-categories {
    flex-wrap: wrap;
    gap: 10px;
  }

  .sub-category {
    padding: 6px 15px;
    font-size: 13px;
  }

  .info-item {
    height: auto;
    min-height: 70px;
    padding: 0 15px;
  }

  .info-title {
    font-size: 14px;
    margin-right: 10px;
  }

  .info-meta {
    gap: 4px;
    margin-left: 15px;
    min-width: 90px;
  }

  .info-date {
    font-size: 12px;
  }

  .info-views {
    font-size: 10px;
    color: #666;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 5px;
  }

  .page-item {
    min-width: 35px;
    height: 35px;
    font-size: 13px;
    padding: 0 12px;
  }
}

@media (max-width: 480px) {
  .main-categories {
    flex-wrap: wrap;
  }

  .info-item {
    flex-direction: column;
    height: auto;
    padding: 15px;
    align-items: flex-start;
    gap: 10px;
  }

  .info-meta {
    align-self: flex-end;
    align-items: flex-end;
    width: 100%;
    margin-left: 0;
  }
}
.breadcrumb-nav {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin: 20px 0;
}
.breadcrumb-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

/* .breadcrumb-link:hover {
  color: #e34949;
} */
.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}
</style>
