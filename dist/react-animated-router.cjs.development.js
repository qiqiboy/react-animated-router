'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactDom = require('react-dom');
var PropTypes = require('prop-types');
var reactTransitionGroup = require('react-transition-group');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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

/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */
var AnimatedRouter = function AnimatedRouter(props) {
  var baseLocation = reactRouter.useLocation();
  var rootRef = React.useRef(null);
  var className = props.className,
      children = props.children,
      timeout = props.timeout,
      prefix = props.prefix,
      appear = props.appear,
      enter = props.enter,
      exit = props.exit,
      transitionKey = props.transitionKey,
      component = props.component,
      _parentPath = props._parentPath,
      _props$location = props.location,
      location = _props$location === void 0 ? baseLocation : _props$location;
  var self = React.useRef({
    inTransition: false,
    inAppearTransition: !!appear
  }).current;
  var childrenRoutes = React.useMemo(function () {
    return !Array.isArray(children) || React.isValidElement(children[0]) ? reactRouter.createRoutesFromChildren(children) : children;
  }, [children]) || [];

  if (!transitionKey && childrenRoutes.length) {
    var routes = reactRouter.matchRoutes(childrenRoutes.map(function (route) {
      return _objectSpread(_objectSpread({}, route), {}, {
        path: reactRouter.createPath(reactRouter.resolvePath(route.path || '', _parentPath))
      });
    }), location);
    transitionKey = routes === null || routes === void 0 ? void 0 : routes[0].pathname;
  }

  var animatedRoute = function animatedRoute(routes) {
    return routes.map(function (route) {
      var _route$children;

      if ((_route$children = route.children) !== null && _route$children !== void 0 && _route$children.length) {
        var animatedElement = /*#__PURE__*/React__default["default"].createElement(AnimatedRouter, Object.assign({}, props, {
          children: route.children,
          location: location,
          _parentPath: reactRouter.createPath(reactRouter.resolvePath(route.path || '', _parentPath))
        }));
        return _objectSpread(_objectSpread({}, route), {}, {
          children: [{
            element: animatedElement,
            children: route.children
          }]
        });
      }

      return route;
    });
  };

  var childElement = reactRouter.useRoutes(animatedRoute(childrenRoutes), location);
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

  if (isSSR || !childElement) {
    return childElement;
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
  }, cssProps), childElement));
};

AnimatedRouter.propTypes = {
  className: PropTypes__default["default"].string,
  transitionKey: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  timeout: PropTypes__default["default"].number,
  prefix: PropTypes__default["default"].string,
  appear: PropTypes__default["default"].bool,
  enter: PropTypes__default["default"].bool,
  exit: PropTypes__default["default"].bool,
  component: PropTypes__default["default"].any
};
AnimatedRouter.defaultProps = {
  prefix: 'animated-router'
};

exports["default"] = AnimatedRouter;
