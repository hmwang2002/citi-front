<script setup>
import {Delete, Edit, MoreFilled} from "@element-plus/icons-vue";
import groupLogo from '../../../assets/chat/chat-group.png'
import groupLogoActive from '../../../assets/chat/chat-group-active.png'
import {ref} from "vue";
import {updateTitle} from "@/api/chat_manage.ts";
import {ElNotification} from "element-plus";

const isVisible = ref(false)

const props = defineProps({
  content: String,
  time: String,
  id: Number,
  isActive: Boolean
})

const isEditActive = ref(false)
const newTitle = ref(props.content)

const handleEdit = () => {
  updateTitle(props.id, newTitle.value).then(res => {
    isEditActive.value = false
    isVisible.value = false
    console.log("修改NID：" + props.id + "成功，新标题为：" + newTitle.value)
    emits('edit-title')
    ElNotification({
      message: '修改成功', type: 'success',
    })
  })
}

const emits = defineEmits(['delete-chat-by-id','edit-title'])
</script>

<template>
  <div :class="['chat-history-wrapper', isActive ? 'active' : 'default']">
    <img class="chat-history-icon" :src= "isActive ? groupLogoActive : groupLogo" alt="对话"/>
    <div class="chat-content-wrapper">
      <div class="chat-edit-box" v-if="isEditActive">
        <el-input v-model="newTitle"/>
      </div>
      <div class="chat-history-content" v-else>
        {{content}}
      </div>
      <div class="chat-history-time">
        {{time}}
      </div>
    </div>
    <el-popover placement="right" offset="24" :visible="isVisible">
      <div>
        <div class="op-wrapper confirm"  @click="handleEdit" v-if="isEditActive">
          <el-icon class="op-icon" size="16"><Edit /></el-icon>
          确认修改
        </div>
        <div class="op-wrapper" @click="isEditActive=true" v-else>
          <el-icon class="op-icon" size="16"><Edit /></el-icon>
          重命名对话
        </div>
        <el-divider style="margin: 6px 0 6px 0; visibility: hidden"/>
        <div class="op-wrapper delete" @click="emits('delete-chat-by-id', id); isVisible=false">
          <el-icon class="op-icon" size="16" color="#FA2832"><Delete /></el-icon>
          删除对话
        </div>
      </div>
      <template #reference>
          <el-icon color="#9A9A9A"  @click.stop="isVisible = !isVisible; isEditActive=false"><MoreFilled /></el-icon>
      </template>
    </el-popover>
  </div>


</template>

<style scoped>
.chat-history-wrapper{
  cursor:pointer;
  padding: 12px;
  margin: 12px 0 12px 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.default {
    border: #EFEFEF 1px solid;
  }
  &.active {
    border: #1877F2 2px solid;
  }
}

.chat-history-wrapper:hover{
  background-color: rgba(239, 239, 239, 0.99);
}

.chat-history-icon{
  width: 20px;
  height: 20px;
}

.chat-content-wrapper{
  width: 70%;
}

.chat-history-content{
  font-size: 16px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-history-time{
  font-size: 12px;
  color: #9A9A9A;
}

.op-wrapper{
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  .op-icon{
    margin-right: 8px;
  }
  &.confirm{
    color: #1877F2;
  }
  &.delete{
    color: #FA2832;
  }
}
</style>
