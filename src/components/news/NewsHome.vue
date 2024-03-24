<template>
  <el-row>
    <el-col :span="16">
      <NewsList class="main-news"/>
    </el-col>
    <el-col :span="4">
      <RightNewsRecommend class="right-news"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import NewsList from "@/components/news/NewsList.vue";
import RightNewsRecommend from "@/components/news/RightNewsRecommend.vue";

</script>

<style scoped>
.main-news {
  margin: 20px 30px 20px 20px;
}

.right-news {
  margin: 20px 20px 20px 20px;
}
</style>