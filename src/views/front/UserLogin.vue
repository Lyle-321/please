<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单状态
const activeTab = ref('login') // 'login' 或 'register'
const showPassword = ref(false)
const showRegisterPassword = ref(false)
const isSubmitting = ref(false)

// 登录表单数据
const loginForm = reactive({
  phone: '',
  password: '',
  remember: false,
})

// 注册表单数据
const registerForm = reactive({
  phone: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

// 错误信息
const errors = reactive({
  loginPhone: '',
  loginPassword: '',
  registerPhone: '',
  registerPassword: '',
  registerConfirmPassword: '',
  registerAgree: '',
})

// 切换登录/注册标签
const switchTab = (tab) => {
  activeTab.value = tab
  // 清除错误信息
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleRegisterPasswordVisibility = () => {
  showRegisterPassword.value = !showRegisterPassword.value
}

// 手机号验证
const validatePhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// 密码验证
const validatePassword = (password) => {
  return password.length >= 6 && password.length <= 20
}

// 验证登录表单
const validateLoginForm = () => {
  let isValid = true

  // 清除之前的错误
  errors.loginPhone = ''
  errors.loginPassword = ''

  // 验证手机号
  if (!loginForm.phone) {
    errors.loginPhone = '请输入手机号'
    isValid = false
  } else if (!validatePhone(loginForm.phone)) {
    errors.loginPhone = '请输入正确的手机号'
    isValid = false
  }

  // 验证密码
  if (!loginForm.password) {
    errors.loginPassword = '请输入密码'
    isValid = false
  } else if (!validatePassword(loginForm.password)) {
    errors.loginPassword = '密码长度应为6-20位'
    isValid = false
  }

  return isValid
}

// 验证注册表单
const validateRegisterForm = () => {
  let isValid = true

  // 清除之前的错误
  errors.registerPhone = ''
  errors.registerPassword = ''
  errors.registerConfirmPassword = ''
  errors.registerAgree = ''

  // 验证手机号
  if (!registerForm.phone) {
    errors.registerPhone = '请输入手机号'
    isValid = false
  } else if (!validatePhone(registerForm.phone)) {
    errors.registerPhone = '请输入正确的手机号'
    isValid = false
  }

  // 验证密码
  if (!registerForm.password) {
    errors.registerPassword = '请设置密码'
    isValid = false
  } else if (!validatePassword(registerForm.password)) {
    errors.registerPassword = '密码长度应为6-20位'
    isValid = false
  }

  // 验证确认密码
  if (!registerForm.confirmPassword) {
    errors.registerConfirmPassword = '请确认密码'
    isValid = false
  } else if (registerForm.confirmPassword !== registerForm.password) {
    errors.registerConfirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  // 验证用户协议
  if (!registerForm.agree) {
    errors.registerAgree = '请阅读并同意用户协议和隐私政策'
    isValid = false
  }

  return isValid
}

// 处理登录
const handleLogin = async () => {
  // 验证表单
  if (!validateLoginForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // 模拟登录请求
    console.log('登录请求:', loginForm)

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 登录成功
    console.log('登录成功')

    // 存储用户信息（实际项目中应使用localStorage或Cookie）
    if (loginForm.remember) {
      // 记住登录状态
      console.log('记住登录状态')
    }

    // 跳转到首页或之前的页面
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请检查手机号和密码是否正确')
  } finally {
    isSubmitting.value = false
  }
}

// 处理注册
const handleRegister = async () => {
  // 验证表单
  if (!validateRegisterForm()) {
    return
  }

  // 单独再次验证手机号，确保只有正确的手机号才可以注册
  if (!validatePhone(registerForm.phone)) {
    errors.registerPhone = '请输入正确的手机号'
    return
  }

  isSubmitting.value = true

  try {
    // 模拟注册请求
    console.log('注册请求:', registerForm)

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 注册成功
    console.log('注册成功')

    // 提示注册成功
    alert('注册成功，请登录')

    // 切换到登录页
    switchTab('login')

    // 填充手机号
    loginForm.phone = registerForm.phone
  } catch (error) {
    console.error('注册失败:', error)
    alert('注册失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}

// 组件卸载时清理
import { onUnmounted } from 'vue'
onUnmounted(() => {
  // 清理资源
})
</script>

<template>
  <div class="login-container">
    <!-- 登录主内容区 -->
    <div class="login-content">
      <!-- 品牌信息 -->
      <div class="brand-section">
        <h1 class="brand-title">万年贸易</h1>
      </div>

      <!-- 表单切换标签 -->
      <div class="form-tabs">
        <div
          class="tab-item"
          :class="{ active: activeTab === 'login' }"
          @click="switchTab('login')"
        >
          登录
        </div>
        <div
          class="tab-item"
          :class="{ active: activeTab === 'register' }"
          @click="switchTab('register')"
        >
          注册
        </div>
      </div>

      <!-- 登录表单 -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="login-form">
        <!-- 手机号 -->
        <div class="form-group">
          <div class="input-wrapper">
            <span class="input-icon"
              ><img class="icon" src="@/assets/adminimg/count.svg" alt=""
            /></span>
            <input
              type="tel"
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              maxlength="11"
              class="form-input"
              :class="{ error: errors.loginPhone }"
            />
          </div>
          <div v-if="errors.loginPhone" class="error-message">{{ errors.loginPhone }}</div>
        </div>

        <!-- 密码登录 -->
        <div class="form-group">
          <div class="input-wrapper">
            <span class="input-icon"
              ><img class="icon" src="@/assets/adminimg/password.svg" alt=""
            /></span>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="loginForm.password"
              placeholder="请输入密码"
              class="form-input"
              :class="{ error: errors.loginPassword }"
            />
            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
              <img
                v-if="showPassword"
                class="icon"
                src="@/assets/showpassword.svg"
                alt="显示密码"
              />
              <img v-else class="icon" src="@/assets/hidepassword.svg" alt="隐藏密码" />
            </button>
          </div>
          <div v-if="errors.loginPassword" class="error-message">{{ errors.loginPassword }}</div>
        </div>

        <!-- 登录选项 -->
        <div class="login-options">
          <label class="remember-me">
            <input type="checkbox" v-model="loginForm.remember" />
            <span class="checkbox-label">记住我</span>
          </label>
        </div>

        <!-- 登录按钮 -->
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 注册表单 -->
      <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="register-form">
        <!-- 手机号 -->
        <div class="form-group">
          <div class="input-wrapper">
            <span class="input-icon"
              ><img class="icon" src="@/assets/adminimg/count.svg" alt=""
            /></span>
            <input
              type="tel"
              v-model="registerForm.phone"
              placeholder="请输入手机号"
              maxlength="11"
              class="form-input"
              :class="{ error: errors.registerPhone }"
            />
          </div>
          <div v-if="errors.registerPhone" class="error-message">{{ errors.registerPhone }}</div>
        </div>

        <!-- 设置密码 -->
        <div class="form-group">
          <div class="input-wrapper">
            <span class="input-icon"
              ><img class="icon" src="@/assets/adminimg/password.svg" alt=""
            /></span>
            <input
              :type="showRegisterPassword ? 'text' : 'password'"
              v-model="registerForm.password"
              placeholder="请设置密码（6-20位字母、数字或符号）"
              class="form-input"
              :class="{ error: errors.registerPassword }"
            />
            <button type="button" class="toggle-password" @click="toggleRegisterPasswordVisibility">
              <img
                v-if="showRegisterPassword"
                class="icon"
                src="@/assets/showpassword.svg"
                alt="显示密码"
              />
              <img v-else class="icon" src="@/assets/hidepassword.svg" alt="隐藏密码" />
            </button>
          </div>
          <div v-if="errors.registerPassword" class="error-message">
            {{ errors.registerPassword }}
          </div>
        </div>

        <!-- 确认密码 -->
        <div class="form-group">
          <div class="input-wrapper">
            <span class="input-icon"
              ><img class="icon" src="@/assets/adminimg/password.svg" alt=""
            /></span>
            <input
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="请确认密码"
              class="form-input"
              :class="{ error: errors.registerConfirmPassword }"
            />
          </div>
          <div v-if="errors.registerConfirmPassword" class="error-message">
            {{ errors.registerConfirmPassword }}
          </div>
        </div>

        <!-- 注册按钮 -->
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? '注册中...' : '注册' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式 */
.login-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  background-image: url('@/assets/logbg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 登录内容区 */
.login-content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 32px;
  width: 100%;
  max-width: 560px;
  border: 1px solid rgba(233, 236, 239, 0.8);
}

/* 品牌信息 */
.brand-section {
  text-align: center;
  margin-bottom: 30px;
}

.brand-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
}

.brand-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 表单标签切换 */
.form-tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.3s ease;
  position: relative;
}

.tab-item:hover {
  color: #333;
}

.tab-item.active {
  color: #ff4d4f;
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff4d4f;
}

/* 表单样式 */
.login-form,
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 0 16px;
  height: 48px;
  transition: all 0.3s ease;
}

.input-wrapper:hover {
  border-color: #ff7875;
}

.input-wrapper:focus-within {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}

.input-wrapper.error {
  border-color: #ff4d4f;
}

.input-wrapper.error:focus-within {
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}

.input-wrapper.verification {
  padding-right: 110px;
}

.input-icon {
  font-size: 18px;
  margin-right: 12px;
  color: #999;
}

.form-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  height: 100%;
}

.form-input::placeholder {
  color: #bfbfbf;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  color: #999;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #ff4d4f;
}

.send-code-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 90px;
}

.send-code-btn:hover:not(:disabled) {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.send-code-btn:disabled {
  cursor: not-allowed;
  background-color: #f5f5f5;
  color: #bfbfbf;
}

/* 登录方式切换 */
.login-method-switch {
  display: flex;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 2px;
  align-self: flex-start;
}

.method-tab {
  padding: 6px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.method-tab.active {
  background-color: white;
  color: #ff4d4f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 错误信息 */
.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 6px;
  line-height: 1.4;
}

.agreement-error {
  margin-top: 10px;
}

/* 登录选项 */
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.remember-me,
.agreement-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.remember-me input,
.agreement-checkbox input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-label {
  cursor: pointer;
}

.forgot-password {
  color: #ff4d4f;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #ff7875;
  text-decoration: underline;
}

/* 用户协议 */
.agreement {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.agreement a {
  color: #ff4d4f;
  text-decoration: none;
}

.agreement a:hover {
  text-decoration: underline;
}

/* 提交按钮 */
.submit-btn {
  height: 48px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #ff7875;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
}

.submit-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 底部信息 */
.login-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.login-footer p {
  margin: 0;
  font-size: 14px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-content {
    padding: 24px 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }

  .brand-title {
    font-size: 24px;
  }

  .brand-subtitle {
    font-size: 14px;
  }

  .input-wrapper {
    height: 44px;
  }

  .form-input {
    font-size: 15px;
  }

  .submit-btn {
    height: 44px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 15px;
  }

  .login-content {
    padding: 20px 16px;
  }

  .brand-title {
    font-size: 22px;
  }

  .form-tabs {
    margin-bottom: 24px;
  }

  .tab-item {
    font-size: 15px;
    padding: 10px 0;
  }

  .login-form,
  .register-form {
    gap: 16px;
  }

  .login-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .login-footer {
    margin-top: 24px;
    padding-top: 16px;
  }

  .login-footer p {
    font-size: 13px;
  }
}

.icon {
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.5rem;
}
</style>
