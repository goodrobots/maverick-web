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
          :loading="loadingBar"
        >
          <div
            ref="terminal"
            style="width: 100%; height: 100%; overflow:hidden;"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { WebglAddon } from "xterm-addon-webgl"
import { WebLinksAddon } from "xterm-addon-web-links"
import { Unicode11Addon } from 'xterm-addon-unicode11'
import { SerializeAddon } from "xterm-addon-serialize"

import { maverickShellQuery, maverickShellSubscription, maverickShellMutate } from '../../../plugins/graphql/gql/MaverickShell.gql'
import { navSatFixMutate } from '../../../plugins/graphql/gql/NavSatFix.gql'

export default {
  name: "CommandsCard",
  data() {
    return {
      processRunning: false,
      commands: [
        {
          name: "configure",
          description: "Apply current configuration",
          status: false
        },
        {
          name: "reboot",
          description: "Restart the companion computer",
          status: false
        },
        {
          name: "shutdown",
          description: "shutdown the companion computer",
          status: false
        }
      ]
    };
  },
  computed: {
    activeApi() {
      return this.$store.state.activeApi;
    },
    loadingBar() {
      if (this.processRunning) {
        return "mavgrey"
      } else {
        return false
      }
    }
  },
  mounted() {
    this.createQuerys()
    const el = this.$refs.terminal;
    let term = new Terminal();
    this.term = term;

    this.fitAddon = new FitAddon(); // https://xtermjs.org/docs/api/addons/fit/
    const webglAddon = new WebglAddon();
    const webLinksAddon = new WebLinksAddon();
    const unicode11Addon = new Unicode11Addon();
    this.serializeAddon = new SerializeAddon();

    this.term.loadAddon(unicode11Addon);
    this.term.loadAddon(webLinksAddon);
    this.term.loadAddon(this.serializeAddon);
    this.term.loadAddon(this.fitAddon);

    this.term.open(el, true);
    // this.term.loadAddon(webglAddon) // TODO: do we need to use webgl for our application?
    this.term.unicode.activeVersion = '11'
    term.element.style.padding = "10px"
    term.element.style.height = "100%"
    term.element.style.width = "100%"
    term.element.style.overflow = "hidden"
    this.fitAddon.fit();
    this.term.focus()
    window.addEventListener('resize',this.resizeEventHandler)
    this.input = ""
    this.processRunning = false
    term.prompt = () => {
      term.write("\r\n$ ");
    };

    term.clear = () => {
      term.write("\x1b[H\x1b[2J")
      term.prompt()
    };

    term.onKey(e => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        if (this.input) {
          this.sendToApi(this.input)
        } else {
          term.prompt()
        }
        this.input = ""
      } else if (ev.keyCode === 8) {
        this.input = this.input.slice(0,-1)
        // Do not delete the prompt
        if (term._core.buffer.x > 2) {
          term.write("\b \b")
        }
      } else if (ev.keyCode === 9) { // handle tabs
        this.sendToApi(this.input + e.key)
      } else if (printable) {
        term.write(e.key)
        this.input += e.key
      }
    });

    this.term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $");
  },
  beforeDestroy() {
    // TODO: store this to allow resume
    console.log(JSON.stringify(this.serializeAddon.serialize()))
    window.removeEventListener("resize", this.resizeEventHandler);
  },
  methods: {
    createQuerys() {
      console.log(this.verifyQuery(maverickShellQuery, 'dev'))
      console.log(this.verifyQuery(navSatFixMutate, 'dev'))
      this.clearAllVerifiedQueries()
      console.log(this.verifyQuery(maverickShellQuery, 'dev'))

      this.createQuery('MaverickShell', maverickShellQuery, 'dev', null, null, this.processMaverickShellQuery)
      this.createSubscription('MaverickShell', maverickShellSubscription, 'dev', null, null, this.processMaverickShellSubscription)
    },
    resizeEventHandler(e) {
      this.fitAddon.fit()
    },
    writeToTerminal(output, running = false) {
      let output_lines = output.split(/\r?\n/)
      output_lines.forEach(element => {
        if (element.trim().length > 0) {
          if (running == false) {
            this.term.write("\r\n")
            running = true
          }
          this.term.writeln(element)
        }
      })
    },
    sendToApi(input) {
      this.mutateQuery('dev', maverickShellMutate, {
        command: input
      })
    },
    processMaverickShellSubscription(data, key) {
      if (data.data && 'MaverickShell' in data.data) {
        this.writeToTerminal(data.data.MaverickShell.stdout, this.processRunning)
        this.writeToTerminal(data.data.MaverickShell.stderror, this.processRunning)
        this.processRunning = data.data.MaverickShell.running
        if (!data.data.MaverickShell.running) {
          this.processRunning = data.data.MaverickShell.running
          this.term.write("\r$ ");
        }
      }
      console.log(data.data.MaverickShell.stdout)
      console.log(data.data.MaverickShell.stderror)
    },
    processMaverickShellQuery(data, key) {
      if (data.data && 'MaverickShell' in data.data) {
        this.processRunning = data.data.MaverickShell.running
      }
    },
  }
};
</script>

<style>
/**
 *  Default styles for xterm.js
 *  https://github.com/xtermjs/xterm.js/blob/master/css/xterm.css
**/

.xterm {
  font-feature-settings: "liga" 0;
  position: relative;
  user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
  outline: none;
}

.xterm .xterm-helpers {
  position: absolute;
  top: 0;
  /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
  z-index: 5;
}

.xterm .xterm-helper-textarea {
  /*
     * HACK: to fix IE's blinking cursor
     * Move textarea out of the screen to the far left, so that the cursor is not visible.
     */
  position: absolute;
  opacity: 0;
  left: -9999em;
  top: 0;
  width: 0;
  height: 0;
  z-index: -5;
  /** Prevent wrapping so the IME appears against the textarea at the correct position */
  white-space: nowrap;
  overflow: hidden;
  resize: none;
}

.xterm .composition-view {
  /* TODO: Composition position got messed up somewhere */
  background: #000;
  color: #fff;
  display: none;
  position: absolute;
  white-space: nowrap;
  z-index: 1;
}

.xterm .composition-view.active {
  display: block;
}

.xterm .xterm-viewport {
  /* On OS X this is required in order for the scroll bar to appear fully opaque */
  background-color: #000;
  overflow-y: scroll;
  cursor: default;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.xterm .xterm-screen {
  position: relative;
}

.xterm .xterm-screen canvas {
  position: absolute;
  left: 0;
  top: 0;
}

.xterm .xterm-scroll-area {
  visibility: hidden;
}

.xterm-char-measure-element {
  display: inline-block;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: -9999em;
  line-height: normal;
}

.xterm {
  cursor: text;
}

.xterm.enable-mouse-events {
  /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
  cursor: default;
}

.xterm.xterm-cursor-pointer {
  cursor: pointer;
}

.xterm.column-select.focus {
  /* Column selection mode */
  cursor: crosshair;
}

.xterm .xterm-accessibility,
.xterm .xterm-message {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  color: transparent;
}

.xterm .live-region {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.xterm-dim {
  opacity: 0.5;
}

.xterm-underline {
  text-decoration: underline;
}
</style>