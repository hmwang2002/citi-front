<template>
    <div class="table-container">
        <div class="title">限售解禁</div>
        <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                :default-sort="{ prop: 'date', order: 'descending' }"
                stripe
                border
        >
            <el-table-column prop="shareholderName" label="股东名称" width="220" />
            <el-table-column prop="circulationDate" label="解禁日期"  width="110" />
            <el-table-column prop="circulationShares" label="解禁数量" width="90"/>
            <el-table-column prop="listedDate" label="实际解禁日期" width="110"/>
            <el-table-column prop="listedShares" label="实际解禁数量"  />
            <el-table-column prop="lockShares" label="总限售股数"/>
            <el-table-column prop="proportion" label="本期解禁流通股数占总限售股比例" width="140"  />
            <el-table-column prop="listedSharesType" label="解禁股份类型" width="140"  />
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getRestrictedSale} from "@/api/search";

interface data{
    shareholderName: string;
    circulationDate: string;
    circulationShares: string;
    listedDate: string;
    listedShares: string;
    lockShares: string;
    proportion: string;
    listedSharesType: string;
}
const tableData = ref<data[]>([
    {
        shareholderName: '    ',
        circulationDate: '    ',
        circulationShares: '    ',
        listedDate: '    ',
        listedShares: '    ',
        lockShares: '    ',
        proportion: '    ',
        listedSharesType: '    '

    },
]);
const stkCd = inject('$company')

fetch()

watch(stkCd, () => {
    fetch()
});

function fetch(){
    getRestrictedSale(stkCd.value).then(res=>{
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
    max-width: 1000px;
}
</style>
