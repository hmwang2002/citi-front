<script setup>
const props = defineProps({
  img: String,
  name: String,
  intro: String
})
</script>

<template>
  <div class="teacher-wrapper">
    <div class="teacher-img">
      <el-image :src="img" fit="cover" style="height: 200px; width: 160px;" />
    </div>
    <div class="teacher-intro">
      <div class="teacher-name">
        {{name}}
      </div>
      <div class="teacher-content">
        {{intro}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.teacher-wrapper{
  display: flex;
  flex-direction: row;
  height: 240px;
  margin: 20px;
}

.teacher-img{
  width: 20%;
}

.teacher-intro{
  background: #EFEFEF;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
}

.teacher-name{
  font-size: 24px;
  padding: 5px;
}

.teacher-content{
  font-size: 16px;
  padding: 5px;
}
</style>
