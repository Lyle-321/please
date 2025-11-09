<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 控制二级菜单展开/收起状态
const expandedMenu = ref('')

// 控制移动端侧边栏显示/隐藏
const sidebarVisible = ref(false)

// 当前选中的主菜单项
const activeMainItem = ref(null)

// 当前选中的子菜单项
const activeSubItem = ref('')

// 切换二级菜单展开/收起
const toggleSubMenu = (menuName) => {
  if (expandedMenu.value === menuName) {
    expandedMenu.value = ''
  } else {
    expandedMenu.value = menuName
  }
}

// 切换移动端侧边栏显示/隐藏
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

// 关闭移动端侧边栏
const closeSidebar = () => {
  sidebarVisible.value = false
}

// 处理主菜单项点击
const handleMainItemClick = (path, menuName) => {
  activeMainItem.value = menuName
  activeSubItem.value = ''
  router.push(path)
  closeSidebar()
}

// 处理子菜单项点击
const handleSubItemClick = (path, menuName) => {
  activeMainItem.value = 'product'
  activeSubItem.value = menuName
  router.push(path)
  closeSidebar()
}

// 根据当前路由更新活动菜单项
const updateActiveMenuItem = () => {
  const currentPath = route.path

  // 创建路由路径到菜单项的映射，包含所有菜单项
  const pathToMenuItem = {
    '/AdminHome': 'AdminHome',
    '/ClassificationManagement': 'ClassificationManagement',
    '/BrandProducts': 'product',
    '/ConsultationManagement': '咨询中心管理',
    '/AnnouncementManagement': '广告管理',
    '/DataManagement': '数据管理',
    '/UserManagement': '用户管理',
  }

  // 查找匹配的菜单项
  const matchedMenuItem = pathToMenuItem[currentPath]
  
  if (matchedMenuItem) {
    activeMainItem.value = matchedMenuItem
    activeSubItem.value = ''

    // 特殊处理产品管理页面
    if (currentPath === '/BrandProducts') {
      expandedMenu.value = 'product'
      // 根据查询参数确定具体的子菜单项
      const brand = route.query.brand || ''
      activeSubItem.value = brand
    }
  }
}

// 监听路由变化
watch(() => route.path, updateActiveMenuItem)

// 组件挂载时初始化
onMounted(() => {
  updateActiveMenuItem()
})
</script>
<template>
  <div class="all">
    <div class="head">
      <div class="logo">Wannian Trade</div>
      <!-- 移动端菜单按钮 -->
      <div class="menu-toggle" @click="toggleSidebar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!-- 下面内容 -->
    <!-- 移动端遮罩层 -->
    <div class="overlay" :class="{ visible: sidebarVisible }" @click="closeSidebar"></div>
    <div class="content">
      <div class="sidebar" :class="{ 'mobile-visible': sidebarVisible }">
        <div class="close-btn" @click="closeSidebar">&times;</div>
        <div
          class="item"
          :class="{ active: activeMainItem === 'AdminHome' }"
          @click="handleMainItemClick('/AdminHome', 'AdminHome')"
        >
          首页
        </div>
        <div
          class="item"
          :class="{ active: activeMainItem === 'ClassificationManagement' }"
          @click="handleMainItemClick('/ClassificationManagement', 'ClassificationManagement')"
        >
          分类管理
        </div>

        <div
          class="item parent-item"
          :class="{ active: activeMainItem === 'product' }"
          @click="toggleSubMenu('product')"
        >
          <span>品牌产品管理</span>
          <span class="arrow" :class="{ rotate: expandedMenu === 'product' }">▼</span>
        </div>
        <div class="sub-menu" v-if="expandedMenu === 'product'">
          <div
            class="sub-item"
            :class="{ active: activeSubItem === 'wangdian' }"
            @click="handleSubItemClick('/BrandProducts?brand=wangdian', 'wangdian')"
          >
            王殿
          </div>
          <div
            class="sub-item"
            :class="{ active: activeSubItem === 'baixing' }"
            @click="handleSubItemClick('/BrandProducts?brand=baixing', 'baixing')"
          >
            百姓粽
          </div>
          <div
            class="sub-item"
            :class="{ active: activeSubItem === 'mingji' }"
            @click="handleSubItemClick('/BrandProducts?brand=mingji', 'mingji')"
          >
            铭记家点心
          </div>
        </div>
        <div
          class="item"
          :class="{ active: activeMainItem === '咨询中心管理' }"
          @click="handleMainItemClick('/ConsultationManagement', '咨询中心管理')"
        >
          咨讯中心管理
        </div>
        <div
          class="item"
          :class="{ active: activeMainItem === '广告管理' }"
          @click="handleMainItemClick('/AnnouncementManagement', '广告管理')"
        >
          广告管理
        </div>
        <div
          class="item"
          :class="{ active: activeMainItem === '数据管理' }"
          @click="handleMainItemClick('/DataManagement', '数据管理')"
        >
          数据管理
        </div>
        <div
          class="item"
          :class="{ active: activeMainItem === '用户管理' }"
          @click="handleMainItemClick('/UserManagement', '用户管理')"
        >
          用户管理
        </div>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  height: 70px;
  width: 100%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.logo {
  color: rgb(231, 119, 119);
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
}

/* 侧边导航栏 */
.content {
  display: flex;
  height: calc(100vh - 70px);
  margin-top: 70px; /* 为固定头部预留空间 */
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f3f3f3;
}

.sidebar {
  width: 10rem;
  height: 100%;
  background-color: #1f2937;
  color: #fff;
  padding: 1.5rem 0rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  overflow-y: auto;
  position: relative;
  z-index: 99;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: none;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* 移动端菜单按钮 - 默认隐藏，在移动设备上显示 */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001;
  position: absolute;
  right: 1.5rem;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.item {
  padding: 1rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #4f46e5;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #93c5fd;
}

.item.active {
  background-color: rgba(79, 70, 229, 0.2);
  color: #c7d2fe;
  font-weight: 600;
}

.item.active::before {
  transform: translateX(0);
}

/* 父菜单样式 */
.parent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.parent-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #4f46e5;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.parent-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #93c5fd;
}

.parent-item.active::before {
  transform: translateX(0);
}

/* 箭头样式 */
.arrow {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.arrow.rotate {
  transform: rotate(180deg);
}

/* 二级菜单样式 */
.sub-menu {
  padding-left: 1.5rem;
  overflow: hidden;
  max-height: 200px;
  transition: max-height 0.3s ease;
}

.sub-item {
  padding: 0.75rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.85);
}

.sub-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding-left: 0.75rem;
}

.sub-item.active {
  background-color: rgba(79, 70, 229, 0.15);
  color: #c7d2fe;
}

@media (max-width: 768px) {
  /* 在移动设备上显示菜单按钮 */
  .menu-toggle {
    display: flex;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001; /* 确保菜单按钮在最高层级 */
  }

  /* 确保头部有足够空间显示菜单按钮 */
  .head {
    padding-right: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  /* 内容区域保持横向布局 */
  .content {
    flex-direction: row;
    margin-top: 70px;
  }

  /* 侧边栏默认隐藏，使用绝对定位覆盖整个屏幕 */
  .sidebar {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: calc(100vh - 70px);
    transform: translateY(-100%);
    z-index: 999; /* 侧边栏层级低于头部但高于内容 */
    padding: 4rem 1rem 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-out;
  }

  /* 侧边栏显示时从上往下展开 */
  .sidebar.mobile-visible {
    transform: translateY(0);
  }

  /* 显示关闭按钮 */
  .close-btn {
    display: flex;
  }

  /* 移动端主内容区域样式调整 */
  .main-content {
    margin-left: 0;
    height: calc(100vh - 70px);
    overflow-y: auto;
  }

  /* 菜单项样式调整 */
  .item,
  .parent-item {
    text-align: left;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }

  .sub-menu {
    padding-left: 2rem;
  }

  /* 移动端遮罩层样式 */
  .overlay {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998; /* 遮罩层层级低于侧边栏 */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
