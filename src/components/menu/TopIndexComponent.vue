<script setup>
import {ref} from "vue";
import store from "@/stores";
import { fakeIndexList } from '@/assets/data.js'
import IndexItem from '@/components/menu/IndexItem.vue'
import MarqueeText from 'vue-marquee-text-component'

// 指数列表
const indexList = ref([])
indexList.value = fakeIndexList

const indexText = ref('')
for (let i = 0; i < indexList.value.length; i++){
  const item = indexList.value[i];
  indexText.value = indexText.value + '\t  ' + item.name
  indexText.value = indexText.value + '\t  ' + item.index
  indexText.value = indexText.value + '\t  ' + item.ratio
  indexText.value = indexText.value + '   '
}

const isHover = ref(true)

const handleMouseover = () => {
  isHover.value = false;
};

const handleMouseout = () => {
  isHover.value = true;
};

</script>


<template>
  <div class="index-wrapper">
<!--    <marquee-text :repeat="5" :duration="50" :paused="isHover" @onmouseover="handleMouseover" @onmouseout="handleMouseout">-->
    <marquee-text :repeat="5" :duration="50">
      <IndexItem class="index-item" v-for="(item, index) in indexList"
                 :key="index" :name="item.name" :index="item.index" :ratio="item.ratio"
      />
    </marquee-text>

  </div>
</template>

<style scoped>
.index-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  width: 100vw;
  height: 50px;
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

</style>