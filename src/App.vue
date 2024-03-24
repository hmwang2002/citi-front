<script setup lang="ts">
import {RouterView } from 'vue-router'
import TopNavigationComponent from "@/components/menu/TopNavigationComponent.vue";
import TopIndexComponent from '@/components/menu/TopIndexComponent.vue'
</script>

<template>
  <div class="all">
    <top-index-component />
    <top-navigation-component/>
    <router-view/>
<!--    <bottom-component/>-->
  </div>
</template>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  letter-spacing: 1px;
  color: var(--el-text-color-primary);
  line-height: 1.6;
  font-family: SF;
}

.all{
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
