<template>
  <v-container
    fluid
    fill-height
  >
    <v-row dense>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          max-width="800"
          height="600"
          dark
          loading="mavgrey"
        >
          <div
            ref="editor"
            style="width: 100%; height: 100%; overflow:hidden;"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//https://stackoverflow.com/questions/58592128/how-can-i-integrate-monaco-with-vue-js
import * as monaco from 'monaco-editor'
import { introspectionQuery, buildClientSchema } from 'graphql'
import { validate } from 'graphql/validation'
import { maverickShellQuery, maverickShellSubscription, maverickShellMutate } from '../../../plugins/graphql/gql/MaverickShell.gql'
import { imuQuery, imuSubscription } from '../../../plugins/graphql/gql/Imu.gql'

export default {
  name: 'ConfigurationCard',
  data () {
    return {
      code: ''
    }
  },
  computed: {
    monacoSchema () {
      return this.$store.state.maverick.monacoSchema
    },
    graphqlSchema () {
      return this.$store.state.maverick.graphqlSchema
    },
    monacoCode () {
        return this.$store.state.maverick.monacoCode
    },
  },
  mounted() {
    var randomString = Math.random().toString(36).substring(7)
    var modelUri = monaco.Uri.parse(window.location.hostname + ":" + window.location.port + "/" + randomString + "/config.json"); // a made up unique URI for our model
    var model = monaco.editor.createModel(this.monacoCode, "json", modelUri);

    var tmp = buildClientSchema(this.graphqlSchema)
    console.log(tmp)
    var tmp2 = validate(tmp,maverickShellQuery)
    console.log(tmp2)
    var tmp3 = validate(tmp,imuSubscription)
    console.log(tmp3)

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
          fileMatch: [modelUri.toString()], // associate with our model
          schema: this.monacoSchema
      }]
    })

    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
      // theme: 'vs-dark',
      suggestOnTriggerCharacters: true,
      language: 'json',
      model: model,
      automaticLayout: true,
      scrollBeyondLastLine: false
    })
  },
  destroyed() {
    this.editor.dispose()
  }
}

</script>