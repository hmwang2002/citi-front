<script setup lang="ts">
import {ref, watch} from "vue";
import {request_news} from "@/utils/request";
import { useRoute, useRouter } from 'vue-router';


const newsContent = ref({})
const router =  useRouter();
const route = useRoute();
const treasuredNewsList = ref([]);

const urls = [
  'https://cdn.pixabay.com/photo/2014/11/25/08/13/dollar-544956_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/06/17/17/north-america-1803504_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/07/01/13/28/announcement-3509489_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/10/13/15/43/boy-6706970_1280.jpg'
]

const getNewsContent = () => {
  request_news({
    url: `/news/news`,
    method: 'GET',
    params: {
      id: router.currentRoute.value.params.id
    }
  }).then((res) => {
    newsContent.value = res.data.data
  }).catch((error) => {
    console.log(error)
  })
}

const getTreasuredNews = () => {
  request_news({
    url: `/news/treasured_news`,
    method: 'GET',
    params: {
      count: 3
    }
  }).then((res) => {
    treasuredNewsList.value = res.data.data
  }).catch((error) => {
    console.log(error)
  })
}

const goToNewsDetail = (content_id : number) =>{
  router.push(`/news_detail/${content_id}`)
}

getNewsContent()
getTreasuredNews()

watch(
  () => route.params.id,
  (newPath,  oldPath) => {
    getNewsContent()
    window.scrollTo(0, 0)
  }
)
</script>

<template>
  <div class="leftContent">
    <h1>{{newsContent.title}}</h1>
    <p class="timeAndAuthor">
      <span class="source">{{newsContent.source}}</span>
      <span class="time">{{newsContent.date}}</span>
    </p>
    <hr>
    <div class="content">
      <p class="retraction" style="white-space: pre-wrap;">
        {{ newsContent.content}}
      </p>
    </div>
  </div>

  <div class="recommend">
    <ul>
      <li  v-for="(item, index) in treasuredNewsList" :key="item" @click="goToNewsDetail(item.id)">
        <el-image :src="urls[index]" fit="cover" style="height: 140px; width: 100%;" />
        <h3>{{item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}}</h3>
        <p>{{item.date}}</p>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.leftContent {
  margin: 0 auto;
}
h1 {
  margin-left: 40px;
  margin-bottom: 25px;
}

.timeAndAuthor {
  width: 95%;
}

.source {
  float: left;
  margin-left: 50px;
  font-size: 13px;
}

.time {
  float: right;
  margin-right: 10px;
  font-size: 13px;
}

.content {
  margin-top: 10px;
}

hr {
  margin: 0 auto;
  width: 90%;
}

.retraction {
  margin: 0 auto;
  text-indent: 2em;
  width: 90%;
}

.leftContent {
  margin: 0 auto;
}

.recommend {
  margin-top: 20px;
  padding-left: 30px;
}

.recommend li {
  float: left;
  margin-right: 15px;
  margin-left: 10px;
  margin-bottom: 15px;
  width: 228px;
  height: 240px;
  background-color: #fff;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.recommend li:nth-child(3n) {
  margin-right: 0;
}

.recommend li h3 {
  padding: 10px 10px 5px;
  font-size: 14px;
  color: #050505;
  font-weight: 400;
}

.recommend li p {
  padding: 0 20px;
  font-size: 12px;
  color: #999;
}

.recommend li h3:hover {
  color: #00a4ff;
  background-color: white;
}

.recommend li span {
  color: #ff7c2d;
}

</style>
