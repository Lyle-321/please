<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getAllAdvertisements } from '@/api/Advertisement'

// 控制标签切换
const activeTab = ref(0) //默认选中王殿品牌产品
let autoSwitchTimer = null

// 资讯轮播相关数据和方法
const currentInfoSlide = ref(0)
let infoCarouselTimer = null

// 轮播图相关
const banners = ref([
  { id: 1, image: '@/assets/fotiaoq.jpg', title: '加载中...', description: '', linkUrl: '' },
])

// 合并onMounted钩子，避免重复
onMounted(async () => {
  // 加载广告数据
  try {
    const response = await getAllAdvertisements()
    if (response.code === '200' && response.data && response.data.length > 0) {
      // 筛选首页轮播图并转换数据格式

      const homeBanners = response.data
        .filter((item) => item.position === '首页')
        .map((item) => ({
          id: item.id,
          title: item.title || '轮播图',
          description: item.content || '',
          linkUrl: item.linkUrl ? item.linkUrl.replace(/`/g, '') : '', // 去除可能的反引号
          // API返回的数据没有图片，使用默认图片
          image: `@/assets/${item.id <= 3 ? ['fotiaoq.jpg', 'zongzi.jpg', 'ping.jpg'][item.id - 1] : 'fotiaoq.jpg'}`,
        }))

      // 如果有首页轮播图数据，则更新，否则保留默认数据
      if (homeBanners.length > 0) {
        banners.value = homeBanners
      }
      console.log('首页轮播图数据:', banners.value)
    }
  } catch (error) {
    console.error('获取广告数据失败:', error)
  }

  // 初始化Bootstrap轮播图
  setTimeout(() => {
    const carouselElement = document.getElementById('carouselExampleCaptions')
    if (carouselElement) {
      // 确保轮播图正确初始化并自动播放
      carouselElement.setAttribute('data-bs-interval', '3000') // 设置3秒切换一次
      carouselElement.setAttribute('data-bs-ride', 'carousel') // 自动播放

      // 手动启动轮播
      if (window.bootstrap && window.bootstrap.Carousel) {
        const carousel = new window.bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: 'carousel',
          wrap: true,
        })
        carousel.cycle() // 确保开始循环
      }
    }
  }, 100)

  // 开始资讯轮播自动播放
  startInfoCarousel()

  // 添加标签切换事件监听
  document.querySelectorAll('.info-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab')
      switchInfoTab(tabId)
    })
  })

  // 添加轮播控制事件监听
  const prevControl = document.querySelector('.info-carousel-control.prev')
  const nextControl = document.querySelector('.info-carousel-control.next')
  if (prevControl) prevControl.addEventListener('click', prevInfoSlide)
  if (nextControl) nextControl.addEventListener('click', nextInfoSlide)

  // 添加指示器点击事件
  document.querySelectorAll('.info-carousel-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToInfoSlide(index)
    })
  })

  // 开始标签自动切换
  startAutoSwitch()
})

onUnmounted(() => {
  // 清理定时器
  if (infoCarouselTimer) {
    clearInterval(infoCarouselTimer)
  }
  stopAutoSwitch()

  // 清理轮播图实例
  const carouselElement = document.getElementById('carouselExampleCaptions')
  if (carouselElement && window.bootstrap && window.bootstrap.Carousel.getInstance) {
    const carousel = window.bootstrap.Carousel.getInstance(carouselElement)
    if (carousel) {
      carousel.dispose()
    }
  }
})

// 切换资讯标签
const switchInfoTab = (tabId) => {
  // 移除所有标签的active状态
  document.querySelectorAll('.info-tab').forEach((tab) => {
    tab.classList.remove('active')
  })

  // 添加当前标签的active状态
  const activeTab = document.querySelector(`.info-tab[data-tab="${tabId}"]`)
  if (activeTab) {
    activeTab.classList.add('active')
  }

  // 隐藏所有内容面板
  document.querySelectorAll('.info-panel').forEach((panel) => {
    panel.classList.add('hidden')
  })

  // 显示当前内容面板
  const activePanel = document.getElementById(`${tabId}-panel`)
  if (activePanel) {
    activePanel.classList.remove('hidden')
  }
}

// 资讯轮播控制方法
const prevInfoSlide = () => {
  const slides = document.querySelectorAll('.info-carousel-item')
  currentInfoSlide.value = (currentInfoSlide.value - 1 + slides.length) % slides.length
  updateInfoCarouselDisplay()
}

const nextInfoSlide = () => {
  const slides = document.querySelectorAll('.info-carousel-item')
  currentInfoSlide.value = (currentInfoSlide.value + 1) % slides.length
  updateInfoCarouselDisplay()
}

const goToInfoSlide = (index) => {
  currentInfoSlide.value = index
  updateInfoCarouselDisplay()
}

// 更新资讯轮播显示
const updateInfoCarouselDisplay = () => {
  const slides = document.querySelectorAll('.info-carousel-item')
  const dots = document.querySelectorAll('.info-carousel-dot')

  // 更新幻灯片显示
  slides.forEach((slide, index) => {
    if (index === currentInfoSlide.value) {
      slide.classList.add('active')
    } else {
      slide.classList.remove('active')
    }
  })

  // 更新指示器状态
  dots.forEach((dot, index) => {
    if (index === currentInfoSlide.value) {
      dot.classList.add('active')
    } else {
      dot.classList.remove('active')
    }
  })
}

// 开始资讯轮播自动播放
const startInfoCarousel = () => {
  infoCarouselTimer = setInterval(() => {
    nextInfoSlide()
  }, 5000) // 5秒切换一次
}

// 切换到下一个标签
const switchToNextTab = () => {
  activeTab.value = (activeTab.value + 1) % 3 // 循环切换0,1,2
}

// 开始自动切换
const startAutoSwitch = () => {
  // 清除可能存在的定时器
  if (autoSwitchTimer) {
    clearInterval(autoSwitchTimer)
  }
  // 设置新的定时器，每5秒切换一次
  autoSwitchTimer = setInterval(switchToNextTab, 5000)
}

// 停止自动切换
const stopAutoSwitch = () => {
  if (autoSwitchTimer) {
    clearInterval(autoSwitchTimer)
    autoSwitchTimer = null
  }
}

// 点击标签处理函数
const handleTabClick = (index) => {
  stopAutoSwitch() // 停止自动切换
  activeTab.value = index // 更新选中的标签
  startAutoSwitch() // 重新开始自动切换（可选：如果希望点击后重新计时）
}
</script>

<template>
  <!-- 轮播图 -->
  <div class="banner">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div class="carousel-indicators">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0"
          :aria-label="`Slide ${index + 1}`"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <a v-if="banner.linkUrl" :href="banner.linkUrl" target="_blank" class="carousel-link">
            <img :src="banner.image" class="d-block w-100" :alt="banner.title" />
          </a>
          <img v-else :src="banner.image" class="d-block w-100" :alt="banner.title" />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ banner.title }}</h5>
            <p>{{ banner.description }}</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- 新品上市模块 -->

  <div class="container">
    <div class="new">
      <div class="re-head">
        <h2>新品上市</h2>
      </div>
      <!-- 产品展示 -->
      <div class="recom">
        <!-- 左侧选择按钮切换 -->
        <div class="tap">
          <div class="box" :class="{ active: activeTab === 0 }" @click="handleTabClick(0)">
            王殿品牌
          </div>
          <div class="box" :class="{ active: activeTab === 1 }" @click="handleTabClick(1)">
            百姓粽
          </div>
          <div class="box" :class="{ active: activeTab === 2 }" @click="handleTabClick(2)">
            铭记家点心
          </div>
        </div>
        <!-- 右侧产品展示 -->
        <div class="show">
          <!-- 王殿品牌产品 -->
          <div class="item" v-if="activeTab === 0">
            <div class="card">
              <img src="@/assets/fotiaoq.jpg" alt="王殿品牌佛跳墙" />
              <h3>王殿佛跳墙</h3>
              <p>
                坛启荤香飘四邻，佛闻弃禅跳墙来，闽菜魁首噶发嘎嘎发卡号发客户付款哈开发哈克回复。
              </p>
            </div>
            <div class="card">
              <img src="@/assets/fotiaoq.jpg" alt="王殿品牌珍品佛跳墙" />
              <h3>王殿珍品佛跳墙</h3>
              <p>甄选多种山珍海味，传统工艺精心熬制。</p>
            </div>
            <div class="card">
              <img src="@/assets/fotiaoq.jpg" alt="王殿品牌经典佛跳墙" />
              <h3>王殿经典佛跳墙</h3>
              <p>传承百年配方，匠心制作，地道福州风味。</p>
            </div>
          </div>

          <!-- 百姓粽产品 -->
          <div class="item" v-else-if="activeTab === 1">
            <div class="card">
              <img src="@/assets/zongzi.jpg" alt="百姓粽鲜肉粽" />
              <h3>百姓鲜肉粽</h3>
              <p>精选糯米，新鲜五花肉，传统工艺制作。</p>
            </div>
            <div class="card">
              <img src="@/assets/zongzi.jpg" alt="百姓粽豆沙粽" />
              <h3>百姓豆沙粽</h3>
              <p>香甜红豆沙，软糯口感，甜而不腻。</p>
            </div>
            <div class="card">
              <img src="@/assets/zongzi.jpg" alt="百姓粽咸蛋黄粽" />
              <h3>百姓咸蛋黄粽</h3>
              <p>咸香可口，蛋黄流油，风味独特。</p>
            </div>
          </div>

          <!-- remember家点心产品 -->
          <div class="item" v-else-if="activeTab === 2">
            <div class="card">
              <img src="@/assets/ping.jpg" alt="铭记家奶黄包" />
              <h3>铭记家奶黄包</h3>
              <p>软糯外皮，香甜奶黄馅，口感丰富。</p>
            </div>
            <div class="card">
              <img src="@/assets/ping.jpg" alt="铭记家流沙包" />
              <h3>铭记家流沙包</h3>
              <p>口感绵密，咸甜适中，经典粤式点心。</p>
            </div>
            <div class="card">
              <img src="@/assets/ping.jpg" alt="铭记家叉烧包" />
              <h3>铭记家叉烧包</h3> 
              <p>精选叉烧，肉质鲜嫩，风味十足。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 资讯板块 -->
  <div class="container">
    <div class="re-head">
      <h2>资讯动态</h2>
    </div>
    <div class="info">
      <!-- 左侧三张图片轮播区域 -->
      <div class="left-banner">
        <div id="infoCarousel" class="info-carousel">
          <div class="info-carousel-inner">
            <div class="info-carousel-item active">
              <img src="@/assets/fotiaoq.jpg" class="info-carousel-img" alt="资讯轮播图1" />
              <div class="info-carousel-caption">
                <p>传统美食文化传承与创新</p>
              </div>
            </div>
            <div class="info-carousel-item">
              <img src="@/assets/zongzi.jpg" class="info-carousel-img" alt="资讯轮播图2" />
              <div class="info-carousel-caption">
                <p>百姓粽系列新品上市</p>
              </div>
            </div>
            <div class="info-carousel-item">
              <img src="@/assets/ping.jpg" class="info-carousel-img" alt="资讯轮播图3" />
              <div class="info-carousel-caption">
                <p>remember家点心品牌推广活动</p>
              </div>
            </div>
          </div>
          <button class="info-carousel-control prev" data-info-slide="prev">
            <span class="info-carousel-control-icon">&lt;</span>
          </button>
          <button class="info-carousel-control next" data-info-slide="next">
            <span class="info-carousel-control-icon">&gt;</span>
          </button>
          <div class="info-carousel-indicators">
            <button class="info-carousel-dot active" data-info-slide-to="0"></button>
            <button class="info-carousel-dot" data-info-slide-to="1"></button>
            <button class="info-carousel-dot" data-info-slide-to="2"></button>
          </div>
        </div>
      </div>
      <!-- 右侧信息公告 -->
      <div class="right-info">
        <!-- 头部三个切换按钮 -->
        <div class="info-tabs">
          <button class="info-tab active" data-tab="news">食品行业新闻</button>
          <button class="info-tab" data-tab="brand">品牌动态</button>
          <button class="info-tab" data-tab="seasonal">节令推荐</button>
        </div>
        <!-- 信息内容区域 -->
        <div class="info-content">
          <!-- 行业新闻内容 -->
          <div class="info-panel" id="news-panel">
            <div class="info-item">
              <span class="info-title">2024年中国食品行业发展趋势分析</span>
              <span class="info-date">2024-06-15</span>
            </div>
            <div class="info-item">
              <span class="info-title">传统美食如何走向国际化市场</span>
              <span class="info-date">2024-06-10</span>
            </div>
            <div class="info-item">
              <span class="info-title">食品安全监管新政策解读</span>
              <span class="info-date">2024-06-05</span>
            </div>
            <div class="info-item">
              <span class="info-title">食品科技创新推动产业升级</span>
              <span class="info-date">2024-05-28</span>
            </div>
            <div class="info-item">
              <span class="info-title">消费者对健康食品需求持续增长</span>
              <span class="info-date">2024-05-20</span>
            </div>
          </div>
          <!-- 品牌动态内容 -->
          <div class="info-panel hidden" id="brand-panel">
            <div class="info-item">
              <span class="info-title"
                >王殿品牌荣获年度食品安全示范企业称号部分是笔记本上课v基本数据</span
              >
              <span class="info-date">2024-06-18</span>
            </div>
            <div class="info-item">
              <span class="info-title">百姓粽系列产品销量突破历史新高</span>
              <span class="info-date">2024-06-12</span>
            </div>
            <div class="info-item">
              <span class="info-title">remember家点心全国门店突破200家</span>
              <span class="info-date">2024-06-08</span>
            </div>
            <div class="info-item">
              <span class="info-title">公司成功举办2024新品发布会</span>
              <span class="info-date">2024-05-30</span>
            </div>
            <div class="info-item">
              <span class="info-title">品牌战略升级发布会圆满成功</span>
              <span class="info-date">2024-05-25</span>
            </div>
          </div>
          <!-- 节令推荐内容 -->
          <div class="info-panel hidden" id="seasonal-panel">
            <div class="info-item">
              <span class="info-title">端午节粽子选购指南，让您的端午更有味道</span>
              <span class="info-date">2024-06-16</span>
            </div>
            <div class="info-item">
              <span class="info-title">夏季清凉点心推荐，解暑又美味</span>
              <span class="info-date">2024-06-14</span>
            </div>
            <div class="info-item">
              <span class="info-title">六月应季食材大赏，新鲜营养又健康</span>
              <span class="info-date">2024-06-02</span>
            </div>
            <div class="info-item">
              <span class="info-title">梅雨季节如何保存传统点心</span>
              <span class="info-date">2024-05-29</span>
            </div>
            <div class="info-item">
              <span class="info-title">初夏养生美食推荐，调理身体好时机</span>
              <span class="info-date">2024-05-22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  /* 基础高度设置，确保在各种设备上有良好的显示效果 */
  height: 80vh;
  /* 限制最大高度，避免在大屏幕上过高 */
  max-height: 800px;
  /* 确保轮播图容器填满父容器 */
  width: 100%;
  overflow: hidden;
  /* margin-top: 56px; */
}

#carouselExampleCaptions {
  /* 确保轮播图组件填满整个banner容器 */
  height: 100%;
  width: 100%;
}

.carousel-inner {
  /* 确保轮播内容区域填满轮播容器 */
  height: 100%;
  width: 100%;
}

.carousel-item {
  /* 确保每个轮播项都填满整个内容区域 */
  height: 100%;
  width: 100%;
}

.carousel-item img {
  /* 使图片覆盖整个轮播项，同时保持宽高比 */
  height: 100%;
  object-fit: cover;
  /* 移除Bootstrap默认的宽度限制，让图片完全填满 */
  width: 100% !important;
}

/* 响应式设计，在较小的屏幕上调整高度 */
@media (max-width: 768px) {
  .banner {
    height: 50vh;
    max-height: 400px;
  }
}

@media (max-width: 576px) {
  .banner {
    height: 40vh;
    max-height: 300px;
  }
}

/* 推荐产品 */
.recommend {
  padding: 8rem 0;
  /* 黄色 */
}
.brand-tabs {
  margin-top: 2rem;
}

.section-news .card-body a:hover h5 {
  color: var(--bs-primary);
}
.cards {
  background-color: #ffefd5;
}

.heigh {
  height: 10rem;
}
.more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  font-size: 1.2rem;
}

.more p {
  margin: 0;
  display: inline-block;
  vertical-align: middle;
}

.more i {
  margin-left: 0.5rem;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.9em; /* 调整图标大小与文字更协调 */
}

/* 产品卡片图片固定大小和响应式设计 */
.product-card-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 1199.98px) {
  .product-card-img {
    height: 220px;
  }
}

@media (max-width: 991.98px) {
  .product-card-img {
    height: 200px;
  }
}

@media (max-width: 767.98px) {
  .product-card-img {
    height: 180px;
  }
}

@media (max-width: 575.98px) {
  .product-card-img {
    height: 160px;
  }
}

/* 重新tap样式 */
.recom {
  border: 0.1px solid #ed9c1b;
  display: flex;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
}
.tap {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 22%;
  min-height: 450px;
  border-right: 1px solid #ed9c1b;
}
.show {
  width: 78%;
  min-height: 450px;
  padding: 30px;
  box-sizing: border-box;
}
.box {
  cursor: pointer;
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 1.3rem;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  background-color: white;
}
.box:last-child {
  border-bottom: none;
}
.box:hover {
  background-color: #f8f8f8;
}
.box.active {
  background-color: #fff5eb;
  color: #ed9c1b;
  font-weight: bold;
}
.box.active::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background-color: #ed9c1b;
}
.item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.card {
  flex: 0 0 calc(32% - 15px);
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  margin: 0 8px;
}
.card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 15px;
}

.card p {
  /* 限制最多显示2行，添加多浏览器兼容性支持 */
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  height: 3em; /* 约等于两行文字高度 */
  margin-bottom: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .recom {
    flex-direction: column;
    max-width: 100%;
    padding: 5px;
  }
  .tap {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #ed9c1b;
  }
  .show {
    width: 100%;
    min-height: auto;
    padding: 20px;
  }
  .box {
    padding: 15px 0;
    font-size: 1.1rem;
  }
  .card {
    margin: 0 5px 15px 5px;
    padding: 15px;
  }
  .card img {
    height: 180px;
  }
}

/* 992px以下断点 - 左侧标签移到上方，卡片一行显示一个 */
@media (max-width: 992px) {
  .recom {
    flex-direction: column;
    max-width: 100%;
  }
  .tap {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #ed9c1b;
    flex-direction: row;
    justify-content: space-between;
  }
  .show {
    width: 100%;
    padding: 25px;
  }
  .box {
    flex: 1;
    border-bottom: none;
    border-right: 1px solid #f0f0f0;
    padding: 1.2rem 1rem;
  }
  .box:last-child {
    border-right: none;
  }
  .item {
    flex-direction: column;
    gap: 25px;
  }
  .card {
    width: 100%;
    margin-bottom: 0;
    margin: 0;
  }
}

/* 确保在中等屏幕上仍保持左右布局 */
@media (min-width: 993px) {
  .recom {
    flex-direction: row;
  }
  .tap {
    width: 22%;
    min-height: 450px;
    border-right: 1px solid #ed9c1b;
    flex-direction: column;
  }
  .show {
    width: 78%;
    padding: 30px;
  }
  .item {
    flex-direction: row;
    justify-content: space-between;
  }
  .card {
    flex: 0 0 calc(32% - 15px);
    margin: 0 8px;
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .recom {
    max-width: 95%;
  }
  .show {
    padding: 20px;
  }
  .card {
    margin: 0 5px;
  }
  .card img {
    height: 200px;
  }
}

/* 资讯动态模块样式 */
.info {
  display: flex;
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

/* 左侧轮播图样式 */
.left-banner {
  flex: 0 0 45%;
  position: relative;
  width: 480px;
  height: 400px;
  overflow: hidden;
}

.info-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.info-carousel-inner {
  position: relative;
  height: 100%;
  transition: transform 0.5s ease;
}

.info-carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.info-carousel-item.active {
  opacity: 1;
  position: relative;
}

.info-carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.info-carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px 20px;
  font-size: 14px;
}

.info-carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  opacity: 0;
}

.left-banner:hover .info-carousel-control {
  opacity: 1;
}

.info-carousel-control:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.info-carousel-control.prev {
  left: 15px;
  transform: translateY(-50%);
}

.info-carousel-control.next {
  right: 15px;
  transform: translateY(-50%);
}

.info-carousel-control-icon {
  font-weight: bold;
}

.info-carousel-indicators {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.info-carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.info-carousel-dot.active,
.info-carousel-dot:hover {
  background: #ed9c1b;
  transform: scale(1.2);
}

/* 右侧信息公告样式 */
.right-info {
  flex: 0 0 55%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.info-tabs {
  display: flex;
  border-bottom: 2px solid #ed9c1b;
  margin-bottom: 20px;
}

.info-tab {
  flex: 1;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease;
  position: relative;
}

.info-tab:hover {
  color: #ed9c1b;
}

.info-tab.active {
  color: #ed9c1b;
  font-weight: bold;
}

.info-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ed9c1b;
}

/* 信息列表样式 */
.info-content {
  flex: 1;
  overflow-y: auto;
  cursor: pointer;
}

.info-panel {
  display: block;
}

.info-panel.hidden {
  display: none;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item:hover {
  background: #f9f9f9;
}

.info-title {
  flex: 1;
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  padding-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
  /* 设置最大宽度，大约显示15个汉字 */
  max-width: 300px;
}

.info-item:hover .info-title {
  color: #ed9c1b;
}

.info-date {
  color: #999;
  font-size: 14px;
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info {
    flex-direction: column;
  }

  .left-banner {
    flex: none;
    width: 100%;
    height: 250px;
    overflow: hidden;
  }

  .right-info {
    flex: none;
    padding: 15px;
  }

  .info-tabs {
    margin-bottom: 15px;
  }

  .info-tab {
    padding: 10px 12px;
    font-size: 14px;
  }

  .info-item {
    padding: 12px 0;
  }

  .info-title {
    font-size: 14px;
    /* 设置最大宽度，大约显示15个汉字 */
    max-width: 150px;
  }

  .info-date {
    font-size: 13px;
  }

  .info-carousel-control {
    width: 35px;
    height: 35px;
    font-size: 18px;
    opacity: 0;
  }

  .left-banner:hover .info-carousel-control {
    opacity: 1;
  }

  .info-carousel-caption {
    padding: 10px 15px;
    font-size: 14px;
  }

  .info-carousel-indicators {
    bottom: 50px;
  }

  .info-carousel-dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 0;
  }

  .info-date {
    margin-top: 5px;
  }

  .info-tabs {
    flex-direction: column;
    border-bottom: none;
  }

  .info-tab {
    border-bottom: 1px solid #eee;
    padding: 12px;
  }

  .info-tab.active::after {
    display: none;
  }

  .info-carousel-control {
    width: 30px;
    height: 30px;
    font-size: 16px;
    opacity: 0;
  }

  .left-banner:hover .info-carousel-control {
    opacity: 1;
  }

  .info-carousel-caption {
    padding: 8px 12px;
    font-size: 13px;
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .left-banner {
    flex: 0 0 40%;
    width: 320px;
    height: 350px;
    overflow: hidden;
  }

  .right-info {
    flex: 0 0 60%;
    padding: 15px;
  }
}
.re-head {
  margin-top: 8rem;
  margin-bottom: 4rem;
  text-align: center;
}
</style>

/* 添加轮播图链接样式 */ .carousel-link { display: block; width: 100%; height: 100%; }
