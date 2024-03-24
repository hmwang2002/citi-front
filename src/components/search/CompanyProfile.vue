<template>
    <div class="table-container">
        <div class="title">公司基本信息</div>
        <el-table
            :data="tableData"
            :span-method="arraySpanMethod"
            :cell-style="cellStyle"
            :show-header="false"
            border
            stripe
        >
            <el-table-column prop="key1" width="180" />
            <el-table-column prop="value1"  />
            <el-table-column prop="key2" width="180"/>
            <el-table-column prop="value2" />
        </el-table>

    </div>

</template>

<script setup lang="ts" >
import type { TableColumnCtx } from 'element-plus'
import {inject, ref, watch} from "vue";
import {getCompanyProfile} from '../../api/search.ts'

const tableData = ref<Company[]>([{
        key1: '中文全称',
        value1: '',
        key2: '行业名称',
        value2: '',
    },
    {
        key1: '股票简称',
        value1: '',
        key2: '股票代码',
        value2: '',
    },
    {
        key1: '公司成立日期',
        value1: '',
        key2: '首次上市日期',
        value2: '',
    },
    {
        key1: '法人代表',
        value1: '',
        key2: '证券事务代表',
        value2: '',
    },
    {
        key1: '董事会秘书',
        value1: '',
        key2: '董秘联系电话',
        value2: '',
    },
    {
        key1: '董秘传真',
        value1: '',
        key2: '董秘电子邮箱',
        value2: '',
    },
    {
        key1: '所属省份',
        value1: '',
        key2: '所属城市',
        value2: '',
    },
    {
        key1: '公司办公地址',
        value1: '',
        key2: '办公地址邮政编码',
        value2: '',
    },
    {
        key1: '公司网址',
        value1: '',
        key2: '电子邮箱',
        value2: '',
    },

    {
        key1: '注册资本',
        value1: '',
        key2: '上市状态',
        value2: '',
    },
    {
        key1: '注册具体地址',
        value1: '',
        key2: 'xxxxx',
        value2: 'xxxxx',
    },
    {
        key1: '主营业务',
        value1: '',
        key2: 'xxxxx',
        value2: 'xxxxx',
    },
    {
        key1: '经营范围',
        value1: '',
        key2: 'xxxxx',
        value2: 'xxxxx',
    },
    {
        key1: '重大变更',
        value1: '',
        key2: 'xxxxx',
        value2: 'xxxxx',
    },])
const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch(){
    getCompanyProfile(stkCd.value).then(res=>{
        tableData.value[0].value1 = res.data.data.fullName
        tableData.value[0].value2 = res.data.data.industryName
        tableData.value[1].value1 = res.data.data.shortName
        tableData.value[1].value2 = res.data.data.stkCd
        tableData.value[2].value1 = res.data.data.establishDate
        tableData.value[2].value2 = res.data.data.listingDate
        tableData.value[3].value1 = res.data.data.legalRepresentative
        tableData.value[3].value2 = res.data.data.securityConsultant
        tableData.value[4].value1 = res.data.data.secretary
        tableData.value[4].value2 = res.data.data.secretaryTel
        tableData.value[5].value1 = res.data.data.secretaryFax
        tableData.value[5].value2 = res.data.data.secretaryEmail
        tableData.value[6].value1 = res.data.data.province
        tableData.value[6].value2 = res.data.data.city
        tableData.value[7].value1 = res.data.data.officeAddress
        tableData.value[7].value2 = res.data.data.zipCode
        tableData.value[8].value1 = res.data.data.website
        tableData.value[8].value2 = res.data.data.email
        tableData.value[9].value1 = res.data.data.registerCapital
        tableData.value[9].value2 = res.data.data.listingState
        tableData.value[10].value1 = res.data.data.registerAddress
        tableData.value[11].value1 = res.data.data.mainBusiness
        tableData.value[12].value1 = res.data.data.businessScope
        tableData.value[13].value1 = res.data.data.sigChange
    })
}

interface Company {
    key1: string
    value1: string
    key2: string
    value2: string
}
interface SpanMethodProps {
    row: Company
    column: TableColumnCtx<Company>
    rowIndex: number
    columnIndex: number
}

const arraySpanMethod = ({
                             row,
                             column,
                             rowIndex,
                             columnIndex,
                         }: SpanMethodProps) => {
    if (rowIndex >= 10) {
        if (columnIndex === 1) {
            return [1, 3]
        } else if (columnIndex === 2) {
            return [0, 0]
        } else if (columnIndex === 3) {
            return [0, 0]
        }
    }
}

const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0 || columnIndex === 2) {
        return {
            fontWeight:'bold',
            color:'black',
            fontSize:'14px'
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
.el-table {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 90%;
}
</style>
