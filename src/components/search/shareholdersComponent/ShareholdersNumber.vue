<template>
    <div class="table-container">
        <div class="title">股东人数</div>
        <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                stripe
                border
        >
            <el-table-column prop="reptDt" label="统计截止日期" width="200px"/>
            <el-table-column prop="s0101" label="股东人数(户)" />
            <el-table-column prop="changeRate" label="股东人数变动幅度(%)"  />
        </el-table>
    </div>

</template>

<script setup lang="ts" >

import {inject, ref, watch} from "vue";
import {getShareholders} from "@/api/search";

interface data{
    reptDt: string;
    s0101: string;
    changeRate: string;
}
const tableData = ref<data[]>([
    {
        reptDt:'',
        s0101: '',
        changeRate:'',
    },
]);
const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch(){
    getShareholders(stkCd.value).then(res=>{
        console.log(res.data.data)
        const d: data[] =res.data.data
        let k = 0;
        for (let i = d.length-1; i >= 0; i--) {
            tableData.value[k] = d[i]
            k++
        }
    });
}
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    return {
        color: 'black'
    }
}
const headerStyle = ({ row, column, rowIndex, columnIndex }) => {
    return {
        color: 'black'
    }
}
</script>

<style scoped>
.table-container{
    border: #e1e3e5 1px solid;
    border-radius: 10px;
    padding: 20px 15px 50px ;
    margin-bottom: 50px;
}
.title{
    font-size: large;
    font-weight: bold;
    color: #000000;
    margin-left: 50px;
}
.el-button{
    margin-top: 10px;
    background-color: #1876f0;
    color: #ffffff;
    margin-left: 50px;
}
.el-table{
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 90%;
}
</style>
