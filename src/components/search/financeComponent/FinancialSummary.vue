<template>
    <div class="table-container">
        <div class="title">
            <div style="font-size: large;font-weight: bold;color: #000000;">财务摘要</div>
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
import {getKPIs} from "@/api/search";

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
        for (let i = 0; i < tableDataTotal.value.length-1 && k<4; i++) {
            tableData.value[k]=tableDataTotal.value[i]
            k++;
        }
    }
    if (index == 1){
        for (let i = 0; i < tableDataTotal.value.length-1 && k<4; i++) {
            if (tableDataTotal.value[i].date.substring(5,7)=="12"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }else if (index == 2){
        for (let i = 0; i < tableDataTotal.value.length-1 && k<4; i++) {
            if (tableDataTotal.value[i].date.substring(5,7)=="09"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }else if (index == 3){
        for (let i = 0; i < tableDataTotal.value.length-1 && k<4; i++) {
            if (tableDataTotal.value[i].date.substring(5,7)=="06"){
                tableData.value[k]=tableDataTotal.value[i]
                k++;
            }
        }
    }else if (index == 4){
        for (let i = 0; i < tableDataTotal.value.length-1 && k<4; i++) {
            if (tableDataTotal.value[i].date.substring(5,7)=="03"){
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
        prop: "date",
        label: "截止日期"
    },
    {
        prop: "netProfit",
        label: "净利润"
    },
    {
        prop: "netProfitGrowthRate",
        label: "净利润同比增长率"
    },
    {
        prop: "nonNetProfit",
        label: "扣非净利润"
    },
    {
        prop: "nonNetProfitGrowthRate",
        label: "扣非净利润同比增长率"
    },
    {
        prop: "totalRevenue",
        label: "营业总收入"
    },
    {
        prop: "totalRevenueGrowthRate",
        label: "营业总收入同比增长率"
    },
    {
        prop: "basicEarningsPerShare",
        label: "基本每股收益"
    },
    {
        prop: "netAssetsPerShare",
        label: "每股净资产"
    },
    {
        prop: "capitalReservePerShare",
        label: "每股资本公积金"
    },
    {
        prop: "undistributedProfitPerShare",
        label: "每股未分配利润"
    },
    {
        prop: "operatingCashFlowPerShare",
        label: "每股经营现金流"
    },
    {
        prop: "netProfitMargin",
        label: "销售净利率"
    },
    {
        prop: "grossProfitMargin",
        label: "销售毛利率"
    },
    {
        prop: "returnOnEquity",
        label: "净资产收益率"
    },
    {
        prop: "returnOnEquityDiluted",
        label: "净资产收益率_摊薄"
    },
    {
        prop: "businessCycle",
        label: "营业周期"
    },
    {
        prop: "inventoryTurnover",
        label: "存货周转率"
    },
    {
        prop: "inventoryTurnoverDays",
        label: "存货周转天数"
    },
    {
        prop: "accountsReceivableTurnoverDays",
        label: "应收账款周转天数"
    },
    {
        prop: "currentRatio",
        label: "流动比率"
    },
    {
        prop: "quickRatio",
        label: "速动比率"
    },
    {
        prop: "conservativeQuickRatio",
        label: "保守速动比率"
    },
    {
        prop: "equityRatio",
        label: "产权比率"
    },
    {
        prop: "debtToAssetsRatio",
        label: "资产负债率"
    }
];
interface data{
    date: string;
    netProfit: string;
    netProfitGrowthRate: string;
    nonNetProfit: string;
    nonNetProfitGrowthRate: string;
    totalRevenue: string;
    totalRevenueGrowthRate: string;
    basicEarningsPerShare: string;
    netAssetsPerShare: string;
    capitalReservePerShare: string;
    undistributedProfitPerShare: string;
    operatingCashFlowPerShare: string;
    netProfitMargin: string;
    grossProfitMargin: string;
    returnOnEquity: string;
    returnOnEquityDiluted: string;
    businessCycle: string;
    inventoryTurnover: string;
    inventoryTurnoverDays: string;
    accountsReceivableTurnoverDays: string;
    currentRatio: string;
    quickRatio: string;
    conservativeQuickRatio: string;
    equityRatio: string;
    debtToAssetsRatio: string;

}

const tableData = ref<data[]>([
    {
        date: '    ',
        netProfit: '    ',
        netProfitGrowthRate: '    ',
        nonNetProfit: '    ',
        nonNetProfitGrowthRate: '    ',
        totalRevenue: '    ',
        totalRevenueGrowthRate: '    ',
        basicEarningsPerShare: '    ',
        netAssetsPerShare: '    ',
        capitalReservePerShare: '    ',
        undistributedProfitPerShare: '    ',
        operatingCashFlowPerShare: '    ',
        netProfitMargin: '    ',
        grossProfitMargin: '    ',
        returnOnEquity: '    ',
        returnOnEquityDiluted: '    ',
        businessCycle: '    ',
        inventoryTurnover: '    ',
        inventoryTurnoverDays: '    ',
        accountsReceivableTurnoverDays: '    ',
        currentRatio: '    ',
        quickRatio: '    ',
        conservativeQuickRatio: '    ',
        equityRatio: '    ',
        debtToAssetsRatio: '    '
    },

]);

const tableDataTotal = ref<data[]>([]);

const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch() {
    getKPIs(stkCd.value).then(res => {
        console.log(res.data.data)
        const d: data[] = res.data.data
        for (let i = 0; i < d.length; i++) {
            for (let datum in d[i]) {
                if (d[i][datum] === "False"){
                    d[i][datum]=''
                }
            }
            tableDataTotal.value[i] = d[i]
        }
        let k = 0;
        for (let i = 0; i < d.length  && i < 4; i++) {
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
