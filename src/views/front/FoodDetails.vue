<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-nav">
      <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link :to="{ name: 'product' }" class="breadcrumb-link">产品介绍</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link :to="{ name: 'food-details' }" class="breadcrumb-link">食品详情</router-link>
    </div>

    <!-- 产品详情容器 -->
    <div class="product-details-wrapper">
      <!-- 上部盒子 - 图文详情区域 -->
      <div class="detail-section">
        <h2 class="section-title">产品详情</h2>
        <div class="detail-content">
          <!-- 这里将显示从后台获取的HTML内容 -->
          <div class="rich-text">
            <h3>王殿佛跳墙 - 传统名菜的现代演绎</h3>
            <p>
              佛跳墙，又名满坛香、福寿全，是福建省福州市的一道特色名菜，属闽菜系。据传，该菜品是在清道光年间由福州聚春园菜馆老板郑春发研制出来的，又据费孝通先生记，发明此菜者乃一帮要饭的乞丐。
            </p>
            <p>
              佛跳墙通常选用鲍鱼、海参、鱼唇、牦牛皮胶、杏鲍菇、蹄筋、花菇、墨鱼、瑶柱、鹌鹑蛋等汇聚到一起，加入高汤和福建老酒，文火煨制而成。
            </p>

            <div class="detail-image">
              <img src="@/assets/fotiaoq.jpg" alt="王殿佛跳墙" class="w-100 rounded-lg shadow-md" />
            </div>

            <h4>营养价值</h4>
            <p>
              佛跳墙富含丰富的蛋白质、矿物质和维生素，具有美容养颜、增强免疫力的功效。此菜味道醇厚，营养丰富，是宴请宾客的首选佳肴。
            </p>

            <h4>食用建议</h4>
            <ul>
              <li>建议在食用前先热透，以充分释放食材的香气</li>
              <li>可搭配清淡的小菜和米饭食用</li>
              <li>建议在24小时内食用完毕，以保证最佳口感</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 下部盒子 - 属性列表区域 -->
      <div class="attributes-section">
        <h2 class="section-title">产品信息</h2>
        <div class="attributes-grid">
          <!-- 属性行 -->
          <div class="attribute-row">
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">产品名称</div>
                <div class="attribute-value">王殿佛跳墙</div>
              </div>
            </div>
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">规格</div>
                <div class="attribute-value">500g/罐</div>
              </div>
            </div>
          </div>

          <div class="attribute-row">
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">产地</div>
                <div class="attribute-value">
                  福建省福州市没办法就比较分布式框架包括技术比较耗费你法律零三零
                </div>
              </div>
            </div>
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">保质期</div>
                <div class="attribute-value">12个月</div>
              </div>
            </div>
          </div>

          <div class="attribute-row">
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">存储方式</div>
                <div class="attribute-value">-18℃冷冻保存</div>
              </div>
            </div>
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">主要原料</div>
                <div class="attribute-value">鲍鱼、海参、鱼唇、花菇等</div>
              </div>
            </div>
          </div>

          <div class="attribute-row">
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">品牌</div>
                <div class="attribute-value">王殿</div>
              </div>
            </div>
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">生产许可证</div>
                <div class="attribute-value">SC12235012100123</div>
              </div>
            </div>
          </div>

          <div class="attribute-row">
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">食用方法</div>
                <div class="attribute-value">加热即食</div>
              </div>
            </div>
            <div class="attribute-half">
              <div class="attribute-box">
                <div class="attribute-name">包装方式</div>
                <div class="attribute-value">真空罐装</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 收藏功能区域 -->
  <div class="favorite-section">
    <div class="favorite-container">
      <div class="favorite-button" @click="toggleFavorite">
        <img
          src="@/assets/beforecoll.svg"
          alt="收藏"
          class="favorite-icon before"
          :class="{ hidden: isFavorite }"
        />
        <img
          src="@/assets/aftercoll.svg"
          alt="已收藏"
          class="favorite-icon after"
          :class="{ hidden: !isFavorite }"
        />
        <span class="favorite-text">{{ isFavorite ? '已收藏' : '收藏商品' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 收藏状态管理
const isFavorite = ref(false)

// 切换收藏状态
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // 实际项目中这里会调用API保存收藏状态
  console.log('收藏状态:', isFavorite.value)
}

const route = useRoute()
const productId = ref(null)

onMounted(() => {
  // 页面加载时滚动到顶部
  window.scrollTo(0, 0)
  
  // 获取路由参数
  const id = route.query.id
  if (id) {
    productId.value = id
    console.log(`加载产品ID: ${productId.value}`)
    // 实际项目中这里会调用API获取产品详情
  }
})
</script>

<style scoped>
/* 面包屑导航样式 */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin: 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
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

.breadcrumb-current {
  color: #e34949;
  font-weight: 500;
}

/* 产品详情容器 */
.product-details-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 通用区块样式 */
.detail-section,
.attributes-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 30px;
}

/* 区块标题 */
.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

/* 图文详情样式 */
.rich-text {
  color: #666;
  line-height: 1.8;
}

.rich-text h3 {
  font-size: 18px;
  color: #333;
  margin: 24px 0 16px 0;
}

.rich-text h4 {
  font-size: 16px;
  color: #444;
  margin: 20px 0 12px 0;
}

.rich-text p {
  margin-bottom: 16px;
}

.rich-text ul {
  padding-left: 24px;
  margin-bottom: 16px;
}

.rich-text li {
  margin-bottom: 8px;
}

.detail-image {
  margin: 20px 0;
}

/* 属性列表样式 */
.attributes-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.attribute-row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.attribute-half {
  flex: 1;
  min-width: 280px;
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 16px 20px;
}

.attribute-box {
  display: flex;
  flex-wrap: wrap;
}

.attribute-name {
  flex: 0 0 100px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
  padding-right: 15px;
  box-sizing: border-box;
}

.attribute-value {
  flex: 1;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  min-width: 0; /* 允许内容换行 */
}

/* 响应式设计中调整属性盒子布局 */
@media (max-width: 768px) {
  .attribute-box {
    flex-direction: column;
  }

  .attribute-name {
    flex: 1;
    margin-bottom: 5px;
    padding-right: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .detail-section,
  .attributes-section {
    padding: 20px;
  }

  .section-title {
    font-size: 18px;
  }

  .attribute-row {
    gap: 15px;
  }

  .attribute-half {
    min-width: 100%;
    padding: 12px 16px;
  }

  .breadcrumb-nav {
    font-size: 12px;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }

  .rich-text h3 {
    font-size: 16px;
  }

  .rich-text h4 {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .detail-section,
  .attributes-section {
    padding: 15px;
  }

  .section-title {
    font-size: 16px;
    padding-bottom: 10px;
  }

  .attribute-name,
  .attribute-value {
    font-size: 13px;
  }
}

/* 收藏功能样式 */
.favorite-section {
  margin: 40px 0;
  padding: 20px 0;
  border-top: 1px solid #eee;
}

.favorite-container {
  display: flex;
  justify-content: center;
}

.favorite-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background-color: #fff5f5;
  border: 2px solid #e34949;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.favorite-button:hover {
  background-color: #ffe0e0;
  /* transform: translateY(-2px); */
  box-shadow: 0 4px 12px rgba(227, 73, 73, 0.25);
  border-color: #d13a3a;
}

.favorite-icon {
  width: 24px;
  height: 24px;
  transition: opacity 0.3s ease;
}

.favorite-icon.before {
  transition: opacity 0.3s ease;
}

.favorite-icon.after {
  position: absolute;
  left: 30px;
  transition: opacity 0.3s ease;
}

.favorite-icon.hidden {
  opacity: 0;
  transform: scale(0.95);
}

.favorite-button:hover .favorite-text {
  color: #d13a3a;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.favorite-button:hover .favorite-icon.before:not(.hidden) {
  transform: scale(1.1);
}

.favorite-button:hover .favorite-icon.after:not(.hidden) {
  transform: scale(1.1);
}

.favorite-text {
  font-size: 16px;
  font-weight: 600;
  color: #e34949;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .favorite-section {
    margin: 30px 0;
    padding: 15px 0;
  }

  .favorite-button {
    padding: 10px 24px;
  }

  .favorite-icon {
    width: 20px;
    height: 20px;
  }

  .favorite-text {
    font-size: 14px;
  }

  .favorite-icon.after {
    left: 24px;
  }

  .favorite-button:hover .favorite-text {
    color: #d13a3a;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 480px) {
  .favorite-button {
    padding: 8px 20px;
    gap: 8px;
  }

  .favorite-icon {
    width: 18px;
    height: 18px;
  }

  .favorite-text {
    font-size: 13px;
  }

  .favorite-icon.after {
    left: 20px;
  }

  .favorite-button:hover .favorite-text {
    color: #d13a3a;
  }
}
</style>
