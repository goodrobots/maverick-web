import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import HudModule from '../components/modules/hud/HudModule'
import PlannerModule from '../components/modules/planner/PlannerModule'

import ConfigModule from '../components/modules/config/ConfigModule'
import ConfigParamSummary from '../components/modules/config/ConfigParamSummary'
import ConfigParamGroups from '../components/modules/config/ConfigParamGroups'
import ConfigParamFilter from '../components/modules/config/ConfigParamFilter'

import AnalysisModule from '../components/modules/analysis/AnalysisModule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/hud',
      component: HudModule
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
          // props: (route) => ({ key: this.$store.state.activeApi })
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
      name: 'AnalysisModule',
      component: AnalysisModule
    }
  ]
})
