"use strict";Object.defineProperty(exports,"__esModule",{value:true});var e=require("prop-types");var t=require("react-router");var r=require("react");var n=require("react-transition-group");function o(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var a=o(e);var i=o(r);function u(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e["default"]:e}function s(e,t){return t={exports:{}},e(t,t.exports),t.exports}var l=s((function(e){function t(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var o,a;for(a=0;a<n.length;a++){o=n[a];if(t.indexOf(o)>=0)continue;r[o]=e[o]}return r}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(l);var c=l;var f=s((function(e){function t(e,t){if(e==null)return{};var r=c(e,t);var n,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++){n=a[o];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));var p=u(f);var d=s((function(e){function t(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(d);var v=d;var y=s((function(e){function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function r(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}e.exports=r,e.exports.__esModule=true,e.exports["default"]=e.exports}));var x=u(y);var m=s((function(e){function t(e){if(Array.isArray(e))return e}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(m);var b=s((function(e){function t(e,t){var r=e==null?null:typeof Symbol!=="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(r==null)return;var n=[];var o=true;var a=false;var i,u;try{for(r=r.call(e);!(o=(i=r.next()).done);o=true){n.push(i.value);if(t&&n.length===t)break}}catch(e){a=true;u=e}finally{try{if(!o&&r["return"]!=null)r["return"]()}finally{if(a)throw u}}return n}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(b);var h=s((function(e){function t(e,t){if(t==null||t>e.length)t=e.length;for(var r=0,n=new Array(t);r<t;r++){n[r]=e[r]}return n}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(h);var g=h;var O=s((function(e){function t(e,t){if(!e)return;if(typeof e==="string")return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(O);var j=s((function(e){function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));u(j);var _=m;var E=b;var P=O;var N=j;var T=s((function(e){function t(e,t){return _(e)||E(e,t)||P(e,t)||N()}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));var w=u(T);var S=typeof window==="undefined";var k="REACT_HISTORIES_KEY";var M=S?[]:(sessionStorage.getItem(k)||"").split(",").filter(Boolean);var C={key:M[M.length-1]||"default",isPush:true};var A=function e(r,n,o){if(S){return true}var a=r.key||t.createPath(r);if(o&&a!==C.key){var i=M.lastIndexOf(C.key);var u=true;if(n===t.NavigationType.Replace){M.splice(i,1,a)}else if(n===t.NavigationType.Push){i>-1&&M.splice(i+1);M.push(a)}else{var s=M.lastIndexOf(a);u=i<s}sessionStorage.setItem(k,M.join(","));C={isPush:u,key:a}}return C.isPush};var D=function e(o){var a=o.routes,u=o.children,s=o.className,l=o.timeout,c=o.prefix,f=o.appear,p=o.enter,d=o.exit,v=o.component,y=o.location;var x=r.useState((function(){return"".concat(c,"-root-").concat(Math.random().toString(36).slice(2))})),m=w(x,1),b=m[0];var h=r.useContext(t.UNSAFE_RouteContext),g=h.matches,O=h.outlet;var j=t.useNavigationType();var _=r.useRef({inTransition:false}).current;var E=g[g.length-1]||{};var P=t.matchRoutes(a,y,E.pathnameBase)||[];var N=P.length>0&&"".concat(a.indexOf(P[0].route),"_").concat(P[0].pathnameBase);if(typeof u==="undefined"){u=O}var T=r.useCallback((function(e){if(_.rootNode){var t="".concat(c,"-in-transition");_.rootNode.className=_.rootNode.className.split(/\s+/).filter((function(e){return e!==t})).concat(e?t:[]).join(" ")}}),[c,_]);var S=r.useCallback((function(e){if(!_.rootNode){_.rootNode=v?document.querySelector(".".concat(b)):e===null||e===void 0?void 0:e.parentNode}_.inTransition||T(_.inTransition=true);if(e){_.lastTransitionNode=e}}),[_,T,b,v]);var k=r.useCallback((function(e){if(e&&typeof l==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration="".concat(l,"ms")}}),[l]);var M=r.useCallback((function(e){if(_.lastTransitionNode===e){_.inTransition&&T(_.inTransition=false)}if(e){e.className=e.className.split(/\s+/).filter((function(e){return!/-(?:forward|backward)-(?:enter|exit|appear)(?:-active|-done)?$/.test(e)})).join(" ");if(typeof l==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration=""}}}),[_,T,l]);var C={appear:f,enter:p,exit:d,component:v};var D={onExit:S,onExiting:k,onExited:M,onEnter:S,onEntering:k,onEntered:M};var I=["react-animated-router","".concat(c,"-container"),b,s];if(!u){return u}return i["default"].createElement(n.TransitionGroup,Object.assign({className:I.filter(Boolean).join(" "),childFactory:function e(t){var n="".concat(c,"-").concat(A(y,j,t.props.in)?"forward":"backward");return r.cloneElement(t,{classNames:n})}},C),i["default"].createElement(n.CSSTransition,Object.assign({key:N||y.pathname,addEndListener:function e(t,r){t.addEventListener("transitionend",(function(e){if(e.target===t){r()}}),false)},unmountOnExit:true,timeout:l},D),i["default"].createElement(t.UNSAFE_LocationContext.Provider,{value:{location:y,navigationType:j}},u)))};D.defaultProps={prefix:"animated-router"};function I(e,n){var o=t.useLocation();var a=n||{},u=a.location;var s=r.useMemo((function(){return u?x(x({},o),typeof u==="string"?t.parsePath(u):u):o}),[o,u]);var l=function e(t,r){return i["default"].createElement(D,Object.assign({},n,{routes:t,location:s,children:r}))};var c=function e(t){return t.map((function(t){var n;if((n=t.children)!==null&&n!==void 0&&n.length){var o=e(t.children);var a=l(o);return typeof t.element==="undefined"?x(x({},t),{},{element:r.cloneElement(a,{component:null}),children:o}):x(x({},t),{},{children:[{element:a,children:o}]})}return t}))};var f=c(e);var p=t.useRoutes(f,s);return l(f,p)}var R=["children"];var q=function e(r){var n=r.children,o=p(r,R);var a=t.createRoutesFromChildren(n);return I(a,o)};q.propTypes={className:a["default"].string,timeout:a["default"].number,prefix:a["default"].string,appear:a["default"].bool,enter:a["default"].bool,exit:a["default"].bool,component:a["default"].any,children:a["default"].node};q.defaultProps=D.defaultProps;exports["default"]=q;exports.useAnimatedRoutes=I;
