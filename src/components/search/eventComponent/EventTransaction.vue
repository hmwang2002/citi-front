<template>
    <div class="table-container">
        <div class="title">关联交易</div>
<!--        <div class="btn">-->
<!--            <el-button :class="index == number ? 'el-button':'el-button1'" @click="tab(index)" v-for="(item ,index) in dataList"-->
<!--                       :key="index">{{item.option}}-->
<!--            </el-button>-->
<!--        </div>-->
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
                    :width="index === 0 ? '130px' : '200px'"
            >
            </el-table-column>
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getRelatedTransaction} from "@/api/search";

// let number = ref(0)
// const dataList = [
//     {option: '2023-09-30'},
//     {option: '2023-06-30'},
//     {option: '2023-03-30'},
//     {option: '2022-12-30'},
//     {option: '2022-09-30'},
// ]
// function tab(index) {
//     number.value = index;
//     console.log("date index:"+number.value)
// }

const headers = [
    {
        prop: "reptDt",
        label: "公告日期",
    },
    {
        prop: "repart",
        label: "关联方",
    },
    {
        prop: "relation",
        label: "关联关系",
    },
    {
        prop: "isam",
        label: "关联交易涉及的金额",
    },
    {
        prop: "curtype",
        label: "货币类型",
    },
    {
        prop: "trasub",
        label: "交易性质",
    },
    {
        prop: "direction",
        label: "交易方向",
    },
    {
        prop: "repat",
        label: "关联交易事项分类",
    },
    {
        prop: "kind",
        label: "关联交易事项",
    },
    {
        prop: "content",
        label: "交易内容",
    },
    {
        prop: "principl",
        label: "交易定价原则",
    },
    {
        prop: "notes",
        label: "备注",
    },
];

interface data{
    reptDt: string;
    repart: string;
    relation: string;
    isam: string;
    curtype: string;
    trasub: string;
    direction: string;
    repat: string;
    kind: string;
    content: string;
    principl: string;
    notes: string;
}

const tableData = ref<data[]>([
    {
        reptDt: '    ',
        repart: '    ',
        relation: '    ',
        isam: '    ',
        curtype: '    ',
        trasub: '    ',
        direction: '    ',
        repat: '    ',
        kind: '    ',
        content: '    ',
        principl: '    ',
        notes: '    '
    },
]);

const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getRelatedTransaction(stkCd.value).then(res => {
        console.log(res.data.data)
        const d: data[] = res.data.data
        let k = 0;
        for (let i = d.length - 1; i >= 0 && i > d.length - 6; i--) {
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
    if (rowIndex===0) {
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
