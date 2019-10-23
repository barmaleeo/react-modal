function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import './reactModalStyle.scss';
export default class ReactModal extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      show: '',
      element: null
    });

    _defineProperty(this, "keyUpListener", event => {
      const e = event || window.event;

      if (e.code === 'Escape' && this.state.show === ' in') {
        this.handleClickClose();
      }
    });

    _defineProperty(this, "clickListener", event => {
      const e = event || window.event;

      if (this.state.show === ' in' && !this.state.element.contains(e.target)) {
        window.removeEventListener('keyup', this.keyUpListener);
        window.removeEventListener('touchstart', this.clickListener);
        window.removeEventListener('mousedown', this.clickListener);
        this.handleClickClose();
      }
    });

    _defineProperty(this, "handleClickClose", () => {
      const self = this;
      self.setState({
        show: ' out'
      }, () => {
        setTimeout(() => {
          if (typeof self.props.onClose === 'function') {
            self.props.bs4 ? self.setState({
              show: ''
            }, self.props.onClose) : self.props.onClose();
          }
        }, 300);
      });
    });

    _defineProperty(this, "handleClickProceed", () => {
      const p = this.props;

      if (typeof p.onProceed === 'function') {
        p.onProceed();
      }
    });
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.refs.content);
    window.addEventListener('keyup', this.keyUpListener);
    window.addEventListener('touchstart', this.clickListener);
    window.addEventListener('mousedown', this.clickListener);
    setTimeout(() => {
      this.setState({
        show: ' in',
        element: element
      });
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUpListener);
    window.removeEventListener('touchstart', this.clickListener);
    window.removeEventListener('mousedown', this.clickListener);
  }

  renderContent() {
    const p = this.props;
    return React.createElement("div", {
      className: "modal-content",
      ref: "content"
    }, p.header !== false && (p.bs4 ? React.createElement("div", {
      className: "modal-header"
    }, React.createElement("h4", {
      className: "modal-title"
    }, p.caption), React.createElement("button", {
      type: "button",
      className: "close",
      "aria-label": "Close",
      onClick: this.handleClickClose
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))) : React.createElement("div", {
      className: "modal-header"
    }, React.createElement("button", {
      type: "button",
      className: "close",
      "aria-label": "Close",
      onClick: this.handleClickClose
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7")), React.createElement("h4", {
      className: "modal-title"
    }, p.caption))), React.createElement("div", {
      className: "modal-body"
    }, p.children), p.footer !== false && React.createElement("div", {
      className: "modal-footer"
    }, React.createElement("div", _extends({
      title: p.footerMsg
    }, p.footerMsgProps), p.footerMsg), React.createElement("div", null, p.actionButton !== false && React.createElement("button", _extends({
      type: "button",
      className: 'btn btn-' + (p.bs4 ? 'primary' : 'default')
    }, p.actionButtonProps, {
      onClick: this.handleClickProceed
    }), p.actionButtonText ? p.actionButtonText : 'Proceed'), p.closeButton !== false && React.createElement("button", _extends({
      type: "button",
      className: 'btn btn-' + (p.bs4 ? 'secondary' : 'default')
    }, p.closeButtonProps, {
      onClick: this.handleClickClose
    }), p.closeButtonText ? p.closeButtonText : 'Close'))));
  }

  render() {
    const p = this.props;
    const s = this.state;

    if (p.bs4) {
      return React.createElement("div", {
        className: 'barmaleeo-react-modal bs4 modal fade' + (s.show.trim() === 'in' ? ' show' : '')
      }, React.createElement("div", {
        className: 'modal-dialog modal-dialog-scrollable modal-dialog-centered' + (p.size ? ' modal-' + p.size : ''),
        role: "document"
      }, p.content !== false ? this.renderContent() : React.createElement("div", {
        className: "modal-content",
        ref: "content"
      }, this.props.children)));
    } else {
      return React.createElement("div", {
        className: 'barmaleeo-react-modal modal fade show' + s.show
      }, React.createElement("div", {
        className: 'modal-dialog' + (p.size ? ' modal-' + p.size : ''),
        role: "document"
      }, p.content !== false ? this.renderContent() : React.createElement("div", {
        className: "modal-content",
        ref: "content"
      }, this.props.children)));
    }
  }

}