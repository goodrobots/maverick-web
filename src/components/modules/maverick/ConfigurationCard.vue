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
      code: '',
    }
  },
  mounted() {
    const temp = (model, position) => {
      // find out if we are completing a property in the 'dependencies' object.
      var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
      var match = textUntilPosition.match(/"dependencies"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/);
      if (!match) {
          return { suggestions: [] };
      }
      var word = model.getWordUntilPosition(position);
      var range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
      };
      console.log(this.createDependencyProposals)
      return {
        suggestions: this.createDependencyProposals(range)
      };
    }
    monaco.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: temp
    });
    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
      value: "{\n\t\"dependencies\": {\n\t\t\n\t}\n}\n",
      language: 'json',
      automaticLayout: true,
      scrollBeyondLastLine: false
    })
  },
  methods: {
    createDependencyProposals: function(range) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
      return [
          {
              label: '"lodash"',
              kind: monaco.languages.CompletionItemKind.Function,
              documentation: "The Lodash library exported as Node.js modules.",
              insertText: '"lodash": "*"',
              range: range
          },
          {
              label: '"express"',
              kind: monaco.languages.CompletionItemKind.Function,
              documentation: "Fast, unopinionated, minimalist web framework",
              insertText: '"express": "*"',
              range: range
          },
          {
              label: '"mkdirp"',
              kind: monaco.languages.CompletionItemKind.Function,
              documentation: "Recursively mkdir, like <code>mkdir -p</code>",
              insertText: '"mkdirp": "*"',
              range: range
          },
          {
              label: '"my-third-party-library"',
              kind: monaco.languages.CompletionItemKind.Function,
              documentation: "Describe your library here",
              insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: range
          }
      ];
    }
  }
}

// https://stackoverflow.com/questions/51540252/monaco-editor-linting-errors-customization-with-warning-error-icons
// let newDecorations = errors.map(e => {
//       return {
//         range: new monaco.Range(e.startLineNumber, 1, e.startLineNumber, 1),
//         options: {
//           glyphMarginClassName: e.severity === monaco.Severity.Error ? 'errorIcon' : 'warningIcon',
//           glyphMarginHoverMessage: {value: e.message}
//         }
//       }
//     })

//     this.decorations = this.editor.deltaDecorations(this.decorations, newDecorations)

</script>

<style scoped>
.warningIcon {
  display: block;
  /* background-image: url('../assets/icons/warningIcon.png'); */
  background-size: contain;
  background-repeat: no-repeat;
}

.errorIcon {
  display: block;
  /* background-image: url('../assets/icons/errorIcon.png'); */
  background-size: contain;
  background-repeat: no-repeat;
}
</style>