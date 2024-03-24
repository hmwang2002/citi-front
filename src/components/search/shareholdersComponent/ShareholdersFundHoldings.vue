<template>
    <div class="table-container">
        <div class="title">基金持股</div>
        <div class="btn">
            <el-button :class="index == indexNumber ? 'el-button':'el-button1'" @click="tab(index)" v-for="(item ,index) in optionList"
                       :key="index">{{item}}
            </el-button>
        </div>
        <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                :default-sort="{ prop: 'number', order: 'descending' }"
                stripe
                border
        >
            <el-table-column prop="fundCd" label="基金代码" />
            <el-table-column prop="fundNm" label="基金名称"   width="450px" />
            <el-table-column prop="mconme" label="管理公司名称" width="150px" />
            <el-table-column prop="fundHold" label="持有股数" />
            <el-table-column prop="holdPerct" label="持股比例"  />
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getFundHoldings, getFundHoldingsReportDate} from "@/api/search";


let indexNumber = ref(0)
const optionList = ref<string[]>([])

interface data{
    fundcd: string;
    fundnm:string;
    mconme: string;
    fundhold: string;
    holdperct: string;
}

const tableData = ref<data[]>([
    {
        fundcd:  '    ',
        fundnm: '    ',
        mconme: '    ',
        fundhold: '    ',
        holdperct: '    ',
    },
]);
const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch(){
    getFundHoldingsReportDate(stkCd.value).then(res=>{
        let k = 0
        const d:string[] = res.data.data
        for (let i = d.length-1; i >= 0 && i > d.length-6; i--) {
            optionList.value[k] = d[i]
            console.log("date show:"+optionList.value[k])
            k++
        }
        fetchData()
    })
}
function tab(index) {
    indexNumber.value = index;
    console.log("date index:"+indexNumber.value)
    fetchData()
}

function fetchData(){
    if (optionList.value[indexNumber.value]!=null){
        getFundHoldings("000001",optionList.value[indexNumber.value]).then(res=>{
            const d: data[] =res.data.data
            for (let i = 0; i < d.length; i++) {
                tableData.value[i] = d[i]
            }
        })
    }
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
.btn{
    margin-left: 30px;
}
.el-button{
    margin-top: 10px;
    background-color: #1876f0;
    color: #ffffff;
    border: #1876f0 1px solid;
    margin-left: 20px;
}
/*未选中样式*/
.el-button1{
    margin-top: 10px;
    background-color: #ffffff;
    color: #000000;
    border: #BBBBBB 1px solid;
    margin-left: 20px;
}
.el-table{
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 90%;
}
</style>
