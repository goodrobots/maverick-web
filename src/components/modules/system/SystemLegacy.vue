<template lang='pug'>
v-container(fluid)
  v-card
    v-toolbar(:color="navColor" dense)
      v-toolbar-title Legacy Services

    v-alert.ma-8(border="left" type="info")
      span This is a list of legacy web services that have not yet been migrated to the new Maverick web interface.

    v-row
      v-col(lg=6)
        v-list(two-line)
          v-list-item(:href="'//' + thishost+':6789'" target="_blank")
            v-list-item-content
              v-list-item-title Cloud9
              v-list-item-subtitle Cloud9 Web IDE/Text Editor
            v-list-item-icon
              v-icon mdi-open-in-new

    v-divider
    v-row
      v-col(lg=6)
        v-list(two-line)
          v-list-item(:href="'//' + thishost + '/web/docs/maverick'" target="_blank")
            v-list-item-content
              v-list-item-title Maverick Documentation
              v-list-item-subtitle Offline maverick documentation
            v-list-item-icon
              v-icon mdi-open-in-new
      v-col(lg=6)
        v-list(two-line)
          v-list-item(:href="'//' + thishost + '/web/docs/px4'" target="_blank")
            v-list-item-content
              v-list-item-title PX4 Documentation
              v-list-item-subtitle Offline PX4 Pro autopilot documentation
            v-list-item-icon
              v-icon mdi-open-in-new
      v-col(lg=6)
        v-list(two-line)
          v-list-item(:href="'//' + thishost + '/web/docs/ardupilot/ardupilot'" target="_blank")
            v-list-item-content
              v-list-item-title Ardupilot Documentation
              v-list-item-subtitle Offline Ardupilot autopilot documentation
            v-list-item-icon
              v-icon mdi-open-in-new

    v-divider
    v-row
      v-col(lg=6)
        v-list(two-line)
          v-list-item(:href="'//' + thishost + '/analysis/grafana'" target="_blank")
            v-list-item-content
              v-list-item-title Flight Log Analysis
              v-list-item-subtitle Grafana metric analysis graphing system
            v-list-item-icon
              v-icon mdi-open-in-new
      v-col(lg=6)
        v-list(two-line)
          v-list-item(:href="'//' + thishost + '/analysis/uploader'" target="_blank")
            v-list-item-content
              v-list-item-title Flight Log Uploader
              v-list-item-subtitle Upload logs to analysis system
            v-list-item-icon
              v-icon mdi-open-in-new

</template>

<script>
export default {
  name: 'SystemLegacy',
  data () {
    return {
    }
  },

  computed: {
    thishost () {
      return window.location.hostname
    }
  },

  watch: {
  },

  mounted () {
  },
  
  methods: {
  }
}
</script>
