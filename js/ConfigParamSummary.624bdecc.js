(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ConfigParamSummary"],{e925:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fluid grid-list-xl"},[e("v-layout",{staticClass:"row wrap"},[e("v-flex",{staticClass:"xs12 sm6 md6"},[e("v-card",[e("v-toolbar",{attrs:{dense:""}},[e("v-toolbar-title",[t._v("Overview")])],1),e("v-card-text",[e("table",{attrs:{width:"50%"}},[e("tr",[e("td",[t._v("Vehicle Type")]),e("td",{staticClass:"primary--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("SYSID_SW_TYPE")))}})]),t.findParam("FRAME_CLASS")?[e("tr",[e("td",[t._v("Frame Class")]),e("td",{staticClass:"primary--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("FRAME_CLASS")))}})]),e("tr",[e("td",[t._v("Frame Type")]),e("td",{staticClass:"primary--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("FRAME_TYPE")))}})])]:t.findParam("MAV_TYPE")?[e("tr",[e("td",[t._v("Frame Type")]),e("td",{staticClass:"primary--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("MAV_TYPE")))}})])]:t._e()],2)])],1)],1),e("v-flex",{staticClass:"xs12 sm6 md6"},[e("v-card",[e("v-toolbar",{attrs:{dense:""}},[e("v-toolbar-title",[t._v("Parameter Checklist")])],1),e("v-card-title",{attrs:{"primary-title":""}},[e("div",[e("h3",{staticClass:"headline mb-0 grey--text"},[t._v("Logging")])]),e("table",{attrs:{width:"100%"}},[e("tr",[e("td",[t._v("Mavlink Logging")]),t.findParam("LOG_BACKEND_TYPE")&&3==t.findParam("LOG_BACKEND_TYPE").value?[e("td",{staticClass:"green--text"},[t._v("Good")]),e("td",{staticClass:"green--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("LOG_BACKEND_TYPE")))}})]:[e("td",{staticClass:"red--text"},[t._v("Bad")]),e("td",{staticClass:"red--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("LOG_BACKEND_TYPE")))}})]],2),e("tr",[e("td",[t._v("Logging while Disarmed")]),t.findParam("LOG_DISARMED")&&0==t.findParam("LOG_DISARMED").value?[e("td",{staticClass:"green--text"},[t._v("Good")]),e("td",{staticClass:"green--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("LOG_DISARMED")))}})]:[e("td",{staticClass:"red--text"},[t._v("Bad")]),e("td",{staticClass:"red--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("LOG_DISARMED")))}})]],2),e("tr",[e("td",[t._v("Stop/Rotate log on Disarm")]),t.findParam("LOG_FILE_DSRMROT")&&1==t.findParam("LOG_FILE_DSRMROT").value?[e("td",{staticClass:"green--text"},[t._v("Good")]),e("td",{staticClass:"green--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("LOG_FILE_DSRMROT")))}})]:[e("td",{staticClass:"red--text"},[t._v("Bad")]),e("td",{staticClass:"red--text",domProps:{innerHTML:t._s(t.valueFormat(t.findParam("LOG_FILE_DSRMROT")))}})]],2)])])],1)],1)],1)],1)},r=[],i=(e("99af"),e("7db0"),e("d3b7"),e("ac1f"),e("5319"),e("ddb0"),e("3900")),n={name:"ConfigParamSummary",data:function(){return{params:[],paramData:[]}},watch:{activeApi:{handler:function(t){this.logDebug("activeApi changed: "+t),this.createQlQueries()}}},mounted:function(){this.createQlQueries()},methods:{createQlQueries:function(){this.activeApi&&this.createQuery("Params",i["paramsQuery"],this.activeApi,"paramsData",!this.apis[this.activeApi].state)},findParam:function(t){return this.params.find((function(a){return a.id===t}))},processParamQuery:function(t,a){var e=a.replace("Status_","");this.logDebug(t.data),t.data&&"Status"in t.data&&(!0!==this.apis[e].state&&this.$store.commit("data/setApiState",{api:e,value:!0}),null===this.apistate[e].lasteen&&this.$store.commit("core/setApiState",{api:e,field:"lastseen",value:performance.now()}),e in this.$store.state.statusData||this.$store.commit("core/setStatusData",{api:e,message:t.data.Status}))},valueFormat:function(t){if(t&&t.meta&&t.meta.units)return"".concat(t.value,' <span class="caption"><strong>').concat(t.meta.units,"</strong></span>");if(t&&t.meta&&t.meta.values){var a=JSON.parse(t.meta.values);if(a[t.value])return a[t.value]}return t?t.value:null}}},d=n,o=e("2877"),l=e("6544"),m=e.n(l),c=e("b0af"),u=e("99d9"),v=e("a523"),_=e("0e8f"),p=e("a722"),f=e("71d9"),P=e("2a7f"),C=Object(o["a"])(d,s,r,!1,null,null,null);a["default"]=C.exports;m()(C,{VCard:c["a"],VCardText:u["b"],VCardTitle:u["c"],VContainer:v["a"],VFlex:_["a"],VLayout:p["a"],VToolbar:f["a"],VToolbarTitle:P["b"]})}}]);
//# sourceMappingURL=ConfigParamSummary.624bdecc.js.map