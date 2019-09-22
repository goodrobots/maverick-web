<template lang='pug'>
v-container.px-2.py-2(fluid grid-list-xl)
  v-layout.layout-attach(row wrap)
    v-flex(xs12)
      //- Popup to edit parameter
      v-dialog(v-model="editDialog" max-width="500px" attach='.layout-attach')
        v-card
          v-card-title.pb-0
            span.headline Edit Parameter
            v-spacer
            v-card-actions
              v-btn(outlined color="grey lighten-1" @click.native="close") Cancel
              v-btn(:color="navColor" @click.native="save") Save
          v-card-text.pt-0
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12)
                  div(v-html="editedItem.id")
                  div.body-2.font-weight-bold(v-html="editedItem.meta && editedItem.meta.humanName")
              v-layout(wrap)
                // Edit boolean value through switch
                template(v-if="editedItem.meta && editedItem.type === 'boolean'")
                  v-flex(xs12)
                    v-switch(:label="`${(editedItem.value) ? 'Enabled' : 'Disabled'}`" v-model="editedItem.value" :color="navColor" persistent-hint :suffix="editedItem.meta && editedItem.meta.units")
                // Edit range (min..max) data through slider
                template(v-else-if="editedItem.meta && editedItem.type === 'slider'")
                  v-flex(xs9)
                    v-slider.pt-8(v-model="editedItem.value" :min="editedItem.meta.min" :max="editedItem.meta.max" :step="editedItem.increment" :color="navColor +' lighten-2'" thumb-label persistent-hint :suffix="editedItem.meta && editedItem.meta.units")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Edit value through bitmasks
                template(v-else-if="editedItem.meta && editedItem.type === 'bitmask'")
                  v-flex(xs9)
                    v-checkbox(v-for="(value,vx) in JSON.parse(editedItem.meta.bitmask)" hide-details v-model="editedItem.bitmasks" :label="value" :color="navColor" :key="vx")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Edit value through radios
                template(v-else-if="editedItem.meta && editedItem.type == 'radio'")
                  v-flex(xs9)
                    v-radio-group(v-model="editedItem.value" :mandatory="false" hide-details)
                      v-radio(v-for="(value,vx) in JSON.parse(editedItem.meta.values)" hide-details :label="vx + '(' + value.toString() + ')'" :value="value.toString()" :color="navColor" :key="value")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Edit value through select
                template(v-else-if="editedItem.meta && editedItem.type === 'select'")
                  v-flex(xs9)
                    v-select.input-group--focused(:items="editedItem.selectValues" v-model="editedItem.value" label="Parameter Value" :color="navColor" dense single-line bottom autofocus persistent-hint :suffix="editedItem.meta && editedItem.meta.units")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value' hint="Override" persistent-hint)
                // Fallback - Edit value through input text
                template(v-else)
                  v-flex(xs12)
                    v-text-field(label="Value" v-model="editedItem.value" autofocus persistent-hint :suffix="editedItem.meta && editedItem.meta.units")
              // Display documentation and reboot notice if required
              v-divider.mt-3
              v-layout(wrap)
                v-flex(xs-12)
                  template(v-if="editedItem.meta && editedItem.meta.documentation")
                    .pt-1.caption.grey--text Documentation
                    div.font-weight-medium(v-html="editedItem.meta.documentation")
                template(v-if="editedItem.meta && editedItem.meta.rebootRequired")
                  v-alert.my-1.py-1.mx-1.my-1(outline color="warning" icon="priority_high" :value="true") Reboot required to activate changes to this parameter
              // Display other meta data
              v-layout(wrap)
                v-flex(xs-12)
                  template(v-if="editedItem.meta && editedItem.meta.humanGroup")
                    .pt-2.caption.grey--text Group
                    div.font-weight-bold(v-html="editedItem.meta.humanGroup")
                  template(v-else-if="editedItem.meta && editedItem.meta.group")
                    .pt-2.caption.grey--text Group
                    div.font-weight-bold(v-html="editedItem.meta.group")
                  template(v-if="editedItem.meta && editedItem.meta.values")
                    .pt-2.caption.grey--text Values
                    table(width="90%")
                      tr(v-for="(value,vx) in JSON.parse(editedItem.meta.values)")
                        template(v-if="value==editedItem.value")
                          td.font-weight-bold(width='25%') {{ vx }}
                          td <strong>{{ value }}</strong> (Current Value)
                        template(v-else)
                          td(width='25%') {{ vx }}
                          td <strong>{{ value }}</strong>
                  template(v-if="editedItem.meta && (editedItem.meta.min || editedItem.meta.max || editedItem.meta.increment)")
                    .pt-2.caption.grey--text Range
                    table(width='90%')
                      thead
                        tr
                          th.grey--text.text-left Min
                          th.grey--text.text-left Max
                          th.grey--text.text-left Increment
                      tbody
                        tr
                          td.font-weight-bold(v-if="editedItem.meta.min" v-html="editedItem.meta.min")
                          td.grey--text(v-else) --
                          td.font-weight-bold(v-if="editedItem.meta.max" v-html="editedItem.meta.max")
                          td.grey--text(v-else) --
                          td.font-weight-bold(v-if="editedItem.meta.increment" v-html="editedItem.meta.increment")
                          td.grey--text(v-else) --
                  template(v-if="editedItem.meta && editedItem.meta.units")
                    .pt-1.caption.grey--text Units
                    div(v-html="editedItem.meta.units") span(v-if="editedItem.meta.unitText") ({{ editedItem.meta.unitText }})
      //- Display dynamic table with parameters
      v-card.px-0.py-0.transparent.elevation-0
        v-card-title
          div.flex-grow-1
          v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details :color="navColor")
        v-data-table.transparent.px-2.pt-0.pb-4(dense :sort-by="['id']" :search="search" :headers="headers" :items="params" item-key="id" :custom-filter="customFilter" :footer-props="{itemsPerPageOptions: [10,25,50]}" single-expand=true :expanded.sync="expanded" show-expand)
          // template(v-slot:body="{ items }")
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
          template(v-slot:item.action="{ item }")
            v-icon(small class="mr-2" @click.stop="editItem(item)") mdi-pencil
          //- Expand row with meta data about parameter
          template(v-slot:expanded-item="{ item }")
            td(colspan=20)
              v-card()
                v-card-text
                  table.px-0.py-0.expanded-table(width='100%')
                    tr(v-if="item && 'meta' in item && item.meta.documentation")
                      td: strong Documentation
                      td: span(v-html="highlight(item.meta.documentation, search)")
                    template(v-if="item && 'meta' in item && item.meta.fields")
                      tr
                        td: strong Fields
                        td.pt-1
                          div(v-for="(field,fx) in JSON.parse(item.meta.fields)")
                            strong {{ fx }}: {{ field }}
                    template(v-if="item && 'meta' in item && item.meta.values")
                      tr
                        td: strong Values
                        td.pt-1
                          div(v-for="(value,vx) in JSON.parse(item.meta.values)")
                            span.primary--text(v-if="vx==item.value") {{ vx }}: <strong>{{ value }}</strong> (Active)
                            span(v-else) {{ vx }}: <strong>{{ value }}</strong>
          template(v-slot:body.append)
            tr
              td
              td
              td
                v-select(v-model="groupSelect" :items="groups" dense :color="navColor")
          v-alert(v-slot:no-results :value="true" color="error" icon="warning") Your search for "{{ search }}" found no results.
</template>

<script>
import Vue from 'vue'
import {
  paramsQuery,
  paramSubscription,
  updateParam
} from '../../../plugins/graphql/gql/Parameters.gql'

export default {
  name: 'ConfigParamList',
  data () {
    return {
      params: [],
      expanded: [],
      groups: [],
      groupSelect: null,
      headers: [
        { text: '', value: '', sortable: false },
        {
          text: 'Group',
          value: 'meta.group',
          align: 'left',
          width: 100,
          filter: value => {
            if (!this.groupSelect) return true
            return value.includes(this.groupSelect)
          },
        },
        { text: 'Name', value: 'id', align: 'left' },
        {
          text: 'Value',
          value: 'value',
          align: 'left',
          sortable: false
        },
        {
          text: 'Description',
          value: 'meta.humanName',
          align: 'left',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false
        }
      ],
      search: '',
      editDialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        value: null,
        meta: null
      },
      bitmasks: []
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
    // Create GQL queries
    if (this.activeApi) {
      this.createQlQueries()
    }
    // Hack datatables to be transparent
    const tables = document.querySelectorAll(
      '.datatable.table, .datatable__actions'
    )
    Object.keys(tables).forEach(key => {
      tables[key].className += ' transparent'
    })
  },

  destroyed () {
    // this.$apollo.destroy()
  },

  methods: {
    close () {
      this.editDialog = false
    },
    createQlQueries () {
      this.logDebug('doing createQlQueries')
      this.createQuery('ParameterList', paramsQuery, this.activeApi, null, !this.apis[this.activeApi].state, this.processParameterList)
      this.createSubscription('Parameter', paramSubscription, this.activeApi, null, !this.apis[this.activeApi].state, this.processParameter)
    },
    customFilter (value, search, item) {
      search = search.toString().toLocaleUpperCase()
      return value != null &&
        search != null &&
        item !== null &&
        typeof item.id === 'string' &&
        (
        item.id && item.id.toString().toLocaleUpperCase().includes(search) ||
        item.value && item.value.toString().toLocaleUpperCase().includes(search) ||
        (item.meta &&
          (item.meta.humanName && item.meta.humanName.toString().toLocaleUpperCase().includes(search)) ||
          (item.meta.documentation && item.meta.documentation.toString().toLocaleUpperCase().includes(search)))
        )
    },
    editItem (item) {
      // Set the param index and create a copy for the edit dialog
      this.editedIndex = this.params.map(function(e) { return e.id; }).indexOf(item.id)
      this.editedItem = Object.assign({}, item)
      const values = JSON.parse(this.editedItem.meta.values)
      if (
        this.editedItem.meta &&
        this.editedItem.meta.type &&
        this.editedItem.meta.type === 'BOOLEAN'
      ) {
        this.editedItem.type = 'boolean'
      } else if (
        this.editedItem.meta &&
        this.editedItem.meta.type &&
        this.editedItem.meta.type === 'BITMASK'
      ) {
        const bitmask = JSON.parse(this.editedItem.meta.bitmask)
        const reverseKeys = Object.keys(bitmask).reverse()
        let paramVal = this.editedItem.value
        console.log(reverseKeys)
        const selectedBits = []
        for (const i in reverseKeys) {
          const keyVal = reverseKeys[i]
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
      } else if (
        this.editedItem.meta &&
        this.editedItem.meta.values &&
        Object.keys(values).length <= 6
      ) {
        this.editedItem.value = this.editedItem.value.toString() // Select needs to match the string index
        this.editedItem.type = 'radio'
        // If the parameter has meta values, translate them into array of hashes for select dropdown
      } else if (this.editedItem.meta && this.editedItem.meta.values) {
        this.editedItem.selectValues = Object.keys(values).map(value => ({
          value,
          text: values[value]
        }))
        this.editedItem.value = this.editedItem.value.toString() // Select needs to match the string index
        this.editedItem.type = 'select'
      } else if (
        this.editedItem.meta &&
        this.editedItem.meta.min != null &&
        this.editedItem.meta.max != null
      ) {
        this.editedItem.type = 'slider'
        // If increment is not set in meta data, create a default depending on the size of the defined range
        if (!this.editedItem.meta.increment) {
          if (this.editedItem.meta.max - this.editedItem.meta.min > 1000) {
            this.editedItem.increment = 100
          } else if (
            this.editedItem.meta.max - this.editedItem.meta.min >
            100
          ) {
            this.editedItem.increment = 10
          } else if (this.editedItem.meta.max - this.editedItem.meta.min > 10) {
            this.editedItem.increment = 1
          } else if (this.editedItem.meta.max - this.editedItem.meta.min > 1) {
            this.editedItem.increment = 0.1
          } else if (
            this.editedItem.meta.max - this.editedItem.meta.min >
            0.1
          ) {
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
      this.editDialog = true
    },
    findParam (id) {
      return this.params.find(x => x.id === id)
    },
    findParamIndex (id) {
      return this.params.findIndex(x => x.id === id)
    },
    highlight (text, search) {
      if (!search) {
        return text
      }
      return text.replace(
        new RegExp(search, 'gi'),
        match => `<span class="primary--text">${match}</span>`
      )
    },
    processParameter (data, key) {
      // const api = key.split('___')[0]
      const paramIx = this.findParamIndex(data.data.Parameter.id)
      Vue.set(this.params, paramIx, data.data.Parameter)
    },
    processParameterList (data, key) {
      const api = key.split('___')[0]
      if (!data.loading && !this.params.length) {
        Object.keys(data.data.ParameterList.parameters).forEach(pkey => {
          Vue.set(this.params, pkey, data.data.ParameterList.parameters[pkey])
        })
      }
      this.groups = [...new Set(this.params.map(param => param.meta.group.replace(/\d+$/, "")))]
      this.logDebug(`Received ${this.params.length} Parameters for api '${api}'`)
    },  
    save () {
      if (this.editedItem.bitmasks) {
        console.log('bitmasks!')
        console.log(this.editedItem.bitmasks)
      }
      this.mutateQuery(this.activeApi, updateParam, { id: this.editedItem.id, value: this.editedItem.value })
      // console.log('Saved param: ' + this.editedItem.id + ' with value: ' + this.editedItem.value)
      this.close()
    },
    valueFormat (param) {
      if (param.meta && param.meta.units) {
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
}
</script>

<style scoped>
.expanded-table tr:last-child td {
  border-bottom: 0 !important;
}
</style>