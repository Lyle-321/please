<script setup>
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// 控制导航栏展开状态
const isNavExpanded = ref(false)
const route = useRoute()

// 处理折叠按钮点击事件
const handleToggleClick = () => {
  isNavExpanded.value = !isNavExpanded.value

  // 切换页面滚动状态
  if (isNavExpanded.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 组件卸载时恢复滚动
onUnmounted(() => {
  document.body.style.overflow = ''
})

// 判断当前路由是否匹配导航项
const isActiveRoute = (path) => {
  // 对于相对路径，需要特殊处理
  if (path === './message') {
    return route.path === '/message'
  }
  return route.path === path
}
</script>

<template>
  <!-- 导航栏 -->
  <div class="nav">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler"
          type="button"
          @click="handleToggleClick"
          aria-controls="navbarSupportedContent"
          :aria-expanded="isNavExpanded"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          :class="{ show: isNavExpanded }"
          id="navbarSupportedContent"
        >
          <!-- 语言切换区域 - 会在展开时移动到顶部 -->
          <div v-if="isNavExpanded" class="language-switcher mb-4">
            <div class="language-boxes d-flex gap-3">
              <div class="language-box bg-gray-800 text-white p-2 rounded border border-yellow-500">
                <a href="#" class="text-white">中文简体</a>
              </div>
              <div class="language-box bg-gray-800 text-white p-2 rounded border border-yellow-500">
                <a href="#" class="text-white">中文繁体</a>
              </div>
            </div>
          </div>
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item" :class="{ active: isActiveRoute('/') }">
              <a class="nav-link" :class="{ active: isActiveRoute('/') }" href="/">首页</a>
            </li>
            <li class="nav-item" :class="{ active: isActiveRoute('/product') }">
              <a class="nav-link" :class="{ active: isActiveRoute('/product') }" href="/product"
                >产品介绍</a
              >
            </li>
            <li class="nav-item" :class="{ active: isActiveRoute('/information-center') }">
              <a
                class="nav-link"
                :class="{ active: isActiveRoute('/information-center') }"
                href="/information-center"
                >咨讯中心</a
              >
            </li>
            <li class="nav-item" :class="{ active: isActiveRoute('/contact') }">
              <a class="nav-link" :class="{ active: isActiveRoute('/contact') }" href="/contact"
                >联系我们</a
              >
            </li>
            <li class="nav-item" :class="{ active: isActiveRoute('/my-collection') }">
              <a
                class="nav-link"
                :class="{ active: isActiveRoute('/my-collection') }"
                href="/my-collection"
                >我的收藏</a
              >
            </li>
            <li class="nav-item" :class="{ active: isActiveRoute('/message') }">
              <a class="nav-link" :class="{ active: isActiveRoute('/message') }" href="./message"
                >留言板</a
              >
            </li>
            <!-- 在线客服 - 只在汉堡菜单展开时显示 -->
            <li v-if="isNavExpanded" class="nav-item">
              <a class="nav-link" href="#">在线客服</a>
            </li>
          </ul>
          <!-- 右边区域 - 在桌面版显示 -->
          <div class="log d-none d-lg-block" style="margin-right: 2rem">
            <a href="#">中文简体</a> ||
            <a href="#">中文繁体</a>
          </div>
          <!-- 客服图标 - 只在桌面版显示，移动端菜单中不显示 -->
          <div
            class="kefu-container d-none d-xl-block"
            style="display: inline-block; margin-left: 15px; position: relative"
          >
            <a href="#" style="display: block; position: relative">
              <img src="@/assets/ms.svg" alt="客服" style="width: 30px; height: 30px" />
              <!-- 隐藏的二维码盒子 -->
              <div
                class="qrcode-container"
                style="
                  position: absolute;
                  bottom: -160px;
                  left: 50%;
                  transform: translateX(-50%);
                  display: none;
                  z-index: 1000;
                  padding: 15px;
                "
              >
                <img
                  src="@/assets/feature.png"
                  alt="二维码"
                  style="width: 150px; height: 150px; border: 1px solid #e0e0e0"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- 二级路由出口 -->
  <router-view></router-view>

  <!-- 底部 -->
  <!-- 底部 -->
  <div class="footer bg-gray-800 text-white py-10">
    <div class="container">
      <div class="row">
        <!-- 第一列：快捷导航 -->
        <div class="col-lg-4 col-md-6 mb-6">
          <h3 class="text-xl font-bold mb-4 text-white">快捷导航</h3>
          <ul class="space-y-2 list-unstyled">
            <li><a href="#" class="text-white transition-colors">首页</a></li>
            <li>
              <a href="#" class="text-white transition-colors">关于我们</a>
            </li>
            <li>
              <a href="#" class="text-white transition-colors">产品中心</a>
            </li>
            <li>
              <a href="#" class="text-white transition-colors">新闻资讯</a>
            </li>
            <li>
              <a href="#" class="text-white transition-colors">联系我们</a>
            </li>
            <li>
              <a href="#" class="text-white transition-colors">常见问题</a>
            </li>
          </ul>
        </div>

        <!-- 第二列：产品展示 -->
        <div class="col-lg-4 col-md-6 mb-6">
          <h3 class="text-xl font-bold mb-4 text-white">产品展示</h3>
          <ul class="space-y-2 list-unstyled">
            <li>
              <a href="#" class="text-white transition-colors">王殿品牌</a>
            </li>
            <li>
              <a href="#" class="text-white transition-colors">百姓粽系列</a>
            </li>
            <li>
              <a href="#" class="text-white transition-colors">铭记家点心</a>
            </li>
          </ul>
        </div>

        <!-- 第三列：联系我们 -->
        <div class="col-lg-4 col-md-12 mb-6">
          <h3 class="text-xl font-bold mb-4 text-white">联系我们</h3>
          <ul class="space-y-2 list-unstyled">
            <li class="flex items-center">
              <i class="bi bi-geo-alt mr-1 text-white" style="padding-right: 0.25rem"></i>
              <span class="text-white">地址：北京市朝阳区建国路88号万宁大厦15层</span>
            </li>
            <li class="flex items-center">
              <i class="bi bi-phone mr-1 text-white" style="padding-right: 0.25rem"></i>
              <span class="text-white">电话：</span>
              <a
                href="tel:+861088888888"
                class="text-white hover:text-yellow-300 transition-colors duration-300 ml-1"
                >010-88888888</a
              >
            </li>
            <li class="flex items-center">
              <i class="bi bi-envelope mr-1 text-white" style="padding-right: 0.25rem"></i>
              <span class="text-white">邮箱：</span>
              <a
                href="mailto:info@wanniantrade.com"
                class="text-white hover:text-yellow-300 transition-colors duration-300 ml-1"
                >info@wanniantrade.com</a
              >
            </li>
            <li class="flex items-center">
              <i class="bi bi-clock mr-1 text-white" style="padding-right: 0.25rem"></i>
              <span class="text-white">时间：周一至周日 9:00-18:00</span>
            </li>
          </ul>
          <div class="mt-4">
            <div class="flex space-x-3">
              <a
                href="#"
                class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-800 transition-all duration-300"
              >
                <i class="bi bi-weixin"></i>
              </a>
              <a
                href="#"
                class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-800 transition-all duration-300"
              >
                <i class="bi bi-weibo"></i>
              </a>
              <a
                href="#"
                class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-gray-800 transition-all duration-300"
              >
                <i class="bi bi-qq"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-white">
        <p class="text-white">© 2025 贸易有限公司 版权所有 | 京ICP备12345678号</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  background-color: rgba(255, 0, 0, 0.7);
  /* 不固定头部 */
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  /* height: 100%; */
}
.navbar-nav {
  gap: 5rem;
}

/* 响应式字体大小 - 确保字体随屏幕变小而平滑缩小 */
.nav-link {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  white-space: nowrap;
}

.log a {
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
}

/* 多断点响应式字体调整 - 确保在不同屏幕尺寸下平滑过渡 */
@media (max-width: 1400px) {
  .nav-link {
    font-size: 1.05rem;
  }
  .navbar-nav {
    gap: 3.5rem;
  }
}

@media (max-width: 1300px) {
  .nav-link {
    font-size: 1rem;
  }
  .navbar-nav {
    gap: 3rem;
  }
}

@media (max-width: 1200px) {
  .nav-link {
    font-size: 0.95rem;
  }
  .log a {
    font-size: 0.85rem;
  }
  .navbar-nav {
    gap: 2.5rem;
  }
}

@media (max-width: 1100px) {
  .nav-link {
    font-size: 0.95rem;
  }
  .navbar-nav {
    gap: 2.5rem;
  }
}

@media (max-width: 1020px) {
  .nav-link {
    font-size: 0.9rem;
  }
  .navbar-nav {
    gap: 2rem;
  }
}

@media (max-width: 992px) {
  .nav-link {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
  .navbar-nav {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 0.85rem;
  }
  .navbar {
    padding: 0.75rem 0;
  }
}
.nav-item {
  position: relative;
}
.nav-item .nav-link {
  color: aliceblue;
}
.nav-item:hover .nav-link {
  color: #ffd700; /* 金色/黄色文字 */
}
.nav-item:hover::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ffd700; /* 金色/黄色，比之前稍暗 */
  box-shadow: 0 0 5px 1px rgba(255, 215, 0, 0.7);
}

/* 当前活动导航项样式 - 与悬停样式保持一致 */
.nav-item.active .nav-link {
  color: #ffd700; /* 金色/黄色文字 */
}
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ffd700; /* 金色/黄色，比之前稍暗 */
  box-shadow: 0 0 5px 1px rgba(255, 215, 0, 0.7);
}

.log {
  font-size: 1rem;
  color: aliceblue;
}
.log a {
  color: aliceblue;
  text-decoration: none;
  margin: 0 0.1rem;
}

/* 移动端导航菜单铺满整个页面 */
.navbar-collapse.show {
  position: fixed;
  top: 50px; /* 导航栏高度 */
  left: 0;
  width: 100%;
  /* height: calc(100vh - 60px); */
  height: 100%;
  background-color: rgb(224, 52, 52); /* 使用与导航栏相同的颜色 */
  z-index: 999;
  padding: 2rem;
  margin-top: 0;
  overflow-y: auto;
}

/* 语言切换区域样式 */
.language-switcher {
  text-align: left;
  /* margin-bottom: 1.5rem; */
}

.language-boxes {
  display: flex;
  gap: 1rem;
}

.language-box {
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #ffd700;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.language-box:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-2px);
}

.language-box a {
  color: white !important;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none !important;
}

/* 调整大屏幕(992px-1200px)的布局，避免导航与语言切换按钮挤压 */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .navbar-nav {
    gap: 1rem !important;
    width: auto;
  }

  .nav-item {
    margin-bottom: 0;
    width: auto;
  }

  .nav-link {
    display: inline;
    padding: 0;
  }

  /* 调整导航字体大小以适应空间 */
  .nav-link {
    font-size: 0.9rem;
  }

  /* 确保语言切换按钮在导航栏中正确显示 */
  .log {
    margin-left: auto;
    white-space: nowrap;
  }
}

/* 调整移动端导航项的样式 */
@media (max-width: 991.98px) {
  .navbar-nav {
    gap: 0.5rem !important;
    width: 100%;
  }

  .nav-item {
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .nav-link {
    display: block;
    padding: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

/* 客服二维码显示样式 */
.kefu-container a:hover .qrcode-container {
  display: block !important;
}

.footer {
  background-color: #262626;
  margin-top: 8rem;
  padding: 4rem 0;
  z-index: 1000;
}
.footer ul li a {
  text-decoration: none;
}
.footer ul li a:hover {
  color: #ffd700 !important;
}
.border-t {
  margin-top: 4rem;
}
</style>
