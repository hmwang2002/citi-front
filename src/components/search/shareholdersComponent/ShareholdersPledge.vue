<template>
    <div class="table-container">
        <div class="title">股权质押</div>
        <el-table
                :data="tableData1"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                stripe
                border
        >
            <el-table-column prop="reptDt" label="统计截止日期" width="200px"/>
            <el-table-column prop="s0301a" label="股东名称" />
            <el-table-column prop="s0302b" label="质押数量"  />
        </el-table>
        <div class="title2">股权冻结</div>
        <el-table
            :data="tableData2"
            :cell-style="cellStyle"
            :header-cell-style="headerStyle"
            stripe
            border
        >
            <el-table-column prop="reptDt" label="统计截止日期" width="200px"/>
            <el-table-column prop="s0301a" label="股东名称" />
            <el-table-column prop="s0302b" label="冻结数量"  />
        </el-table>
        <div class="title2">股权托管</div>
        <el-table
            :data="tableData3"
            :cell-style="cellStyle"
            :header-cell-style="headerStyle"
            stripe
            border
        >
            <el-table-column prop="reptDt" label="统计截止日期" width="200px"/>
            <el-table-column prop="s0301a" label="股东名称" />
            <el-table-column prop="s0302b" label="托管数量"  />
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getStockPledgeFreezeCustody} from "@/api/search";

interface data{
    reptDt: string;
    s0301a: string;
    s0302b: string;
    status: string;
}
const tableData1 = ref<data[]>([
    {
        reptDt: '    ',
        s0301a: '    ',
        s0302b: '    ',
        status:'     ',
    },
]);
const tableData2 = ref<data[]>([
    {
        reptDt: '    ',
        s0301a: '    ',
        s0302b: '    ',
        status:'     ',
    },
]);
const tableData3 = ref<data[]>([
    {
        reptDt: '    ',
        s0301a: '    ',
        s0302b: '    ',
        status:'     ',
    },
]);

const stkCd = inject('$company')

fetch()

watch(stkCd, () => {
    fetch()
});

function fetch(){
    getStockPledgeFreezeCustody(stkCd.value).then(res=>{
        console.log(res.data.data)
        const d: data[] =res.data.data
        let k1 = 0, k2 = 0, k3 = 0;
        for (let i = d.length - 1; i >= 0; i--) {
            if (d[i].status == "Pledge") {
                tableData1.value[k1] = d[i]
                k1++
            } else if (d[i].status == "Freeze") {
                tableData2.value[k2] = d[i]
                k2++
            } else if (d[i].status == "Custody") {
                tableData3.value[k3] = d[i]
                k3++
            }
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
.title2{
    font-size: large;
    font-weight: bold;
    color: #000000;
    margin-top: 20px;
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
