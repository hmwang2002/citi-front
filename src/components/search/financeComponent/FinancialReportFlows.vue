<template>
    <div class="table-container">
        <div class="title">
            <div style="font-size: large;font-weight: bold;color: #000000;">现金流量表</div>
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
import {getCashFlow} from "@/api/search";

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
        prop: "c001100000",
        label: "经营活动现金流入小计 ",
    },
    {
        prop: "c001200000",
        label: "经营活动现金流出小计",
    },
    {
        prop: "c001000000",
        label: "经营活动产生的现金流量净额",
    },
    {
        prop: "c002100000",
        label: "投资活动产生的现金流入小计",
    },
    {
        prop: "c002200000",
        label: "投资活动产生的现金流出小计",
    },
    {
        prop: "c002000000",
        label: "投资活动产生的现金流量净额",
    },
    {
        prop: "c003100000",
        label: "筹资活动现金流入小计",
    },
    {
        prop: "c003200000",
        label: "筹资活动现金流出小计",
    },
    {
        prop: "c003000000",
        label: "筹资活动产生的现金流量净额",
    },
];
interface data{
    accper:string;
    c001100000: string,
    c001200000:string,
    c001000000:string,
    c002100000: string,
    c002200000:string,
    c002000000:string,
    c003100000:string,
    c003200000:string,
    c003000000:string,

}
const tableData = ref<data[]>([
    {
        accper: '     ',
        c001100000: '     ',
        c001200000: '     ',
        c001000000: '     ',
        c002100000: '     ',
        c002200000: '     ',
        c002000000: '     ',
        c003100000: '     ',
        c003200000: '     ',
        c003000000: '     ',
    },
]);
const tableDataTotal = ref<data[]>([]);

const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getCashFlow(stkCd.value).then(res => {
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
