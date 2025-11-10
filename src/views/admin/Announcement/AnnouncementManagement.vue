<script setup>
import { ref, reactive} from 'vue'
import { getAllAdvertisements } from '@/api/Advertisement'
import DialogCom from '@/views/admin/components/DialogCom.vue'
// 文件输入ref

// 轮播图数据
const banners = ref([])

// 品牌公告数据
const announcements = reactive({})
// 下面详细展示品牌公告
const wangdian = ref({})
const baoxian = ref({})
const remind = ref()



// 资讯中心数据
const news = reactive({})

// 获取所有广告数据
const getall = async () => {
  const res = await getAllAdvertisements()
  console.log(res)
  //筛选首页轮播图
  banners.value = res.data.filter(item => item.position === '首页')
  // console.log(banners.value)
  //筛选品牌广告
  announcements.value = res.data.filter(item => item.position === '品牌页')
  // console.log(announcements.value)
  //筛选王殿公告
  wangdian.value = announcements.value.filter(item => item.title=== '品牌页广告1')
  // console.log(wangdian.value)
  //筛选百姓粽公告
  baoxian.value = announcements.value.filter(item => item.title === '品牌页广告2')
  console.log(baoxian.value)
  //筛选铭记公告
  remind.value = announcements.value.filter(item => item.title === '品牌页广告3')
  // console.log(remind.value)
  //筛选资讯中心
  news.value = res.data.filter(item => item.position === '资讯中心')
  // console.log(news.value)
}

const dialogComRef = ref(null)

//调用函数
getall()

const openEditDialog = (row) => {
  dialogComRef.value.openDialog(row)
}

</script>

<template>
  <div class="announcement-management">
    <h2>广告管理</h2>
    <DialogCom ref="dialogComRef" @refresh-data="getall" />
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
                  :src="banner.linkUrl"
                  class="banner-image"
                />
              </div>
              <div class="banner-info">
                <span class="banner-index">轮播图{{ banner.id }}</span>
                <div class="banner-actions">
                  <el-button
                    size="small"
                    type="primary"
                    @click="openEditDialog(banner)"
                    >编辑</el-button
                  >
                  <el-button size="small" type="danger" @click="handleDelete(banner)"
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
          <div class="announcement-item" v-for="item in wangdian" :key="item.id">
            <div class="announcement-header">
              <span class="announcement-title">王殿</span>
            </div>
            <div class="announcement-content">
              <div class="announcement-image-wrapper">
                <img
                  :src="item.linkUrl"
                  alt="王殿公告"
                  class="announcement-image"
                />
              </div>
              <div class="announcement-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="openEditDialog(item)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete()"
                  >删除</el-button
                >
              </div>
            </div>
          </div>

          <!-- 百姓粽公告 -->
          <div class="announcement-item" v-for="item in baoxian" :key="item.id">
            <div class="announcement-header">
              <span class="announcement-title">百姓粽</span>
            </div>
            <div class="announcement-content">
              <div class="announcement-image-wrapper">
                <img
                  :src="item.linkUrl"
                  alt="百姓粽公告"
                  class="announcement-image"
                />
              </div>
              <div class="announcement-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="openEditDialog(item)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete()"
                  >删除</el-button
                >
              </div>
            </div>
          </div>

          <!-- 铭记家点心公告 -->
          <div class="announcement-item" v-for="item in remind" :key="item.id">
            <div class="announcement-header">
              <span class="announcement-title">铭记家点心</span>
            </div>
            <div class="announcement-content">
              <div class="announcement-image-wrapper">
                <img
                  :src="item.linkUrl"
                  alt="铭记家点心公告"
                  class="announcement-image"
                />
              </div>
              <div class="announcement-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="openEditDialog()"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete()"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资讯中心部分 -->
      <div class="section-part news-center-part" v-for="item in news" :key="item.id">
        <h3>资讯中心</h3>
        <div class="news-container">
          <div class="news-item">
            <div class="news-content">
              <div class="news-image-wrapper">
                <img :src="news.imageUrl" alt="资讯中心" class="news-image" />
              </div>
              <div class="news-actions">
                <el-button size="small" type="primary" @click="openEditDialog(item)"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" @click="handleDelete(item.id)"
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
