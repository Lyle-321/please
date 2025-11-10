<template>
  <div class="product-detail-container">
    <div class="pagehead">
      <h2 class="page-title">添加产品</h2>
      <el-button type="primary" @click="handleBackClick">返回</el-button>      
    </div>
    <!-- 表单区域 -->
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="formRules"
      label-width="100px"
      class="product-form"
    >
      <!-- 上半部分：基本信息 -->
      <div class="basic-info-section">
        <div class="headers">
           <h3 class="section-title">基本信息</h3>
           <div class="button"></div>
        </div>
       
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="productForm.name"
            placeholder="请输入产品名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="产品描述" prop="description">
          <el-input
            v-model="productForm.description"
            type="textarea"
            placeholder="请输入产品描述"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="产品分类" prop="category">
          <el-select
            v-model="productForm.category"
            placeholder="请选择产品分类"
            clearable
          >
            <el-option
              v-for="category in categories"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            />
          </el-select>
        </el-form-item>
      </div>
      
      <!-- 下半部分：富文本编辑器 -->
      <div class="editor-section">
        <h3 class="section-title">产品详情</h3>
        <div class="editor-container">
          <!-- 工具栏 -->
          <div class="toolbar-wrapper">
            <Toolbar
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
          </div>
          <!-- 编辑器内容区 -->
          <div class="editor-wrapper">
            <Editor
              v-model="productForm.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const router = useRouter()
const productFormRef = ref(null)
const editorRef = ref(null)
const mode = 'default' // or 'simple'

// 产品表单数据
const productForm = reactive({
  name: '',
  description: '',
  category: '',
  content: ''
})

// 表单验证规则
const formRules = reactive({
  name: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '产品名称长度在2到50个字符之间', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入产品描述', trigger: 'blur' },
    { min: 5, message: '产品描述至少5个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择产品分类', trigger: 'change' }
  ]
})

// 分类数据（可以从API获取，这里使用模拟数据）
const categories = [
  { label: '传统佛跳墙', value: 'traditional_ftq' },
  { label: '精品礼盒', value: 'gift_box' },
  { label: '节日限定', value: 'holiday_limited' },
  { label: '经典肉粽', value: 'classic_zongzi' },
  { label: '素食粽子', value: 'vegetarian_zongzi' },
  { label: '特色口味', value: 'special_flavor' },
  { label: '传统糕点', value: 'traditional_pastry' },
  { label: '西式点心', value: 'western_pastry' },
  { label: '伴手礼盒', value: 'souvenir_box' }
]

// 简化的编辑器配置
const toolbarConfig = {} // 使用默认工具栏配置

const editorConfig = {
  placeholder: '请输入产品详情内容...',
  readOnly: false,
  maxLength: 10000,
  MENU_CONF: {
    // 简化图片上传配置
    uploadImage: {
      // 使用简单的本地预览方式
      customUpload: (file, insertFn) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          // 插入图片到编辑器
          insertFn(e.target.result)
        }
        reader.readAsDataURL(file)
      }
    }
  }
}

// 编辑器创建完成时的回调
const handleCreated = (editor) => {
  editorRef.value = editor
}

// 提交表单
const handleSubmit = () => {
  productFormRef.value.validate((valid) => {
    if (valid) {
      // 检查富文本内容是否为空
      if (!productForm.content.trim()) {
        ElMessage.error('请输入产品详情内容')
        return
      }
      
      // 这里可以发送请求保存产品数据
      console.log('提交的产品数据:', productForm)
      
      // 模拟提交成功
      ElMessage.success('产品添加成功')
      
      // 返回上一页
      setTimeout(() => {
        router.back()
      }, 1500)
    }
  })
}

// 取消操作
const handleCancel = () => {
  ElMessageBox.confirm('确定要取消吗？未保存的内容将丢失', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    router.back()
  }).catch(() => {
    // 取消操作
  })
}

// 组件销毁时销毁编辑器
onUnmounted(() => {
  if (editorRef.value) {
    editorRef.value.destroy()
  }
})
</script>
  
  <style scoped>
  .pagehead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .product-detail-container {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
  }
  
  .page-title {
    margin-bottom: 20px;
    color: #333;
    font-size: 20px;
    font-weight: 600;
  }
  
  .product-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  .basic-info-section,
  .editor-section {
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #606266;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
  }
  
  .editor-container {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .toolbar-wrapper {
    border-bottom: 1px solid #ccc;
  }
  
  .editor-wrapper {
    min-height: 300px;
    max-height: 600px;
    overflow-y: auto;
  }
  
  /* 确保编辑器正确显示 */
  .w-e-toolbar {
    padding: 8px;
    flex-wrap: wrap;
  }
  
  .w-e-editor {
    min-height: 300px !important;
    padding: 10px;
    box-sizing: border-box;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .editor-wrapper {
      min-height: 200px;
    }
    
    .w-e-editor {
      min-height: 200px !important;
    }
  }
  
  .form-actions {
    margin-top: 20px;
    text-align: right;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;
  }
  
  .form-actions .el-button {
    margin-left: 10px;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .product-detail-container {
      padding: 10px;
    }
    
    .product-form {
      padding: 15px;
    }
  }
</style>