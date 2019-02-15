<template lang='pug'>
v-container.fluid.grid-list-xl
  v-layout.row.wrap
    // Overview Card
    v-flex.xs12.sm6.md6
      v-card
        v-toolbar(dense)
          v-toolbar-title Overview
        v-card-text
          table(width='50%')
            // Ardupilot Params
            tr
              td Vehicle Type
              td.primary--text(v-html="valueFormat(findParam('SYSID_SW_TYPE'))")
            template(v-if="findParam('FRAME_CLASS')")
              tr
                td Frame Class
                td.primary--text(v-html="valueFormat(findParam('FRAME_CLASS'))")
              tr
                td Frame Type
                td.primary--text(v-html="valueFormat(findParam('FRAME_TYPE'))")
            // PX4 Params
            template(v-else-if="findParam('MAV_TYPE')")
              tr
                td Frame Type
                td.primary--text(v-html="valueFormat(findParam('MAV_TYPE'))")
    // Checklist card
    v-flex.xs12.sm6.md6
      v-card
        v-toolbar(dense)
          v-toolbar-title Parameter Checklist
        v-card-title(primary-title)
          div
            h3.headline.mb-0.grey--text Logging
          table(width='100%')
            tr
              td Mavlink Logging
              template(v-if="findParam('LOG_BACKEND_TYPE') && findParam('LOG_BACKEND_TYPE').value==3")
                td.green--text Good
                td.green--text(v-html="valueFormat(findParam('LOG_BACKEND_TYPE'))")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(findParam('LOG_BACKEND_TYPE'))")
            tr
              td Logging while Disarmed
              template(v-if="findParam('LOG_DISARMED') && findParam('LOG_DISARMED').value==0")
                td.green--text Good
                td.green--text(v-html="valueFormat(findParam('LOG_DISARMED'))")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(findParam('LOG_DISARMED'))")
            tr
              td Stop/Rotate log on Disarm
              template(v-if="findParam('LOG_FILE_DSRMROT') && findParam('LOG_FILE_DSRMROT').value==1")
                td.green--text Good
                td.green--text(v-html="valueFormat(findParam('LOG_FILE_DSRMROT'))")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(findParam('LOG_FILE_DSRMROT'))")
</template>

<script>
// import Vue from 'vue'
import { paramsQuery, paramsSubscription } from '../../../plugins/graphql/gql/Parameters.gql'

export default {
  name: 'ConfigParamSummary',
  data () {
    return {
      params: [],
      paramData: []
    }
  },

  watch: {
    // Watch apis state for any change and process
    activeApi: {
      handler: function (newValue) {
        this.logDebug('activeApi changed: ' + newValue)
        this.createQlQueries()
      }
    }
  },

  mounted () {
    this.createQlQueries()
  },

  methods: {
    createQlQueries () {
      if (this.activeApi) {
        this.createQuery('Params', paramsQuery, this.activeApi, 'paramsData', !this.apis[this.activeApi].state)
        this.createSubscription('Params', paramsSubscription, this.activeApi, 'paramsData', !this.apis[this.activeApi].state)
      }
    },
    findParam (id) {
      return this.params.find(x => x.id === id)
    },
    processParamQuery (data, key) {
      const api = key.replace('Status_', '')
      this.logDebug(data.data)
      if (data.data && 'Status' in data.data) {
        // Store the message data and set the api state to active, only for the first callback
        if (this.$store.state.apis[api].state !== true) this.$store.commit('setApiState', { api: api, value: true })
        if (this.$store.state.apiTimestamps[api] === null) this.$store.commit('setApiSeen', { api: api, value: performance.now() })
        if (!(api in this.$store.state.statusData)) {
          this.$store.commit('setStatusData', { api: api, message: data.data.Status })
        }
      }
    },
    valueFormat (param) {
      if (param && param.meta && param.meta.units) {
        return `${param.value} <span class="caption"><strong>${
          param.meta.units
        }</strong></span>`
      }
      if (param && param.meta && param.meta.values) {
        const values = JSON.parse(param.meta.values)
        if (values[param.value]) {
          return values[param.value]
        }
      }
      return param ? param.value : null
    }
  }

  /*
  apollo: {
    $client () {
      return this.activeApi
    },
    params: {
      query: paramsQuery,
      manual: true,
      result ({ data, loading }) {
        if (!loading && !this.params.length) {
          Object.keys(data.params).forEach(key => {
            Vue.set(this.params, key, data.params[key])
          })
        }
        // console.log('received params: ' + this.params.length)
      },
      mutation: updateParam
    },
    $subscribe: {
      params: {
        query: paramsSubscription,
        result (data) {
          const paramIx = this.findParamIndex(data.data.params.id)
          Vue.set(this.params, paramIx, data.data.params)
          // console.log('subscribe result: ' + this.params[paramIx])
        }
      }
    }
  }
  */
}
</script>
