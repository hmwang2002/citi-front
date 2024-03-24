<script setup>
const props = defineProps({
  img: String,
  name: String,
  intro: String
})
</script>

<template>
  <div class="member-wrapper">
    <div class="member-img">
      <el-image :src="img" fit="cover" style="height: 140px; width: 100px;" />
    </div>
    <div class="member-intro">
      <div class="member-name">
        {{name}}
      </div>
      <div class="member-content">
        {{intro}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-wrapper{
  display: flex;
  flex-direction: row;
  width: calc(33%);
  align-items: start;
  justify-content: center;
  padding: 5px;
  margin-bottom: 20px;
}

.member-img{
  height: 140px;
}

.member-intro{
  background: #EFEFEF;
  height: 300px;
}

.member-name{
  font-size: 16px;
  padding: 10px;
}

.member-content{
  font-size: 12px;
  padding: 10px;
}
</style>
