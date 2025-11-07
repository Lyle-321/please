<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: '',
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
  subject: [
    { required: true, message: '请输入留言主题', trigger: 'blur' },
    { min: 2, max: 50, message: '主题长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入留言内容', trigger: 'blur' },
    { min: 10, max: 500, message: '内容长度在 10 到 500 个字符', trigger: 'blur' },
  ],
}

// 表单引用
const formRef = ref(null)

// 提交表单
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 模拟提交数据
      setTimeout(() => {
        ElMessage({
          message: '留言提交成功，感谢您的反馈！',
          type: 'success',
        })
        // 重置表单
        formRef.value.resetFields()
      }, 1000)
    } else {
      ElMessage({
        message: '请完善表单信息',
        type: 'warning',
      })
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <div class="container py-4">
    <div class="breadcrumb-nav">
      <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link :to="{ name: 'message' }" class="breadcrumb-link">在线留言</router-link>
    </div>

    <!-- 页面标题 -->
    <div class="page-title">
      <h1>在线留言</h1>
      <p class="subtitle">如有任何问题或建议，请随时联系我们</p>
    </div>

    <!-- 留言表单 -->
    <div class="message-form-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        class="message-form"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入您的姓名"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            type="email"
            placeholder="请输入您的邮箱"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <!-- 手机 -->
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入您的手机号码"
            maxlength="11"
            show-word-limit
          />
        </el-form-item>

        <!-- 主题 -->
        <el-form-item label="留言主题" prop="subject">
          <el-input
            v-model="formData.subject"
            placeholder="请输入留言主题"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <!-- 内容 -->
        <el-form-item label="留言内容" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            :rows="6"
            placeholder="请输入您的留言内容，至少10个字符"
            maxlength="500"
            show-word-limit
            resize="none"
          />
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item class="form-actions">
          <el-button type="primary" @click="submitForm" class="submit-btn">提交留言</el-button>
          <el-button @click="resetForm" class="reset-btn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 联系信息 -->
    <div class="contact-info">
      <h3>其他联系方式</h3>
      <div class="contact-items">
        <div class="contact-item">
          <div class="info-icon">
            <img src="@/assets/phone.svg" alt="电话" />
          </div>
          <div class="info-content">
            <p class="info-label">电话咨询</p>
            <p class="info-value">010-88888888</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="info-icon">
            <img src="@/assets/email.svg" alt="邮箱" />
          </div>
          <div class="info-content">
            <p class="info-label">电子邮箱</p>
            <p class="info-value">info@wanniantrade.com</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="info-icon">
            <img src="@/assets/message.svg" alt="即时通讯" />
          </div>
          <div class="info-content">
            <p class="info-label">即时通讯</p>
            <p class="info-value">在线客服</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式 */
.message-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 面包屑导航 */
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

/* 页面标题 */
.page-title {
  text-align: center;
  margin-bottom: 40px;
}

.page-title h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.page-title .subtitle {
  font-size: 16px;
  color: #666;
}

/* 留言表单 */
.message-form-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 40px;
}

.message-form {
  max-width: 100%;
}

/* 表单操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.submit-btn {
  padding: 12px 40px;
  font-size: 16px;
  background-color: #e34949;
  border-color: #e34949;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #c63434;
  border-color: #c63434;
}

.reset-btn {
  padding: 12px 40px;
  font-size: 16px;
  transition: all 0.3s ease;
}

/* 联系信息 */
.contact-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
}

.contact-info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 25px;
  font-weight: 600;
}

.contact-items {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
}

.info-icon img {
  width: 30px;
  height: 30px;
}

.info-content .info-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.info-content .info-value {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

/* 响应式设计 - 平板 (768px - 991px) */
@media (max-width: 991px) {
  .message-container {
    padding: 15px;
  }

  .page-title h1 {
    font-size: 24px;
  }

  .page-title .subtitle {
    font-size: 14px;
  }

  .message-form-wrapper {
    padding: 25px;
  }

  .contact-items {
    gap: 20px;
  }

  .contact-item {
    min-width: 180px;
  }
}

/* 响应式设计 - 手机 (<= 767px) */
@media (max-width: 767px) {
  .breadcrumb-nav {
    font-size: 12px;
  }

  .breadcrumb-separator {
    margin: 0 6px;
  }

  .page-title {
    margin-bottom: 30px;
  }

  .page-title h1 {
    font-size: 22px;
  }

  .message-form-wrapper {
    padding: 20px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .message-form {
    label-width: 80px;
  }

  .el-form-item__label {
    font-size: 14px;
  }

  .form-actions {
    flex-direction: column;
    gap: 15px;
  }

  .submit-btn,
  .reset-btn {
    width: 100%;
    padding: 12px;
  }

  .contact-info {
    padding: 20px;
  }

  .contact-info h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .contact-items {
    flex-direction: column;
    gap: 15px;
  }

  .contact-item {
    min-width: auto;
    flex-direction: row;
    text-align: left;
    padding: 15px;
  }

  .info-icon {
    width: 50px;
    height: 50px;
  }

  .info-icon img {
    width: 25px;
    height: 25px;
  }

  .info-content .info-label {
    font-size: 13px;
  }

  .info-content .info-value {
    font-size: 14px;
  }

  /* 确保输入框在小屏幕上显示完整 */
  .el-input__wrapper {
    width: 100%;
  }

  /* 调整错误提示位置 */
  .el-form-item__error {
    font-size: 12px;
    padding-top: 4px;
  }
}

/* 响应式设计 - 小手机 (<= 480px) */
@media (max-width: 480px) {
  .message-container {
    padding: 10px;
  }

  .message-form-wrapper {
    padding: 15px;
  }

  .message-form {
    label-width: 70px;
  }

  .el-form-item__label {
    font-size: 13px;
  }

  .page-title h1 {
    font-size: 20px;
  }

  .contact-item {
    padding: 12px;
  }
}
</style>
