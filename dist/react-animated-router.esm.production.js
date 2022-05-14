import e from"prop-types";import{useLocation as t,parsePath as r,matchRoutes as n,useRoutes as i,createRoutesFromChildren as o}from"react-router";import a,{useRef as c,useMemo as s,useCallback as u,useEffect as f}from"react";import{findDOMNode as l}from"react-dom";import{TransitionGroup as p,CSSTransition as m}from"react-transition-group";function d(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var i,o;for(o=0;o<n.length;o++){i=n[o];if(t.indexOf(i)>=0)continue;r[i]=e[i]}return r}function v(e,t){if(e==null)return{};var r=d(e,t);var n,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++){n=o[i];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}function y(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=["parentMatches","routes"];var h=typeof window==="undefined";var j={key:"",isPush:true};var E="REACT_HISTORIES_KEY";var x=h?[]:(sessionStorage.getItem(E)||"").split(",").filter(Boolean);var w=function e(t,r){if(h){return true}var n=t.key||t.pathname+t.search;if(r&&n!==j.key){var i=x.lastIndexOf(n);var o=i<0||i+1===x.length;if(o){x.push(n)}else{x.splice(i+1)}sessionStorage.setItem(E,x.join(","));j={isPush:o,key:n}}return j.isPush};var P=function e(t){var r=t.parentMatches,n=t.routes,i=v(t,g);return T(n,i,r)};function T(e,o){var d=t();var v=c(null);var y=arguments[2];var b=o||{},g=b.className,j=b.timeout,E=b.prefix,x=E===void 0?"animated-router":E,T=b.appear,N=b.enter,k=b.exit,D=b.transitionKey,S=b.component,I=b.location,M=I===void 0?d:I;var K=c({inTransition:false}).current;if(typeof M==="string"){M=r(M)}var _=s((function(){return y||n(e,M)}),[M,e,y])||[];var z=_.findIndex((function(t){return e.includes(t.route)}));if(!D&&z>-1){D="".concat(e.indexOf(_[z].route),"_").concat(_[z].pathname)}var B=i(e.map((function(e){var t;if((t=e.children)!==null&&t!==void 0&&t.length){var r=a.createElement(P,Object.assign({},o,{routes:e.children,location:M,parentMatches:_}));return O(O({},e),{},{children:[{element:r,children:e.children}]})}return e})),M);var L=u((function(e){if(K.rootNode){var t="".concat(x,"-in-transition");K.rootNode.className=K.rootNode.className.split(/\s+/).filter((function(e){return e!==t})).concat(e?t:[]).join(" ")}}),[x,K]);var R=u((function(e){K.inTransition||L(K.inTransition=true);K.lastTransitionNode=e}),[K,L]);var W=u((function(e){if(e&&typeof j==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration="".concat(j,"ms")}}),[j]);var A=u((function(e){if(K.lastTransitionNode===e){K.inTransition&&L(K.inTransition=false)}if(e){e.className=e.className.split(/\s+/).filter((function(e){return!/-(?:forward|backward)-(?:enter|exit|appear)(?:-active|-done)?$/.test(e)})).join(" ");if(typeof j==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration=""}}}),[K,L,j]);var C={appear:T,enter:N,exit:k,component:S};var F={onExit:R,onExiting:W,onExited:A,onEnter:R,onEntering:W,onEntered:A};var H=["".concat(x,"-container"),"react-animated-router",g];f((function(){K.rootNode=l(v.current)}),[K]);if(h||!B){return B}return a.createElement(p,Object.assign({ref:v,className:H.filter(Boolean).join(" "),childFactory:function e(t){var r="".concat(x,"-").concat(w(M,t.props.in)?"forward":"backward");return a.cloneElement(t,{classNames:r})}},C),a.createElement(m,Object.assign({key:D||M.pathname,addEndListener:function e(t,r){t.addEventListener("transitionend",(function(e){if(e.target===t){r()}}),false)},unmountOnExit:true,timeout:j},F),B))}var N=["children"];var k=function e(t){var r=t.children,n=v(t,N);var i=o(r);return T(i,n)};k.propTypes={className:e.string,transitionKey:e.oneOfType([e.string,e.number]),timeout:e.number,prefix:e.string,appear:e.bool,enter:e.bool,exit:e.bool,component:e.any,children:e.node};k.defaultProps={prefix:"animated-router"};export{k as default,T as useAnimatedRoutes};
