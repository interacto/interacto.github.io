(self.webpackChunkinteracto_doc=self.webpackChunkinteracto_doc||[]).push([[711],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},9100:function(e,t,r){var n=r(9489),o=r(7067);function a(t,r,l){return o()?(e.exports=a=Reflect.construct,e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=a=function(e,t,r){var o=[null];o.push.apply(o,t);var a=new(Function.bind.apply(e,o));return r&&n(a,r.prototype),a},e.exports.__esModule=!0,e.exports.default=e.exports),a.apply(null,arguments)}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},9713:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},7067:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},319:function(e,t,r){var n=r(3646),o=r(6860),a=r(379),l=r(8206);e.exports=function(e){return n(e)||o(e)||a(e)||l()},e.exports.__esModule=!0,e.exports.default=e.exports},379:function(e,t,r){var n=r(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},2102:function(e,t,r){var n=r(2632);e.exports={MDXRenderer:n}},2632:function(e,t,r){var n=r(9100),o=r(319),a=r(9713),l=r(7316),s=["scope","children"];function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=r(7294),p=r(4983).mdx,f=r(6948).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,a=l(e,s),c=f(t),d=u.useMemo((function(){if(!r)return null;var e=i({React:u,mdx:p},c),t=Object.keys(e),a=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(a)))}),[r,t]);return u.createElement(d,i({},a))}},1330:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var n=r(7294),o=r(2102),a=r(4983),l=r(7326),s=r(1721),c=function(e){function t(t){var r;return(r=e.call(this,t)||this).state={open:r.props.isOpened},r.handleClick=r.handleClick.bind((0,l.Z)(r)),r}(0,s.Z)(t,e);var r=t.prototype;return r.handleClick=function(){this.setState({open:!this.state.open})},r.render=function(){var e=this;return n.createElement("div",{className:"collapsible-module--container--NOHBx"},n.createElement("button",{className:"collapsible-module--header--tADh7",onClick:function(t){return e.handleClick(t)}},this.props.title,this.state.open?n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-chevron-down",width:"15",height:"15",viewBox:"0 0 20 20",strokeWidth:"2",stroke:"#ffffff",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},n.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),n.createElement("polyline",{points:"6 9 12 15 18 9"})):n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-chevron-right",width:"15",height:"15",viewBox:"0 0 20 20",strokeWidth:"2",stroke:"#ffffff",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},n.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),n.createElement("polyline",{points:"9 6 15 12 9 18"}))),this.state.open?n.createElement("div",{className:"collapsible-module--content--ttZfm"},this.props.children):null)},t}(n.Component),i={pre:function(e){var t;return"language-ts"===e.className||"language-typescript"===e.className?t="TypeScript / Angular":"language-java"===e.className?t="JavaFX":"language-html"===e.className?t="HTML":"language-bash"===e.className?t="Bash":"language-xml"===e.className&&(t="XML"),"TypeScript / Angular"===t||"JavaFX"!==t&&"TypeScript / Angular"!==t?n.createElement(c,{title:t,isOpened:!0},n.createElement("pre",e)):n.createElement(c,{title:t,isOpened:!1},n.createElement("pre",e))}};function u(e){var t=e.data.mdx,r=t.frontmatter,l=t.body;return n.createElement("div",null,n.createElement("h1",null,r.title),n.createElement(a.MDXProvider,{components:i}," ",n.createElement(o.MDXRenderer,null,l)," "))}}}]);
//# sourceMappingURL=component---src-pages-mdx-slug-js-0eed33f18e00fab5c6fd.js.map