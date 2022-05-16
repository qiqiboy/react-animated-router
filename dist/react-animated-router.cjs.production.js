"use strict";Object.defineProperty(exports,"__esModule",{value:true});var e=require("prop-types");var t=require("react-router");var r=require("react");var n=require("react-transition-group");function o(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var a=o(e);var i=o(r);function u(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e["default"]:e}function s(e,t){return t={exports:{}},e(t,t.exports),t.exports}var l=s((function(e){function t(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var o,a;for(a=0;a<n.length;a++){o=n[a];if(t.indexOf(o)>=0)continue;r[o]=e[o]}return r}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(l);var c=l;var f=s((function(e){function t(e,t){if(e==null)return{};var r=c(e,t);var n,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++){n=a[o];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));var p=u(f);var d=s((function(e){function t(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(d);var v=d;var m=s((function(e){function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function r(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}e.exports=r,e.exports.__esModule=true,e.exports["default"]=e.exports}));var x=u(m);var y=s((function(e){function t(e){if(Array.isArray(e))return e}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(y);var b=s((function(e){function t(e,t){var r=e==null?null:typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(r==null)return;var n=[];var o=true;var a=false;var i,u;try{for(r=r.call(e);!(o=(i=r.next()).done);o=true){n.push(i.value);if(t&&n.length===t)break}}catch(e){a=true;u=e}finally{try{if(!o&&r["return"]!=null)r["return"]()}finally{if(a)throw u}}return n}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(b);var h=s((function(e){function t(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++){n[r]=e[r]}return n}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(h);var g=h;var O=s((function(e){function t(e,t){if(!e)return;if(typeof e==="string")return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(O);var j=s((function(e){function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(j);var _=y;var E=b;var M=O;var w=j;var P=s((function(e){function t(e,t){return _(e)||E(e,t)||M(e,t)||w()}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));var S=u(P);var N=r.createContext({parentMatches:null});N.displayName="AnimatedRouterContext";var T=["routes"];var k=typeof window==="undefined";var C={key:"",isPush:true};var D="REACT_HISTORIES_KEY";var A=k?[]:(sessionStorage.getItem(D)||"").split(",").filter(Boolean);var B=function e(t,r){if(k){return true}var n=t.key||t.pathname+t.search;if(r&&n!==C.key){var o=A.lastIndexOf(n);var a=o<0||o+1===A.length;if(a){A.push(n)}else{A.splice(o+1)}sessionStorage.setItem(D,A.join(","));C={isPush:a,key:n}}return C.isPush};var I=function e(t){var r=t.routes,n=p(t,T);return R(r,n,true)};function R(e){var o=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var a=arguments[2];var u=t.useLocation();var s=r.useContext(N),l=s.parentMatches,c=s.parentBase,f=c===void 0?o.pathnameBase:c,p=s.location;var d=o.className,v=o.timeout,m=o.prefix,y=m===void 0?"animated-router":m,b=o.appear,h=o.enter,g=o.exit,O=o.component,j=o.location,_=j===void 0?p||u:j;var E=r.useState((function(){return"".concat(y,"-root-").concat(Math.random().toString(36).slice(2))})),M=S(E,1),w=M[0];var P=r.useRef({inTransition:false}).current;if(typeof _==="string"){_=t.parsePath(_)}f=r.useMemo((function(){var e;return a?f:[f,l===null||l===void 0?void 0:(e=l[l.length-1])===null||e===void 0?void 0:e.pathnameBase].filter(Boolean).join("/").replace(/\/\/+/g,"/")}),[l,f,a]);var T=r.useMemo((function(){return(a?l:t.matchRoutes(e,_,f))||[]}),[_,e,l,f,a]);var C=T.find((function(t){return e.includes(t.route)}));var D=C&&"".concat(e.indexOf(C.route),"_").concat(C.pathnameBase);var A=i["default"].createElement(N.Provider,{value:{parentMatches:T,parentBase:f,location:_}},t.useRoutes(e.map((function(e){var t;if((t=e.children)!==null&&t!==void 0&&t.length){var n=i["default"].createElement(I,Object.assign({},o,{routes:e.children,location:_}));return typeof e.element==="undefined"?x(x({},e),{},{element:r.cloneElement(n,{component:null})}):x(x({},e),{},{children:[{element:n,children:e.children}]})}return e})),_));var R=r.useCallback((function(e){if(P.rootNode){var t="".concat(y,"-in-transition");P.rootNode.className=P.rootNode.className.split(/\s+/).filter((function(e){return e!==t})).concat(e?t:[]).join(" ")}}),[y,P]);var q=r.useCallback((function(e){if(!P.rootNode){P.rootNode=O?document.querySelector(".".concat(w)):e===null||e===void 0?void 0:e.parentNode}P.inTransition||R(P.inTransition=true);P.lastTransitionNode=e}),[P,R,w,O]);var L=r.useCallback((function(e){if(e&&typeof v==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration="".concat(v,"ms")}}),[v]);var z=r.useCallback((function(e){if(P.lastTransitionNode===e){P.inTransition&&R(P.inTransition=false)}if(e){e.className=e.className.split(/\s+/).filter((function(e){return!/-(?:forward|backward)-(?:enter|exit|appear)(?:-active|-done)?$/.test(e)})).join(" ");if(typeof v==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration=""}}}),[P,R,v]);var F={appear:b,enter:h,exit:g,component:O};var W={onExit:q,onExiting:L,onExited:z,onEnter:q,onEntering:L,onEntered:z};var $=["react-animated-router","".concat(y,"-container"),w,d];if(k){return A}return i["default"].createElement(n.TransitionGroup,Object.assign({className:$.filter(Boolean).join(" "),childFactory:function e(t){var r="".concat(y,"-").concat(B(_,t.props.in)?"forward":"backward");return i["default"].cloneElement(t,{classNames:r})}},F),i["default"].createElement(n.CSSTransition,Object.assign({key:D||_.pathname,addEndListener:function e(t,r){t.addEventListener("transitionend",(function(e){if(e.target===t){r()}}),false)},unmountOnExit:true,timeout:v},W),A))}var q=["children"];var L=function e(r){var n=r.children,o=p(r,q);var a=t.createRoutesFromChildren(n);return R(a,o)};L.propTypes={className:a["default"].string,pathnameBase:a["default"].string,timeout:a["default"].number,prefix:a["default"].string,appear:a["default"].bool,enter:a["default"].bool,exit:a["default"].bool,component:a["default"].any,children:a["default"].node};L.defaultProps={prefix:"animated-router"};exports["default"]=L;exports.useAnimatedRoutes=R;
