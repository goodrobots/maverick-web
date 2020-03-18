(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ConfigParamGroups~ConfigParamList~ConfigParamSummary"],{3900:function(e,n,i){var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"paramQuery"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Parameter"},directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"paramsQuery"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ParameterList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"query"},value:{kind:"StringValue",value:"*",block:!1}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"parameters"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Parameter"},directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"subscription",name:{kind:"Name",value:"paramSubscription"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"Parameter"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Parameter"},directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"updateParam"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"value"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ParamValue"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"Parameter"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"value"},value:{kind:"Variable",name:{kind:"Name",value:"value"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Parameter"},directives:[]}]}}]}}],loc:{start:0,end:363}};a.loc.source={body:'#import "./ParametersFragment.gql"\n\nquery paramQuery {\n  ...Parameter\n}\n\nquery paramsQuery {\n  ParameterList(query: "*") {\n    parameters {\n      ...Parameter\n    }\n  }\n}\n\nsubscription paramSubscription {\n  Parameter {\n    ...Parameter\n  }\n}\n\nmutation updateParam ($id: String!, $value: ParamValue!) {\n  Parameter(id: $id, value: $value) {\n    ...Parameter\n  }\n}\n',name:"GraphQL request",locationOffset:{line:1,column:1}};var t={};function r(e){return e.filter((function(e){if("FragmentDefinition"!==e.kind)return!0;var n=e.name.value;return!t[n]&&(t[n]=!0,!0)}))}function d(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){d(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){d(e,n)})),e.definitions&&e.definitions.forEach((function(e){d(e,n)}))}a.definitions=a.definitions.concat(r(i("db57").definitions));var m={};function u(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function o(e,n){var i={kind:e.kind,definitions:[u(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=m[n]||new Set,t=new Set,r=new Set;a.forEach((function(e){r.add(e)}));while(r.size>0){var d=r;r=new Set,d.forEach((function(e){if(!t.has(e)){t.add(e);var n=m[e]||new Set;n.forEach((function(e){r.add(e)}))}}))}return t.forEach((function(n){var a=u(e,n);a&&i.definitions.push(a)})),i}(function(){a.definitions.forEach((function(e){if(e.name){var n=new Set;d(e,n),m[e.name.value]=n}}))})(),e.exports=a,e.exports["paramQuery"]=o(a,"paramQuery"),e.exports["paramsQuery"]=o(a,"paramsQuery"),e.exports["paramSubscription"]=o(a,"paramSubscription"),e.exports["updateParam"]=o(a,"updateParam")},db57:function(e,n){var i={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Parameter"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Parameter"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"meta"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bitmask"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"decimal"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"documentation"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"group"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"humanGroup"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"humanName"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"increment"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"max"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"min"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"rebootRequired"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"unitText"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"units"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"values"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:225}};i.loc.source={body:"fragment Parameter on Parameter {\n  id\n  value\n  meta {\n    bitmask\n    decimal\n    documentation\n    group\n    humanGroup\n    humanName\n    increment\n    max\n    min\n    rebootRequired\n    unitText\n    units\n    values\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};e.exports=i}}]);
//# sourceMappingURL=ConfigParamGroups~ConfigParamList~ConfigParamSummary.e35f5b67.js.map