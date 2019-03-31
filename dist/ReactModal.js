function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import * as ReactDOM from "react-dom"; //import './ReactModalStyle';

export default class ReactModal extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      show: '',
      element: null
    });

    _defineProperty(this, "handleClickClose", () => {
      const self = this;
      self.setState({
        show: ' out'
      }, () => {
        setInterval(() => {
          if (typeof self.props.onClose === 'function') {
            self.setState({
              show: ''
            }, self.props.onClose);
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
    window.addEventListener('keyup', this.keyUpListener.bind(this));
    window.addEventListener('click', this.clickListener.bind(this));
    setTimeout(() => {
      this.setState({
        show: ' in',
        element: element
      });
    }, 0);
  }

  keyUpListener(e) {
    if (e.code === 'Escape' && this.state.show === ' in') {
      this.handleClickClose();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUpListener.bind(this));
    window.removeEventListener('click', this.clickListener.bind(this));
  }

  clickListener(e) {
    if (this.state.show === ' in' && !this.state.element.contains(e.target)) {
      window.removeEventListener('keyup', this.keyUpListener.bind(this));
      window.removeEventListener('click', this.clickListener.bind(this));
      this.handleClickClose();
    }
  }

  render() {
    const p = this.props;
    const s = this.state;
    return React.createElement("div", {
      className: 'modal fade show' + s.show
    }, React.createElement("div", {
      className: "modal-dialog",
      role: "document"
    }, p.content !== false ? React.createElement("div", {
      className: "modal-content",
      ref: "content"
    }, p.header !== false && React.createElement("div", {
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
    }, p.caption)), React.createElement("div", {
      className: "modal-body"
    }, p.children), p.footer !== false && React.createElement("div", {
      className: "modal-footer"
    }, p.actionButton !== false && React.createElement("button", _extends({
      type: "button",
      className: "btn btn-default"
    }, p.actionButtonProps, {
      onClick: this.handleClickProceed
    }), p.actionButtonText ? p.actionButtonText : 'Proceed'), p.closeButton !== false && React.createElement("button", {
      type: "button",
      className: "btn btn-default",
      onClick: this.handleClickClose
    }, p.closeButtonText ? p.closeButtonText : 'Close'))) : React.createElement("div", {
      className: "modal-content",
      ref: "content"
    }, this.props.children)));
  }

}