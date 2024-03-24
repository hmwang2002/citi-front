<script setup>

import {Promotion} from "@element-plus/icons-vue";
import {watch} from "vue";

const emits = defineEmits(['input', 'send']);
const inputText = defineModel()

watch(inputText, (newVal) => {
    emits('input', newVal);
});

</script>

<template>
  <div class="input-container">
    <el-input
      type="textarea"
      class="input"
      v-model="inputText"
    />
    <div class="send-icon" @click="emits('send')">
      <el-icon :size="20">
        <Promotion/>
      </el-icon>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
  background: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
}

.send-icon {
  flex-shrink: 0;
  width: 50px;
  height: 36px;
  color: white;
  cursor: pointer;
  background: #1877F2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
}


:deep(.el-textarea__inner) {
  height: 100% !important;
  box-shadow: none !important;
  resize: none !important;
  outline: none !important;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.input{
  height: 100%;
}
</style>
