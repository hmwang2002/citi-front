<template>
    <div class="table-container">
        <div class="title">
            <div style="font-size: large;font-weight: bold;color: #000000;">利润表</div>
            <div>单位：万元</div>
        </div>
        <div class="btn">
            <el-button :class="index == number ? 'el-button':'el-button1'" @click="tab(index)" v-for="(item ,index) in dataList"
                       :key="index">{{item.option}}
            </el-button>
        </div>
        <el-table
            :data="DemoTableData"
            :cell-style="cellStyle"
            :show-header="false"
            stripe
            border
        >
            <el-table-column
                v-for="(item, index) in DemoTableHeader"
                :key="index"
                :prop="item"
                :width="index === 0 ? '220px' : ''"
            >
            </el-table-column>
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getProfitTable} from "@/api/search";

let number = ref(0)
const dataList = [
    {option: '全部'},
    {option: '年报'},
    {option: '三季报'},
    {option: '中报'},
    {option: '一季报'},
]
function tab(index) {
    number.value = index;
    console.log("date index:"+number.value)
    let k = 0
    if (index == 0){
        for (let i = tableDataTotal.value.length-1; i >= 0  && k<4; i--) {
            tableData.value[k]=tableDataTotal.value[i]
            k++;
        }
    }
    if (index == 1){
        for (let i = tableDataTotal.value.length-1; i >= 0  && k<4; i--) {
            if (tableDataTotal.value[i].accper.substring(5,7)=="12"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }else if (index == 2){
        for (let i = tableDataTotal.value.length-1; i >= 0  && k<4; i--) {
            if (tableDataTotal.value[i].accper.substring(5,7)=="09"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }else if (index == 3){
        for (let i = tableDataTotal.value.length-1; i >= 0  && k<4; i--) {
            if (tableDataTotal.value[i].accper.substring(5,7)=="06"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }else if (index == 4){
        for (let i = tableDataTotal.value.length-1; i >= 0  && k<4; i--) {
            if (tableDataTotal.value[i].accper.substring(5,7)=="03"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }
    DemoTableData.value=getValues();
    DemoTableHeader.value = getHeaders();
}

const headers = [
    {
        prop: "accper",
        label: "截止日期",
    },
    {
        prop: "b001000000",
        label: "利润总额",
    },
    {
        prop: "b001300000",
        label: "营业利润",
    },
    {
        prop: "b001100000",
        label: "营业总收入",
    },
    {
        prop: "b001200000",
        label: "营业总成本",
    },
    {
        prop: "b001207000",
        label: "税金及附加",
    },
    {
        prop: "b002000000",
        label: "净利润",
    },
    {
        prop: "b002000101",
        label: "归属于母公司所有者的净利润",
    },
];
interface data{
    accper:string;
    b001000000: string,
    b001300000:string,
    b001100000:string,
    b001200000: string,
    b001207000:string,
    b002000000:string,
    b002000101:string,
}

const tableData = ref<data[]>([
    {
        accper: '     ',
        b001000000: '     ',
        b001300000:'     ',
        b001100000:'     ',
        b001200000: '     ',
        b001207000:'     ',
        b002000000:'     ',
        b002000101:'     ',
    },

]);

const tableDataTotal = ref<data[]>([]);

const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getProfitTable(stkCd.value).then(res => {
        console.log(res.data.data)
        const d: data[] = res.data.data
        for (let i = 0; i < d.length; i++) {
            tableDataTotal.value[i] = d[i]
        }
        let k = 0;
        for (let i = d.length - 1; i >= 0 && i > d.length - 5; i--) {
            tableData.value[k] = d[i]
            k++
        }
        DemoTableData.value = getValues();
        DemoTableHeader.value = getHeaders();
    });
}

let DemoTableHeader = ref(getHeaders());
let DemoTableData = ref(getValues());
function getHeaders() {
    return tableData.value.reduce(
        (pre, cur, index) => pre.concat(`value${index}`),
        ["title"]
    );
}
function getValues() {
    return headers.map((item) => {
        return tableData.value.reduce(
            (pre, cur, index) =>
                Object.assign(pre, { ["value" + index]: cur[item.prop] }),
            { title: item.label }
        );
    });
}
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0||rowIndex===0) {
        return {
            fontWeight:'bold',
            color:'black',
            fontSize:'14px',
        }
    }else {
        return {
            color: 'black'
        }
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-left: auto;
    margin-right: auto;}
.btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    gap: 10px;
}
.el-button{
    background-color: #1876f0;
    color: #ffffff;
    border: #1876f0 1px solid;
}
/*未选中样式*/
.el-button1{
    background-color: #ffffff;
    color: #000000;
    border: #BBBBBB 1px solid;
}
.el-table{
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 90%;
}
</style>
