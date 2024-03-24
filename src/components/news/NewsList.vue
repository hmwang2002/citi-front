<script setup lang="ts">
import {ref} from 'vue'
import router from "@/router";
import {request_news} from "@/utils/request";
const count = ref(0)

const latestNewsList = ref([]);
const treasuredNewsList = ref([]);
const latestNewsImageList = ref([]);


const urls = [
  'https://cdn.pixabay.com/photo/2014/11/25/08/13/dollar-544956_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/06/17/17/north-america-1803504_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/07/01/13/28/announcement-3509489_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/10/13/15/43/boy-6706970_1280.jpg'
]


// axios.get("http://localhost:8300/")
const load = () => {
  count.value += 2
}

const goToNewsDetail = (content_id : number) =>{
  router.push(`/news_detail/${content_id}`)
}

const getLatestNews = () => {
  request_news({
    url: `/news/latest_news`,
    method: 'GET',
    params: {
      count: 20
    }
  }).then((res) => {
    latestNewsList.value = res.data.data
  }).catch((error) => {
    console.log(error)
  })
}

const getTreasuredNews = () => {
  request_news({
    url: `/news/treasured_news`,
    method: 'GET',
    params: {
      count: 4
    }
  }).then((res) => {
    treasuredNewsList.value = res.data.data
  }).catch((error) => {
    console.log(error)
  })
}

getLatestNews()
getTreasuredNews()

</script>

<script lang="ts">
export default {
  data() {
    return {
      activeIndex: 0,
    }
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    startCarousel() {
      setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % 4;
      }, 700);
    }
  }
}
</script>

<template>

  <div class="container">
    <div class="left">
      <el-carousel height="300px" interval="700" direction="vertical" pause-on-hover="false">
        <el-carousel-item v-for="item in urls" :key="item">
          <el-image :src="item" />
        </el-carousel-item>
      </el-carousel>
<!--      <el-image :src="latestNewsImageList[activeIndex]" fit="fill" style="width: 500px; height: 300px"/>-->
    </div>
    <div class="right">
      <ul>
        <li v-for="(item, index) in treasuredNewsList" :key="item"  @click="goToNewsDetail(item.id)" :class="{ newsactive: index === activeIndex }">
          {{item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}}
        </li>
      </ul>
    </div>
  </div>

  <div class="latest-news">
    <h2>最新消息</h2>
    <ul v-infinite-scroll="load" class="latest-news-list">
      <li v-for="item in latestNewsList" :key="item">
        <h3 @click="goToNewsDetail(item.id)">{{item.title}}</h3>
        <p>
          <span class="source">{{item.source}}</span>
          <span class="time">{{ item.date }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  margin-left: 45px;
  margin-bottom: 10px;
  margin-top: 10px;
  /*padding-right: 40px;*/
  width: 95%;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.left {
  width: 500px;
  height: 100%;
}

.right {
  flex: 1;
  height: 100%;
  margin-left: 5px;
}

.right ul {
  list-style: none;
  padding: 0;
}

.right ul li {
  padding-left: 20px;
  padding-top: 25px;
  height: 75px;
  font-size: 16px;
  background-color: #f7f8f8;
}

.right ul li:hover {
  border-right: 3px solid #00a4ff;
  color: #00a4ff;
  background-color: white;
}

.latest-news h2 {
  margin-bottom: 12px;
  margin-left: 45px;
  font-size: 18px;
  line-height: 1;
}

.latest-news-list {
  margin: 0;
  list-style: none;
}

.latest-news-list li {
  float: left;
  margin: 5px;
  border: 1px solid #c5c5c5;
  width: 100%;
}

.latest-news-list li h3 {
  margin: 10px 15px 10px;
  font-size: 16px;
  color: black;
  font-weight: 400;
}

.latest-news-list li h3:hover {
  color: #00a4ff;
}
.latest-news-list li p {
  font-size: 12px;
}

.source {
  float: left;
  margin: 0 15px 10px;
}

.time {
  float: right;
  margin: 0 15px 10px;
}

.newsactive{
  border-right: 3px solid #00a4ff;
  color: #00a4ff;
  background-color: white;
  transition: 0.2s;
}
</style>
