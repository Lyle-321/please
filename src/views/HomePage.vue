<script setup></script>

<template>
  <!-- 轮播图 -->
  <div class="banner">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/fotiaoq.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>佛跳墙</h5>
            <p>佛跳墙是闽菜魁首，坛启荤香飘四邻，佛闻弃禅跳墙来。</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/zongzi.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>粽子</h5>
            <p>粽叶裹糯米，棱角如心，一口千年乡愁。</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/ping.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>铭记家点心</h5>
            <p>酥脆奶香一口沦陷，港风茶点的灵魂。</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- 新品上市模块 -->
  <div class="recommend py-12 bg-light">
    <div class="container">
      <!-- 模块标题 -->
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-dark mb-3">新品上市</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          精选三大品牌的最新产品，为您带来独特的美味体验
        </p>
      </div>

      <!-- 品牌切换标签 -->
      <div class="brand-tabs mb-8">
        <ul class="nav nav-tabs justify-content-center border-0" id="brandTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active px-6 py-3 text-lg font-semibold rounded-t-lg"
              id="wangdian-tab"
              data-bs-toggle="tab"
              data-bs-target="#wangdian"
              type="button"
              role="tab"
              aria-controls="wangdian"
              aria-selected="true"
            >
              王殿
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link px-6 py-3 text-lg font-semibold rounded-t-lg"
              id="baixingzong-tab"
              data-bs-toggle="tab"
              data-bs-target="#baixingzong"
              type="button"
              role="tab"
              aria-controls="baixingzong"
              aria-selected="false"
            >
              百姓粽
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link px-6 py-3 text-lg font-semibold rounded-t-lg"
              id="mingjiadianxin-tab"
              data-bs-toggle="tab"
              data-bs-target="#mingjiadianxin"
              type="button"
              role="tab"
              aria-controls="mingjiadianxin"
              aria-selected="false"
            >
              铭记家点心
            </button>
          </li>
        </ul>
      </div>

      <!-- 产品展示内容 -->
      <div class="tab-content" id="brandTabsContent">
        <!-- 王殿品牌产品 -->
        <div
          class="tab-pane fade show active"
          id="wangdian"
          role="tabpanel"
          aria-labelledby="wangdian-tab"
        >
          <div class="row g-4">
            <!-- 产品卡片 1 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/fotiaoq.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="王殿招牌佛跳墙"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">招牌佛跳墙</h5>
                  <p class="card-text text-gray-600 mb-4">传统工艺，多种珍贵食材慢炖而成</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 2 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/fotiaoq.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="王殿鲍鱼捞饭"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">鲍鱼捞饭</h5>
                  <p class="card-text text-gray-600 mb-4">精选大连鲍鱼，搭配香软米饭</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 3 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/fotiaoq.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="王殿花胶鸡汤"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">花胶鸡汤</h5>
                  <p class="card-text text-gray-600 mb-4">深海花胶炖制，营养丰富口感醇厚</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 4 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/fotiaoq.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="王殿烧鹅"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">脆皮烧鹅</h5>
                  <p class="card-text text-gray-600 mb-4">传统粤式烧腊，皮脆肉嫩多汁</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 5 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/fotiaoq.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="王殿龙虾饺"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">龙虾饺</h5>
                  <p class="card-text text-gray-600 mb-4">手工制作，鲜虾仁与龙虾肉完美结合</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 6 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/fotiaoq.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="王殿宫廷点心拼盘"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">宫廷点心拼盘</h5>
                  <p class="card-text text-gray-600 mb-4">多种精致点心组合，一次品尝多种风味</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 百姓粽品牌产品 -->
        <div
          class="tab-pane fade"
          id="baixingzong"
          role="tabpanel"
          aria-labelledby="baixingzong-tab"
        >
          <div class="row g-4">
            <!-- 产品卡片 1 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/zongzi.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="百姓粽鲜肉粽"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">经典鲜肉粽</h5>
                  <p class="card-text text-gray-600 mb-4">传统配方，肥瘦相间，口感软糯</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 2 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/zongzi.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="百姓粽豆沙粽"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">豆沙甜粽</h5>
                  <p class="card-text text-gray-600 mb-4">精选红豆沙，甜而不腻</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 3 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/zongzi.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="百姓粽蛋黄肉粽"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">蛋黄肉粽</h5>
                  <p class="card-text text-gray-600 mb-4">咸蛋黄搭配五花肉，香味浓郁</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 4 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/zongzi.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="百姓粽蜜枣粽"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">蜜枣粽</h5>
                  <p class="card-text text-gray-600 mb-4">金丝蜜枣，清甜爽口</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 5 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/zongzi.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="百姓粽火腿粽"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">火腿粽</h5>
                  <p class="card-text text-gray-600 mb-4">精选火腿，咸香可口</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 6 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/zongzi.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="百姓粽杂粮粽"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">杂粮养生粽</h5>
                  <p class="card-text text-gray-600 mb-4">多种谷物混合，营养健康</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 铭记家点心品牌产品 -->
        <div
          class="tab-pane fade"
          id="mingjiadianxin"
          role="tabpanel"
          aria-labelledby="mingjiadianxin-tab"
        >
          <div class="row g-4">
            <!-- 产品卡片 1 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/ping.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="铭记家蛋黄酥"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">经典蛋黄酥</h5>
                  <p class="card-text text-gray-600 mb-4">酥皮松脆，咸蛋黄香，口感层次丰富</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 2 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/ping.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="铭记家奶黄包"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">奶黄包</h5>
                  <p class="card-text text-gray-600 mb-4">香滑奶黄馅，松软包子皮，口感细腻</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 3 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/ping.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="铭记家叉烧包"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">叉烧包</h5>
                  <p class="card-text text-gray-600 mb-4">传统粤式风味，叉烧馅料香甜可口</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 4 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/ping.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="铭记家老婆饼"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">老婆饼</h5>
                  <p class="card-text text-gray-600 mb-4">酥皮层层叠叠，甜馅软糯香甜</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 5 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/ping.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="铭记家杏仁饼"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">杏仁饼</h5>
                  <p class="card-text text-gray-600 mb-4">澳门风味，杏仁香气浓郁</p>
                </div>
              </div>
            </div>

            <!-- 产品卡片 6 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div
                class="card h-100 shadow-sm hover:shadow-md transition-shadow duration-300 border-0 rounded-lg overflow-hidden"
              >
                <img
                  src="../assets/ping.jpg"
                  class="card-img-top h-60 object-cover transition-transform duration-500 hover:scale-105"
                  alt="铭记家榴莲酥"
                />
                <div class="card-body bg-white p-5">
                  <h5 class="card-title font-semibold text-xl mb-2">榴莲酥</h5>
                  <p class="card-text text-gray-600 mb-4">新鲜榴莲肉制作，味道纯正</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 资讯板块 -->
  <div class="information py-12 bg-light">
    <div class="container">
      <!-- 顶部：板块标题 + 一句话副标题 -->
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-3">行业资讯</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          了解食品行业最新动态、品牌发展和节令美食推荐
        </p>
        <div class="more">
          <a href="#">
            <p>查看更多资讯</p>
            <i class="bi bi-chevron-right"></i>
          </a>
        </div>
      </div>

      <!-- 中区：三栏布局 -->
      <div class="row gap-6 align-items-stretch">
        <!-- 左侧：行业新闻 -->
        <div class="col-lg-4 col-md-12 d-flex flex-column">
          <div
            class="card h-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden"
          >
            <div class="ratio ratio-16x9">
              <img
                src="../assets/zongzi.jpg"
                class="card-img-top object-cover"
                alt="食品行业新闻"
              />
            </div>
            <div class="card-body">
              <span class="badge bg-primary text-white mb-2">行业新闻</span>
              <h3
                class="card-title text-xl font-semibold text-gray-800 mb-2 hover:text-primary transition-colors"
              >
                食品行业可持续发展新趋势分析
              </h3>
              <p class="card-text text-gray-600 mb-4 line-clamp-2">
                随着消费者环保意识提升，可持续包装成为行业新焦点，多家企业已开始采用可降解材料，减少塑料使用量。
              </p>
              <div class="flex justify-between items-center mt-auto">
                <span class="text-sm text-gray-500">2025-11-20</span>
                <a href="#" class="text-primary text-sm flex items-center hover:underline">
                  查看更多 <i class="bi bi-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间：品牌动态 -->
        <div class="col-lg-4 col-md-12 d-flex flex-column">
          <div
            class="card h-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden"
          >
            <div class="ratio ratio-16x9">
              <img src="../assets/fotiaoq.jpg" class="card-img-top object-cover" alt="品牌动态" />
            </div>
            <div class="card-body">
              <span class="badge bg-primary text-white mb-2">品牌动态</span>
              <h3
                class="card-title text-xl font-semibold text-gray-800 mb-2 hover:text-primary transition-colors"
              >
                王殿品牌荣获"中华老字号"称号
              </h3>
              <p class="card-text text-gray-600 mb-4 line-clamp-2">
                经过严格评审，我公司"王殿"品牌成功入选第五批国家级非物质文化遗产代表性项目，这是对我司传统工艺的高度认可。
              </p>
              <div class="flex justify-between items-center mt-auto">
                <span class="text-sm text-gray-500">2025-11-18</span>
                <a href="#" class="text-primary text-sm flex items-center hover:underline">
                  查看更多 <i class="bi bi-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：节令推荐 -->
        <div class="col-lg-4 col-md-12 d-flex flex-column">
          <div
            class="card h-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden"
          >
            <div class="ratio ratio-16x9">
              <img src="../assets/ping.jpg" class="card-img-top object-cover" alt="节令推荐" />
            </div>
            <div class="card-body">
              <span class="badge bg-primary text-white mb-2">节令推荐</span>
              <h3
                class="card-title text-xl font-semibold text-gray-800 mb-2 hover:text-primary transition-colors"
              >
                冬至美食推荐：传统与创新的完美结合
              </h3>
              <p class="card-text text-gray-600 mb-4 line-clamp-2">
                冬至来临，我们精选了多款传统与创新结合的美食方案，既有经典的手工饺子，也有现代口味的创意汤圆。
              </p>
              <div class="flex justify-between items-center mt-auto">
                <span class="text-sm text-gray-500">2025-12-20</span>
                <a href="#" class="text-primary text-sm flex items-center hover:underline">
                  查看更多 <i class="bi bi-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  /* 基础高度设置，确保在各种设备上有良好的显示效果 */
  height: 80vh;
  /* 限制最大高度，避免在大屏幕上过高 */
  max-height: 800px;
  /* 确保轮播图容器填满父容器 */
  width: 100%;
  overflow: hidden;
  /* margin-top: 56px; */
}

#carouselExampleCaptions {
  /* 确保轮播图组件填满整个banner容器 */
  height: 100%;
  width: 100%;
}

.carousel-inner {
  /* 确保轮播内容区域填满轮播容器 */
  height: 100%;
  width: 100%;
}

.carousel-item {
  /* 确保每个轮播项都填满整个内容区域 */
  height: 100%;
  width: 100%;
}

.carousel-item img {
  /* 使图片覆盖整个轮播项，同时保持宽高比 */
  height: 100%;
  object-fit: cover;
  /* 移除Bootstrap默认的宽度限制，让图片完全填满 */
  width: 100% !important;
}

/* 响应式设计，在较小的屏幕上调整高度 */
@media (max-width: 768px) {
  .banner {
    height: 50vh;
    max-height: 400px;
  }
}

@media (max-width: 576px) {
  .banner {
    height: 40vh;
    max-height: 300px;
  }
}

/* 推荐产品 */
.recommend {
  padding: 8rem 0;
}
.brand-tabs {
  margin-top: 2rem;
}

.section-news .card-body a:hover h5 {
  color: var(--bs-primary);
}
.cards {
  background-color: #ffefd5;
}

.heigh {
  height: 10rem;
}
.more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  font-size: 1.2rem;
}

.more p {
  margin: 0;
  display: inline-block;
  vertical-align: middle;
}

.more i {
  margin-left: 0.5rem;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.9em; /* 调整图标大小与文字更协调 */
}
</style>
