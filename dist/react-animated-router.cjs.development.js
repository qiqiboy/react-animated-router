'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PropTypes = require('prop-types');
var reactRouter = require('react-router');
var React = require('react');
var reactTransitionGroup = require('react-transition-group');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var objectWithoutPropertiesLoose$1 = createCommonjsModule(function (module) {
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

module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(objectWithoutPropertiesLoose$1);

var objectWithoutPropertiesLoose = objectWithoutPropertiesLoose$1;

var objectWithoutProperties = createCommonjsModule(function (module) {
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
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

module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _objectWithoutProperties = unwrapExports(objectWithoutProperties);

var defineProperty$1 = createCommonjsModule(function (module) {
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

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(defineProperty$1);

var defineProperty = defineProperty$1;

var objectSpread2 = createCommonjsModule(function (module) {
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
      defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _objectSpread = unwrapExports(objectSpread2);

var arrayWithHoles$1 = createCommonjsModule(function (module) {
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(arrayWithHoles$1);

var iterableToArrayLimit$1 = createCommonjsModule(function (module) {
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

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(iterableToArrayLimit$1);

var arrayLikeToArray$1 = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(arrayLikeToArray$1);

var arrayLikeToArray = arrayLikeToArray$1;

var unsupportedIterableToArray$1 = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(unsupportedIterableToArray$1);

var nonIterableRest$1 = createCommonjsModule(function (module) {
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(nonIterableRest$1);

var arrayWithHoles = arrayWithHoles$1;

var iterableToArrayLimit = iterableToArrayLimit$1;

var unsupportedIterableToArray = unsupportedIterableToArray$1;

var nonIterableRest = nonIterableRest$1;

var slicedToArray = createCommonjsModule(function (module) {
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _slicedToArray = unwrapExports(slicedToArray);

var isSSR = typeof window === 'undefined';
var REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
var histories = isSSR ? [] : (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);
var lastLocation = {
  key: histories[histories.length - 1] || 'default',
  isPush: true
};

var isHistoryPush = function isHistoryPush(location, navigationType, update) {
  if (isSSR) {
    return true;
  }

  var key = location.key || reactRouter.createPath(location);

  if (update && key !== lastLocation.key) {
    var lastIndex = histories.lastIndexOf(lastLocation.key);
    var isPush = true; // REPLACE: replace the end key

    if (navigationType === reactRouter.NavigationType.Replace) {
      histories.splice(-1, 1, key);
    } else if (navigationType === reactRouter.NavigationType.Push) {
      // PUSH: remove from the last key pos, add new key to the end
      lastIndex > -1 && histories.splice(lastIndex + 1);
      histories.push(key);
    } else {
      var index = histories.lastIndexOf(key);
      isPush = lastIndex < index;
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

  // @TODO replace with useId() hook in react 18
  var _useState = React.useState(function () {
    return "".concat(prefix, "-root-").concat(Math.random().toString(36).slice(2));
  }),
      _useState2 = _slicedToArray(_useState, 1),
      rootNodeId = _useState2[0];

  var _useContext = React.useContext(reactRouter.UNSAFE_RouteContext),
      parentMatches = _useContext.matches,
      outlet = _useContext.outlet;

  var navigationType = reactRouter.useNavigationType();
  var self = React.useRef({
    inTransition: false
  }).current;
  var parentMatch = parentMatches[parentMatches.length - 1] || {};
  var routeMatches = reactRouter.matchRoutes(routes, location, parentMatch.pathnameBase) || [];
  var transitionKey = routeMatches.length > 0 && "".concat(routes.indexOf(routeMatches[0].route), "_").concat(routeMatches[0].pathnameBase);

  if (typeof children === 'undefined') {
    children = outlet;
  }

  var setInTransition = React.useCallback(function (isAdd) {
    if (self.rootNode) {
      var inName = "".concat(prefix, "-in-transition");
      self.rootNode.className = self.rootNode.className.split(/\s+/).filter(function (name) {
        return name !== inName;
      }).concat(isAdd ? inName : []).join(' ');
    }
  }, [prefix, self]);
  var onEnter = React.useCallback(function (node) {
    if (!self.rootNode) {
      self.rootNode = component ? document.querySelector(".".concat(rootNodeId)) : node === null || node === void 0 ? void 0 : node.parentNode;
    }

    self.inTransition || setInTransition(self.inTransition = true);

    if (node) {
      self.lastTransitionNode = node;
    }
  }, [self, setInTransition, rootNodeId, component]);
  var onEntering = React.useCallback(function (node) {
    if (node && typeof timeout === 'number') {
      node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = "".concat(timeout, "ms");
    }
  }, [timeout]);
  var onEntered = React.useCallback(function (node) {
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

  if (!children) {
    return children;
  }

  return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.TransitionGroup, Object.assign({
    className: cls.filter(Boolean).join(' '),
    childFactory: function childFactory(child) {
      var classNames = "".concat(prefix, "-").concat(isHistoryPush(location, navigationType, child.props.in) ? 'forward' : 'backward');
      return React.cloneElement(child, {
        classNames: classNames
      });
    }
  }, groupProps), /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.CSSTransition, Object.assign({
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
  }, cssProps), /*#__PURE__*/React__default["default"].createElement(reactRouter.UNSAFE_LocationContext.Provider, {
    value: {
      location: location,
      navigationType: navigationType
    }
  }, children)));
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
  var baseLocation = reactRouter.useLocation();

  var _ref2 = props || {},
      propLocation = _ref2.location;

  var location = React.useMemo(function () {
    return propLocation ? _objectSpread(_objectSpread({}, baseLocation), typeof propLocation === 'string' ? reactRouter.parsePath(propLocation) : propLocation) : baseLocation;
  }, [baseLocation, propLocation]);

  var wrapInternalAnimatedRoutes = function wrapInternalAnimatedRoutes(routes, children) {
    return /*#__PURE__*/React__default["default"].createElement(InternalAnimatedRoutes, Object.assign({}, props, {
      routes: routes,
      location: location,
      children: children
    }));
  };

  var injectAnimation = function injectAnimation(routes) {
    return routes.map(function (route) {
      var _route$children;

      if ((_route$children = route.children) !== null && _route$children !== void 0 && _route$children.length) {
        var animatedChildren = injectAnimation(route.children);
        var animatedElement = wrapInternalAnimatedRoutes(animatedChildren);
        return typeof route.element === 'undefined' ? _objectSpread(_objectSpread({}, route), {}, {
          element: React.cloneElement(animatedElement, {
            component: null
          }),
          children: animatedChildren
        }) : _objectSpread(_objectSpread({}, route), {}, {
          children: [{
            element: animatedElement,
            children: animatedChildren
          }]
        });
      }

      return route;
    });
  };

  var animatedRoutes = injectAnimation(routes);
  var children = reactRouter.useRoutes(animatedRoutes, location);
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

  var routes = reactRouter.createRoutesFromChildren(children);
  return useAnimatedRoutes(routes, props);
};

AnimatedRouter.propTypes = {
  className: PropTypes__default["default"].string,
  timeout: PropTypes__default["default"].number,
  prefix: PropTypes__default["default"].string,
  appear: PropTypes__default["default"].bool,
  enter: PropTypes__default["default"].bool,
  exit: PropTypes__default["default"].bool,
  component: PropTypes__default["default"].any,
  children: PropTypes__default["default"].node
};
AnimatedRouter.defaultProps = InternalAnimatedRoutes.defaultProps;

exports["default"] = AnimatedRouter;
exports.useAnimatedRoutes = useAnimatedRoutes;
