<script setup>
const props = defineProps({
  name: String,
  index: Number,
  ratio: Number

})
</script>

<template>
  <div class="index-item">
    <div class="index-item-name">
      {{name}}
    </div>
    <div class="index-item-index">
      {{index}}
    </div>
    <div :class="{'index-item-ratio': ratio >= 0.0, 'index-item-ratio-neg': ratio < 0.0}">
      {{ratio}}%
    </div>
  </div>
</template>

<style scoped>
.index-item{
    display: inline-block;
    padding: 0 8px 0 8px;
}

.index-item-name{
  display: inline-block;
  color: white;
  font-weight: bold;
  padding: 0 4px 0 4px;
}

.index-item-index{
  display: inline-block;
  color: white;
  padding: 0 4px 0 4px;
}

.index-item-ratio{
  display: inline-block;
  color: limegreen;
  padding: 0 4px 0 4px;
}

.index-item-ratio-neg{
  display: inline-block;
  color: orangered;
  padding: 0 4px 0 4px;
}


</style>