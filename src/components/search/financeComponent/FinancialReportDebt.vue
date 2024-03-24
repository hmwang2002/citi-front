<template>
    <div class="table-container">
        <div class="title">
            <div style="font-size: large;font-weight: bold;color: #000000;">资产负债表</div>
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
import {getBalanceSheet} from "@/api/search";
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
        prop: "property",
        label: "资产",
    },
    {
        prop: "a001101000",
        label: "货币资金",
    },
    {
        prop: "a001100000",
        label: "流动资产合计",
    },
    {
        prop: "a001200000",
        label: "非流动资产合计",
    },
    {
        prop: "a0f1300000",
        label: "其他资产",
    },
    {
        prop: "a001000000",
        label: "资产总计",
    },
    {
        prop: "debt",
        label: "负债",
    },
    {
        prop: "a002100000",
        label: "流动负债合计",
    },
    {
        prop: "a002201000",
        label: "长期借款",
    },
    {
        prop: "a002206000",
        label: "长期负债合计",
    },
    {
        prop: "a002200000",
        label: "非流动负债合计",
    },
    {
        prop: "a0f2300000",
        label: "其他负债",
    },
    {
        prop: "a002000000",
        label: "负债合计",
    },
    {
        prop: "rights",
        label: "所有者权益",
    },
    {
        prop: "a003101000",
        label: "实收资本(或股本)",
    },
    {
        prop: "a003102000",
        label: "资本公积",
    },
    {
        prop: "a003103000",
        label: "盈余公积",
    },
    {
        prop: "a003105000",
        label: "未分配利润",
    },
    {
        prop: "a003000000",
        label: "所有者权益合计",
    },
    {
        prop: "a003100000",
        label: "归属于母公司所有者权益合计",
    },
];
interface data{
    accper: string;
    a001101000: string;
    a001100000: string;
    a001200000: string;
    a0f1300000: string;
    a001000000: string;
    a002100000: string;
    a002201000: string;
    a002206000: string;
    a002200000: string;
    a0f2300000: string;
    a002000000: string;
    a003101000: string;
    a003102000: string;
    a003103000: string;
    a003105000: string;
    a003000000: string;
    a003100000: string;
}
const tableData = ref<data[]>([
    {
        accper: '    ',
        a001101000: '    ',
        a001100000: '    ',
        a001200000: '    ',
        a0f1300000: '    ',
        a001000000: '    ',
        a002100000: '    ',
        a002201000: '    ',
        a002206000: '    ',
        a002200000: '    ',
        a0f2300000: '    ',
        a002000000: '    ',
        a003101000: '    ',
        a003102000: '    ',
        a003103000: '    ',
        a003105000: '    ',
        a003000000: '    ',
        a003100000: '    '
    },

]);
const tableDataTotal = ref<data[]>([]);

const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getBalanceSheet(stkCd.value).then(res => {
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
    if (rowIndex===0||
        (columnIndex === 0 && (rowIndex===1||rowIndex===7||rowIndex===14))) {
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
