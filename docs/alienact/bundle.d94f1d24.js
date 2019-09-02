!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(9)},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var o=function(t){return t.startsWith("on")},r=function(t){return"children"!==t&&!o(t)},i=function(t){return o(t)?t.slice(2).toLowerCase():""},s=function(t){return"string"!=typeof t&&t.type&&t.type.isAlienAct},l=function(t){return"string"!=typeof t&&t.type&&"function"==typeof t.type&&!t.type.isAlienAct},a={className:"class"},c=function(t){return a[t]?a[t]:t},u={createNativeTextNode:null,createNativeElementNode:null,updateNativeProperties:null};var p=u;function h(t){var e,n=null;if("string"==typeof t||"number"==typeof t||"boolean"==typeof t)n={dom:p.createNativeTextNode(t),currentElement:t,childrenInstance:null};else if(s(t)){var o=new(0,(e=t).type)(e.props),r=h(o.render());t.props.ref&&(t.props.ref.current=o),n={dom:r.dom,currentElement:t,childrenInstance:[r],publicInstance:o},o.innerInstance=n,o.componentDidMount&&o.componentDidMount()}else if(l(t)){n={dom:(r=h((i=t.type)(a=t.props))).dom,currentElement:t,childrenInstance:[r]}}else{var i=t.type,a=t.props,c=p.createNativeElementNode(i);a.ref&&(a.ref.current=c),p.updateNativeProperties(c,{},a);var u=null;a.children&&(u=a.children.filter(function(t){return null!==t}).map(h)).forEach(function(t){return c.appendChild(t.dom)}),n={dom:c,currentElement:t,childrenInstance:u}}return n}function d(t,e,n){void 0===e&&(e=null),void 0===n&&(n=null);var o=null;if(null===e)o=h(n),t.appendChild(o.dom);else if(null===n)!function t(e,n){n.match(e)&&n.operation(e),e.childrenInstance&&e.childrenInstance.forEach(function(e){return t(e,n)})}(e,{match:function(t){return Boolean(t.publicInstance)},operation:function(t){t.publicInstance.componentWillUnmount&&t.publicInstance.componentWillUnmount()}}),t.removeChild(e.dom);else if("string"==typeof n||"string"==typeof e.currentElement||"number"==typeof n||"number"==typeof e.currentElement||"boolean"==typeof n||"boolean"==typeof e.currentElement||e.currentElement.type!==n.type)o=h(n),s(e.currentElement)&&e.publicInstance.componentWillUnmount&&e.publicInstance.componentWillUnmount(),t.replaceChild(o.dom,e.dom);else if(s(e.currentElement)){var r=e.publicInstance.props,i=e.publicInstance,a=null;i.getSnapshotBeforeUpdate&&void 0===(a=i.getSnapshotBeforeUpdate(r,i.prevState||i.state))&&(a=null);var c=!0;if(i.shouldComponentUpdate&&(c=i.shouldComponentUpdate(n.props,i.pendingState||i.state)),i.props=n.props,i.syncStateIfNecessary(),!c)return e;var u=i.render(),m=d(t,e.childrenInstance[0],u);i.componentDidUpdate&&i.componentDidUpdate(r,i.prevState||i.state,a),e.dom=m.dom,e.childrenInstance=[m],e.currentElement=n,o=e}else p.updateNativeProperties(e.dom,e.currentElement.props,n.props),e.currentElement=n,e.childrenInstance=function(t,e){var n=[];n=l(e)?[e.type(e.props)]:e.props.children?e.props.children:[];for(var o=t.childrenInstance||[],r=Math.max(n.length,o.length),i=[],s=0;s<r;s++){var a=d(t.dom,o[s],n[s]);a&&i.push(a)}return i}(e,n),o=e;return o}var m,f=function(){function t(t){this.prevState=null,this.pendingState=null,this.props=t,this.state=this.state||{}}return t.prototype.syncStateIfNecessary=function(){null!==this.pendingState&&(this.state=Object.assign({},this.pendingState),this.pendingState=null)},t.prototype.componentDidMount=function(){},t.prototype.shouldComponentUpdate=function(t,e){return!0},t.prototype.getSnapshotBeforeUpdate=function(t,e){},t.prototype.componentDidUpdate=function(t,e,n){},t.prototype.componentWillUnmount=function(){},t.prototype.setState=function(t){this.prevState=Object.assign({},this.state),this.pendingState=Object.assign({},this.state,t),this.update()},t.prototype.render=function(){return console.error("you must implement your own render() function"),null},t.prototype.update=function(){var t=this.innerInstance.dom.parentNode,e=this.innerInstance.currentElement;d(t,this.innerInstance,e)},t.isAlienAct={},t}(),y=new WeakMap;function g(t){return Object.keys(t).filter(function(t){return"ref"!==t})}function v(t,e){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o];var r=Object.assign({},e);if(n.length>0){var i=[];n.forEach(function(t){if("number"==typeof t)i.push(String(t));else if("boolean"==typeof t)i.push("");else if("function"==typeof t){var e={type:t,props:{}};i.push(e)}else Array.isArray(t)?i.push.apply(i,t):i.push(t)}),r.children=i}return{type:t,props:r}}m={createNativeElementNode:function(t){return document.createElement(t)},createNativeTextNode:function(t){return document.createTextNode(t)},updateNativeProperties:function(t,e,n){void 0===e&&(e={}),void 0===n&&(n={}),g(e).forEach(function(s){if(!n.hasOwnProperty(s))if(r(s)&&t instanceof HTMLElement)t.removeAttribute(c(s));else if(o(s)){var l=i(s);t.removeEventListener(l,e[s])}}),g(n).forEach(function(s){if(e[s]!==n[s])if(r(s)&&t instanceof HTMLElement)"checked"!==s||n[s]?t.setAttribute(c(s),n[s]):t.removeAttribute("checked");else if(o(s)){var l=i(s);e.hasOwnProperty(s)&&t.removeEventListener(l,e[s]),t.addEventListener(l,n[s])}})}},Object.keys(m).forEach(function(t){Object.prototype.hasOwnProperty.call(u,t)&&(u[t]=m[t])}),u=Object.assign(u,m);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var E=function(t,e){return(E=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function b(t,e){function n(){this.constructor=t}E(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var C=function(){function t(){this.handlers=[]}return t.prototype.on=function(t){return this.handlers.push(t),this},t.prototype.off=function(t){for(var e=0;e<this.handlers.length;e++)t===this.handlers[e]&&this.handlers.splice(e,1);return this},t.prototype.emit=function(t){this.handlers.forEach(function(e){return e(t)})},t}();var w={Component:f,render:function(t,e){var n=d(e,y.get(e)?y.get(e):null,t);y.set(e,n)},createElement:v,createRef:function(){return{current:null}},createContext:function(t){var e=new C,n=t;return{Provider:function(t){function o(e){var o=t.call(this,e)||this;return void 0!==e.value&&(n=e.value),o}return b(o,t),o.prototype.componentDidUpdate=function(t){this.props.value!=t.value&&(n=this.props.value,e.emit(n))},o.prototype.render=function(){return Array.isArray(this.props.children)?v.apply(void 0,function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var o=Array(t),r=0;for(e=0;e<n;e++)for(var i=arguments[e],s=0,l=i.length;s<l;s++,r++)o[r]=i[s];return o}(["div",{}],this.props.children)):this.props.children},o}(f),Consumer:function(t){function o(){var e=null!==t&&t.apply(this,arguments)||this;return e.state={value:n},e}return b(o,t),o.prototype.componentDidMount=function(){var t=this;e.on(function(e){return t.setState({value:e})})},o.prototype.render=function(){return(Array.isArray(this.props.children)?this.props.children[0]:this.props.children).type(this.state.value)},o}(f)}}},N=function(t,e){return(N=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function S(t,e){function n(){this.constructor=t}N(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var k=function(){return(k=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};var O=w.createContext(),x=function(t){function e(e){var n=t.call(this,e)||this;return n.isMount=!1,n.off=null,n.pendingLocation=null,n.state={location:e.history.location},n.off=e.history.on(function(t){n.isMount?n.setState({location:t}):n.pendingLocation=t}),n}return S(e,t),e.prototype.componentDidMount=function(){this.isMount=!0,this.pendingLocation&&this.setState({location:this.pendingLocation})},e.prototype.componentWillUnmout=function(){this.off&&this.off()},e.prototype.render=function(){return w.createElement(O.Provider,{value:this.props.history},this.props.children)},e}(w.Component);function P(t,e){return t===e}!function(t){function e(){return null!==t&&t.apply(this,arguments)||this}S(e,t),e.prototype.render=function(){var t=this;return w.createElement(O.Consumer,null,function(e){if(!t.props.children)return null;for(var n=null,o=0;o<t.props.children.length;o++){var r=t.props.children[o],i=r.props.path;if(P(e.location.pathname,i)){n=r;break}}return n})}}(w.Component);var T=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return S(e,t),e.prototype.render=function(){var t=this;return w.createElement(O.Consumer,null,function(e){var n=e.location;return P(n.pathname,t.props.path)?w.createElement(t.props.component,{history:e,location:n}):""})},e}(w.Component),_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return S(e,t),e.prototype.render=function(){var t=this;return w.createElement(O.Consumer,null,function(e){var n=t.props,o=n.replace,r=n.to,i=function(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]])}return n}(n,["replace","to"]);return w.createElement("a",k({},i,{onClick:function(t){t.preventDefault(),o?e.replace(o):e.push(r)}}))})},e}(w.Component);function D(){var t=window.location;return{pathname:t.pathname,search:t.search,hash:t.hash,state:null}}var j=window.history,I=null;var A=new(function(){function t(){this.stack=[D()],this.length=j.length,this.action="",this.location=D(),this._updateLocation=this._updateLocation.bind(this),window.addEventListener("popstate",this._updateLocation,!1)}return t.prototype._updateLocation=function(){var t,e=D();return this.location=e,t=e,"function"==typeof I&&I(t),e},t.prototype.detachWindowListener=function(){window.removeEventListener("popstate",this._updateLocation)},t.prototype.on=function(t){return I=t,function(){I=null}},t.prototype.push=function(t,e){j.pushState(e,"",t),this.action="PUSH";var n=this._updateLocation();this.stack.push(n),this.length=this.stack.length},t.prototype.replace=function(t,e){j.replaceState(e,"",t),this.action="REPLACE",this._updateLocation()},t.prototype.go=function(t){j.go(t),0!==t&&(this.action=t>0?"POP":"PUSH"),this._updateLocation()},t.prototype.goBack=function(){j.back(),this.action="POP",this._updateLocation()},t.prototype.goForward=function(){j.forward(),this.action="PUSH",this._updateLocation()},t}());n(1);function L(){let t="";for(let e=0;e<32;e++){let n=16*Math.random()|0;8!==e&&12!==e&&16!==e&&20!==e||(t+="-"),t+=(12===e?4:16===e?3&n|8:n).toString(16)}return t}function U(t,e){if(e)return localStorage[t]=JSON.stringify(e);let n=localStorage[t];return n&&JSON.parse(n)||[]}class M{constructor(t,e){this.key=t,this.todos=U(t)||[],this.onChanges=[e]}inform(){U(this.key,this.todos),this.onChanges.forEach(t=>t())}addTodo(t){this.todos=this.todos.concat({id:L(),title:t,completed:!1}),this.inform()}toggleAll(t){this.todos=this.todos.map(e=>({...e,completed:t})),this.inform()}toggle(t){this.todos=this.todos.map(e=>e!==t?e:{...e,completed:!e.completed}),this.inform()}destroy(t){this.todos=this.todos.filter(e=>e!==t),this.inform()}save(t,e){this.todos=this.todos.map(n=>n!==t?n:{...n,title:e}),this.inform()}clearCompleted(){this.todos=this.todos.filter(t=>!t.completed),this.inform()}}var R=function(t){const{nowShowing:e,count:n,completedCount:o,onClearCompleted:r}=t;return w.createElement("footer",{className:"footer"},w.createElement("span",{className:"todo-count"},w.createElement("strong",null,n)," ",function(t,e){return 1===t?e:e+"s"}(n,"item")," left"),w.createElement("ul",{className:"filters"},w.createElement("li",null,w.createElement("a",{href:"#/",className:"all"==e&&"selected"},"All"))," ",w.createElement("li",null,w.createElement("a",{href:"#/active",className:"active"==e&&"selected"},"Active"))," ",w.createElement("li",null,w.createElement("a",{href:"#/completed",className:"completed"==e&&"selected"},"Completed"))),o>0&&w.createElement("button",{className:"clear-completed",onClick:r},"Clear completed"))};function W(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const B=27,K=13;class H extends w.Component{constructor(...t){super(...t),W(this,"handleSubmit",()=>{const{onSave:t,onDestroy:e,todo:n}=this.props,o=this.state.editText.trim();o?(t(n,o),this.setState({editText:o})):e(n)}),W(this,"handleEdit",()=>{const{onEdit:t,todo:e}=this.props;t(e),this.setState({editText:e.title})}),W(this,"toggle",t=>{const{onToggle:e,todo:n}=this.props;e(n),t.preventDefault()}),W(this,"handleKeyDown",t=>{if(t.which===B){const t=this.props.todo;this.setState({editText:t.title}),this.props.onCancel(t)}else t.which===K&&this.handleSubmit()}),W(this,"handleDestroy",()=>this.props.onDestroy(this.props.todo)),W(this,"updateEditText",t=>this.setState({editText:t.target.value}))}render(){const{todo:{title:t,completed:e},onToggle:n,onDestroy:o,editing:r}=this.props,i=this.state.editText;let s=e?"completed":"";return s+=r?" editing":"",w.createElement("li",{className:s},w.createElement("div",{className:"view"},w.createElement("input",{className:"toggle",type:"checkbox",checked:e,onChange:this.toggle}),w.createElement("label",{onDblClick:this.handleEdit},t),w.createElement("button",{className:"destroy",onClick:this.handleDestroy})),r&&w.createElement("input",{className:"edit",autoFocus:!0,value:i,onBlur:this.handleSubmit,onInput:this.updateEditText,onKeyDown:this.handleKeyDown}))}}function F(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const J=13,V={all:t=>!0,active:t=>!t.completed,completed:t=>t.completed};class $ extends w.Component{constructor(){super(),F(this,"handleNewTodoKeyDown",t=>{if(t.keyCode!==J)return;t.preventDefault();const e=this.state.newTodo.trim();e&&(this.model.addTodo(e),this.setState({newTodo:""}))}),F(this,"updateNewTodo",t=>this.setState({newTodo:t.target.value})),F(this,"toggleAll",t=>this.model.toggleAll(t.target.checked)),F(this,"toggle",t=>this.model.toggle(t)),F(this,"destroy",t=>this.model.destroy(t)),F(this,"edit",t=>this.setState({editing:t.id})),F(this,"cancel",()=>this.setState({editing:null})),F(this,"clearCompleted",()=>this.model.clearCompleted()),F(this,"save",(t,e)=>{this.model.save(t,e),this.setState({editing:null})}),this.model=new M("sample-todo",()=>this.setState({})),addEventListener("hashchange",this.handleRoute.bind(this));let t=this.getRoute();this.state={nowShowing:t,newTodo:"",editing:""}}getRoute(){let t=String(location.hash||"").split("/").pop();return V[t]||(t="all"),t}handleRoute(){let t=this.getRoute();this.setState({nowShowing:t})}render(){const{nowShowing:t=ALL_TODOS,newTodo:e,editing:n}=this.state,o=this.model.todos,r=o.filter(V[t]),i=o.reduce((t,e)=>t+(e.completed?0:1),0),s=o.length-i;return w.createElement("div",null,w.createElement("header",{className:"header"},w.createElement("h1",null,"todos"),w.createElement("input",{className:"new-todo",placeholder:"What needs to be done?",value:e,onKeyDown:this.handleNewTodoKeyDown,onInput:this.updateNewTodo,autoFocus:!0})),o.length?w.createElement("section",{className:"main"},w.createElement("input",{className:"toggle-all",type:"checkbox",onChange:this.toggleAll,checked:0===i}),w.createElement("ul",{className:"todo-list"},r.map(t=>w.createElement(H,{todo:t,onToggle:this.toggle,onDestroy:this.destroy,onEdit:this.edit,editing:n===t.id,onSave:this.save,onCancel:this.cancel})))):null,i||s?w.createElement(R,{count:i,completedCount:s,nowShowing:t,onClearCompleted:this.clearCompleted}):null)}}n(2),n(3),n(4);var q=function(){return w.createElement("div",null,w.createElement("section",{className:"todoapp"},w.createElement($,null)),w.createElement("div",{className:"link"},w.createElement(_,{className:"effect-link",to:"/simple"},"查看基础示例"),"    ",w.createElement(_,{className:"effect-link",to:"/"},"回到首页")," ⬅️"))};var z=w.createContext(1);n(5);var G=class extends w.Component{constructor(t){super(t),this.state={count:1},this.handleClick=this.handleClick.bind(this)}componentDidMount(){console.log("count did mount")}componentWillUnmount(){console.log("count will unmount")}handleClick(){this.setState({count:this.state.count+1})}render(){return w.createElement(z.Consumer,null,t=>w.createElement("div",{className:"count-item "+t},w.createElement("div",null,"现在的数量是: ",this.state.count),w.createElement("button",{onClick:this.handleClick},"加一")))}};n(6);var Q=class extends w.Component{constructor(t){super(t),this.state={colorful:!1},this.toggleColorful=this.toggleColorful.bind(this),this.showRefs=this.showRefs.bind(this),this.countRef=w.createRef(),this.buttonRef=w.createRef()}componentDidMount(){console.log("item did mount"),this.showRefs()}componentWillUnmount(){console.log("item will unmout")}getSnapshotBeforeUpdate(t,e){return console.log(t.index+" - "+e.colorful),t.index+" - "+e.colorful}componentDidUpdate(t,e,n){console.log(`item ${this.props.index} prevProps is:`),console.table(t),console.log(`item ${this.props.index} prevState is:`),console.table(e),console.log("snapshot is",n)}toggleColorful(){this.setState({colorful:!this.state.colorful})}showRefs(){console.log("button' ref:"),console.log(this.buttonRef),console.log("count component' ref:"),console.log(this.countRef)}render(){const t=this.state.colorful;return w.createElement("li",{className:"item"},w.createElement("button",{onClick:this.showRefs},"在控制台打印 ref"),w.createElement("button",{ref:this.buttonRef,onClick:this.toggleColorful},t?"黑白":"彩色"),w.createElement("span",{className:t?"colorful":""},this.props.text),w.createElement(G,{ref:this.countRef}))}};n(7);function X(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Y=class extends w.Component{constructor(t){super(t),X(this,"createRandoms",()=>{const t=[];for(let e=0;e<this.state.total;e++)t.push(e+1+"-"+this.state.tail);return t}),X(this,"generate",()=>this.setState({total:3===this.state.total?1:++this.state.total})),X(this,"toggleTheme",()=>this.setState({theme:"dark"===this.state.theme?"light":"dark"})),X(this,"modifyContent",()=>this.setState({tail:Math.ceil(50*Math.random())})),X(this,"lock",()=>this.setState({locked:!this.state.locked})),X(this,"back",()=>this.props.history.goBack()),this.state={total:2,theme:"dark",locked:!1,tail:1}}componentDidMount(){console.log("app did mount")}shouldComponentUpdate(t,e){console.debug(e);const n=this.state.locked&&e.locked;return n&&console.warn("⚠️ 由于触发了 shouldComponentUpdate (locked)，所以不会更新组件"),!n}render(){const t=this.createRandoms();return w.createElement(z.Provider,{value:this.state.theme},w.createElement("div",{className:"simple"},w.createElement("h1",{className:"simple-title","data-heading":"alienact"},"alienact"),w.createElement("button",{className:"btn",onClick:this.generate},"重新生成列表"),w.createElement("button",{className:"btn",onClick:this.modifyContent},"更新内容"),w.createElement("button",{className:"btn",onClick:this.toggleTheme},"切换主题"),w.createElement("button",{className:"btn",onClick:this.lock},"锁定"),w.createElement("button",{className:"btn",onClick:this.back},"后退一页"),w.createElement("ul",{className:this.state.locked?"list locked":"list"},t.map((t,e)=>w.createElement(Q,{index:e,text:t}))),w.createElement(_,{className:"effect-link",to:"/todo"},"查看 TODOMVC 示例"),"    ",w.createElement(_,{className:"effect-link",to:"/"},"回到首页")," ⬅️"))}};n(8);class Z extends w.Component{render(){return w.createElement("div",{className:"links"},w.createElement("h2",{className:"links-title"},"导航"),w.createElement("ul",{className:"links-list"},w.createElement("li",null,w.createElement(_,{className:"effect-link",to:"/simple"},"基础示例")),w.createElement("li",null,w.createElement(_,{className:"effect-link",to:"/todo"},"TODO MVC 示例"))))}}const tt="/react-learning/alienact";w.render(w.createElement(class extends w.Component{render(){return w.createElement("section",null,w.createElement("h1",{className:"top-title"},"Alienact"),w.createElement("h2",{className:"top-sub-title"},"a set of tiny react tech-stack implements"),w.createElement(x,{history:A},w.createElement(T,{path:tt+"/todo",component:q}),w.createElement(T,{path:tt+"/simple",component:Y}),w.createElement(T,{path:tt+"/",component:Z})))}},null),document.getElementById("root"))}]);