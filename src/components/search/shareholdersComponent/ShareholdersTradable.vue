<template>
    <div class="table-container">
        <div class="title">十大流通股东</div>
        <div class="btn">
            <el-button :class="index == indexNumber ? 'el-button':'el-button1'" @click="tab(index)" v-for="(item ,index) in optionList"
                       :key="index">{{item}}
            </el-button>
        </div>
        <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                stripe
                border
        >
            <el-table-column prop="s0404a" label="持股排名" width="90px" />
            <el-table-column prop="s0401a" label="股东名称"  min-width="240px"/>
            <el-table-column prop="s0402a" label="持股数量" width="90px" />
            <el-table-column prop="s0403a" label="股份性质" width="90px"/>
            <el-table-column prop="shareholdingRatio" label="持股比例(%)"  width="110px" />
            <el-table-column prop="sharesTradSharesRatio" label="持股数占流通股总股数比例" width="110px" />
            <el-table-column prop="sharesTradASharesRatio" label="持股数占流通A股数比例" width="110px" />
            <el-table-column prop="changeType" label="变动方向" width="90px" />
            <el-table-column prop="changeNum" label="变动数量" width="90px"/>
            <el-table-column prop="changeNumPercentage" label="变动比例(%)" width="110px" />
        </el-table>

    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getTopTenPublicShareholders, getTTShReportDate} from "@/api/search";

let indexNumber = ref(0)
const optionList = ref<string[]>([])

interface data {
    s0404a: string;
    s0401a: string;
    s0402a: string;
    s0403a: string;
    shareholdingRatio: string;
    sharesTradSharesRatio: string;
    sharesTradASharesRatio: string;
    changeType: string;
    changeNum: string;
    changeNumPercentage: string;
}

const tableData = ref<data[]>([
    {
        s0404a: '    ',
        s0401a: '    ',
        s0402a: '    ',
        s0403a: '    ',
        shareholdingRatio: '    ',
        sharesTradSharesRatio: '    ',
        sharesTradASharesRatio: '    ',
        changeType: '    ',
        changeNum: '    ',
        changeNumPercentage: '    '
    },
]);
const stkCd = inject('$company')

fetch()

watch(stkCd, () => {
    fetch()
});

function fetch(){
    getTTShReportDate(stkCd.value).then(res=>{
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
        getTopTenPublicShareholders(stkCd.value,optionList.value[indexNumber.value]).then(res=>{
            const d: data[] =res.data.data[0].data
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
