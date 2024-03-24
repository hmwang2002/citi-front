<template>
    <div class="table-container">
        <div class="title">
            <div style="font-size: large;font-weight: bold;color: #000000;">发展能力</div>
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
import {getDevC} from "@/api/search";

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
        prop: "indicator",
        label: "发展能力指标",
    },
    {
        prop: "f080601A",
        label: "总资产增长率(%)",
    },
    {
        prop: "f080701B",
        label: "净资产收益率增长率(%)",
    },
    {
        prop: "f080801B",
        label: "基本每股收益增长率(%)",
    },
    {
        prop: "f080901B",
        label: "稀释每股收益增长率(%)",
    },
    {
        prop: "f081001B",
        label: "净利润增长率(%)",
    },
    {
        prop: "f081101B",
        label: "利润总额增长率(%)",
    },
    {
        prop: "f081201B",
        label: "营业利润增长率(%)",
    },
    {
        prop: "f081301B",
        label: "归属于母公司净利润增长率(%)",
    },
];
interface data{
    accper: string;
    f080601A: string;
    f080701B: string;
    f080801B: string;
    f080901B: string;
    f081001B: string;
    f081101B: string;
    f081201B: string;
    f081301B: string;
}

const tableData = ref<data[]>([
    {
        accper: '    ',
        f080601A: '    ',
        f080701B: '    ',
        f080801B: '    ',
        f080901B: '    ',
        f081001B: '    ',
        f081101B: '    ',
        f081201B: '    ',
        f081301B: '    '
    },
]);
const tableDataTotal = ref<data[]>([]);
const stkCd = inject('$company')

fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getDevC(stkCd.value).then(res => {
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
    if (rowIndex === 0) {
        return {
            fontWeight:'bold',
            color:'black',
            fontSize:'14px',
        }
    }
    else if (rowIndex===1){
        return {
            fontWeight:'bold',
            color:'black',
            fontSize:'14px',
            background:'#ecf3f8',
        }
    }
    else {
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
