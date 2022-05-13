"use strict";Object.defineProperty(exports,"__esModule",{value:true});var e=require("react");var t=require("react-dom");var r=require("react-transition-group");var n=require("react-router");function a(e){return e&&typeof e==="object"&&"default"in e?e:{default:e}}var i=a(e);function o(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e["default"]:e}function s(e,t){return t={exports:{}},e(t,t.exports),t.exports}var u=s((function(e){function t(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}e.exports=t,e.exports.__esModule=true,e.exports["default"]=e.exports}));o(u);var c=u;var l=s((function(e){function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function r(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}e.exports=r,e.exports.__esModule=true,e.exports["default"]=e.exports}));var f=o(l);var p=typeof window==="undefined";var d={key:"",isPush:true};var v="REACT_HISTORIES_KEY";var m=p?[]:(sessionStorage.getItem(v)||"").split(",").filter(Boolean);var b=function e(t,r){if(p){return true}var n=t.key||t.pathname+t.search;if(r&&n!==d.key){var a=m.lastIndexOf(n);if(a>-1){m.splice(a+1)}else{m.push(n)}sessionStorage.setItem(v,m.join(","));d={isPush:a<0,key:n}}return d.isPush};var h=function a(o){var s=n.useLocation();var u=e.useRef(null);var c=o.className,l=o.children,d=o.timeout,v=o.prefix,m=o.appear,h=o.enter,y=o.exit,O=o.transitionKey,x=o.component,j=o._parentPath,P=o.location,g=P===void 0?s:P;var E=e.useRef({inTransition:false,inAppearTransition:!!m}).current;var T=e.useMemo((function(){return!Array.isArray(l)||e.isValidElement(l[0])?n.createRoutesFromChildren(l):l}),[l])||[];if(!O&&T.length){var k=n.matchRoutes(T.map((function(e){return f(f({},e),{},{path:n.createPath(n.resolvePath(e.path||"",j))})})),g);O=k===null||k===void 0?void 0:k[0].pathname}var w=function e(t){return t.map((function(e){var t;if((t=e.children)!==null&&t!==void 0&&t.length){var r=i["default"].createElement(a,Object.assign({},o,{children:e.children,location:g,_parentPath:n.createPath(n.resolvePath(e.path||"",j))}));return f(f({},e),{},{children:[{element:r,children:e.children}]})}return e}))};var N=n.useRoutes(w(T),g);var _=e.useCallback((function(e){if(E.rootNode){var t="".concat(v,"-in-transition");E.rootNode.className=E.rootNode.className.split(/\s+/).filter((function(e){return e!==t})).concat(e?t:[]).join(" ")}}),[v,E]);var D=e.useCallback((function(e){E.inTransition||_(E.inTransition=true);E.lastTransitionNode=e}),[E,_]);var M=e.useCallback((function(e){if(e&&typeof d==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration="".concat(d,"ms")}}),[d]);var S=e.useCallback((function(e){if(E.lastTransitionNode===e){E.inTransition&&_(E.inTransition=false)}if(E.inAppearTransition){E.inAppearTransition=false}if(e){e.className=e.className.split(/\s+/).filter((function(e){return!/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(e)})).join(" ");if(typeof d==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration=""}}}),[E,_,d]);var A={appear:m,enter:h,exit:y,component:x};var C={onExit:D,onExiting:M,onExited:S,onEnter:D,onEntering:M,onEntered:S};var R=["".concat(v,"-container"),"react-animated-router",c];e.useEffect((function(){E.rootNode=t.findDOMNode(u.current)}),[E]);if(p||!N){return N}return i["default"].createElement(r.TransitionGroup,Object.assign({ref:u,className:R.filter(Boolean).join(" "),childFactory:function e(t){var r="".concat(v,"-").concat(b(g,E.inAppearTransition?false:t.props.in)?"forward":"backward");return i["default"].cloneElement(t,{classNames:r})}},A),i["default"].createElement(r.CSSTransition,Object.assign({key:O||g.pathname,addEndListener:function e(t,r){t.addEventListener("transitionend",(function(e){if(e.target===t){r()}}),false)},unmountOnExit:true,timeout:d},C),N))};h.defaultProps={prefix:"animated-router"};exports["default"]=h;
