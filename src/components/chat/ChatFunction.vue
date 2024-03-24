<script setup lang="ts">
import LeftOperationComponent from "@/components/chat/LeftOperationComponent.vue";
import RightWelcomeComponent from "@/components/chat/RightWelcomeComponent.vue";
import RightViewComponent from "@/components/chat/RightViewComponent.vue";
import {ref} from "vue";

const rightRef = ref(null)
const leftRef = ref(null)
const replaceChat = (data, currentHistoryId) => {
  rightRef.value.replaceChatContent(data, currentHistoryId)
}

const refreshHistory = () => {
  leftRef.value.refreshList()
}

const scrollToBottom = () => {
  rightRef.value.nextTickScroll()
}

</script>

<template>
  <div class="body">
    <!--    左侧操作菜单-->
    <left-operation-component ref="leftRef"
                              @replace-chat="replaceChat"
                              @scroll-bottom="scrollToBottom"/>

    <!--右侧聊天-->
    <right-view-component ref="rightRef"
                          @refresh-history="refreshHistory"/>

  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex: 1;
}

</style>
