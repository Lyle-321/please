<template>
  <div class="breadcrumb-nav">
    <router-link :to="{ name: 'home' }" class="breadcrumb-link">首页</router-link>
    <span class="breadcrumb-separator">/</span>
    <router-link :to="{ name: 'product' }" class="breadcrumb-link">产品介绍</router-link>
    <span class="breadcrumb-separator">/</span>
    <router-link :to="{ name: 'product' }" class="breadcrumb-link">食品详情</router-link>
  </div>
</template>
<style scoped>
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
  color: #e34949;
}
</style>
