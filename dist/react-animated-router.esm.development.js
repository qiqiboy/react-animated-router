import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, Switch } from 'react-router';
import PropTypes from 'prop-types';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

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
var AnimatedRouter =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimatedRouter, _Component);

  function AnimatedRouter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnimatedRouter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnimatedRouter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.inTransition = false;
    _this.rootNode = void 0;
    _this.lastTransitionNode = void 0;

    _this.onEnter = function (node) {
      _this.inTransition || _this.setInTransition(_this.inTransition = true);
      _this.lastTransitionNode = node;
    };

    _this.onEntering = function (node) {
      var timeout = _this.props.timeout;

      if (node && typeof timeout === 'number') {
        node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = timeout + 'ms';
      }
    };

    _this.onEntered = function (node) {
      if (_this.lastTransitionNode === node) {
        _this.inTransition && _this.setInTransition(_this.inTransition = false);
      }

      if (node) {
        var timeout = _this.props.timeout; // remove all transition classNames

        node.className = node.className.split(/\s+/).filter(function (name) {
          return !/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(name);
        }).join(' ');

        if (typeof timeout === 'number') {
          node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration = '';
        }
      }
    };

    return _this;
  }

  _createClass(AnimatedRouter, [{
    key: "setInTransition",
    value: function setInTransition(isAdd) {
      if (this.rootNode) {
        var inName = this.props.prefix + '-in-transition';
        this.rootNode.className = this.rootNode.className.split(/\s+/).filter(function (name) {
          return name !== inName;
        }).concat(isAdd ? inName : []).join(' ');
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.rootNode = findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render() {
      if (isSSR) {
        return React.createElement(Switch, null, this.props.children);
      }

      var _this$props = this.props,
          className = _this$props.className,
          location = _this$props.location,
          children = _this$props.children,
          timeout = _this$props.timeout,
          prefix = _this$props.prefix,
          appear = _this$props.appear,
          enter = _this$props.enter,
          exit = _this$props.exit,
          component = _this$props.component;
      var groupProps = {
        appear: appear,
        enter: enter,
        exit: exit,
        component: component
      };
      var cssProps = {
        onExit: this.onEnter,
        onExiting: this.onEntering,
        onExited: this.onEntered,
        onEnter: this.onEnter,
        onEntering: this.onEntering,
        onEntered: this.onEntered
      };
      var cls = [prefix + '-container', 'react-animated-router', className];
      return React.createElement(TransitionGroup, Object.assign({
        className: cls.filter(Boolean).join(' '),
        childFactory: function childFactory(child) {
          var classNames = prefix + '-' + (isHistoryPush(location, child.props.in) ? 'forward' : 'backward');
          return React.cloneElement(child, {
            classNames: classNames
          });
        }
      }, groupProps), React.createElement(CSSTransition, Object.assign({
        key: this.props.transitionKey || location.pathname,
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
      }, cssProps), React.createElement(Switch, {
        location: location
      }, children)));
    }
  }]);

  return AnimatedRouter;
}(Component);

AnimatedRouter.propTypes = {
  className: PropTypes.string,
  transitionKey: PropTypes.any,
  timeout: PropTypes.number,
  prefix: PropTypes.string,
  appear: PropTypes.bool,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  component: PropTypes.any
};
AnimatedRouter.defaultProps = {
  prefix: 'animated-router'
};
var AnimatedRouter$1 = withRouter(AnimatedRouter);

export default AnimatedRouter$1;
