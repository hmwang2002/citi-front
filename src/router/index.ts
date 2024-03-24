import { createRouter, createWebHistory } from 'vue-router'
import ChatFunction from "@/components/chat/ChatFunction.vue";
import mainPageComponent from '@/components/main/mainPageComponent.vue'
import NewsHome from "@/components/news/NewsHome.vue";
import LoginComponent from '@/components/login/LoginComponent.vue'
import RegisterComponent from '@/components/login/RegisterComponent.vue'
import SearchHome from "@/components/search/SearchHome.vue";
import NewsDetail from "@/components/news/NewsDetail.vue";
import FinancialSummary from "@/components/search/financeComponent/FinancialSummary.vue";
import FinancialReportProfit from "@/components/search/financeComponent/FinancialReportProfit.vue";
import FinancialReportDebt from "@/components/search/financeComponent/FinancialReportDebt.vue";
import FinancialReportFlows from "@/components/search/financeComponent/FinancialReportFlows.vue";
import CompanyProfile from "@/components/search/CompanyProfile.vue";
import FinancialAnalysisRepayment from "@/components/search/financeComponent/FinancialAnalysisRepayment.vue";
import FinancialAnalysisDevelopment from "@/components/search/financeComponent/FinancialAnalysisDevelopment.vue";
import FinancialAnalysisOperation from "@/components/search/financeComponent/FinancialAnalysisOperation.vue";
import FinancialAnalysisProfitability from "@/components/search/financeComponent/FinancialAnalysisProfitability.vue";
import ShareholdersStructure from "@/components/search/shareholdersComponent/ShareholdersStructure.vue";
import ShareholdersTopTen from "@/components/search/shareholdersComponent/ShareholdersTopTen.vue";
import ShareholdersTradable from "@/components/search/shareholdersComponent/ShareholdersTradable.vue";
import ShareholdersNumber from "@/components/search/shareholdersComponent/ShareholdersNumber.vue";
import ShareholdersFundHoldings from "@/components/search/shareholdersComponent/ShareholdersFundHoldings.vue";
import ShareholdersChange from "@/components/search/shareholdersComponent/ShareholdersChange.vue";
import ShareholdersPledge from "@/components/search/shareholdersComponent/ShareholdersPledge.vue";
import ShareholdersRestriction from "@/components/search/shareholdersComponent/ShareholdersRestriction.vue";
import EventTransaction from "@/components/search/eventComponent/EventTransaction.vue";
import EventArbitration from "@/components/search/eventComponent/EventArbitration.vue";
import CompanyStructure from "@/components/search/CompanyStructure.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: mainPageComponent,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatFunction,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchHome,
      children:[
        {
          path:'',
          name:'basic',
          component:CompanyStructure
        },
        {
          path:'/structure',
          name:'structure',
          component:CompanyStructure,
        },
        {
          path:'/finance/summary',
          name:'financialSummary',
          component:FinancialSummary,
        },
        {
          path:'/finance/report/profit',
          name:'financialReportProfit',
          component:FinancialReportProfit
        },
        {
          path:'/finance/report/debt',
          name:'financialReportDebt',
          component:FinancialReportDebt
        },
        {
          path:'/finance/report/flows',
          name:'financialReportFlows',
          component:FinancialReportFlows
        },
        {
          path:'/finance/analysis/repayment',
          name:'financialAnalysisRepayment',
          component:FinancialAnalysisRepayment
        },
        {
          path:'/finance/analysis/development',
          name:'financialAnalysisDevelopment',
          component:FinancialAnalysisDevelopment
        },
        {
          path:'/finance/analysis/operation',
          name:'financialAnalysisOperation',
          component:FinancialAnalysisOperation
        },
        {
          path:'/finance/analysis/profitability',
          name:'financialAnalysisProfitability',
          component:FinancialAnalysisProfitability
        },
        {
          path:'/companyProfile',
          name:'companyProfile',
          component:CompanyProfile
        },
        {
          path:'/shareholders/structure',
          name:'shareholdersStructure',
          component:ShareholdersStructure
        },
        {
          path:'/shareholders/topTen',
          name:'shareholdersTopTen',
          component:ShareholdersTopTen
        },
        {
          path:'/shareholders/tradable',
          name:'shareholdersTradable',
          component:ShareholdersTradable
        },
        {
          path:'/shareholders/number',
          name:'shareholdersNumber',
          component:ShareholdersNumber
        },
        {
          path:'/shareholders/fundHoldings',
          name:'shareholdersFundHoldings',
          component:ShareholdersFundHoldings
        },
        {
          path:'/shareholders/pledge',
          name:'shareholdersPledge',
          component:ShareholdersPledge
        },
        {
          path:'/shareholders/change',
          name:'shareholdersChange',
          component:ShareholdersChange
        },
        {
          path:'/shareholders/restriction',
          name:'shareholdersRestriction',
          component:ShareholdersRestriction
        },
        {
          path:'/event/transaction',
          name:'eventTransaction',
          component:EventTransaction
        },
        {
          path:'/event/arbitration',
          name:'eventArbitration',
          component:EventArbitration
        },
      ]
    },
    {
      path: '/news',
      name: 'NewsHome',
      component: NewsHome,
    },
    {
      path: '/news_detail/:id',
      name: 'NewsDetail',
      component: NewsDetail,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    }

  ]
})

export default router
