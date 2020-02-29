import Vue from 'vue'
import Router from 'vue-router'

import HomeModule from '../components/modules/home/HomeModule'

import CockpitModule from '../components/modules/cockpit/CockpitModule'

import PlannerModule from '../components/modules/planner/PlannerModule'

import ConfigModule from '../components/modules/config/ConfigModule'
import ConfigParamSummary from '../components/modules/config/ConfigParamSummary'
import ConfigParamGroups from '../components/modules/config/ConfigParamGroups'
import ConfigParamList from '../components/modules/config/ConfigParamList'

import AnalysisModule from '../components/modules/analysis/AnalysisModule'
import AnalysisIndex from '../components/modules/analysis/AnalysisIndex'
import AnalysisLogfile from '../components/modules/analysis/AnalysisLogfile'

import TestModule from '../components/modules/test/TestModule'

import MaverickModule from '../components/modules/maverick/MaverickModule'
import MaverickIndex from '../components/modules/maverick/MaverickIndex'

import VideoModule from '../components/modules/video/VideoModule'

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
      component: TestModule
    },
    {
      path: '/video',
      component: VideoModule
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
          component: ConfigParamList
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
    },
    {
      path: '/maverick',
      component: MaverickModule,
      children: [
        {
          path: '',
          redirect: 'maverick-index'
        },
        {
          path: 'maverick-index',
          component: MaverickIndex
        }
      ]
    },
  ]
})
