<script setup lang="ts">
import {ref, toRaw} from "vue";
import router from "@/router";
import {request_news} from "@/utils/request";

const todayRecommendList = ref([]);
const treasuredNewsList = ref([]);

const goToNewsDetail = (content_id : number) =>{
  router.push(`/news_detail/${content_id}`)
}

// Get today news and treasured news
const getTodayNews = () => {
  request_news({
    url: `/news/today_news`,
    method: 'GET'
  }).then((res) => {
    todayRecommendList.value = res.data.data
  }).catch((error) => {
    console.log(error)
  })
}

const getTreasuredNews = () => {
  request_news({
    url: `/news/treasured_news`,
    method: 'GET'
  }).then((res) => {
    treasuredNewsList.value = res.data.data
  }).catch((error) => {
    console.log(error)
  })
}

getTreasuredNews()
getTodayNews()

</script>

<template>
  <el-affix :offset="15">
    <div class="recommend-box">
    <h2>今日推荐</h2>
    <ul>
      <li v-for="item in todayRecommendList" :key="item" @click="goToNewsDetail(item.id)">
        {{ item.title }}
      </li>
    </ul>
  </div>

  <div class="recommend-box">
    <h2>研报精选</h2>
    <ul>
      <li v-for="item in treasuredNewsList" :key="item" @click="goToNewsDetail(item.id)">
        {{ item.title }}
      </li>
    </ul>
  </div>
  </el-affix>

  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped>
.recommend-box {
  width: 300px;
  /*border: 2px solid #c5c5c5;*/
  margin: 10px 0 30px 40px;
  padding: 10px 10px 0;
  font-size: small;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.recommend-box h2 {
  font-size: 18px;
  line-height: 1;
  padding-bottom: 12px;
}

.recommend-box ul {
  padding-left: 25px;
}

.recommend-box li {
  padding-left: 0;
  height: 40px;
  line-height: 1;
  color: black;
}

ul li::marker {
  color: #1877F2;
}

.recommend-box ul li:hover {
  color: #00a4ff;
}

</style>
