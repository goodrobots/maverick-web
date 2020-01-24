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
          height="300"
          dark
        >
          <MonacoEditor
            ref="editor"
            v-model="code"
            class="editor"
            language="json"
            opt
            @editorDidMount="editorDidMount"
            @editorWillMount="editorWillMount"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  name: 'ConfigurationCard',
  components: {
    MonacoEditor
  },
  data () {
    return {
      code: '',
    }
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    },
  },
  mounted() {
    this.editor = this.$refs.editor.getEditor()
    console.log(this.editor)
  },
  methods: {
    editorWillMount(monaco) {
      console.log(monaco)
    },
    editorDidMount(editor) {
      // Listen to `scroll` event
      editor.onDidScrollChange(e => {
        console.log(e)
      })
    }
  }
}
// use editor.layout() to resize the editor after screen changes https://github.com/egoist/vue-monaco/issues/10
</script>

<style>
.editor {
  width: 100%;
  height: 100%;
}
</style>