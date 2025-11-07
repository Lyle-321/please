<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 创建DOM引用
const lineChartRef = ref(null)
let lineChart = null

// 初始化折线图
const initLineChart = () => {
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    const colors = ['#5470C6', '#EE6666']
    const option = {
      color: colors,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {},
      grid: {
        top: 70,
        bottom: 50,
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1],
            },
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return (
                  '访问量  ' +
                  params.value +
                  (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                )
              },
            },
          },
          // prettier-ignore
          data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
        },
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0],
            },
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return (
                  '访问量  ' +
                  params.value +
                  (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                )
              },
            },
          },
          // prettier-ignore
          data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '访问量(2015)',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: 'series',
          },
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: '访问量(2016)',
          type: 'line',
          smooth: true,
          emphasis: {
            focus: 'series',
          },
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
        },
      ],
    }

    lineChart.setOption(option)
  }
}

// 组件挂载时初始化图表
onMounted(() => {
  initLineChart()
  // 添加窗口大小改变时的响应
  window.addEventListener('resize', handleResize)
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (lineChart) {
    lineChart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

// 处理窗口大小改变
const handleResize = () => {
  if (lineChart) {
    lineChart.resize()
  }
}
</script>

<template>
  <div class="admin-home">
    <!-- 第一行 -->
    <div class="top">
      <div class="showcard-1">
        <div class="pc-1">
          <img src="@/assets/adminimg/peop.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num">6666666</span>
          <p>用户访问量</p>
        </div>
      </div>
      <div class="showcard-2">
        <div class="pc-2">
          <img src="@/assets/adminimg/goods.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num card-num-2">8888888</span>
          <p>商品浏览量</p>
        </div>
      </div>
      <div class="showcard-3">
        <div class="pc-3">
          <img src="@/assets/adminimg/book.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num card-num-3">9999999</span>
          <p>文章浏览量</p>
        </div>
      </div>
      <div class="showcard-4">
        <div class="pc-4">
          <img src="@/assets/adminimg/peop.svg" style="width: 4rem; height: 4rem" alt="图标" />
        </div>
        <div class="con">
          <span class="card-num card-num-4">7777777</span>
          <p>成交订单量</p>
        </div>
      </div>
    </div>
    <!-- 第二行 -->
    <div class="second">
      <div class="chart-container line-chart-container">
        <h3>折线图</h3>
        <!-- ECharts容器 -->
        <div ref="lineChartRef" class="echarts-container line-chart"></div>
      </div>
      <div class="chart-container pie-chart-container">
        <h3>饼图</h3>
        <div class="piechart-placeholder"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.admin-home {
  padding: 20px;
  /* background-color: #b61313; */
}
.top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  flex-wrap: wrap;
  gap: 15px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .showcard-1,
  .showcard-2,
  .showcard-3,
  .showcard-4 {
    width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .top {
    padding: 0 10px;
    gap: 10px;
  }

  .showcard-1,
  .showcard-2,
  .showcard-3,
  .showcard-4 {
    width: calc(50% - 5px);
    min-width: auto;
  }

  .card-num {
    font-size: 1.6rem;
  }

  .pc-1,
  .pc-2,
  .pc-3,
  .pc-4 {
    padding: 0.6rem;
  }

  .con p {
    font-size: 0.9rem;
    margin: 0.3rem 0 0 0;
  }
}
.showcard-1,
.showcard-2,
.showcard-3,
.showcard-4 {
  display: flex;
  width: calc(25% - 15px);
  min-width: 260px;
  height: 100px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  /* transition:
    transform 0.3s ease,
    box-shadow 0.3s ease; */
}

.pc-1,
.pc-2,
.pc-3,
.pc-4 {
  width: 100px;
  height: 100px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-1 {
  background-color: #7addd9;
}

.pc-2 {
  background-color: #ffbb96;
}

.pc-3 {
  background-color: #b8b6ff;
}

.pc-4 {
  background-color: #ffa5a5;
}
.con {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-num {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.card-num-2 {
  color: #ff7e47;
}

.card-num-3 {
  color: #8785ff;
}

.card-num-4 {
  color: #ff6b6b;
}

.con p {
  text-align: center;
  margin: 0.5rem 0 0 0;
}

/* 第二行 */
.second {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

/* 图表容器样式 */
.chart-container {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
}

.chart-container h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

/* 折线图容器 - 更大的尺寸 */
.line-chart-container {
  width: calc(65% - 10px);
  min-height: 450px;
}

/* 折线图内容区域 */
.line-chart {
  width: 100%;
  height: 400px;
}

/* 饼图容器 - 保持较小的尺寸 */
.pie-chart-container {
  width: calc(35% - 10px);
  min-height: 350px;
}

/* ECharts容器样式 */
.echarts-container {
  width: 100%;
  height: 350px;
}

.piechart-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #999;
}
</style>
