<template>
    <div class="searchContainer">
        <el-row justify="center" class="bg">
            <el-col :span="21">
                <SearchCompanyComponent />
            </el-col>
        </el-row>
        <el-row gutter="20" justify="center">
            <el-col :span="4" >
                <SearchNavigationComponent />
            </el-col>
            <el-col :span="18" >
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>

</template>

<script setup lang="ts">

import SearchNavigationComponent from "@/components/search/SearchNavigationComponent.vue";
import SearchCompanyComponent from "@/components/search/SearchCompanyComponent.vue";
import {provide, ref, watch} from "vue";

//默认展示公司
const companyNo = ref('000001')
provide('$company',companyNo)
watch(companyNo, () => {
    console.log("stkNew:"+companyNo.value);
});

</script>

<style scoped>

.el-row{
    padding-top: 20px;
    padding-bottom: 20px;
    max-width: 100%;
    margin: auto !important;
}

.searchContainer{
    min-height: 1000px;
    max-width: 100%;
}
.bg{
    background-image:  url("/src/assets/search/bk3.jpg");
    background-size: 100% 60%;
    background-repeat: no-repeat; /* 防止背景图片重复 */
    padding-top: 70px;
}

</style>
