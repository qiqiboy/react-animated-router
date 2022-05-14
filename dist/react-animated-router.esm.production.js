import e from"prop-types";import{useLocation as t,parsePath as r,matchRoutes as n,useRoutes as i,createRoutesFromChildren as o}from"react-router";import a,{useRef as s,useMemo as c,useCallback as u,useEffect as f}from"react";import{findDOMNode as l}from"react-dom";import{TransitionGroup as p,CSSTransition as m}from"react-transition-group";function d(e,t){if(e==null)return{};var r={};var n=Object.keys(e);var i,o;for(o=0;o<n.length;o++){i=n[o];if(t.indexOf(i)>=0)continue;r[i]=e[i]}return r}function v(e,t){if(e==null)return{};var r=d(e,t);var n,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++){n=o[i];if(t.indexOf(n)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(e,n))continue;r[n]=e[n]}}return r}function y(e,t,r){if(t in e){Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true})}else{e[t]=r}return e}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=["parentMatches","routes"];var h=typeof window==="undefined";var j={key:"",isPush:true};var E="REACT_HISTORIES_KEY";var T=h?[]:(sessionStorage.getItem(E)||"").split(",").filter(Boolean);var x=function e(t,r){if(h){return true}var n=t.key||t.pathname+t.search;if(r&&n!==j.key){var i=T.lastIndexOf(n);if(i>-1){T.splice(i+1)}else{T.push(n)}sessionStorage.setItem(E,T.join(","));j={isPush:i<0,key:n}}return j.isPush};var w=function e(t){var r=t.parentMatches,n=t.routes,i=v(t,g);return P(n,i,r)};function P(e,o,d){var v=t();var y=s(null);var b=o||{},g=b.className,j=b.timeout,E=b.prefix,T=E===void 0?"animated-router":E,P=b.appear,N=b.enter,k=b.exit,D=b.transitionKey,S=b.component,I=b.location,A=I===void 0?v:I;var M=s({inTransition:false,inAppearTransition:!!P}).current;if(typeof A==="string"){A=r(A)}var K=c((function(){return d||n(e,A)}),[A,e,d])||[];var _=K.findIndex((function(t){return e.includes(t.route)}));if(!D&&_>-1){D="".concat(e.indexOf(K[_].route),"_").concat(K[_].pathname)}var z=i(e.map((function(e){var t;if((t=e.children)!==null&&t!==void 0&&t.length){var r=a.createElement(w,Object.assign({},o,{routes:e.children,location:A,parentMatches:K}));return O(O({},e),{},{children:[{element:r,children:e.children}]})}return e})),A);var B=u((function(e){if(M.rootNode){var t="".concat(T,"-in-transition");M.rootNode.className=M.rootNode.className.split(/\s+/).filter((function(e){return e!==t})).concat(e?t:[]).join(" ")}}),[T,M]);var L=u((function(e){M.inTransition||B(M.inTransition=true);M.lastTransitionNode=e}),[M,B]);var R=u((function(e){if(e&&typeof j==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration="".concat(j,"ms")}}),[j]);var W=u((function(e){if(M.lastTransitionNode===e){M.inTransition&&B(M.inTransition=false)}if(M.inAppearTransition){M.inAppearTransition=false}if(e){e.className=e.className.split(/\s+/).filter((function(e){return!/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(e)})).join(" ");if(typeof j==="number"){e.style.transitionDuration=e.style.WebkitTransitionDuration=e.style.MozTransitionDuration=""}}}),[M,B,j]);var C={appear:P,enter:N,exit:k,component:S};var F={onExit:L,onExiting:R,onExited:W,onEnter:L,onEntering:R,onEntered:W};var H=["".concat(T,"-container"),"react-animated-router",g];f((function(){M.rootNode=l(y.current)}),[M]);if(h||!z){return z}return a.createElement(p,Object.assign({ref:y,className:H.filter(Boolean).join(" "),childFactory:function e(t){var r="".concat(T,"-").concat(x(A,M.inAppearTransition?false:t.props.in)?"forward":"backward");return a.cloneElement(t,{classNames:r})}},C),a.createElement(m,Object.assign({key:D||A.pathname,addEndListener:function e(t,r){t.addEventListener("transitionend",(function(e){if(e.target===t){r()}}),false)},unmountOnExit:true,timeout:j},F),z))}var N=["children"];var k=function e(t){var r=t.children,n=v(t,N);var i=o(r);return P(i,n)};k.propTypes={className:e.string,transitionKey:e.oneOfType([e.string,e.number]),timeout:e.number,prefix:e.string,appear:e.bool,enter:e.bool,exit:e.bool,component:e.any,children:e.node};k.defaultProps={prefix:"animated-router"};export{k as default,P as useAnimatedRoutes};
