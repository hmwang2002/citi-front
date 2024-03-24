<template>
    <div class="table-container">
        <div class="title">股权变更</div>
        <el-table
                :data="tableData"
                :cell-style="cellStyle"
                :header-cell-style="headerStyle"
                stripe
                border
        >
            <el-table-column prop="s0801a" label="股份增持方" width="220"/>
            <el-table-column prop="s0802a" label="股份减持方" width="220"/>
            <el-table-column prop="s0803a" label="变动方式" width="100"/>
            <el-table-column prop="s0805a" label="第一次公告日期" width="125" />
            <el-table-column prop="s0804a" label="成功与否" width="90" />
            <el-table-column prop="s0806a" label="过户登记日期" width="125"/>
            <el-table-column prop="s0807a" label="本次变动数量" />
            <el-table-column prop="s0808a" label="本次变动数量占总股本的比例(%)" width="140"  />
            <el-table-column prop="s0809a" label="变动前股份性质"  width="90" />
            <el-table-column prop="s0810a" label="变动后股份性质"  width="90" />
            <el-table-column prop="s0811a" label="支付方式"  width="90"/>
            <el-table-column prop="s0812a" label="交易总额"  width="90"/>
            <el-table-column prop="s0813a" label="其中：现金"   width="100"/>
            <el-table-column prop="s0816a" label="是否影响公司控制权的变化"  width="140" />
        </el-table>
    </div>

</template>

<script setup lang="ts" >
import {inject, ref, watch} from "vue";
import {getCapitalChange} from "@/api/search";
interface data{
    s0801a: string;
    s0802a: string;
    s0803a: string;
    s0805a: string;
    s0804a: string;
    s0806a: string;
    s0807a: string;
    s0808a: string;
    s0809a: string;
    s0810a: string;
    s0811a: string;
    s0812a: string;
    s0813a: string;
    s0816a: string;
}
const tableData = ref<data[]>([
    {
        s0801a: '    ',
        s0802a: '    ',
        s0803a: '    ',
        s0805a: '    ',
        s0804a: '    ',
        s0806a: '    ',
        s0807a: '    ',
        s0808a: '    ',
        s0809a: '    ',
        s0810a: '    ',
        s0811a: '    ',
        s0812a: '    ',
        s0813a: '    ',
        s0816a: '    '
    },
]);
const stkCd = inject('$company')
fetch()
watch(stkCd, () => {
    fetch()
});
function fetch(){
    getCapitalChange(stkCd.value).then(res=>{
        console.log(res.data.data)
        const d: data[] =res.data.data
        let k = 0;
        for (let i = d.length-1; i >= 0; i--) {
            tableData.value[k] = d[i]
            k++
        }
    });
}
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    return {
        color: 'black'
    }
}
const headerStyle = ({ row, column, rowIndex, columnIndex }) => {
    return {
        color: 'black'
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
    max-width: 1000px;
}
</style>
