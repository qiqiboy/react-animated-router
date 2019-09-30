'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/esm/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/esm/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/esm/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/esm/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/esm/inherits'));
var React = require('react');
var React__default = _interopDefault(React);
var reactDom = require('react-dom');
var reactTransitionGroup = require('react-transition-group');
var reactRouter = require('react-router');
var PropTypes = _interopDefault(require('prop-types'));

var lastLocation = {
  key: '',
  isPush: true
};
var REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
var histories = (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);

var isHistoryPush = function isHistoryPush(location, update) {
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
      this.rootNode = reactDom.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render() {
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
      return React__default.createElement(reactTransitionGroup.TransitionGroup, Object.assign({
        className: cls.filter(Boolean).join(' '),
        childFactory: function childFactory(child) {
          var classNames = prefix + '-' + (isHistoryPush(location, child.props.in) ? 'forward' : 'backward');
          return React__default.cloneElement(child, {
            classNames: classNames
          });
        }
      }, groupProps), React__default.createElement(reactTransitionGroup.CSSTransition, Object.assign({
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
      }, cssProps), React__default.createElement(reactRouter.Switch, {
        location: location
      }, children)));
    }
  }]);

  return AnimatedRouter;
}(React.Component);

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
var AnimatedRouter$1 = reactRouter.withRouter(AnimatedRouter);

exports.default = AnimatedRouter$1;
