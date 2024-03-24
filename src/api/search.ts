import request from '../utils/request.js'

export function getStockList() {
    return request({
        url: '/data/getStockList',
        method: 'get',
    })
}

export function getActualController(stkCd:string) {
    return request({
        url: '/data/getActualController',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export function getLatestStockInvestment(stkCd:string) {
    return request({
        url: '/data/getLatestStockInvestment',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export function getRealTimeData(stkCd:string) {
    return request({
        url: '/data/getRealTimeData',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export function getCapitalStructure(stkCd:string) {
    return request({
        url: '/data/capitalStructure',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export function getKPIs(stkCd:string) {
    return request({
        url: '/data/getKPIs',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export function getProfitTable(stkCd:string) {
    return request({
        url: '/data/profitTable',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getBalanceSheet(stkCd:string) {
    return request({
        url: '/data/balanceSheet',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getCashFlow(stkCd:string) {
    return request({
        url: '/data/cashFlow',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getDebtSC(stkCd:string) {
    return request({
        url: '/data/debtSC',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getDevC(stkCd:string) {
    return request({
        url: '/data/devC',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getManageAbility(stkCd:string) {
    return request({
        url: '/data/manageAbility',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getProfitability(stkCd:string) {
    return request({
        url: '/data/profitability',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export function getCompanyProfile(stkCd:string) {
    return request({
        url: '/data/basicInformation',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getTTShReportDate(stkCd:string) {
    return request({
        url: '/data/getTTShReportDate',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getTopTenShareholders(stkCd:string,reportDate:string) {
    return request({
        url: '/data/getTopTenShareholders',
        method: 'get',
        params: {
            stkCd: stkCd,
            reportDate:reportDate
        }
    })
}
export function getTopTenPublicShareholders(stkCd:string,reportDate:string) {
    return request({
        url: '/data/getTopTenPublicShareholders',
        method: 'get',
        params: {
            stkCd: stkCd,
            reportDate:reportDate
        }
    })
}
export function getShareholders(stkCd:string) {
    return request({
        url: '/data/getShareholders',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getFundHoldingsReportDate(stkCd:string) {
    return request({
        url: '/data/getFundHoldingsReportDate',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getFundHoldings(stkCd:string,reportDate:string) {
    return request({
        url: '/data/getFundHoldings',
        method: 'get',
        params: {
            stkCd: stkCd,
            reportDate:reportDate
        }
    })
}
export function getStockPledgeFreezeCustody(stkCd:string) {
    return request({
        url: '/data/getStockPledgeFreezeCustody',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getCapitalChange(stkCd:string) {
    return request({
        url: '/data/getCapitalChange',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getRestrictedSale(stkCd:string) {
    return request({
        url: '/data/getRestrictedSale',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getRelatedTransaction(stkCd:string) {
    return request({
        url: '/data/getRelatedTransaction',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}
export function getLitigationArbitration(stkCd:string) {
    return request({
        url: '/data/getLitigationArbitration',
        method: 'get',
        params: {
            stkCd: stkCd
        }
    })
}

export default {getCompanyProfile}
