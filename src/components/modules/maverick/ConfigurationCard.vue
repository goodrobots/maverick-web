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
    monacoCode () {
        return this.$store.state.maverick.monacoCode
    },
  },
  mounted() {
    var randomString = Math.random().toString(36).substring(7)
    var modelUri = monaco.Uri.parse("maverick:/"+randomString+"/config.json"); // a made up unique URI for our model
    var model = monaco.editor.createModel(this.monacoCode, "json", modelUri);

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