<template>
    <div class="table-container">
        <div class="title">诉讼仲裁</div>
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
                :width="index === 0 ? '130px' : '240px'"
            >
            </el-table-column>
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getLitigationArbitration} from "@/api/search";

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
        prop: "declareDate",
        label: "公告日期",
    },
    {
        prop: "eventContent",
        label: "事件内容",
    },
    {
        prop: "eventSignDate",
        label: "事件发生日期",
    },
    {
        prop: "latypes",
        label: "司法类型",
    },
    {
        prop: "plaintiff",
        label: "起诉(申请)方",
    },
    {
        prop: "plaintiffToCo",
        label: "起诉(申请)方与上市公司关系",
    },
    {
        prop: "defendant",
        label: "应诉(被申请)方",
    },
    {
        prop: "defendantToCo",
        label: "应诉(被申请)方与上市公司关系",
    },
    {
        prop: "jtRespbly",
        label: "承担连带责任方",
    },
    {
        prop: "jtRespblyToCo",
        label: "承担连带责任方与上市公司关系",
    },
    {
        prop: "others",
        label: "其他方",
    },
    {
        prop: "othersToCo",
        label: "其他方与上市公司关系",
    },
    {
        prop: "caseReason",
        label: "涉案缘由",
    },
    {
        prop: "lavalue",
        label: "涉案金额",
    },
    {
        prop: "lacosts",
        label: "诉讼仲裁费用",
    },
    {
        prop: "currency",
        label: "币种",
    },
    {
        prop: "trlInstus",
        label: "审理机构",
    },
    {
        prop: "isSameAtrbun",
        label: "审理机构与上市公司注册地是否同属于一个行政区划",
    },
    {
        prop: "lastatus",
        label: "司法进程",
    },
    {
        prop: "lacontent",
        label: "裁决(调解)内容",
    },
    {
        prop: "executnStus",
        label: "执行状态",
    },
    {
        prop: "lacostAsuptn",
        label: "诉讼仲裁费用承担",
    },
    {
        prop: "enforcedAsset",
        label: "被执行财产",
    },
    {
        prop: "eforAstOnesp",
        label: "被执行财产归属",
    },
    {
        prop: "profitImpact",
        label: "损益影响",
    },
];
interface data{
    declareDate: string;
    eventContent: string;
    eventSignDate: string;
    latypes: string;
    plaintiff: string;
    plaintiffToCo: string;
    defendant: string;
    defendantToCo: string;
    jtRespbly: string;
    jtRespblyToCo: string;
    others: string;
    othersToCo: string;
    caseReason: string;
    lavalue: string;
    lacosts: string;
    currency: string;
    trlInstus: string;
    isSameAtrbun: string;
    lastatus: string;
    lacontent: string;
    executnStus: string;
    lacostAsuptn: string;
    enforcedAsset: string;
    eforAstOnesp: string;
    profitImpact: string;
}

const tableData = ref<data[]>([
    {
        declareDate: '    ',
        eventContent: '    ',
        eventSignDate: '    ',
        latypes: '    ',
        plaintiff: '    ',
        plaintiffToCo: '    ',
        defendant: '    ',
        defendantToCo: '    ',
        jtRespbly: '    ',
        jtRespblyToCo: '    ',
        others: '    ',
        othersToCo: '    ',
        caseReason: '    ',
        lavalue: '    ',
        lacosts: '    ',
        currency: '    ',
        trlInstus: '    ',
        isSameAtrbun: '    ',
        lastatus: '    ',
        lacontent: '    ',
        executnStus: '    ',
        lacostAsuptn: '    ',
        enforcedAsset: '    ',
        eforAstOnesp: '    ',
        profitImpact: '    '
    },
]);

const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getLitigationArbitration(stkCd.value).then(res => {
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
