<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllAdvertisements, updateAdvertisement } from '@/api/Advertisement'
// 文件输入ref
const fileInput = ref(null)

// 轮播图数据
const banners = ref([])

// 品牌公告数据
const announcements = reactive({
  wangdian: {},
  baixing: {},
  mingji: {},
})

// 资讯中心数据
const news = reactive({})

// 编辑对话框相关
const editDialogVisible = ref(false)
const editDialogTitle = ref('')
const editForm = reactive({
  type: '',
  index: null,
  id: '',
  imageUrl: '',
  title: '',
  content: '',
})

// 删除相关
const deleteParams = reactive({
  type: '',
  id: null,
})

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 使用FileReader读取本地图片并显示预览
    const reader = new FileReader()
    reader.onload = (e) => {
      // 直接将base64数据设置为图片URL
      editForm.imageUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
  // 清空文件输入，以便再次选择同一文件时能触发change事件
  event.target.value = ''
}

// 初始化数据
const initData = () => {
  // 模拟数据初始化
  initializeMockData()
}

// 获取所有广告信息
const fetchAllAdvertisements = async () => {
  const res = await getAllAdvertisements()
  console.log('获取到的广告数据:', res)
  //获取首页轮播图
  banners.value = res.data.filter((item) => item.position === '首页')
  console.log('首页轮播图数据:', banners.value)
}
//调用函数
fetchAllAdvertisements()

// 更新首页轮播图

// 初始化模拟数据
const initializeMockData = () => {
  // 初始化首页轮播图数据
  banners.value = [
    {
      id: 1,
      imageUrl: '/src/assets/bg.png',
      title: '首页轮播图1',
      link: '#',
      status: 1,
    },
    {
      id: 2,
      imageUrl: '/src/assets/feature.png',
      title: '首页轮播图2',
      link: '#',
      status: 1,
    },
    {
      id: 3,
      imageUrl: '/src/assets/mingji.png',
      title: '首页轮播图3',
      link: '#',
      status: 1,
    },
  ]

  // 初始化品牌公告数据
  Object.assign(announcements, {
    wangdian: {
      id: 'wangdian',
      imageUrl: '/src/assets/wangdian.png',
      title: '王殿公告',
      status: 1,
    },
    baixing: {
      id: 'baixing',
      imageUrl: '/src/assets/baixing.png',
      title: '百姓粽公告',
      status: 1,
    },
    mingji: {
      id: 'mingji',
      imageUrl: '/src/assets/mingji.png',
      title: '铭记家点心公告',
      status: 1,
    },
  })

  // 初始化资讯中心数据
  Object.assign(news, {
    id: 'news',
    imageUrl: '/src/assets/ping.jpg',
    title: '资讯中心图片',
    status: 1,
  })
}
// 打开编辑对话框
const openEditDialog = (type, id) => {
  // 设置对话框标题
  switch (type) {
    case 'banner':
      editDialogTitle.value = '编辑轮播图'
      const banner = banners.value.find((item) => item.id === id)
      Object.assign(editForm, {
        type: 'banner',
        index: id,
        id: banner.id,
        imageUrl: banner.imageUrl,
        title: banner.title,
        content: banner.content || '',
      })
      break
    case 'announcement':
      editDialogTitle.value = `编辑${announcements[id].title}`
      const announcement = announcements[id]
      Object.assign(editForm, {
        type: 'announcement',
        id: id,
        imageUrl: announcement.imageUrl,
        title: announcement.title,
        content: announcement.content || '',
      })
      break
    case 'news':
      editDialogTitle.value = '编辑资讯中心'
      Object.assign(editForm, {
        type: 'news',
        id: 'news',
        imageUrl: news.imageUrl,
        title: news.title,
        content: news.content || '',
      })
      break
  }
  // 显示对话框
  editDialogVisible.value = true
}

// 取消编辑
const cancelEdit = () => {
  editDialogVisible.value = false
}

// 确认编辑
const confirmEdit = () => {
  try {
    // 验证表单数据
    if (!editForm.imageUrl.trim()) {
      ElMessage.error('请输入图片URL')
      return
    }

    // URL格式验证
    try {
      // 简单的URL格式检查，允许相对路径
      if (editForm.imageUrl.startsWith('http')) {
        new URL(editForm.imageUrl)
      }
    } catch (e) {
      ElMessage.error('请输入有效的URL地址')
      return
    }

    // 标题验证
    if (!editForm.title.trim()) {
      ElMessage.warning('标题为空，建议添加标题')
    }

    // 根据类型更新数据
    switch (editForm.type) {
      case 'banner':
        if (!banners.value[editForm.index]) {
          throw new Error('轮播图数据不存在')
        }
        banners.value[editForm.index] = {
          ...banners.value[editForm.index],
          imageUrl: editForm.imageUrl,
          title: editForm.title || `轮播图${editForm.index + 1}`,
          content: editForm.content || '',
          link: '#', // 默认链接
          status: 1, // 默认启用状态
        }
        break
      case 'announcement':
        if (!announcements[editForm.id]) {
          throw new Error('公告数据不存在')
        }
        announcements[editForm.id] = {
          ...announcements[editForm.id],
          imageUrl: editForm.imageUrl,
          title: editForm.title || announcements[editForm.id].title,
          content: editForm.content || '',
          status: 1, // 默认启用状态
        }
        break
      case 'news':
        if (!news) {
          throw new Error('资讯中心数据不存在')
        }
        Object.assign(news, {
          imageUrl: editForm.imageUrl,
          title: editForm.title || '资讯中心图片',
          content: editForm.content || '',
          status: 1, // 默认启用状态
        })
        break
      default:
        throw new Error('未知的数据类型')
    }

    // 显示成功提示
    ElMessage.success('编辑成功')
    // 关闭对话框
    editDialogVisible.value = false
  } catch (error) {
    // 错误处理
    console.error('编辑过程中出现错误:', error)
    ElMessage.error(error.message || '编辑失败，请重试')
  }
}

// 处理删除操作
const handleDelete = (type, id) => {
  // 保存删除参数
  Object.assign(deleteParams, {
    type: type,
    id: id,
  })

  // 根据类型获取标题
  let title = ''
  switch (type) {
    case 'banner':
      title = `轮播图${id + 1}`
      break
    case 'announcement':
      title = announcements[id].title
      break
    case 'news':
      title = '资讯中心'
      break
  }

  // 显示确认对话框
  ElMessageBox.confirm(`确定要删除${title}吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  })
    .then(() => {
      // 执行删除操作
      performDelete()
    })
    .catch(() => {
      // 取消删除
      ElMessage.info('已取消删除')
      // 重置删除参数
      Object.assign(deleteParams, {
        type: '',
        id: null,
      })
    })
}

// 执行删除
const performDelete = () => {
  try {
    const { type, id } = deleteParams

    // 防止空操作
    if (!type || id === null || id === undefined) {
      throw new Error('删除参数不完整')
    }

    // 根据类型执行删除
    switch (type) {
      case 'banner':
        // 检查轮播图是否存在
        if (id < 0 || id >= banners.value.length) {
          throw new Error('轮播图不存在')
        }
        // 检查是否还有轮播图可以删除
        if (banners.value.length <= 1) {
          ElMessage.warning('至少需要保留一张轮播图，已将该轮播图停用')
          // 停用而不是删除
          banners.value[id].status = 0
        } else {
          // 移除对应的轮播图
          banners.value.splice(id, 1)
        }
        break
      case 'announcement':
        // 检查公告是否存在
        if (!announcements[id]) {
          throw new Error('公告不存在')
        }
        // 重置公告图片为默认值
        announcements[id] = {
          ...announcements[id],
          imageUrl: '',
          status: 0,
        }
        break
      case 'news':
        // 重置资讯中心图片为默认值
        Object.assign(news, {
          imageUrl: '',
          status: 0,
        })
        break
      default:
        throw new Error('未知的数据类型')
    }

    // 显示成功提示
    ElMessage.success('删除成功')

    // 重置删除参数
    Object.assign(deleteParams, {
      type: '',
      id: null,
    })
  } catch (error) {
    // 错误处理
    console.error('删除过程中出现错误:', error)
    ElMessage.error(error.message || '删除失败，请重试')
  }
}

// 组件挂载时初始化数据
onMounted(() => {
  initData()
})
</script>

<template>
  <div class="announcement-management">
    <h2>广告管理</h2>

    <!-- 编辑对话框 -->
    <el-dialog v-model="editDialogVisible" :title="editDialogTitle" width="500px" center>
      <div class="edit-dialog-content">
        <el-form :model="editForm" label-width="80px" class="edit-form">
          <el-form-item label="图片">
            <div class="image-upload-container">
              <!-- 图片预览区域 -->
              <div v-if="editForm.imageUrl" class="image-preview">
                <img :src="editForm.imageUrl" alt="预览图" class="preview-img" />
              </div>
              <!-- 点击区域 -->
              <div @click="triggerFileUpload" class="upload-trigger">
                <el-button type="primary">选择图片</el-button>
              </div>
              <!-- 隐藏的文件输入 -->
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileSelect"
              />
            </div>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="editForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              v-model="editForm.content"
              type="textarea"
              rows="4"
              resize="none"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelEdit">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 合并到一个卡片中 -->
    <div class="section combined-section">
      <!-- 首页轮播图部分 -->
      <div class="section-part home-banner-part">
        <h3>首页轮播图</h3>
        <div class="banner-container">
          <div class="banner-grid">
            <div v-for="banner in banners" :key="banner.id" class="banner-item">
              <div class="banner-image-wrapper">
                <img
                  :src="banner.imageUrl"
                  :alt="banner.title || `轮播图${banner.id}`"
                  class="banner-image"
                />
              </div>
              <div class="banner-info">
                <span class="banner-index">轮播图{{ banner.id }}</span>
                <div class="banner-actions">
                  <el-button
                    size="small"
                    type="primary"
                    @click="openEditDialog('banner', banner.id)"
                    >编辑</el-button
                  >
                  <el-button size="small" type="danger" @click="handleDelete('banner', banner.id)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 品牌公告部分 -->
      <div class="section-part brand-announcement-part">
        <h3>品牌公告</h3>
        <div class="announcement-container">
          <!-- 王殿公告 -->
          <div class="announcement-item">
            <div class="announcement-header">
              <span class="announcement-title">王殿</span>
            </div>
            <div class="announcement-content">
              <div class="announcement-image-wrapper">
                <img
                  :src="announcements.wangdian.imageUrl"
                  alt="王殿公告"
                  class="announcement-image"
                />
              </div>
              <div class="announcement-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="openEditDialog('announcement', 'wangdian')"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete('announcement', 'wangdian')"
                  >删除</el-button
                >
              </div>
            </div>
          </div>

          <!-- 百姓粽公告 -->
          <div class="announcement-item">
            <div class="announcement-header">
              <span class="announcement-title">百姓粽</span>
            </div>
            <div class="announcement-content">
              <div class="announcement-image-wrapper">
                <img
                  :src="announcements.baixing.imageUrl"
                  alt="百姓粽公告"
                  class="announcement-image"
                />
              </div>
              <div class="announcement-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="openEditDialog('announcement', 'baixing')"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete('announcement', 'baixing')"
                  >删除</el-button
                >
              </div>
            </div>
          </div>

          <!-- 铭记家点心公告 -->
          <div class="announcement-item">
            <div class="announcement-header">
              <span class="announcement-title">铭记家点心</span>
            </div>
            <div class="announcement-content">
              <div class="announcement-image-wrapper">
                <img
                  :src="announcements.mingji.imageUrl"
                  alt="铭记家点心公告"
                  class="announcement-image"
                />
              </div>
              <div class="announcement-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="openEditDialog('announcement', 'mingji')"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete('announcement', 'mingji')"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资讯中心部分 -->
      <div class="section-part news-center-part">
        <h3>资讯中心</h3>
        <div class="news-container">
          <div class="news-item">
            <div class="news-content">
              <div class="news-image-wrapper">
                <img :src="news.imageUrl" alt="资讯中心" class="news-image" />
              </div>
              <div class="news-actions">
                <el-button size="small" type="primary" @click="openEditDialog('news', 'news')"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" @click="handleDelete('news', 'news')"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.announcement-management {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.announcement-management h2 {
  margin-bottom: 24px;
  color: #303133;
  font-size: 24px;
  font-weight: 600;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: block;
  width: 100%;
}

/* 合并后的卡片样式 */
.combined-section {
  padding: 0;
}

/* 每个部分的样式 */
.section-part {
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.section-part:last-child {
  border-bottom: none;
}

.section h3 {
  margin-bottom: 16px;
  color: #333;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

/* 通用容器样式 */
.banner-container,
.announcement-container,
.news-container {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .banner-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .announcement-management {
    padding: 10px;
  }

  .section {
    padding: 15px;
  }

  .banner-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .announcement-content,
  .news-content {
    flex-direction: column;
    align-items: stretch;
  }

  .announcement-actions,
  .news-actions {
    justify-content: center;
    margin-top: 15px;
    min-width: auto;
  }

  .announcement-image-wrapper,
  .news-image-wrapper {
    max-height: 150px;
  }
}
/* 首页轮播图样式 */
.banner-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.banner-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.banner-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.banner-image-wrapper {
  width: 600px;
  height: 260px;
  overflow: hidden;
  background-color: #f5f7fa;
  margin: 0 auto;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-info {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.banner-index {
  font-size: 14px;
  color: #606266;
}

.banner-actions {
  display: flex;
  gap: 8px;
}

/* 按钮样式优化 */
.el-button {
  transition: all 0.3s ease;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.el-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

/* 编辑对话框样式 */
.edit-dialog-content {
  padding: 10px 0;
}

.edit-form .el-form-item {
  margin-bottom: 20px;
}

.edit-form .el-input {
  width: 100%;
}

/* 确保内容输入框大小固定 */
:deep(.el-textarea__inner) {
  resize: none !important;
  min-height: 120px;
  max-height: 120px;
}

/* 图片上传相关样式 */
.image-upload-container {
  width: 100%;
}

.image-preview {
  width: 100%;
  max-height: 200px;
  margin-bottom: 10px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
}

.preview-img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.upload-trigger {
  margin-bottom: 10px;
}

.image-url-container {
  margin-top: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.add-banner-btn {
  display: block;
  margin: 0 auto;
}

/* 品牌公告样式 */
.announcement-item {
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.announcement-item:last-child {
  margin-bottom: 0;
}

.announcement-header {
  padding: 12px 20px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.announcement-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.announcement-content {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.announcement-image-wrapper {
  width: 520px;
  height: 160px;
  overflow: hidden;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin: 0 auto;
}

.announcement-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.announcement-actions {
  display: flex;
  gap: 12px;
  min-width: 140px;
}

/* 资讯中心样式 */
.news-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.news-content {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.news-image-wrapper {
  width: 600px;
  height: 110px;
  overflow: hidden;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin: 0 auto;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-actions {
  display: flex;
  gap: 12px;
  min-width: 140px;
}
</style>
