<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { updateAdvertisement, uploadFile } from '@/api/Advertisement'

// 对话框可见性
const dialogVisible = ref(false)

// 表单数据
const formModel = reactive({
  id: '',
  title: '',
  content: '',
  position: '',
  linkUrl: '',
})

// 选择的文件
const selectedFile = ref(null)

// 打开对话框并回显数据
const openDialog = (row) => {
  // 清空之前的数据
  Object.keys(formModel).forEach(key => {
    formModel[key] = ''
  })
  selectedFile.value = null
  
  // 如果有数据，则回显
  if (row) {
    Object.keys(row).forEach(key => {
      if (formModel.hasOwnProperty(key)) {
        formModel[key] = row[key]
      }
    })
  }
  
  // 显示对话框
  dialogVisible.value = true
}

// 文件上传前的校验
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isGIF = file.type === 'image/gif'
  const isWEBP = file.type === 'image/webp'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG && !isGIF && !isWEBP) {
    ElMessage.error('上传图片只能是 JPG/PNG/GIF/WEBP 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
    return false
  }
  return true
}

// 文件选择变化时的处理
  const handleChange = (file, fileList) => {
    console.log('文件选择事件完整信息:')
    console.log('file参数:', file)
    console.log('fileList参数:', fileList)
    console.log('file.raw是否存在:', file && !!file.raw)
    
    // 检查是否是Element Plus el-upload组件的文件对象
    if (file && file.raw) {
      selectedFile.value = file.raw
      console.log('成功保存文件对象:', selectedFile.value)
      console.log('文件名称:', selectedFile.value.name)
      console.log('文件大小:', selectedFile.value.size)
      console.log('文件类型:', selectedFile.value.type)
      
      // 创建预览URL
      const reader = new FileReader()
      reader.onload = (e) => {
        formModel.linkUrl = e.target.result
        console.log('预览URL已设置')
      }
      reader.onerror = (error) => {
        console.error('文件读取失败:', error)
      }
      reader.readAsDataURL(file.raw)
    } else {
      console.error('未获取到有效的文件对象:', file)
      ElMessage.warning('无法获取文件信息，请重新选择文件')
      // 清空selectedFile，避免使用无效的文件
      selectedFile.value = null
    }
  }

// 提交表单
  const handleSubmit = async () => {
    try {
      // 准备提交数据
      const submitData = { ...formModel }
      
      // 第一步：如果有选择的文件，先上传图片获取linkUrl
      if (selectedFile.value && selectedFile.value instanceof File) {
        ElMessage.info('正在上传图片...')
        console.log('准备上传的文件类型:', typeof selectedFile.value)
        console.log('是否为File对象:', selectedFile.value instanceof File)
        console.log('文件信息:', selectedFile.value.name, selectedFile.value.size, selectedFile.value.type)
        
        // 再次验证文件对象的有效性
        if (!selectedFile.value.name || selectedFile.value.size === 0) {
          console.error('文件对象无效:', selectedFile.value)
          ElMessage.error('选择的文件无效，请重新选择')
          return
        }
        
        try {
          // 手动创建FormData对象并添加文件
          const formData = new FormData()
          formData.append('file', selectedFile.value)
          console.log('在组件内创建的FormData对象')
          console.log('FormData中的文件是否存在:', formData.get('file') !== null)
          
          // 传递FormData对象
          const uploadResponse = await uploadFile(formData)
          
          console.log('上传图片响应完整数据:', uploadResponse)
          console.log('响应code:', uploadResponse.code)
          console.log('响应success:', uploadResponse.success)
          console.log('响应data:', uploadResponse.data)
          console.log('响应message/msg:', uploadResponse.message || uploadResponse.msg)
          
          // 检查响应状态
          if (uploadResponse.code === 200 || uploadResponse.success) {
            // 检查data是否存在且不为空
            if (uploadResponse.data) {
              // 获取上传后的图片URL
              submitData.linkUrl = uploadResponse.data.linkUrl || uploadResponse.data
              console.log('设置的linkUrl:', submitData.linkUrl)
              ElMessage.success('图片上传成功')
            } else {
              console.error('上传成功但data为空:', uploadResponse)
              ElMessage.error('图片上传成功但未获取到URL信息')
              return
            }
          } else {
            // 处理失败响应
            const errorMsg = uploadResponse.message || uploadResponse.msg || '图片上传失败'
            console.error('上传失败:', errorMsg, uploadResponse)
            ElMessage.error(errorMsg)
            return
          }
        } catch (uploadError) {
          console.error('图片上传异常:', uploadError)
          ElMessage.error('图片上传异常，请检查文件格式和网络连接')
          return
        }
      }
    
    // 第二步：使用获取到的linkUrl更新广告信息
    // 确保提交数据中不包含file对象
    delete submitData.file
    
    ElMessage.info('正在更新信息...')
    const updateResponse = await updateAdvertisement(submitData)
    
    // 处理成功响应
    if (updateResponse.code === 200 || updateResponse.success) {
      ElMessage.success('更新成功')
      dialogVisible.value = false
      
      // 通知父组件刷新数据
      emit('refreshData')
    } else {
      ElMessage.error(updateResponse.message || '更新失败')
    }
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error('操作失败，请稍后重试')
  }
}

// 关闭对话框前的处理
const handleClose = () => {
  // 重置表单
  Object.keys(formModel).forEach(key => {
    formModel[key] = ''
  })
  selectedFile.value = null
  dialogVisible.value = false
}

// 定义事件
const emit = defineEmits(['refreshData'])

defineExpose({
  openDialog
})
</script>

<template>
<el-dialog
    v-model="dialogVisible"
    title="图片编辑"
    width="1000"
    :before-close="handleClose"
  >
     <el-form :model="formModel" label-width="auto" style="max-width: 600px">
    <el-form-item label="首页轮播图位置">
      <el-input v-model="formModel.position" />
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="formModel.title" />
    </el-form-item>
    <el-form-item label="图片">
    <el-upload
    class="avatar-uploader"
    :before-upload="beforeAvatarUpload"
    :on-change="handleChange"
     :auto-upload="false"
  >
     <img v-if="formModel.linkUrl" :src="formModel.linkUrl" class="avatar" />
      <div v-else class="avatar-uploader-icon">选择图片</div>
    </el-upload>
    </el-form-item>
     
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<style scoped>
.avatar-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}
.avatar-uploader-icon {
  width: 200px;
  height: 200px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
.avatar-uploader-icon:hover {
  border-color: #1890ff;
}
</style>

