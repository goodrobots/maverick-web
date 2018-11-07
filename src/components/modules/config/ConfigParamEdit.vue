<template functional lang='pug'>
v-dialog(v-model="dialog" max-width="500px")
  v-card
    v-card-title
      span.headline Edit Parameter
    v-card-text
      v-container(grid-list-md)
        v-layout(wrap)
          v-flex(xs12 sm12 md12)
            div(v-html="props.editedItem.id")
        v-layout(wrap)
          v-flex(xs9 sm9 md9)
            template(v-if="props.editedItem.meta && props.props.editedItem.meta.values")
              v-select.input-group--focused(:items="props.editedItem.selectValues" v-model="props.editedItem.value" label="Parameter Value" dense single-line bottom autofocus persistent-hint :hint="props.editedItem.meta && props.editedItem.meta.humanName" :suffix="props.editedItem.meta && props.editedItem.meta.fields && JSON.parse(props.editedItem.meta.fields).Units")
            template(v-else)
              v-text-field(label="Value" v-model="props.editedItem.value" autofocus persistent-hint :hint="props.editedItem.meta && props.editedItem.meta.humanName" :suffix="props.editedItem.meta && props.editedItem.meta.fields && JSON.parse(props.editedItem.meta.fields).Units")
        v-layout(wrap)
          v-flex(xs-12 sm12 md12)
            div(v-if="props.editedItem.meta && props.editedItem.meta.documentation" v-html="props.editedItem.meta.documentation")
          template(v-if="props.editedItem.meta && props.editedItem.meta.fields")
            v-flex(xs12 sm12 md12)
              div(v-for="(field,fx) in JSON.parse(props.editedItem.meta.fields)")
                span: strong {{ fx }}: {{ field }}
          template(v-if="props.editedItem.meta && props.editedItem.meta.values")
            v-flex(xs12 sm12 md12)
              div
                span: strong Available Values
                div(v-for="(value,vx) in JSON.parse(props.editedItem.meta.values)")
                  span.primary--text(v-if="vx==props.editedItem.value") {{ vx }}: <strong>{{ value }}</strong> (Active)
                  span(v-else) {{ vx }}: <strong>{{ value }}</strong>
      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" flat @click.native="close") Cancel
        v-btn(color="blue darken-1" flat @click.native="save") Save
</template>

<script>
export default {
  name: 'ConfigParamEdit'
  /*
  props: {
    editedItem: Object
  }
  */
}
</script>
