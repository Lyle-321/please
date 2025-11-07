<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 按钮状态管理
const activeButton = ref('wangdian')
const activeSubCategory = ref('')
const router = useRouter()

// 导入背景图片
import wangdianImg from '@/assets/wangdian.png'
import baixingImg from '@/assets/baixing.png'
import mingjiImg from '@/assets/mingji.png'

// 背景图数据
const backgroundImages = {
  wangdian: wangdianImg,
  baixingzong: baixingImg,
  mingjiadianxin: mingjiImg,
}

// 计算当前背景图
const currentBackgroundImage = computed(() => {
  return backgroundImages[activeButton.value] || wangdianImg
})

// 子分类数据
const subCategories = {
  wangdian: [
    { id: 'wd0', name: '全部' },
    { id: 'wd1', name: '传统佛跳墙' },
    { id: 'wd2', name: '精品礼盒' },
    { id: 'wd3', name: '节日限定' },
  ],
  baixingzong: [
    { id: 'bxz1', name: '经典肉粽' },
    { id: 'bxz2', name: '素食粽子' },
    { id: 'bxz3', name: '特色口味' },
  ],
  mingjiadianxin: [
    { id: 'mjd1', name: '传统糕点' },
    { id: 'mjd2', name: '西式点心' },
    { id: 'mjd3', name: '伴手礼盒' },
  ],
}

// 导航到详情页并传递参数
const navigateToDetail = (brand, productId) => {
  // 映射品牌到对应的参数值
  let brandCode = 1 // 默认王殿
  if (brand === 'baixingzong') {
    brandCode = 2
  } else if (brand === 'mingjiadianxin') {
    brandCode = 3
  }

  // 跳转到详情页并携带参数
  router.push({
    path: '/food-details',
    query: {
      brand: brandCode,
      productId: productId,
      subCategory: activeSubCategory.value,
    },
  })
}

// 切换主分类
const changeCategory = (category) => {
  activeButton.value = category
  // 切换主分类时默认选中第一个子分类
  if (subCategories[category] && subCategories[category].length > 0) {
    activeSubCategory.value = subCategories[category][0].id
  } else {
    activeSubCategory.value = ''
  }
}

// 切换子分类
const changeSubCategory = (subCategoryId) => {
  activeSubCategory.value = subCategoryId
}

// 组件加载时默认选中第一个子分类
if (subCategories[activeButton.value] && subCategories[activeButton.value].length > 0) {
  activeSubCategory.value = subCategories[activeButton.value][0].id
}
</script>

<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="container py-4">
      <div class="breadcrumb-nav">
        <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
        <span class="breadcrumb-separator">/</span>
        <router-link :to="{ name: 'product' }" class="breadcrumb-link">产品介绍</router-link>
      </div>
    </div>
    <div class="container py-8">
      <!-- 头部文字 -->
      <h1 class="headtext text-3xl font-bold text-center text-gray-800 mb-10">产品介绍</h1>
      <!-- 三个切换分类盒子 -->
      <div class="category-container">
        <div class="category-main-row">
          <div
            class="category-item"
            :class="{ active: activeButton === 'wangdian' }"
            @click="changeCategory('wangdian')"
          >
            <div class="category-name">王殿</div>
          </div>
          <div
            class="category-item"
            :class="{ active: activeButton === 'baixingzong' }"
            @click="changeCategory('baixingzong')"
          >
            <div class="category-name">百姓粽</div>
          </div>
          <div
            class="category-item"
            :class="{ active: activeButton === 'mingjiadianxin' }"
            @click="changeCategory('mingjiadianxin')"
          >
            <div class="category-name">铭记家点心</div>
          </div>
        </div>

        <!-- 背景图显示区域 -->
        <div
          class="category-background"
          :style="{ backgroundImage: `url(${currentBackgroundImage})` }"
        ></div>

        <!-- 子分类显示区域 -->
        <div class="subcategory-container" v-if="subCategories[activeButton]">
          <div
            v-for="sub in subCategories[activeButton]"
            :key="sub.id"
            class="subcategory-item"
            :class="{ active: activeSubCategory === sub.id }"
            @click="changeSubCategory(sub.id)"
          >
            <div class="subcategory-name">{{ sub.name }}</div>
          </div>
        </div>
      </div>
      <!-- 主体内容 -->
      <div class="contect">
        <div class="card-grid">
          <!-- 卡片内容 -->
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 1)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 2)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 3)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 4)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 5)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 6)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 7)">
              <img src="@/assets/fotiaoq.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="card" @click="navigateToDetail(activeButton, 8)">
              <img src="@/assets/ping.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">佛跳墙</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="example-pagination-block">
    <el-pagination :page-size="20" :pager-count="5" layout="prev, pager, next" :total="1000" />
  </div>
</template>

<style scoped>
/* 头部文字 */
.headtext {
  margin-bottom: 3rem;
}

/* 产品卡片图片统一大小 */
.card-img-top {
  width: 100% !important;
  height: 200px !important;
  object-fit: cover !important;
  border-radius: 12px 12px 0 0 !important; /* 顶部圆角与卡片一致 */
}

/* 响应式卡片容器样式 */
.contect {
  padding: 1rem 0;
  width: 100%;
}

/* CSS Grid 布局实现精确断点控制 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 默认每行4个 */
  gap: 40px; /* 增大边距 */
  width: 100%;
}

.card-item {
  display: flex;
  width: 100%;
}

/* 卡片样式 */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 12px; /* 添加更大的圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%; /* 确保卡片占满网格项 */
  height: 100%; /* 确保卡片高度一致 */
  display: flex;
  flex-direction: column;
}

/* 卡片内容区 - 文字居中 */
.card-body {
  padding: 15px;
  text-align: center; /* 文字居中 */
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

/* 卡片标题 - 文字居中 */
.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center; /* 确保标题居中 */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 精确断点响应式布局 */
/* 小于1200px - 每行3个卡片 */
@media (max-width: 1199px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
  }
}

/* 小于990px - 每行2个卡片 */
@media (max-width: 989px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

/* 小于770px - 每行2个卡片，移动端也保持双列布局 */
@media (max-width: 769px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .card-img-top {
    height: 150px !important;
  }
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .contect .row {
    gap: 1rem;
  }

  .card {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .card-img-top {
    height: 180px !important;
  }
}

/* 分类盒子样式 */
.category-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 40px;
  width: 100%;
}

/* 主分类按钮行 - 连在一起 */
.category-main-row {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  width: fit-content;
  margin-bottom: 15px;
  border-radius: 0;
  overflow: hidden;
}

/* 未选中的盒子 - 字体黑色，背景灰色，边框优化 */
.category-item {
  background-color: #f0f0f0; /* 灰色背景 */
  border: 2px solid #ddd;
  border-right: none; /* 移除右侧边框 */
  border-radius: 0;
  padding: 14px 28px;
  cursor: pointer;
  transition: all 0.3s ease; /* 延长过渡时间 */
  position: relative;
  overflow: hidden;
}

/* 修复最后一个按钮的右侧边框 */
.category-item:last-child {
  border-right: 2px solid #ddd;
}

/* 选中的盒子 - 字体白色，背景红色，添加动画效果 */
.category-item.active {
  background-color: #e34949; /* 红色背景 */
  border-color: #e34949;
  transform: translateY(-2px); /* 轻微上浮效果 */
  box-shadow: 0 4px 8px rgba(227, 73, 73, 0.3);
  z-index: 1;
}

/* 未选中时字体为黑色 */
.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #000000; /* 黑色字体 */
  position: relative;
  z-index: 1;
}

/* 选中时字体为白色 */
.category-item.active .category-name {
  color: #ffffff; /* 白色字体 */
}

/* 鼠标悬停效果 */
.category-item:hover {
  background-color: #e0e0e0;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

.category-item.active:hover {
  background-color: #d13a3a;
  transform: translateY(-2px);
}

/* 背景图样式 */
.category-background {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  transition: background-image 0.3s ease-in-out;
  border-radius: 8px;
  overflow: hidden;
}

/* 子分类样式 */
.subcategory-container {
  display: flex;
  margin-left: 0;
  flex-wrap: wrap;
  padding-left: 10px;
  border-left: 2px solid #e0e0e0;
  margin-bottom: 20px;
}

/* 未选中的子分类盒子 - 无边框，更大字体 */
.subcategory-item {
  background-color: transparent; /* 透明背景 */
  border: none; /* 移除边框 */
  border-radius: 0;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 5px;
  font-size: 15px; /* 增大字体大小 */
  position: relative;
  z-index: 1;
}

/* 在子分类项之间添加竖线分隔 */
.subcategory-item:not(:last-child)::after {
  content: '|';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  z-index: 0;
  font-size: 15px; /* 分隔线字体大小与子分类一致 */
}

/* 修复最后一个按钮没有分隔线的问题 */
.subcategory-item:last-child {
  padding-right: 8px; /* 减少右侧内边距 */
}

/* 选中的子分类盒子 - 只改变字体颜色，无边框 */
.subcategory-item.active {
  border: none; /* 确保无边框 */
  background-color: transparent;
}

/* 未选中时子分类字体为黑色，更大 */
.subcategory-name {
  font-size: 15px; /* 增大字体大小 */
  font-weight: 500;
  color: #000000; /* 黑色字体 */
  transition: color 0.2s ease;
}

/* 选中时子分类字体为红色 */
.subcategory-item.active .subcategory-name {
  color: #e34949; /* 红色字体 */
  font-weight: 600;
}

/* 子分类鼠标悬停效果 - 只改变字体颜色 */
.subcategory-item:hover .subcategory-name {
  color: #e34949;
}

/* 移动端响应式设计 - 平板设备 (768px - 991px) */
@media (max-width: 991px) {
  /* 主分类响应式 */
  .category-main-row {
    width: 100%;
    justify-content: center;
  }

  .category-item {
    padding: 12px 24px;
  }

  .category-name {
    font-size: 15px;
  }

  /* 背景图响应式 */
  .category-background {
    height: 300px;
  }

  /* 子分类响应式 */
  .subcategory-container {
    padding-left: 5px;
    justify-content: center;
  }

  .subcategory-item {
    font-size: 14px;
    padding: 5px 12px;
  }

  .subcategory-name {
    font-size: 14px;
  }

  .subcategory-item:not(:last-child)::after {
    font-size: 14px;
    right: -5px;
  }
}

/* 移动端响应式设计 - 手机设备 (≤767px) */
@media (max-width: 767px) {
  /* 主分类响应式 - 保持在同一行 */
  .category-main-row {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* 添加水平滚动条隐藏样式 */
  .category-main-row::-webkit-scrollbar {
    display: none;
  }

  .category-item {
    flex: 0 0 auto;
    border-right: none;
    border-bottom: 2px solid #ddd;
    width: auto;
    text-align: center;
    padding: 8px 16px;
    white-space: nowrap;
  }

  .category-item:last-child {
    border-right: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
  }

  .category-name {
    font-size: 13px;
  }

  /* 背景图响应式 */
  .category-background {
    height: 200px;
  }

  /* 子分类响应式 */
  .subcategory-container {
    border-left: none;
    padding-left: 0;
    justify-content: center;
    gap: 0;
    margin-top: 10px;
  }

  .subcategory-item {
    font-size: 13px;
    padding: 4px 10px;
    margin-top: 0;
  }

  .subcategory-name {
    font-size: 13px;
  }

  .subcategory-item:not(:last-child)::after {
    font-size: 13px;
    right: -4px;
  }
}

/* 背景图额外响应式调整 */
@media (max-width: 480px) {
  .category-background {
    height: 160px;
  }

  /* 小屏手机上也保持双列布局，但调整间距 */
  .card-grid {
    gap: 15px;
  }

  .card-img-top {
    height: 120px !important;
  }
}

/* 小屏手机响应式设计 - 更小的屏幕 (≤480px) */
@media (max-width: 480px) {
  /* 主分类响应式 */
  .category-item {
    padding: 8px 16px;
  }

  .category-name {
    font-size: 13px;
  }

  /* 子分类响应式 */
  .subcategory-item {
    font-size: 12px;
    padding: 3px 8px;
  }

  .subcategory-name {
    font-size: 12px;
  }

  .subcategory-item:not(:last-child)::after {
    font-size: 12px;
    right: -3px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .category-container {
    align-items: stretch;
    gap: 10px;
  }

  /* 保持主分类在同一行 */
  .category-main-row {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* 添加水平滚动条隐藏样式 */
  .category-main-row::-webkit-scrollbar {
    display: none;
  }

  .category-item {
    flex: 0 0 auto;
    width: auto;
    text-align: center;
    padding: 10px 16px;
    white-space: nowrap;
  }

  .category-item:last-child {
    border-right: 2px solid #ddd;
  }

  .category-name {
    font-size: 15px;
  }

  .subcategory-container {
    padding-left: 5px;
    gap: 10px;
  }

  .subcategory-item {
    padding: 6px 12px;
    margin-top: 3px;
  }

  .subcategory-name {
    font-size: 13px;
  }

  /* 移动端保持双列布局 */
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

.address {
  margin: 1rem 5rem;
}

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

/* 面包屑导航样式 */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.breadcrumb-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #333;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.breadcrumb-current {
  color: #333;
  font-weight: 500;
}

/* 移动端响应式样式优化 */
@media (max-width: 767px) {
  /* 面包屑导航响应式 */
  .breadcrumb-nav {
    font-size: 12px;
    margin-bottom: 15px;
  }

  .breadcrumb-separator {
    margin: 0 6px;
  }

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
</style>
