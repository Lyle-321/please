<script setup></script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧品牌信息 -->
      <div class="login-brand">
        <h1 class="brand-title">万年贸易</h1>
        <p class="brand-subtitle">后台管理系统</p>
      </div>

      <!-- 右侧登录表单 -->
      <div class="login-form-wrapper">
        <div class="login-form-header">
          <h2 class="login-title">管理员登录</h2>
          <p class="login-subtitle">请输入您的账号和密码</p>
        </div>

        <form class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">账号</label>
            <div class="input-wrapper">
              <i class="input-icon"><img src="@/assets/adminimg/count.svg" alt="" /></i>
              <input type="text" id="username" class="form-input" placeholder="请输入管理员账号" />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">密码</label>
            <div class="input-wrapper">
              <i class="input-icon"><img src="@/assets/adminimg/password.svg" alt="" /></i>
              <input type="password" id="password" class="form-input" placeholder="请输入密码" />
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" class="checkbox" />
              <span class="checkbox-label">记住我</span>
            </label>
          </div>

          <button type="submit" class="login-button">登录</button>
        </form>

        <div class="login-footer">
          <p class="copyright">© 2025 万年贸易管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 登录页面基础样式 */
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 登录容器 */
.login-container {
  display: flex;
  width: 850px;
  max-width: 90%;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* 左侧品牌区域 */
.login-brand {
  width: 40%;
  background: linear-gradient(135deg, #4a58c2 0%, #6b46c1 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0 40px;
}

.brand-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
}

.brand-subtitle {
  font-size: 18px;
  opacity: 0.9;
  text-align: center;
  line-height: 1.4;
}

/* 右侧登录表单区域 */
.login-form-wrapper {
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 50px;
}

/* 表单头部 */
.login-form-header {
  margin-bottom: 30px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #666;
}

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-icon img {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
}

.form-input {
  width: 100%;
  height: 45px;
  padding: 0 15px 0 45px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #fafafa;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder {
  color: #999;
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 13px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  width: 16px;
  height: 16px;
  margin-right: 6px;
  cursor: pointer;
}

.checkbox-label {
  color: #666;
  cursor: pointer;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #4a58c2;
  text-decoration: underline;
}

/* 登录按钮 */
.login-button {
  width: 100%;
  height: 45px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

/* 表单底部 */
.login-footer {
  text-align: center;
  margin-top: auto;
}

.copyright {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    height: auto;
    max-width: 95%;
  }

  .login-brand {
    width: 100%;
    padding: 40px 20px;
    text-align: center;
  }

  .login-form-wrapper {
    width: 100%;
    padding: 30px 20px;
  }

  .brand-title {
    font-size: 28px;
  }

  .brand-subtitle {
    font-size: 16px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-form-wrapper {
  animation: fadeIn 0.6s ease-out;
}

.login-brand {
  animation: fadeIn 0.8s ease-out;
}

.form-group {
  animation: fadeIn 1s ease-out;
}
</style>
