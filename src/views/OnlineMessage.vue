<script setup>
import { reactive } from 'vue'

// 表单数据
const formData = reactive({
  username: '',
  phone: '',
  email: '',
  message: '',
})

// 提交表单处理方法
const handleSubmit = () => {
  console.log('表单提交数据:', formData)

  // 这里可以添加表单验证逻辑
  if (!formData.username || !formData.phone || !formData.email || !formData.message) {
    alert('请填写所有必填字段')
    return
  }

  // 模拟提交成功
  alert('留言提交成功，感谢您的反馈！')

  // 重置表单
  formData.username = ''
  formData.phone = ''
  formData.email = ''
  formData.message = ''
}
</script>

<style scoped>
/* 自定义表单样式 */
.container {
  margin-top: 5rem;
}
.form-control {
  border-radius: 8px;
  border: 1px solid #ddd;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

textarea.form-control {
  resize: none;
}

.form-label {
  font-weight: 500;
  color: #333;
}

.btn-primary {
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* 响应式调整 */
@media (max-width: 576px) {
  .max-w-2xl {
    width: 100%;
  }
}
</style>

<template>
  <div class="container py-8">
    <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">线上留言</h2>
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <form @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="username" class="form-label">姓名 <span class="text-danger">*</span></label>
          <input
            type="text"
            class="form-control py-2"
            id="username"
            v-model="formData.username"
            placeholder="请输入您的姓名"
            required
          />
        </div>

        <div class="mb-5">
          <label for="phone" class="form-label">电话 <span class="text-danger">*</span></label>
          <input
            type="tel"
            class="form-control py-2"
            id="phone"
            v-model="formData.phone"
            placeholder="请输入您的联系电话"
            required
          />
        </div>

        <div class="mb-5">
          <label for="email" class="form-label">邮箱 <span class="text-danger">*</span></label>
          <input
            type="email"
            class="form-control py-2"
            id="email"
            v-model="formData.email"
            placeholder="请输入您的邮箱地址"
            required
          />
          <div class="form-text">我们不会泄露您的邮箱信息</div>
        </div>

        <div class="mb-8">
          <label for="message" class="form-label"
            >留言内容 <span class="text-danger">*</span></label
          >
          <textarea
            class="form-control"
            id="message"
            v-model="formData.message"
            rows="5"
            placeholder="请输入您的留言内容"
            required
            style="min-height: 120px"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary w-auto px-8 py-2.5 mt-2">提交留言</button>
      </form>
    </div>
  </div>
</template>
