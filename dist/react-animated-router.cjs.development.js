'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PropTypes = require('prop-types');
var reactRouter = require('react-router');
var React = require('react');
var reactDom = require('react-dom');
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

var _excluded$1 = ["parentMatches", "routes"];
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

    if (index > -1) {
      histories.splice(index + 1);
    } else {
      histories.push(key);
    }

    sessionStorage.setItem(REACT_HISTORIES_KEY, histories.join(','));
    lastLocation = {
      isPush: index < 0,
      key: key
    };
  }

  return lastLocation.isPush;
};

var InternalAnimatedRoutes = function InternalAnimatedRoutes(_ref) {
  var parentMatches = _ref.parentMatches,
      routes = _ref.routes,
      props = _objectWithoutProperties(_ref, _excluded$1);

  return useAnimatedRoutes(routes, props, parentMatches);
};
/**
 * 类似于useRoutes，使用useAnimatedRoutes则可以给该组路由增加切换动画
 *
 * @param routes 路由配置数组
 * @param props 设置项
 * @param parentMatches 内部参数，请勿传递
 */


function useAnimatedRoutes(routes, props, parentMatches) {
  var baseLocation = reactRouter.useLocation();
  var rootRef = React.useRef(null);

  var _ref2 = props || {},
      className = _ref2.className,
      timeout = _ref2.timeout,
      _ref2$prefix = _ref2.prefix,
      prefix = _ref2$prefix === void 0 ? 'animated-router' : _ref2$prefix,
      appear = _ref2.appear,
      enter = _ref2.enter,
      exit = _ref2.exit,
      transitionKey = _ref2.transitionKey,
      component = _ref2.component,
      _ref2$location = _ref2.location,
      location = _ref2$location === void 0 ? baseLocation : _ref2$location;

  var self = React.useRef({
    inTransition: false,
    inAppearTransition: !!appear
  }).current;

  if (typeof location === 'string') {
    location = reactRouter.parsePath(location);
  }

  var routeMatches = React.useMemo(function () {
    return parentMatches || reactRouter.matchRoutes(routes, location);
  }, [location, routes, parentMatches]) || [];
  var routeIndex = routeMatches.findIndex(function (match) {
    return routes.includes(match.route);
  });

  if (!transitionKey && routeIndex > -1) {
    transitionKey = "".concat(routes.indexOf(routeMatches[routeIndex].route), "_").concat(routeMatches[routeIndex].pathname);
  }

  var children = reactRouter.useRoutes(routes.map(function (route) {
    var _route$children;

    if ((_route$children = route.children) !== null && _route$children !== void 0 && _route$children.length) {
      var animatedElement = /*#__PURE__*/React__default["default"].createElement(InternalAnimatedRoutes, Object.assign({}, props, {
        routes: route.children,
        location: location,
        parentMatches: routeMatches
      }));
      return _objectSpread(_objectSpread({}, route), {}, {
        children: [{
          element: animatedElement,
          children: route.children
        }]
      });
    }

    return route;
  }), location);
  var setInTransition = React.useCallback(function (isAdd) {
    if (self.rootNode) {
      var inName = "".concat(prefix, "-in-transition");
      self.rootNode.className = self.rootNode.className.split(/\s+/).filter(function (name) {
        return name !== inName;
      }).concat(isAdd ? inName : []).join(' ');
    }
  }, [prefix, self]);
  var onEnter = React.useCallback(function (node) {
    self.inTransition || setInTransition(self.inTransition = true);
    self.lastTransitionNode = node;
  }, [self, setInTransition]);
  var onEntering = React.useCallback(function (node) {
    if (node && typeof timeout === 'number') {
      node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = "".concat(timeout, "ms");
    }
  }, [timeout]);
  var onEntered = React.useCallback(function (node) {
    if (self.lastTransitionNode === node) {
      self.inTransition && setInTransition(self.inTransition = false);
    }

    if (self.inAppearTransition) {
      self.inAppearTransition = false;
    }

    if (node) {
      // remove all transition classNames
      node.className = node.className.split(/\s+/).filter(function (name) {
        return !/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(name);
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
  var cls = ["".concat(prefix, "-container"), 'react-animated-router', className];
  React.useEffect(function () {
    self.rootNode = reactDom.findDOMNode(rootRef.current);
  }, [self]);

  if (isSSR || !children) {
    return children;
  }

  return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.TransitionGroup, Object.assign({
    ref: rootRef,
    className: cls.filter(Boolean).join(' '),
    childFactory: function childFactory(child) {
      var classNames = "".concat(prefix, "-").concat(isHistoryPush(location, self.inAppearTransition ? false : child.props.in) ? 'forward' : 'backward');
      return React__default["default"].cloneElement(child, {
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
  }, cssProps), children));
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
  transitionKey: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  timeout: PropTypes__default["default"].number,
  prefix: PropTypes__default["default"].string,
  appear: PropTypes__default["default"].bool,
  enter: PropTypes__default["default"].bool,
  exit: PropTypes__default["default"].bool,
  component: PropTypes__default["default"].any,
  children: PropTypes__default["default"].node
};
AnimatedRouter.defaultProps = {
  prefix: 'animated-router'
};

exports["default"] = AnimatedRouter;
exports.useAnimatedRoutes = useAnimatedRoutes;
