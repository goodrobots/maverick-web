(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ConfigModule"],{"12b8":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("config-drawer"),e("v-content",[e("v-container",{attrs:{fluid:""}},[e("router-view",{key:t.activeApi})],1)],1)],1)},a=[],o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-navigation-drawer",{attrs:{app:"",left:"",clipped:"",fixed:""},model:{value:t.drawer,callback:function(i){t.drawer=i},expression:"drawer"}},[e("v-list",{attrs:{dense:""}},[e("v-subheader",{staticClass:"mt-3 grey--text text--darken-1"},[t._v("GENERAL CONFIG")]),e("v-list-item",{staticClass:"mt-3",attrs:{to:"/config/connections"},on:{click:function(t){}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-transit-connection")])],1),e("v-list-item-title",[t._v("Connections")])],1),e("v-list-item",{staticClass:"mt-3",attrs:{to:"/config/modules"},on:{click:function(t){}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-view-module")])],1),e("v-list-item-title",[t._v("Modules")])],1),e("v-list-item",{staticClass:"mt-3",attrs:{to:"/config/video"},on:{click:function(t){}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-video")])],1),e("v-list-item-title",[t._v("Video")])],1)],1),t.activeApi?e("v-list",{attrs:{dense:""}},[e("v-subheader",{staticClass:"mt-3 grey--text text--darken-1"},[t._v("FLIGHT CONTROLLER")]),e("v-list-item",{staticClass:"mt-3",attrs:{to:"/config/parameter-summary"},on:{click:function(t){}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-view-dashboard")])],1),e("v-list-item-title",[t._v("Summary")])],1),e("v-list-item",{attrs:{to:"/config/parameter-list"},on:{click:function(t){}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-view-list")])],1),e("v-list-item-title",[t._v("Parameter List")])],1)],1):t._e()],1)},s=[],r={name:"ConfigDrawer",data:function(){return{}},computed:{drawer:{get:function(){return this.$store.state.data.navDrawer},set:function(t){this.$store.commit("data/setNavDrawer",t)}}},mounted:function(){}},c=r,l=e("2877"),v=e("6544"),m=e.n(v),d=e("132d"),u=e("8860"),f=e("da13"),w=e("1800"),p=e("5d23"),_=e("f774"),g=e("e0c7"),C=Object(l["a"])(c,o,s,!1,null,null,null),b=C.exports;m()(C,{VIcon:d["a"],VList:u["a"],VListItem:f["a"],VListItemAction:w["a"],VListItemTitle:p["c"],VNavigationDrawer:_["a"],VSubheader:g["a"]});var k={name:"ConfigModule",components:{ConfigDrawer:b},data:function(){return{drawer:!0}},computed:{},mounted:function(){}},V=k,h=e("a523"),L=e("a75b"),x=Object(l["a"])(V,n,a,!1,null,null,null);i["default"]=x.exports;m()(x,{VContainer:h["a"],VContent:L["a"]})}}]);
//# sourceMappingURL=ConfigModule.039b635e.js.map