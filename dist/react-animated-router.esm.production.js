import e from"prop-types";import{useLocation as t,parsePath as r,matchRoutes as n,useRoutes as o,createRoutesFromChildren as i}from"react-router";import a,{createContext as c,useRef as s,useContext as u,useMemo as l,useCallback as f,useEffect as p}from"react";import{findDOMNode as v}from"react-dom";import{TransitionGroup as d,CSSTransition as m}from"react-transition-group";function y(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var o,i;for(i=0;i<n.length;i++){o=n[i];if(t.indexOf(o)>=0)continue;r[o]=e[o]}return r}function b(e,t){if(e==null)return{};var r=y(e,t);var n,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++){n=i[o];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}function O(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j=c({parentMatches:null,parentBase:""});var E=["routes"];var x=typeof window==="undefined";var P={key:"",isPush:true};var w="REACT_HISTORIES_KEY";var T=x?[]:(sessionStorage.getItem(w)||"").split(",").filter(Boolean);var N=function e(t,r){if(x){return true}var n=t.key||t.pathname+t.search;if(r&&n!==P.key){var o=T.lastIndexOf(n);var i=o<0||o+1===T.length;if(i){T.push(n)}else{T.splice(o+1)}sessionStorage.setItem(w,T.join(","));P={isPush:i,key:n}}return P.isPush};var k=function e(t){var r=t.routes,n=b(t,E);return D(r,n,true)};function D(e,i){var c=arguments[2];var y=t();var b=s(null);var O=u(j),g=O.parentMatches,E=O.parentBase,P=O.location;var w=i||{},T=w.className,D=w.timeout,B=w.prefix,S=B===void 0?"animated-router":B,I=w.appear,M=w.enter,K=w.exit,_=w.transitionKey,z=w.component,L=w.location,R=L===void 0?P||y:L;var W=s({inTransition:false}).current;if(typeof R==="string"){R=r(R)}var A=l((function(){var t;if(c){return g}E=[g===null||g===void 0?void 0:(t=g[g.length-1])===null||t===void 0?void 0:t.pathnameBase,E].filter(Boolean).join("/").replace(/\/\/+/g,"/");return n(e,R,E)}),[R,e,g,c])||[];var C=A.findIndex((function(t){return e.includes(t.route)}));if(!_&&C>-1){_="".concat(e.indexOf(A[C].route),"_").concat(A[C].pathnameBase)}var F=a.createElement(j.Provider,{value:{parentMatches:A,parentBase:E,location:R}},o(e.map((function(e){var t;if((t=e.children)!==null&&t!==void 0&&t.length){var r=a.createElement(k,Object.assign({},i,{routes:e.children,location:R}));return h(h({},e),{},{children:[{element:r,children:e.children}]})}return e})),R));var H=f((function(e){if(W.rootNode){var t="".concat(S,"-in-transition");W.rootNode.className=W.rootNode.className.split(/\s+/).filter((function(e){return e!==t})).concat(e?t:[]).join(" ")}}),[S,W]);var Y=f((function(e){W.inTransition||H(W.inTransition=true);W.lastTransitionNode=e}),[W,H]);var $=f((function(e){if(e&&typeof D==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration="".concat(D,"ms")}}),[D]);var q=f((function(e){if(W.lastTransitionNode===e){W.inTransition&&H(W.inTransition=false)}if(e){e.className=e.className.split(/\s+/).filter((function(e){return!/-(?:forward|backward)-(?:enter|exit|appear)(?:-active|-done)?$/.test(e)})).join(" ");if(typeof D==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration=""}}}),[W,H,D]);var G={appear:I,enter:M,exit:K,component:z};var J={onExit:Y,onExiting:$,onExited:q,onEnter:Y,onEntering:$,onEntered:q};var Q=["".concat(S,"-container"),"react-animated-router",T];p((function(){W.rootNode=v(b.current)}),[W]);if(x){return F}return a.createElement(d,Object.assign({ref:b,className:Q.filter(Boolean).join(" "),childFactory:function e(t){var r="".concat(S,"-").concat(N(R,t.props.in)?"forward":"backward");return a.cloneElement(t,{classNames:r})}},G),a.createElement(m,Object.assign({key:_||R.pathname,addEndListener:function e(t,r){t.addEventListener("transitionend",(function(e){if(e.target===t){r()}}),false)},unmountOnExit:true,timeout:D},J),F))}var B=["children"];var S=function e(t){var r=t.children,n=b(t,B);var o=i(r);return D(o,n)};S.propTypes={className:e.string,transitionKey:e.oneOfType([e.string,e.number]),timeout:e.number,prefix:e.string,appear:e.bool,enter:e.bool,exit:e.bool,component:e.any,children:e.node};S.defaultProps={prefix:"animated-router"};export{S as default,D as useAnimatedRoutes};
