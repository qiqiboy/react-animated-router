import PropTypes from 'prop-types';
import { useLocation, parsePath, matchRoutes, useRoutes, createRoutesFromChildren } from 'react-router';
import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
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
  var baseLocation = useLocation();
  var rootRef = useRef(null);

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

  var self = useRef({
    inTransition: false,
    inAppearTransition: !!appear
  }).current;

  if (typeof location === 'string') {
    location = parsePath(location);
  }

  var routeMatches = useMemo(function () {
    return parentMatches || matchRoutes(routes, location);
  }, [location, routes, parentMatches]) || [];
  var routeIndex = routeMatches.findIndex(function (match) {
    return routes.includes(match.route);
  });

  if (!transitionKey && routeIndex > -1) {
    transitionKey = routeMatches[routeIndex].pathname;
  }

  var children = useRoutes(routes.map(function (route) {
    var _route$children;

    if ((_route$children = route.children) !== null && _route$children !== void 0 && _route$children.length) {
      var animatedElement = /*#__PURE__*/React.createElement(InternalAnimatedRoutes, Object.assign({}, props, {
        routes: route.children,
        location: location,
        parentMatches: routeMatches
      }));
      return _objectSpread2(_objectSpread2({}, route), {}, {
        children: [{
          element: animatedElement,
          children: route.children
        }]
      });
    }

    return route;
  }), location);
  var setInTransition = useCallback(function (isAdd) {
    if (self.rootNode) {
      var inName = "".concat(prefix, "-in-transition");
      self.rootNode.className = self.rootNode.className.split(/\s+/).filter(function (name) {
        return name !== inName;
      }).concat(isAdd ? inName : []).join(' ');
    }
  }, [prefix, self]);
  var onEnter = useCallback(function (node) {
    self.inTransition || setInTransition(self.inTransition = true);
    self.lastTransitionNode = node;
  }, [self, setInTransition]);
  var onEntering = useCallback(function (node) {
    if (node && typeof timeout === 'number') {
      node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = "".concat(timeout, "ms");
    }
  }, [timeout]);
  var onEntered = useCallback(function (node) {
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
  useEffect(function () {
    self.rootNode = findDOMNode(rootRef.current);
  }, [self]);

  if (isSSR || !children) {
    return children;
  }

  return /*#__PURE__*/React.createElement(TransitionGroup, Object.assign({
    ref: rootRef,
    className: cls.filter(Boolean).join(' '),
    childFactory: function childFactory(child) {
      var classNames = "".concat(prefix, "-").concat(isHistoryPush(location, self.inAppearTransition ? false : child.props.in) ? 'forward' : 'backward');
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
  transitionKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  timeout: PropTypes.number,
  prefix: PropTypes.string,
  appear: PropTypes.bool,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  component: PropTypes.any,
  children: PropTypes.node
};
AnimatedRouter.defaultProps = {
  prefix: 'animated-router'
};

export { AnimatedRouter as default, useAnimatedRoutes };
