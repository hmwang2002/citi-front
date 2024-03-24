<template>
    <el-menu
        active-text-color="#1877F2"
        background-color="#f7fafd"
        class="el-menu-vertical-demo"
        default-active="/structure"
        text-color="#333333"
        @open="handleOpen"
        @close="handleClose"
        router
    >
        <el-menu-item index="/structure">
            <el-icon><Picture /></el-icon>
            <span><b>股权架构图</b></span>
        </el-menu-item>
        <el-menu-item index="/companyProfile">
            <el-icon><document /></el-icon>
            <span><b>公司基本信息</b></span>
        </el-menu-item>
        <el-sub-menu index="/finance">
            <template #title>
                <el-icon><money /></el-icon>
                <span><b>财务数据</b></span>
            </template>
            <el-menu-item index="/finance/summary" >财务摘要</el-menu-item>
            <el-sub-menu index="/finance/report">
                <template #title>财务报表</template>
                <el-menu-item index="/finance/report/profit">利润表</el-menu-item>
                <el-menu-item index="/finance/report/debt">资产负债表</el-menu-item>
                <el-menu-item index="/finance/report/flows">现金流量表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/finance/analysis">
                <template #title>财务分析</template>
                <el-menu-item index="/finance/analysis/repayment">偿债能力</el-menu-item>
                <el-menu-item index="/finance/analysis/development">发展能力</el-menu-item>
                <el-menu-item index="/finance/analysis/operation">经营能力</el-menu-item>
                <el-menu-item index="/finance/analysis/profitability">盈利能力</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>

        <el-sub-menu index="/shareholders">
            <template #title>
                <el-icon><user /></el-icon>
                <span><b>股东股本情况</b></span>
            </template>
            <el-menu-item index="/shareholders/structure">股本结构</el-menu-item>
            <el-menu-item index="/shareholders/topTen">十大股东</el-menu-item>
            <el-menu-item index="/shareholders/tradable">十大流通股东</el-menu-item>
            <el-menu-item index="/shareholders/number">股东人数</el-menu-item>
            <el-menu-item index="/shareholders/fundHoldings">基金持股</el-menu-item>
            <el-menu-item index="/shareholders/pledge">股权质押、冻结、托管</el-menu-item>
            <el-menu-item index="/shareholders/change">股权变更</el-menu-item>
            <el-menu-item index="/shareholders/restriction">限售解禁</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/event">
            <template #title>
                <el-icon><message-box /></el-icon>
                <span><b>重大特殊事项</b></span>
            </template>
            <el-menu-item index="/event/transaction">关联交易</el-menu-item>
            <el-menu-item index="/event/arbitration">诉讼仲裁</el-menu-item>
        </el-sub-menu>

    </el-menu>

</template>

<script setup lang="ts">
import {
    Document, MessageBox, User,  Money,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo{
    border: #e1e3e5 1px solid;
    border-radius: 10px;
}
</style>
