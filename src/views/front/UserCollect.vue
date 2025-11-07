<script setup>
import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'

// 模拟用户数据
const username = ref('测试用户')

// 模拟收藏数据 - 静态数据
const allCollections = ref([
  {
    id: 1,
    brand: 'wangdian',
    brandName: '王殿',
    productId: 1,
    name: '传统佛跳墙',
    image: '/src/assets/fotiaoq.jpg',
    addedDate: '2024-01-15',
  },
  {
    id: 2,
    brand: 'wangdian',
    brandName: '王殿',
    productId: 2,
    name: '精品礼盒装佛跳墙',
    image: '/src/assets/fotiaoq.jpg',
    addedDate: '2024-01-20',
  },
  {
    id: 3,
    brand: 'baixingzong',
    brandName: '百姓粽',
    productId: 1,
    name: '经典肉粽',
    image: '/src/assets/zongzi.jpg',
    addedDate: '2024-02-05',
  },
  {
    id: 4,
    brand: 'mingjiadianxin',
    brandName: '铭记家点心',
    productId: 1,
    name: '传统糕点礼盒',
    image: '/src/assets/ping.jpg',
    addedDate: '2024-02-10',
  },
  {
    id: 5,
    brand: 'wangdian',
    brandName: '王殿',
    productId: 3,
    name: '节日限定佛跳墙',
    image: '/src/assets/fotiaoq.jpg',
    addedDate: '2024-02-15',
  },
  {
    id: 6,
    brand: 'baixingzong',
    brandName: '百姓粽',
    productId: 2,
    name: '素食粽子',
    image: '/src/assets/zongzi.jpg',
    addedDate: '2024-02-20',
  },
  {
    id: 7,
    brand: 'mingjiadianxin',
    brandName: '铭记家点心',
    productId: 2,
    name: '特色糕点组合',
    image: '/src/assets/ping.jpg',
    addedDate: '2024-03-01',
  },
  {
    id: 8,
    brand: 'wangdian',
    brandName: '王殿',
    productId: 4,
    name: '豪华家庭装佛跳墙',
    image: '/src/assets/fotiaoq.jpg',
    addedDate: '2024-03-10',
  },
  // 添加更多数据以便测试分页
  {
    id: 9,
    brand: 'baixingzong',
    brandName: '百姓粽',
    productId: 3,
    name: '端午特制粽子',
    image: '/src/assets/zongzi.jpg',
    addedDate: '2024-03-15',
  },
  {
    id: 10,
    brand: 'mingjiadianxin',
    brandName: '铭记家点心',
    productId: 3,
    name: '新年糕点礼盒',
    image: '/src/assets/ping.jpg',
    addedDate: '2024-03-20',
  }
])

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(8)

// 计算当前页显示的数据
const collections = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return allCollections.value.slice(startIndex, endIndex)
})

// const router = useRouter()

// 静态移除收藏功能（仅UI反馈）
const removeCollection = (id) => {
  allCollections.value = allCollections.value.filter(item => item.id !== id)
  // 如果当前页没有数据了，回到上一页
  if (collections.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

// 导航到产品详情
const navigateToDetail = (brand, productId) => {
  // 模拟导航，实际项目中使用真实路由
  console.log('Navigate to:', { brand, productId })
}

// 处理页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<template>
  <div class="user-collect-page">
    <!-- 面包屑导航 -->
    <div class="container py-4">
      <div class="breadcrumb-nav">
        <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">我的收藏</span>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="container py-6">
      <!-- 头部区域 - 用户名展示 -->
      <div class="user-header-section">
        <div class="user-info">
          <div class="user-icon">
            <img src="@/assets/people.svg" alt="用户头像" class="avatar" />
          </div>
          <div class="user-details">
            <h1 class="user-name">{{ username }}</h1>
            <p class="user-collection-count">共收藏 {{ collections.length }} 件商品</p>
          </div>
        </div>
      </div>

      <!-- 收藏内容区域 -->
      <div class="collection-content-section">
        <div class="collection-header">
          <h2 class="collection-title">我的收藏列表</h2>
        </div>

        <!-- 收藏列表 -->
        <template v-if="allCollections.length > 0">
          <div v-if="collections.length > 0" class="collection-list">
            <div v-for="item in collections" :key="item.id" class="collection-item">
              <!-- 左边图片部分 -->
              <div class="product-image-container">
                <img :src="item.image" :alt="item.name" class="product-image" />
              </div>

              <!-- 右边信息部分 -->
              <div class="product-info-container">
                <h3 class="product-name">{{ item.name }}</h3>
                <p class="collection-date">收藏时间: {{ item.addedDate }}</p>
                <div class="action-buttons">
                  <button 
                    class="view-detail-btn"
                    @click="navigateToDetail(item.brand, item.productId)"
                  >
                    详情
                  </button>
                  <button 
                    class="remove-collection-btn"
                    @click="removeCollection(item.id)"
                  >
                    取消收藏
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页组件 -->
          <div v-if="allCollections.length > pageSize" class="example-pagination-block">
            <el-pagination :page-size="pageSize" :pager-count="5" layout="prev, pager, next" :total="allCollections.length" @current-change="handleCurrentChange" />
          </div>
        </template>

        <!-- 空状态 - 只有当整个收藏列表为空时才显示 -->
        <div v-else class="empty-collection">
          <div class="empty-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </div>
          <p class="empty-text">暂无收藏内容</p>
          <router-link to="/product" class="go-shopping-btn">去逛逛</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-collect-page {
  min-height: 100vh;
  background-color: #f8f9fa;
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
  color: #ff4d4f;
  font-weight: 500;
}

/* 用户头部区域 */
.user-header-section {
  background: linear-gradient(135deg, #ff4d4f 0%, #ff7a45 100%);
  color: white;
  padding: 40px 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-icon {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  filter: brightness(0) invert(1);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.user-collection-count {
    font-size: 16px;
    opacity: 0.9;
    margin: 0;
  }

  /* 用户头部区域 - 响应式调整 */
  @media (max-width: 768px) {
    .user-header-section {
      padding: 30px 20px;
    }
  }

/* 收藏内容区域 */
.collection-content-section {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.collection-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.collection-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
  position: relative;
  display: inline-block;
}

.collection-title::after {
  content: '';
  position: absolute;
  bottom: -17px;
  left: 0;
  width: 60px;
  height: 2px;
  background-color: #ff4d4f;
}

/* 收藏列表 - 桌面端一行显示4个 */
.collection-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* 卡片样式 - 左右结构 */
.collection-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #fff;
  min-height: 260px;
}

.collection-item:hover {
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: #ffd7d7;
}

/* 左边图片部分 */
.product-image-container {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.collection-item:hover .product-image {
  transform: scale(1.05);
}

/* 右边信息部分 */
.product-info-container {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collection-date {
  color: #999;
  font-size: 13px;
  margin: 0 0 15px 0;
}

/* 操作按钮区域 */
.action-buttons {
  display: flex;
  gap: 10px;
}

.view-detail-btn,
.remove-collection-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-detail-btn {
  background-color: #ff4d4f;
  color: white;
}

.view-detail-btn:hover {
  background-color: #ff7875;
  transform: translateY(-1px);
}

.remove-collection-btn {
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
}

.remove-collection-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
  background-color: #fff1f0;
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

:deep(.btn-prev:hover:not(.disabled)),
:deep(.btn-next:hover:not(.disabled)) {
  background-color: #fde8e8;
  color: #e34949;
}

:deep(.btn-prev.is-disabled),
:deep(.btn-next.is-disabled) {
  background-color: #f5f5f5;
  color: #ccc;
  border-color: #ddd;
}

/* 空状态 */
.empty-collection {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  margin-bottom: 20px;
  opacity: 0.3;
}

.empty-text {
  font-size: 16px;
  margin-bottom: 20px;
}

.go-shopping-btn {
  display: inline-block;
  padding: 10px 30px;
  background-color: #ff4d4f;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.go-shopping-btn:hover {
  background-color: #ff7875;
  transform: translateY(-1px);
}

/* 响应式设计 */
/* 中等屏幕 - 一行显示3个 */
@media (max-width: 1200px) {
  .collection-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 平板设备 - 一行显示2个 */
@media (max-width: 768px) {
  /* 面包屑导航 */
  .breadcrumb-nav {
    font-size: 12px;
  }

  /* 用户头部 */
  .user-header-section {
    padding: 25px 20px;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .user-icon {
    padding: 10px;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }

  .user-name {
    font-size: 20px;
  }

  .user-collection-count {
    font-size: 14px;
  }

  /* 分页组件响应式调整 */
  .example-pagination-block {
    margin-top: 30px;
    padding: 0 15px;
  }

  /* 移动端分页按钮调整 */
  :deep(.el-pagination) {
    font-size: 12px;
  }

  :deep(.el-pager li),
  :deep(.btn-prev),
  :deep(.btn-next) {
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 0 3px;
  }

  /* 收藏内容 */
  .collection-content-section {
    padding: 20px;
  }

  .collection-title {
    font-size: 18px;
  }

  /* 收藏列表 - 移动端一行显示2个 */
  .collection-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  /* 卡片样式调整 */
  .collection-item {
    min-height: 240px;
  }

  .product-image-container {
    height: 130px;
  }

  .product-info-container {
    padding: 12px;
  }

  .product-name {
    font-size: 14px;
  }

  .collection-date {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .action-buttons {
    gap: 6px;
  }

  .view-detail-btn,
  .remove-collection-btn {
    padding: 6px 8px;
    font-size: 12px;
  }
}

/* 小屏幕设备 - 保持一行2个 */
@media (max-width: 480px) {
  /* 更小屏幕的响应式调整 */
  .user-header-section {
    padding: 20px 15px;
  }

  .collection-content-section {
    padding: 15px;
  }

  /* 保持双列布局 */
  .collection-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  /* 卡片样式进一步调整 */
  .collection-item {
    min-height: 220px;
  }

  .product-image-container {
    height: 110px;
  }

  .product-info-container {
    padding: 10px;
  }

  .product-name {
    font-size: 13px;
    margin-bottom: 8px;
  }

  .collection-date {
    font-size: 11px;
    margin-bottom: 10px;
  }

  .action-buttons {
    gap: 4px;
  }

  .view-detail-btn,
  .remove-collection-btn {
    padding: 5px 6px;
    font-size: 11px;
  }

  /* 空状态 */
  .empty-collection {
    padding: 40px 20px;
  }

  .empty-icon svg {
    width: 60px;
    height: 60px;
  }
}
</style>
