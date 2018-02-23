<template lang='pug'>
v-container(fluid grid-list-xl)
  v-layout(row wrap)
    v-flex(xs12 sm12 md12)
      v-dialog(v-model="dialog" max-width="500px")
        v-card
          v-card-title
            span.headline Edit Parameter
          v-card-text
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12 sm12 md12)
                  div(v-html="editedItem.id")
              v-layout(wrap)
                v-flex(xs9 sm9 md9)
                  template(v-if="editedItem.meta && editedItem.meta.values")
                    v-select.input-group--focused(:items="editedItem.selectValues" v-model="editedItem.value" label="Parameter Value" dense single-line bottom autofocus persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.fields && JSON.parse(editedItem.meta.fields).Units")
                  template(v-else)
                    v-text-field(label="Value" v-model="editedItem.value" autofocus persistent-hint :hint="editedItem.meta && editedItem.meta.humanName" :suffix="editedItem.meta && editedItem.meta.fields && JSON.parse(editedItem.meta.fields).Units")
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
            v-card-actions
              v-spacer
              v-btn(color="blue darken-1" flat @click.native="close") Cancel
              v-btn(color="blue darken-1" flat @click.native="save") Save
      v-expansion-panel.px-0.py-0(popout, focusable)
        v-expansion-panel-content(lazy v-for="(paramGroup, pgx) in paramGroups" :key="pgx")
          div(slot='header') {{ paramGroup }}
          v-card
            v-data-table.elevation-1.px-4.py-4(:items="params" :headers="headers" :search="paramGroup" :custom-filter="groupFilter" hide-actions hide-headers)
              template(slot="items" slot-scope="props")
                tr(@click="props.expanded = !props.expanded")
                  td(v-html="props.item.id")
                  td(v-if="props.item.meta && props.item.meta.humanName" v-html="props.item.meta.humanName")
                  td(v-else) --
                  td(v-html="valueFormat(props.item)")
                  td.justify-center.px-0.text-xs-right
                    v-btn.mx-0(icon @click.stop="editItem(props.item)")
                      v-icon edit
              template(slot="expand" slot-scope="props")  
                v-card(flat)
                  v-card-text
                    table.px-0.py-0
                      tr(v-if="props.item.meta && props.item.meta.documentation")
                        td: strong Documentation
                        td: span(v-html="props.item.meta.documentation")
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
</template>

<script>
import { paramsQuery, paramsSubscription, updateParam } from '../../../graphql/Parameters.gql'
export default {
  name: 'ConfigParamGroups',
  data () {
    return {
      params: [],
      loading: 0,
      headers: [{}, {}, {}],
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
    paramGroups () {
      if (this.params) {
        return [...new Set(this.params.map(param => { return param.meta ? param.meta.group : null }))].sort()
      } else {
        return []
      }
    }
  },
  methods: {
    groupFilter (items, search, filter) {
      return items.filter(function (row) { return row.meta && filter(row.meta.group, search.toString().toLowerCase()) })
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
      this.editedIndex = this.params.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (this.editedItem.meta && this.editedItem.meta.values) {
        this.editedItem.selectValues = Object.keys(JSON.parse(this.editedItem.meta.values)).map(value => ({value: value, text: JSON.parse(this.editedItem.meta.values)[value]}))
        this.editedItem.value = this.editedItem.value.toString()
        this.editedItem.selectedValue = { value: this.editedItem.value.toString(), text: JSON.parse(this.editedItem.meta.values)[this.editedItem.value]['text'] }
      }
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    save () {
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
