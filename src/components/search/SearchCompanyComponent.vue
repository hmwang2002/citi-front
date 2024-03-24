<template>
    <div class="companyContainer">
        <div class="centerContainer">
            <el-row gutter="2px" >
                <el-col :span="4" :offset="1">
                    <el-text class="companyName">{{companyName}}</el-text>
                </el-col>
<!--                <el-col :span="3">-->
<!--                    <el-button class="companyButton" >+添加</el-button>-->
<!--                </el-col>-->
                <el-col :span="6">
                    <el-cascader
                        placeholder="请输入您想要切换公司的代码、简称"
                        v-model="value"
                        :options="options"
                        filterable
                        style="width: 400px;"
                        @change="handleChange" />
                </el-col>
            </el-row>
            <div class="horizontalLine"></div>
            <el-row >
                <el-col :span="4" :offset="1" class="textContainer" >
                    <el-row style="display: flex;flex-direction: row;justify-content: space-between;width: 70%"
                            :style="{ color: isUpper == '1' ? '#DB3439' : '#00b23c'}"
                    >
                        <div class="largeText">{{latestPrice}}</div>
                        <el-col style="max-width: 20%">
                            <div style="font-weight: bold">{{changeAmount}}</div>
                            <div style="font-weight: bold;">{{changeRate}}</div>
                        </el-col>
                        <div class="largeText">
                            <span v-if="isUpper == '1'" >⬆</span>
                            <span v-else>⬇</span>
                        </div>
                    </el-row>
                    <el-row >
                        <div class="smallText">{{ currentTime }}</div>
                    </el-row>
                </el-col>
                <el-col :span="1">
                    <div class="verticalLine"></div>
                </el-col>
                <el-col :span="18">
                    <el-row>
                        <el-col :span="5">
                            <div v-for="row in detailRows1" :key="row.label">
                                <div class="smallText2">{{ row.label }} : {{ row.value }}</div>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div v-for="row in detailRows2" :key="row.label">
                                <div class="smallText2">{{ row.label }}:{{ row.value }}</div>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div v-for="row in detailRows3" :key="row.label">
                                <div class="smallText2">{{ row.label }}:{{ row.value }}</div>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div v-for="row in detailRows4" :key="row.label">
                                <div class="smallText2">{{ row.label }}:{{ row.value }}</div>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div v-for="row in detailRows5" :key="row.label">
                                <div class="smallText2">{{ row.label }}:{{ row.value }}</div>
                            </div>
                        </el-col>
                    </el-row>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,inject,watch } from 'vue'
import {getRealTimeData, getStockList} from "@/api/search";

const value = ref([])

const props = {
    expandTrigger: 'hover' as const,
}
//当前展示公司号
const stkCd = inject('$company')

//切换逻辑
function changeMessage(value:string){
    stkCd.value = value
}

const handleChange = (value) => {
    changeMessage(value[0])
}

interface option{
    value:string,
    label:string
}
const options = ref<option[]>([
    {
        value: '000001',
        label: '平安银行',
    }
])

getStockList().then(res=>{
    options.value = res.data.data
})

//横栏信息
const companyName = ref('')

const detailRows1 = ref([
    { label: '最新价', value: '' },
    { label: '振幅', value: '' },
    { label: '量比', value: '' },
    { label: '流通市值', value: '' },
])
const detailRows2 = ref([
    { label: '涨跌幅', value: '' },
    { label: '最高', value: '' },
    { label: '换手率', value: '' },
    { label: '涨速', value: '' },
])
const detailRows3 = ref([
    { label: '涨跌额', value: '' },
    { label: '最低', value: '' },
    { label: '市盈率-动态', value: '' },
    { label: '5分钟涨跌', value: '' },
])
const detailRows4 = ref([
    { label: '成交量', value: '' },
    { label: '今开', value: '' },
    { label: '市净率', value: '' },
    { label: '60日涨跌幅', value: '' },
])
const detailRows5 = ref([
    { label: '成交额', value: '' },
    { label: '昨收', value: '' },
    { label: '总市值', value: '' },
    { label: '年初至今涨跌幅', value: '' },
])

const currentTime = ref('')
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();

currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}`

const latestPrice = ref('')
const changeRate = ref('')
const changeAmount = ref('')
const isUpper = ref('')

fetch()
watch(stkCd, () => {
    fetch()
});
function fetch(){
    getRealTimeData(stkCd.value).then(res=>{
        const data = res.data.data;
        latestPrice.value = data.latestPrice
        changeRate.value = data.changeRate
        changeAmount.value = data.changeAmount
        companyName.value = data.name
        if (changeRate.value!=null&&changeRate.value.substring(0,1)=='-'){
            isUpper.value = '0'}
        else {
            isUpper.value = '1'
        }
        const detailRows = [detailRows1, detailRows2, detailRows3, detailRows4, detailRows5];
        const dataProps = [
            ['latestPrice', 'amplitude', 'volumeRatio', 'circulationMarketValue'],
            ['changeRate', 'max', 'turnoverRate', 'riseSpeed'],
            ['changeAmount', 'min', 'peRatio', 'fiveMinuteChange'],
            ['volume', 'open', 'pbRatio', 'sixtyDayChangeRate'],
            ['turnover', 'preClose', 'totalMarketValue', 'yearChangeRate']
        ];

        // 更新每个数组项中的对象值
        for (let i = 0; i < detailRows.length; i++) {
            const row = detailRows[i].value;
            const props = dataProps[i];
            for (let j = 0; j < row.length; j++) {
                row[j].value = data[props[j]];
            }
        }
    })
}
</script>

<style scoped>
.companyContainer{
    background-color: #ffffff;
    border: #BBBBBB 1px solid;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    min-height: 170px;
    padding: 10px 40px 10px 40px;
}
.companyName{
    font-size: 24px;
    font-weight: bold;
    color: #000000;
}
/*.companyButton{*/
/*    background-color: #1877F2;*/
/*    color: #ffffff;*/
/*    border: #1877F2 1px ;*/
/*}*/
.horizontalLine {
    border-top: 1px solid #d5d5d5;
    margin: 10px 10px;
}
.verticalLine {
    border-left: 1px solid #d5d5d5;
    height: 100%;
}
.textContainer{
    display: flex;
    flex-direction: column;
    /*align-items: start;*/
    justify-content: center;
    margin-bottom: 0;
}
.largeText {
    font-size: 24px;
    font-weight: bold;
}
.smallText {
    margin-top: 5px;
    font-size: 14px;
    color: #888888;
}
.smallText2 {
    margin-top: 6px;
    font-size:14px;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;

}

/*.centerContainer{*/
/*    border: #d3d3d3 1px solid;*/
/*    border-radius: 5px;*/
/*    height: 130px;*/
/*}*/

</style>
