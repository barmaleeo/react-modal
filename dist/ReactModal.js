"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./reactModalStyle.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper2(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReactModal =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactModal, _Component);

  var _super = _createSuper2(ReactModal);

  function ReactModal(props) {
    var _this;

    _classCallCheck(this, ReactModal);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      show: ''
    });

    _defineProperty(_assertThisInitialized(_this), "keyUpListener", function (event) {
      var e = event || window.event;

      if (e.code === 'Escape' && _this.state.show === ' in') {
        _this.handleClickClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clickListener", function (event) {
      var e = event || window.event;

      if (_this.state.show === ' in' && _this.container.current && !_this.container.current.contains(e.target)) {
        window.removeEventListener('keyup', _this.keyUpListener);
        window.removeEventListener('touchstart', _this.clickListener);
        window.removeEventListener('mousedown', _this.clickListener);

        _this.handleClickClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickClose", function () {
      var self = _assertThisInitialized(_this);

      self.setState({
        show: ' out'
      }, function () {
        setTimeout(function () {
          if (typeof self.props.onClose === 'function') {
            self.props.bs4 ? self.setState({
              show: ''
            }, self.props.onClose) : self.props.onClose();
          }
        }, 300);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickProceed", function () {
      var p = _this.props;

      if (typeof p.onProceed === 'function') {
        p.onProceed();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stopPropagation", function (e) {
      e.stopPropagation();
    });

    _this.container = _react.default.createRef();
    return _this;
  }

  _createClass(ReactModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('keyup', this.keyUpListener.bind(this));
      window.addEventListener('touchstart', this.clickListener.bind(this));
      window.addEventListener('mousedown', this.clickListener.bind(this));
      setTimeout(function () {
        _this2.setState({
          show: ' in'
        });
      }, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keyup', this.keyUpListener);
      window.removeEventListener('touchstart', this.clickListener);
      window.removeEventListener('mousedown', this.clickListener);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var p = this.props;
      return _react.default.createElement("div", {
        className: "modal-content",
        ref: this.container
      }, p.header !== false && (p.bs4 ? _react.default.createElement("div", {
        className: "modal-header"
      }, _react.default.createElement("h4", {
        className: "modal-title"
      }, p.caption), _react.default.createElement("button", {
        type: "button",
        className: "close",
        "aria-label": "Close",
        onClick: this.handleClickClose
      }, _react.default.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7"))) : _react.default.createElement("div", {
        className: "modal-header"
      }, _react.default.createElement("button", {
        type: "button",
        className: "close",
        "aria-label": "Close",
        onClick: this.handleClickClose
      }, _react.default.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")), _react.default.createElement("h4", {
        className: "modal-title"
      }, p.caption))), _react.default.createElement("div", {
        className: "modal-body"
      }, p.children), p.footer !== false && _react.default.createElement("div", {
        className: "modal-footer"
      }, _react.default.createElement("div", _extends({
        title: p.footerMsg
      }, p.footerMsgProps), p.footerMsg), _react.default.createElement("div", null, p.actionButton !== false && _react.default.createElement("button", _extends({
        type: "button",
        className: 'btn btn-' + (p.bs4 ? 'primary' : 'default')
      }, p.actionButtonProps, {
        disabled: p.actionButtonDisabled,
        onClick: this.handleClickProceed
      }), p.actionButtonText ? p.actionButtonText : 'Proceed'), p.closeButton !== false && _react.default.createElement("button", _extends({
        type: "button",
        className: 'btn btn-' + (p.bs4 ? 'secondary' : 'default')
      }, p.closeButtonProps, {
        disabled: p.closeButtonDisabled,
        onClick: this.handleClickClose
      }), p.closeButtonText ? p.closeButtonText : 'Close'))));
    }
  }, {
    key: "render",
    value: function render() {
      var p = this.props;
      var s = this.state;

      if (p.bs4) {
        return _react.default.createElement("div", {
          className: 'barmaleeo-react-modal bs4 modal fade' + (s.show.trim() === 'in' ? ' show' : '') + (p.fade ? ' fade-' + p.fade : '')
        }, _react.default.createElement("div", {
          className: 'modal-dialog modal-dialog-scrollable' + (p.fullHeight ? ' fullheight' : '') + (p.centered ? ' modal-dialog-centered' : '') + (p.size ? ' modal-' + p.size : ''),
          role: "document"
        }, p.content !== false ? this.renderContent() : _react.default.createElement("div", {
          className: "modal-content",
          onMouseDown: this.stopPropagation,
          onTouchStart: this.stopPropagation
        }, this.props.children)));
      } else {
        return _react.default.createElement("div", {
          className: 'barmaleeo-react-modal modal fade show' + s.show
        }, _react.default.createElement("div", {
          className: 'modal-dialog' + (p.size ? ' modal-' + p.size : ''),
          role: "document"
        }, p.content !== false ? this.renderContent() : _react.default.createElement("div", {
          className: "modal-content",
          onMouseDown: this.stopPropagation,
          onTouchStart: this.stopPropagation
        }, this.props.children)));
      }
    }
  }]);

  return ReactModal;
}(_react.Component);

exports.default = ReactModal;