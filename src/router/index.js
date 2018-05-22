import Vue from 'vue'
import Router from 'vue-router'

import HomeModule from '../components/modules/home/HomeModule'

import CockpitModule from '../components/modules/cockpit/CockpitModule'

import PlannerModule from '../components/modules/planner/PlannerModule'

import ConfigModule from '../components/modules/config/ConfigModule'
import ConfigParamSummary from '../components/modules/config/ConfigParamSummary'
import ConfigParamGroups from '../components/modules/config/ConfigParamGroups'
import ConfigParamFilter from '../components/modules/config/ConfigParamFilter'

import AnalysisModule from '../components/modules/analysis/AnalysisModule'
import AnalysisIndex from '../components/modules/analysis/AnalysisIndex'
import AnalysisLogfile from '../components/modules/analysis/AnalysisLogfile'

Vue.use(Router)

export default new Router({
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
      path: '/cockpit',
      component: CockpitModule
    },
    {
      path: '/planner',
      component: PlannerModule
    },
    {
      path: '/config',
      component: ConfigModule,
      children: [
        {
          path: '',
          redirect: 'parameter-summary'
        },
        {
          path: 'parameter-summary',
          component: ConfigParamSummary
        },
        {
          path: 'parameter-groups',
          component: ConfigParamGroups
        },
        {
          path: 'parameter-list',
          component: ConfigParamFilter
        }
      ]
    },
    {
      path: '/analysis',
      component: AnalysisModule,
      children: [
        {
          path: '',
          redirect: 'analysis-index'
        },
        {
          path: 'analysis-index',
          component: AnalysisIndex
        },
        {
          path: 'analysis-logfile/:id',
          component: AnalysisLogfile
        }
      ]
    }
  ]
})
