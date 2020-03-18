import Vue from 'vue'
import Router from 'vue-router'

import HomeModule from '../components/modules/home/HomeModule'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: HomeModule
    },
    {
      path: '/',
      component: HomeModule
    },
    {
      path: '/test',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/test/TestModule')
    },
    {
      path: '/video',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/video/VideoModule')
    },
    {
      path: '/cockpit',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/cockpit/CockpitModule')
    },
    {
      path: '/planner',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/planner/PlannerModule')
    },
    {
      path: '/config',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigModule'),
      children: [
        {
          path: '',
          // redirect: 'parameter-summary'
        },
        {
          path: 'modules',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigModules')
        },
        {
          path: 'connections',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigConnections')
        },
        {
          path: 'video',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigVideo')
        },
        {
          path: 'parameter-summary',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigParamSummary')
        },
        {
          path: 'parameter-groups',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigParamGroups')
        },
        {
          path: 'parameter-list',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/config/ConfigParamList')
        }
      ]
    },
    {
      path: '/analysis',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/analysis/AnalysisModule'),
      children: [
        {
          path: '',
          redirect: 'analysis-index'
        },
        {
          path: 'analysis-index',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/analysis/AnalysisIndex')
        },
        {
          path: 'analysis-logfile/:id',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/analysis/AnalysisLogfile')
        }
      ]
    },
    {
      path: '/maverick',
      component: () => import(/* webpackMode: "lazy" */ '../components/modules/maverick/MaverickModule'),
      children: [
        {
          path: '',
          redirect: 'maverick-index'
        },
        {
          path: 'maverick-index',
          component: () => import(/* webpackMode: "lazy" */ '../components/modules/maverick/MaverickIndex')
        }
      ]
    },
  ]
})
