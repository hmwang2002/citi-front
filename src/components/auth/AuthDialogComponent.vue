
<script setup>
// 是否显示登录框
import {defineEmits, defineProps, ref, watch} from "vue";
import EmailLoginComponent from "@/components/auth/EmailLoginComponent.vue";

const emits = defineEmits(['close-dialog-event']);
const props = defineProps({
  //是否显示
  isVisible: {
    type: Boolean,
    default: false,
  }
});
//1登录 2微信
const isStatus = ref(1)
// eslint-disable-next-line vue/no-dupe-keys
const isVisible = ref(false)

watch(
    () => props.isVisible,
    (newValue) => {
      isVisible.value = newValue;
    },
    {
      immediate: true,
    }
);




/**
 * 切换SWITCH状态
 * @param index
 */
const onChangeStatus = (index) => {
  if (isStatus.value !== index) {
    isStatus.value = index
  }
}
/**
 * 关闭登录框
 */
const onClose = () => {
  emits('close-dialog-event');
}


</script>


<template>
  <el-dialog
      v-model="isVisible"
      :show-close="false"
      align-center
      width="460px"
      @close="onClose"
      style="  border-radius:  8px;"
  >
    <div class="auth-container">
      <!--登录-->
      <div class="title-container">
        <div class="title-flex">
          登录后体验完整功能
        </div>

        <div v-if="isStatus===1">
          <email-login-component @change-status-event="onChangeStatus" @on-close="onClose"/>
        </div>
        <div v-if="isStatus===2">
          <we-chat-login-component/>
        </div>
        <el-divider class="el-driver">
          <div class="other">
            其他登录方式
          </div>
        </el-divider>
        <div class="other-flex">

<!--          <img :src="require('../../assets/app/email.svg')" @click="onChangeStatus(1)" v-show="isStatus===2"-->
<!--               alt="">-->
<!--          <img :src="require('../../assets/app/wechat.svg')" @click="onChangeStatus(2)" v-show="isStatus===1"-->
<!--               alt="">-->

        </div>
      </div>
    </div>
  </el-dialog>


</template>

<style scoped>

.auth-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 70px 40px;

}


.other {
  text-align: center;
  font-size: 12px;
  color: #8d8d8d;

}

.el-driver {

  margin-top: 40px;
}

.other-flex {
  display: flex;
  justify-content: center;
  align-items: center
}

.other-flex img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: pointer;
  margin: 0 8px;
}

.title-container {
  width: 100%
}

.title-flex {
  margin-bottom: 50px;
  text-align: center;
  font-size: 22px;
  color: #000000;
  width: 100%
}


</style>

