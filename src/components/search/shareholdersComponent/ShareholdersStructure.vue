<template>
    <div class="table-container">
        <div class="title">股本结构</div>
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
import {getCapitalStructure} from "@/api/search";

const headers = [
    {
        prop: "reptDt",
        label: "截止日期",
    },
    {
        prop: "nshrttl",
        label: "股本总数",
    },
    {
        prop: "nshrnn",
        label: "未流通股份",
    },
    {
        prop: "nshrstt",
        label: "国有股",
    },
    {
        prop: "nshrlpf",
        label: "境外发起人股",
    },
    {
        prop: "nshrprf",
        label: "优先股",
    },
    {
        prop: "nshrn",
        label: "已流通股份",
    },
    {
        prop: "nshra",
        label: "A股流通股",
    },
    {
        prop: "nshrb",
        label: "B股流通股",
    },
    {
        prop: "nshrh",
        label: "H股流通股",
    },
    {
        prop: "nshroft",
        label: "其它境外流通股",
    },
];
interface data{
    reptDt: string;
    nshrttl: string;
    nshrnn: string;
    nshrstt: string;
    nshrlpf: string;
    nshrprf: string;
    nshrn: string;
    nshra: string;
    nshrb: string;
    nshrh: string;
    nshroft: string;
}

const tableData = ref<data[]>([
    {
        reptDt: '    ',
        nshrttl: '    ',
        nshrnn: '    ',
        nshrstt: '    ',
        nshrlpf: '    ',
        nshrprf: '    ',
        nshrn: '    ',
        nshra: '    ',
        nshrb: '    ',
        nshrh: '    ',
        nshroft: '    '
    },
]);
const tableDataTotal = ref<data[]>([]);
const stkCd = inject('$company')

fetch()

watch(stkCd, () => {
    fetch()
});

function fetch(){
    getCapitalStructure(stkCd.value).then(res=>{
        console.log(res.data.data)
        const d: data[] = res.data.data
        for (let i = 0; i < d.length; i++) {
            tableDataTotal.value[i] = d[i]
        }
        // 将最近的5条数据存储到 tableData 中
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
        (columnIndex === 0 && (rowIndex===1||rowIndex===2||rowIndex===6))) {
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
