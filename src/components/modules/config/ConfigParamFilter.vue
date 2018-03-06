<template lang='pug'>
v-container(fluid grid-list-xl)
  v-layout(row wrap)
    v-flex(xs12 sm12 md12)
      //- Popup to edit parameter
      v-dialog(v-model="dialog" max-width="500px")
        v-card
          v-card-title.pb-0
            span.headline Edit Parameter
            v-spacer
            v-card-actions
              v-btn(color="blue darken-1" flat @click.native="close") Cancel
              v-btn(color="blue darken-1" @click.native="save") Save
          v-card-text.pt-0
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12)
                  div(v-html="editedItem.id")
              v-layout(wrap)
                // Edit boolean value through switch
                template(v-if="editedItem.meta && editedItem.type === 'boolean'")
                  v-flex(xs12)
                    v-switch(:label="`${(editedItem.value) ? 'Enabled' : 'Disabled'}`" v-model="editedItem.value" color="success" persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.fields && JSON.parse(editedItem.meta.fields).Units")
                // Edit range (min..max) data through slider
                template(v-else-if="editedItem.meta && editedItem.type === 'slider'")
                  v-flex(xs9)
                    v-slider(v-model="editedItem.value" :min="editedItem.meta.min" :max="editedItem.meta.max" :step="editedItem.increment" thumb-label persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.fields && JSON.parse(editedItem.meta.fields).Units")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value')
                // Edit value through select
                template(v-else-if="editedItem.meta && editedItem.meta.values")
                  v-flex(xs9)
                    v-select.input-group--focused(:items="editedItem.selectValues" v-model="editedItem.value" label="Parameter Value" dense single-line bottom autofocus persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.fields && JSON.parse(editedItem.meta.fields).Units")
                  v-flex(xs3)
                    v-text-field(type='number' v-model='editedItem.value')
                // Fallback - Edit value through input text
                template(v-else)
                  v-flex(xs12)
                    v-text-field(label="Value" v-model="editedItem.value" autofocus persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.fields && JSON.parse(editedItem.meta.fields).Units")
              v-divider
              v-layout(wrap)
                v-flex(xs-12 sm12 md12)
                  div(v-if="editedItem.meta && editedItem.meta.documentation" v-html="editedItem.meta.documentation")
                template(v-if="editedItem.meta && editedItem.meta.fields")
                  v-flex(xs12 sm12 md12)
                    div(v-for="(field,fx) in JSON.parse(editedItem.meta.fields)")
                      span: strong {{ fx }}: {{ field }}
                template(v-if="editedItem.meta && editedItem.meta.values")
                  v-flex(xs12 sm12 md12)
                    div
                      span: strong Available Values
                      div(v-for="(value,vx) in JSON.parse(editedItem.meta.values)")
                        span.primary--text(v-if="vx==editedItem.value") {{ vx }}: <strong>{{ value }}</strong> (Active)
                        span(v-else) {{ vx }}: <strong>{{ value }}</strong>
      //- Display dynamic table with parameters
      v-card.px-0.py-0
        v-card-title
          v-spacer
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-data-table.elevation-0.px-2.pt-0.pb-4(:search="search" :headers="headers" :items="params" :pagination.sync="pagination" item-key="id" :custom-filter="customFilter" :rows-per-page-items="[10,25,50]")
          template(slot="items" slot-scope="props")
            tr(@click="props.expanded = !props.expanded")
              td(v-html="highlight(props.item.id, search)")
              td(v-if="props.item.meta && props.item.meta.humanName" v-html="highlight(props.item.meta.humanName, search)")
              td(v-else) -- 
              td(v-html="valueFormat(props.item)")
              td.justify-center.px-0.text-xs-right
                v-btn.mx-0(icon @click.stop="editItem(props.item)")
                  v-icon edit
          //- Expand row with meta data about parameter
          template(slot="expand" slot-scope="props")
            v-card(flat)
              v-card-text
                table.px-0.py-0
                  tr(v-if="props.item.meta && props.item.meta.documentation")
                    td: strong Documentation
                    td: span(v-html="highlight(props.item.meta.documentation, search)")
                  template(v-if="props.item.meta && props.item.meta.fields")
                    tr
                      td: strong Fields
                      td
                        div(v-for="(field,fx) in JSON.parse(props.item.meta.fields)")
                          strong {{ fx }}: {{ field }}
                  template(v-if="props.item.meta && props.item.meta.values")
                    tr
                      td: strong Values
                      td
                        div(v-for="(value,vx) in JSON.parse(props.item.meta.values)")
                          span.primary--text(v-if="vx==props.item.value") {{ vx }}: <strong>{{ value }}</strong> (Active)
                          span(v-else) {{ vx }}: <strong>{{ value }}</strong>
                  template
                    tr
                      td(v-html="props.item" colspan='5')
          v-alert(slot="no-results" :value="true" color="error" icon="warning") Your search for "{{ search }}" found no results.
</template>

<script>
import { paramsQuery, paramsSubscription, updateParam } from '../../../graphql/gql/Parameters.gql'
export default {
  name: 'ConfigParamFilter',
  data () {
    return {
      params: [],
      headers: [
        { text: 'Parameter Name', value: 'id', align: 'left' },
        { text: 'Parameter Description', value: 'meta.humanName', align: 'left', sortable: false },
        { text: 'Parameter Value', value: 'value', align: 'left', sortable: false },
        { text: '', value: '', sortable: false }
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
      }
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },
  methods: {
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(function (row) { return filter(row.id, search) || filter(row.value, search) || (row.meta && (filter(row.meta.humanName, search) || filter(row.meta.documentation, search))) })
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
      if (param && param.meta && param.meta.fields) {
        const fields = JSON.parse(param.meta.fields)
        if (fields.Units) {
          return param.value + ' <span class="caption"><strong>' + fields.Units + '</strong></span>'
        }
      }
      if (param && param.meta && param.meta.values) {
        const values = JSON.parse(param.meta.values)
        if (values[param.value]) {
          return values[param.value]
        }
      }
      return param ? param.value : null
    },
    editItem (item) {
      // Set the param index and create a copy for the edit dialog
      this.editedIndex = this.params.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // If the parameter has meta values, translate them into array of hashes for select dropdown
      if (this.editedItem.meta && this.editedItem.meta.type && this.editedItem.meta.type === 'BOOLEAN') {
        this.editedItem.type = 'boolean'
      } else if (this.editedItem.meta && this.editedItem.meta.values) {
        this.editedItem.selectValues = Object.keys(JSON.parse(this.editedItem.meta.values)).map(value => ({value: value, text: JSON.parse(this.editedItem.meta.values)[value]}))
        if (this.editedItem.value && JSON.parse(this.editedItem.meta.values)[this.editedItem.value] && JSON.parse(this.editedItem.meta.values)[this.editedItem.value]['text']) {
          // this.editedItem.value = this.editedItem.value.toString()
          this.editedItem.selectedValue = { value: this.editedItem.value, text: JSON.parse(this.editedItem.meta.values)[this.editedItem.value]['text'] }
        } else {
          this.editedItem.selectedValue = {}
        }
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
          } else {
            this.editedItem.increment = 0.1
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
      // Transmute booleans into 0/1
      /*
      if (this.editedItem.value === true) {
        this.editedItem.value = 1
        console.log('true!')
      }
      if (this.editedItem.value === false) this.editedItem.value = 0
      */
      this.$apollo.mutate({
        mutation: updateParam,
        variables: {
          id: this.editedItem.id,
          value: this.editedItem.value
        }
      })
      this.close()
    }
  },
  apollo: {
    $client () { return this.activeApi },
    params: {
      query: paramsQuery,
      subscribeToMore: {
        document: paramsSubscription,
        // If we receive updated param, iterate through the existing params (previousResult) and carefully update just the updated parameter
        updateQuery: (previousResult, { subscriptionData }) => {
          const update = subscriptionData.data.params
          return {
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
        }
      },
      mutation: updateParam
    }
  }
}
</script>
