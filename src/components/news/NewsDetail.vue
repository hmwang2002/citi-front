<script setup lang="ts">

import RightNewsRecommend from "@/components/news/RightNewsRecommend.vue";
import NewsDetailContent from "@/components/news/NewsDetailContent.vue";

</script>

<template>
  <el-row>
    <el-col :span="16">
      <NewsDetailContent  class="main-news"/>
    </el-col>

    <el-col :span="4">
      <RightNewsRecommend class="right-news"/>
    </el-col>
  </el-row>
</template>

<style scoped>
.main-news {
  margin: 20px 30px 20px 20px;
}

.right-news {
  margin: 20px 20px 20px 20px;
}
</style>