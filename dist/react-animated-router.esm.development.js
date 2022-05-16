import PropTypes from 'prop-types';
import { UNSAFE_RouteContext, matchRoutes, useLocation, parsePath, useRoutes, Outlet, createRoutesFromChildren } from 'react-router';
import React, { createContext, useState, useContext, useRef, useMemo, useCallback, cloneElement } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var AnimatedRouterContext = createContext({});
AnimatedRouterContext.displayName = 'AnimatedRouterContext';

var isSSR = typeof window === 'undefined';
var lastLocation = {
  key: '',
  isPush: true
};
var REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
var histories = isSSR ? [] : (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);

var isHistoryPush = function isHistoryPush(location, update) {
  if (isSSR) {
    return true;
  }

  var key = location.key || location.pathname + location.search;

  if (update && key !== lastLocation.key) {
    var index = histories.lastIndexOf(key);
    var isPush = index < 0 || index + 1 === histories.length;

    if (isPush) {
      histories.push(key);
    } else {
      histories.splice(index + 1);
    }

    sessionStorage.setItem(REACT_HISTORIES_KEY, histories.join(','));
    lastLocation = {
      isPush: isPush,
      key: key
    };
  }

  return lastLocation.isPush;
};

/**
 * 给路由节点增加动画支持
 *
 * @internal 仅内部调用使用
 */
var InternalAnimatedRoutes = function InternalAnimatedRoutes(_ref) {
  var routes = _ref.routes,
      children = _ref.children,
      className = _ref.className,
      timeout = _ref.timeout,
      prefix = _ref.prefix,
      appear = _ref.appear,
      enter = _ref.enter,
      exit = _ref.exit,
      component = _ref.component,
      location = _ref.location;

  var _useState = useState(function () {
    return "".concat(prefix, "-root-").concat(Math.random().toString(36).slice(2));
  }),
      _useState2 = _slicedToArray(_useState, 1),
      rootNodeId = _useState2[0];

  var _useContext = useContext(UNSAFE_RouteContext),
      parentMatches = _useContext.matches;

  var self = useRef({
    inTransition: false
  }).current;
  var routeMatches = useMemo(function () {
    var _parentMatches;

    return matchRoutes(routes, location, (_parentMatches = parentMatches[parentMatches.length - 1]) === null || _parentMatches === void 0 ? void 0 : _parentMatches.pathnameBase) || [];
  }, [location, routes, parentMatches]);
  var routeMatch = routeMatches.find(function (match) {
    return routes.includes(match.route);
  });
  var transitionKey = routeMatch && "".concat(routes.indexOf(routeMatch.route), "_").concat(routeMatch.pathnameBase);
  var setInTransition = useCallback(function (isAdd) {
    if (self.rootNode) {
      var inName = "".concat(prefix, "-in-transition");
      self.rootNode.className = self.rootNode.className.split(/\s+/).filter(function (name) {
        return name !== inName;
      }).concat(isAdd ? inName : []).join(' ');
    }
  }, [prefix, self]);
  var onEnter = useCallback(function (node) {
    if (!self.rootNode) {
      self.rootNode = component ? document.querySelector(".".concat(rootNodeId)) : node === null || node === void 0 ? void 0 : node.parentNode;
    }

    self.inTransition || setInTransition(self.inTransition = true);
    self.lastTransitionNode = node;
  }, [self, setInTransition, rootNodeId, component]);
  var onEntering = useCallback(function (node) {
    if (node && typeof timeout === 'number') {
      node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = "".concat(timeout, "ms");
    }
  }, [timeout]);
  var onEntered = useCallback(function (node) {
    if (self.lastTransitionNode === node) {
      self.inTransition && setInTransition(self.inTransition = false);
    }

    if (node) {
      // remove all transition classNames
      node.className = node.className.split(/\s+/).filter(function (name) {
        return !/-(?:forward|backward)-(?:enter|exit|appear)(?:-active|-done)?$/.test(name);
      }).join(' ');

      if (typeof timeout === 'number') {
        node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = '';
      }
    }
  }, [self, setInTransition, timeout]);
  var groupProps = {
    appear: appear,
    enter: enter,
    exit: exit,
    component: component
  };
  var cssProps = {
    onExit: onEnter,
    onExiting: onEntering,
    onExited: onEntered,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered
  };
  var cls = ['react-animated-router', "".concat(prefix, "-container"), rootNodeId, className];

  if (isSSR) {
    return children;
  }

  return /*#__PURE__*/React.createElement(TransitionGroup, Object.assign({
    className: cls.filter(Boolean).join(' '),
    childFactory: function childFactory(child) {
      var classNames = "".concat(prefix, "-").concat(isHistoryPush(location, child.props.in) ? 'forward' : 'backward');
      return React.cloneElement(child, {
        classNames: classNames
      });
    }
  }, groupProps), /*#__PURE__*/React.createElement(CSSTransition, Object.assign({
    key: transitionKey || location.pathname,
    addEndListener: function addEndListener(node, done) {
      node.addEventListener('transitionend', function (e) {
        // 确保动画来自于目标节点
        if (e.target === node) {
          done();
        }
      }, false);
    },
    unmountOnExit: true,
    timeout: timeout
  }, cssProps), children));
};
InternalAnimatedRoutes.defaultProps = {
  prefix: 'animated-router'
};
/**
 * 类似于useRoutes，使用useAnimatedRoutes则可以给该组路由增加切换动画
 *
 * @param routes 路由配置数组
 * @param props 设置项
 */

function useAnimatedRoutes(routes, props) {
  var baseLocation = useLocation();

  var _useContext2 = useContext(AnimatedRouterContext),
      contextLocation = _useContext2.location;

  var _ref2 = props || {},
      _ref2$location = _ref2.location,
      location = _ref2$location === void 0 ? contextLocation || baseLocation : _ref2$location;

  if (typeof location === 'string') {
    location = parsePath(location);
  }

  var wrapInternalAnimatedRoutes = function wrapInternalAnimatedRoutes(routes, children) {
    return /*#__PURE__*/React.createElement(InternalAnimatedRoutes, Object.assign({}, props, {
      routes: routes,
      location: location
    }), /*#__PURE__*/React.createElement(AnimatedRouterContext.Provider, {
      value: {
        location: location
      }
    }, children));
  };

  var addAnimation = function addAnimation(routes) {
    return routes.map(function (route) {
      var _route$children;

      if ((_route$children = route.children) !== null && _route$children !== void 0 && _route$children.length) {
        var animatedChildren = addAnimation(route.children);
        var animatedElement = wrapInternalAnimatedRoutes(animatedChildren, /*#__PURE__*/React.createElement(Outlet, null));
        return typeof route.element === 'undefined' ? _objectSpread2(_objectSpread2({}, route), {}, {
          children: animatedChildren,
          element: cloneElement(animatedElement, {
            component: null
          })
        }) : _objectSpread2(_objectSpread2({}, route), {}, {
          children: [{
            element: animatedElement,
            children: animatedChildren
          }]
        });
      }

      return route;
    });
  };

  var animatedRoutes = addAnimation(routes);
  var children = useRoutes(animatedRoutes, location);
  return wrapInternalAnimatedRoutes(animatedRoutes, children);
}

var _excluded = ["children"];
/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */

var AnimatedRouter = function AnimatedRouter(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var routes = createRoutesFromChildren(children);
  return useAnimatedRoutes(routes, props);
};

AnimatedRouter.propTypes = {
  className: PropTypes.string,
  timeout: PropTypes.number,
  prefix: PropTypes.string,
  appear: PropTypes.bool,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  component: PropTypes.any,
  children: PropTypes.node
};
AnimatedRouter.defaultProps = InternalAnimatedRoutes.defaultProps;

export { InternalAnimatedRoutes, AnimatedRouter as default, useAnimatedRoutes };
