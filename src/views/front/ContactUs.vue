<script setup></script>

<template>
  <div class="contact-us-container">
    <!-- 面包屑导航 -->
    <div class="container py-4">
      <div class="breadcrumb-nav">
        <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
        <span class="breadcrumb-separator">/</span>
        <router-link :to="{ name: 'contact' }" class="breadcrumb-link">联系我们</router-link>
      </div>
    </div>

    <div class="container py-8">
      <!-- 页面标题 -->
      <h1 class="page-title text-3xl font-bold text-center mb-12">联系我们</h1>

      <!-- 联系信息区域 -->
      <div class="contact-content">
        <!-- 公司名称 -->
        <div class="contact-section company-name-section">
          <h2 class="section-title">万年贸易有限公司</h2>
          <div class="decorative-line"></div>
        </div>

        <!-- 地址信息 -->
        <div class="contact-info-grid">
          <!-- 办公地址 -->
          <div class="contact-info-item">
            <div class="info-icon">
              <img style="width: 3rem; height: 3rem" src="@/assets/build.svg" alt="" />
            </div>
            <div class="info-content">
              <h3 class="info-title">办公地址</h3>
              <p class="info-text">上海市浦东新区张江高科技园区博云路2号浦软大厦11层</p>
            </div>
          </div>

          <!-- 提货地址 -->
          <div class="contact-info-item">
            <div class="info-icon">
              <img style="width: 3rem; height: 3rem" src="@/assets/car.svg" alt="" />
            </div>
            <div class="info-content">
              <h3 class="info-title">提货地址</h3>
              <p class="info-text">上海市嘉定区江桥镇金园五路123号物流中心B区</p>
            </div>
          </div>

          <!-- 联络人 -->
          <div class="contact-info-item">
            <div class="info-icon">
              <img style="width: 2.5rem; height: 2.5rem" src="@/assets/people.svg" alt="" />
            </div>
            <div class="info-content">
              <h3 class="info-title">联络人</h3>
              <p class="info-text">张先生</p>
            </div>
          </div>

          <!-- 电话 -->
          <div class="contact-info-item">
            <div class="info-icon">
              <img style="width: 2.5rem; height: 2.5rem" src="@/assets/phone.svg" alt="" />
            </div>
            <div class="info-content">
              <h3 class="info-title">电话</h3>
              <p class="info-text"><a href="tel:+862158888888">+86 21-5888-8888</a></p>
            </div>
          </div>

          <!-- 邮箱 -->
          <div class="contact-info-item">
            <div class="info-icon">
              <img style="width: 2.5rem; height: 2.5rem" src="@/assets/email.svg" alt="" />
            </div>
            <div class="info-content">
              <h3 class="info-title">邮箱</h3>
              <p class="info-text">
                <a href="mailto:info@wanniantrade.com">info@wanniantrade.com</a>
              </p>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="contact-info-item">
            <div class="info-icon">
              <img style="width: 2.5rem; height: 2.5rem" src="@/assets/message.svg" alt="" />
            </div>
            <div class="info-content">
              <h3 class="info-title">WhatsApp</h3>
              <p class="info-text">
                <a href="https://wa.me/8613800138000" target="_blank">+86 138-0013-8000</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面容器样式 */
.contact-us-container {
  min-height: 80vh;
  background-color: #fafafa;
}

/* 页面标题样式 */
.page-title {
  color: #333;
  position: relative;
  display: inline-block;
  margin-bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
}

/* 公司名称区域样式 */
.company-name-section {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title {
  font-size: 2.2rem;
  color: #e34949;
  margin-bottom: 1rem;
  font-weight: bold;
}

.decorative-line {
  width: 100px;
  height: 3px;
  background-color: #e34949;
  margin: 0 auto;
  border-radius: 1.5px;
}

/* 联系信息网格布局 */
.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* 单个联系信息项样式 */
.contact-info-item {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  padding: 1.5rem;
  border-left: 4px solid #e34949;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 移除hover效果 */

.info-icon {
  font-size: 2rem;
  margin-right: 1rem;
  color: #e34949;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.info-text {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

.info-text a {
  color: #e34949;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-text a:hover {
  color: #c23a3a;
  text-decoration: underline;
}

/* 联系表单样式 */
.contact-form-section {
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  padding: 2rem;
  border-left: 4px solid #e34949;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.contact-form {
  max-width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e34949;
  box-shadow: 0 0 0 2px rgba(227, 73, 73, 0.1);
}

.submit-button {
  background-color: #e34949;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.submit-button:hover {
  background-color: #c23a3a;
  transform: translateY(-2px);
}

/* 地图区域样式 */
.map-section {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  padding: 2rem;
  border-left: 4px solid #e34949;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.map-title {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.map-placeholder {
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.2rem;
}

.map-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .contact-info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .contact-info-item,
  .contact-form-section,
  .map-section {
    padding: 1.2rem;
  }

  .info-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .map-placeholder {
    height: 200px;
  }

  .map-icon {
    font-size: 2rem;
  }
}
</style>
