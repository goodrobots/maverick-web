<template lang='pug'>
v-container.px-2.py-2(fluid grid-list-xl)
  v-layout(row wrap)
    v-flex(xs12)
      //- Popup to edit parameter
      v-dialog(v-model="dialog" max-width="500px")
        v-card
          v-card-title.pb-0
            span.headline Edit Parameter
            v-spacer
            v-card-actions
              v-btn(color="primary darken-1" flat @click.native="close") Cancel
              v-btn(color="primary darken-1" @click.native="save") Save
          v-card-text.pt-0
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12)
                  div(v-html="editedItem.id")
              v-layout(wrap)
                // Edit boolean value through switch
                template(v-if="editedItem.meta && editedItem.type === 'boolean'")
                  v-flex(xs12)
                    v-switch(:label="`${(editedItem.value) ? 'Enabled' : 'Disabled'}`" v-model="editedItem.value" color="primary" persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.units")
                // Edit range (min..max) data through slider
                template(v-else-if="editedItem.meta && editedItem.type === 'slider'")
                  v-flex(xs9)
                    v-slider(v-model="editedItem.value" :min="editedItem.meta.min" :max="editedItem.meta.max" :step="editedItem.increment" thumb-label persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.units")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Edit value through bitmasks
                template(v-else-if="editedItem.meta && editedItem.type === 'bitmask'")
                  v-flex(xs9)
                    v-checkbox(v-for="(value,vx) in JSON.parse(editedItem.meta.bitmask)" hide-details v-model="editedItem.bitmasks" :label="value" color="primary" :key="vx")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Edit value through radios
                template(v-else-if="editedItem.meta && editedItem.type == 'radio'")
                  v-flex(xs9)
                    v-radio-group(v-model="editedItem.value" :mandatory="false" hide-details)
                      v-radio(v-for="(value,vx) in JSON.parse(editedItem.meta.values)" hide-details :label="value" :value="vx" color="primary" :key="vx")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Edit value through select
                template(v-else-if="editedItem.meta && editedItem.type === 'select'")
                  v-flex(xs9)
                    v-select.input-group--focused(:items="editedItem.selectValues" v-model="editedItem.value" label="Parameter Value" dense single-line bottom autofocus persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.units")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Fallback - Edit value through input text
                template(v-else)
                  v-flex(xs12)
                    v-text-field(label="Value" v-model="editedItem.value" autofocus persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.units")
              // Display documentation and reboot notice if required
              v-divider.mt-3
              v-layout(wrap)
                v-flex(xs-12)
                  template(v-if="editedItem.meta && editedItem.meta.documentation")
                    .pt-1.caption.grey--text Documentation
                    div(v-html="editedItem.meta.documentation")
                template(v-if="editedItem.meta && editedItem.meta.rebootRequired")
                  v-alert.my-1.py-1.mx-1.my-1(outline color="warning" icon="priority_high" :value="true") Reboot required to activate changes to this parameter
              // Display other meta data
              v-layout(wrap)
                v-flex(xs-12)
                  template(v-if="editedItem.meta && editedItem.meta.humanGroup")
                    .pt-2.caption.grey--text Group
                    div(v-html="editedItem.meta.humanGroup")
                  template(v-else-if="editedItem.meta && editedItem.meta.group")
                    .pt-2.caption.grey--text Group
                    div(v-html="editedItem.meta.group")
                  template(v-if="editedItem.meta && editedItem.meta.values")
                    .pt-2.caption.grey--text Values
                    div(v-for="(value,vx) in JSON.parse(editedItem.meta.values)")
                      span.primary--text(v-if="vx==editedItem.value") {{ vx }}: <strong>{{ value }}</strong> (Current Value)
                      span(v-else) {{ vx }}: <strong>{{ value }}</strong>
                  template(v-if="editedItem.meta && (editedItem.meta.min || editedItem.meta.max || editedItem.meta.increment)")
                    .pt-2.caption.grey--text Range
                    table(width='80%')
                      thead
                        tr
                          th.grey--text.text-xs-left Min
                          th.grey--text.text-xs-left Max
                          th.grey--text.text-xs-left Increment
                      tbody
                        tr
                          td(v-if="editedItem.meta.min" v-html="editedItem.meta.min")
                          td.grey--text(v-else) --
                          td(v-if="editedItem.meta.max" v-html="editedItem.meta.max")
                          td.grey--text(v-else) --
                          td(v-if="editedItem.meta.increment" v-html="editedItem.meta.increment")
                          td.grey--text(v-else) --
                  template(v-if="editedItem.meta && editedItem.meta.units")
                    .pt-1.caption.grey--text Units
                    div(v-html="editedItem.meta.units") span(v-if="editedItem.meta.unitText") ({{ editedItem.meta.unitText }})
      //- Display dynamic table with parameters
      v-card.px-0.py-0.transparent.elevation-0
        v-card-title
          v-spacer
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-data-table.transparent.px-2.pt-0.pb-4(expand :search="search" :headers="headers" :items="params" :pagination.sync="pagination" item-key="id" :custom-filter="customFilter" :rows-per-page-items="[10,25,50]")
          template(slot="items" slot-scope="props")
            tr(@click="props.expanded = !props.expanded")
              td.justify-center.px-0.text-xs-right
                v-btn.mx-0(icon @click.stop="editItem(props.item)")
                  v-icon edit
              td(v-if="props.item.meta.humanGroup" v-html="props.item.meta.humanGroup")
              td(v-else-if="props.item.meta.group" v-html="props.item.meta.group")
              td(v-else v-html="'--'")
              td(v-html="highlight(props.item.id, search)")
              td(v-html="valueFormat(props.item)")
              td(v-if="props.item.meta && props.item.meta.humanName" v-html="highlight(props.item.meta.humanName, search)")
              td(v-else) -- 
          //- Expand row with meta data about parameter
          template(slot="expand" slot-scope="props")
            v-card(flat)
              v-card-text
                table.px-0.py-0(width='100%')
                  tr.transparent(v-if="props.item.meta && props.item.meta.documentation")
                    td: strong Documentation
                    td: span(v-html="highlight(props.item.meta.documentation, search)")
                  template(v-if="props.item.meta && props.item.meta.fields")
                    tr.transparent
                      td: strong Fields
                      td
                        div(v-for="(field,fx) in JSON.parse(props.item.meta.fields)")
                          strong {{ fx }}: {{ field }}
                  template(v-if="props.item.meta && props.item.meta.values")
                    tr.transparent
                      td: strong Values
                      td
                        div(v-for="(value,vx) in JSON.parse(props.item.meta.values)")
                          span.primary--text(v-if="vx==props.item.value") {{ vx }}: <strong>{{ value }}</strong> (Active)
                          span(v-else) {{ vx }}: <strong>{{ value }}</strong>
                  // template
                    tr
                      td(v-html="props.item" colspan='5')
          v-alert(slot="no-results" :value="true" color="error" icon="warning") Your search for "{{ search }}" found no results.
</template>

<script>
import Vue from 'vue'
import { paramsQuery, paramsSubscription, updateParam } from '../../../graphql/gql/Parameters.gql'
export default {
  name: 'ConfigParamFilter',
  data () {
    return {
      params: [],
      headers: [
        { text: '', value: '', sortable: false },
        { text: 'Group', value: 'meta.group', align: 'left' },
        { text: 'Name', value: 'id', align: 'left' },
        { text: 'Value', value: 'value', align: 'left', sortable: false },
        { text: 'Description', value: 'meta.humanName', align: 'left', sortable: false }
      ],
      pagination: {
        sortBy: 'id'
      },
      search: '',
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        value: null,
        meta: null
      },
      bitmasks: []
    }
  },

  computed: {
    activeApi () { return this.$store.state.activeApi }
  },

  methods: {
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(function (row) {
        return (filter(row.id, search) || filter(row.value, search) || (row.meta && (filter(row.meta.humanName, search) || filter(row.meta.documentation, search))))
      })
    },
    highlight (text, search) {
      if (!search) {
        return text
      } else {
        return text.replace(new RegExp(search, 'gi'), match => {
          return '<span class="primary--text">' + match + '</span>'
        })
      }
    },
    valueFormat (param) {
      if (param.meta && param.meta.units) {
        return param.value + ' <span class="caption"><strong>' + param.meta.units + '</strong></span>'
      }
      if (param && param.meta && param.meta.values) {
        const values = JSON.parse(param.meta.values)
        if (values[param.value]) {
          return values[param.value]
        }
      }
      return param ? param.value : null
    },
    findParam (id) {
      return this.params.find(x => x.id === id)
    },
    findParamIndex (id) {
      return this.params.findIndex(x => x.id === id)
    },
    editItem (item) {
      // Set the param index and create a copy for the edit dialog
      this.editedIndex = this.params.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const values = JSON.parse(this.editedItem.meta.values)
      if (this.editedItem.meta && this.editedItem.meta.type && this.editedItem.meta.type === 'BOOLEAN') {
        this.editedItem.type = 'boolean'
      } else if (this.editedItem.meta && this.editedItem.meta.type && this.editedItem.meta.type === 'BITMASK') {
        const bitmask = JSON.parse(this.editedItem.meta.bitmask)
        const reverseKeys = Object.keys(bitmask).reverse()
        let paramVal = this.editedItem.value
        console.log(reverseKeys)
        let selectedBits = []
        for (var i in reverseKeys) {
          var keyVal = reverseKeys[i]
          console.log(keyVal)
          if (paramVal - keyVal >= 0) {
            console.log(keyVal)
            selectedBits.push(keyVal.toString())
            paramVal -= keyVal
          }
        }
        console.log(selectedBits)
        this.editedItem.bitmasks = selectedBits
        this.editedItem.type = 'bitmask'
      } else if (this.editedItem.meta && this.editedItem.meta.values && Object.keys(values).length <= 6) {
        this.editedItem.value = this.editedItem.value.toString() // Select needs to match the string index
        this.editedItem.type = 'radio'
      // If the parameter has meta values, translate them into array of hashes for select dropdown
      } else if (this.editedItem.meta && this.editedItem.meta.values) {
        this.editedItem.selectValues = Object.keys(values).map(value => ({value: value, text: values[value]}))
        this.editedItem.value = this.editedItem.value.toString() // Select needs to match the string index
        this.editedItem.type = 'select'
      } else if (this.editedItem.meta && this.editedItem.meta.min != null && this.editedItem.meta.max != null) {
        this.editedItem.type = 'slider'
        // If increment is not set in meta data, create a default depending on the size of the defined range
        if (!this.editedItem.meta.increment) {
          if (this.editedItem.meta.max - this.editedItem.meta.min > 1000) {
            this.editedItem.increment = 100
          } else if (this.editedItem.meta.max - this.editedItem.meta.min > 100) {
            this.editedItem.increment = 10
          } else if (this.editedItem.meta.max - this.editedItem.meta.min > 10) {
            this.editedItem.increment = 1
          } else if (this.editedItem.meta.max - this.editedItem.meta.min > 1) {
            this.editedItem.increment = 0.1
          } else if (this.editedItem.meta.max - this.editedItem.meta.min > 0.1) {
            this.editedItem.increment = 0.01
          } else {
            this.editedItem.increment = 0.001
          }
        } else {
          this.editedItem.increment = this.editedItem.meta.increment
        }
      } else {
        this.editedItem.type = 'input'
      }
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    save () {
      if (this.editedItem.bitmasks) {
        console.log('bitmasks!')
        console.log(this.editedItem.bitmasks)
      }
      this.$apollo.mutate({
        mutation: updateParam,
        variables: {
          id: this.editedItem.id,
          value: this.editedItem.value
        }
      })
      // console.log('Saved param: ' + this.editedItem.id + ' with value: ' + this.editedItem.value)
      this.close()
    }
  },

  apollo: {
    $client () { return this.activeApi },
    params: {
      query: paramsQuery,
      manual: true,
      result ({ data, loading }) {
        if (!loading && !this.params.length) {
          Object.keys(data.params).forEach(key => { Vue.set(this.params, key, data.params[key]) })
        }
        // console.log('received params: ' + this.params.length)
      },
      /*
      subscribeToMore: {
        document: paramsSubscription,
        // If we receive updated param, iterate through the existing params (previousResult) and carefully update just the updated parameter
        updateQuery: (previousResult, { subscriptionData }) => {
          const update = subscriptionData.data.params
          if (!/^STAT_/.test(update.id)) {
            console.log('Updating parameter: ' + update.id)
            const paramData = {
              params: previousResult.params.map(param => {
                // We can't update immutable apollo data, so instead create a deep copy and return that into the array map
                if (param.id === update.id) {
                  let paramcopy = JSON.parse(JSON.stringify(param))
                  paramcopy.value = update.value
                  return paramcopy
                // Otherwise return the array object by reference
                } else {
                  return param
                }
              })
            }
            return paramData
          }
        }
      },
      */
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
  },

  mounted () {
    // Hack datatables to be transparent
    const tables = document.querySelectorAll('.datatable.table, .datatable__actions')
    Object.keys(tables).forEach(key => { tables[key].className += ' transparent' })
  },

  destroyed () {
    // this.$apollo.destroy()
  }
}
</script>
