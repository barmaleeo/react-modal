import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
//import './ReactModalStyle';


export default class ReactModal extends Component {
    state = {show:'', element:null};
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this.refs.content);
        window.addEventListener('keyup', this.keyUpListener.bind(this) );
        window.addEventListener('click', this.clickListener.bind(this) );

        setTimeout(() => {this.setState({show:' in', element:element})},0)
    }
    keyUpListener(e){
        if(e.code === 'Escape' && this.state.show === ' in'){
            this.handleClickClose()
        }
    };
    componentWillUnmount() {
        window.removeEventListener('keyup', this.keyUpListener.bind(this) );
        window.removeEventListener('click', this.clickListener.bind(this) )
    }
    clickListener(e){
        if(this.state.show === ' in' && !this.state.element.contains(e.target)){
            window.removeEventListener('keyup', this.keyUpListener.bind(this) );
            window.removeEventListener('click', this.clickListener.bind(this) );
            this.handleClickClose()

        }
    }
    handleClickClose = () => {
        const self = this;
        self.setState({show:' out'}, () => {
            setInterval(() => {
                if(typeof self.props.onClose === 'function'){
                    self.setState({show:''}, self.props.onClose);
                }
            }, 300)
         })
    };
    handleClickProceed = () =>{
        const p = this.props;
        if(typeof p.onProceed === 'function'){
            p.onProceed();
        }
    };

    render() {
        const p = this.props;
        const s = this.state;
        return (
            <div className={'modal fade show'+ s.show}>
                <div className="modal-dialog" role="document">
                    {p.content!==false?
                        <div className="modal-content" ref="content">
                            {p.header!==false && (
                                <div className="modal-header">
                                    <button type="button" className="close" aria-label="Close"
                                            onClick={this.handleClickClose}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title">{p.caption}</h4>
                                </div>
                            )}
                            <div className="modal-body">{p.children}</div>
                            {p.footer!==false && (
                                <div className="modal-footer">
                                    {p.actionButton !== false &&
                                        <button type="button" className="btn btn-default"
                                                onClick={this.hasndleClickProceed}>
                                            {p.actionButtonText?p.actionButtonText:'Proceed'}
                                        </button>
                                        }
                                    {p.closeButton !== false &&
                                        <button type="button" className="btn btn-default"
                                                onClick={this.handleClickClose}>
                                            {p.closeButtonText?p.closeButtonText:'Close'}
                                        </button>
                                    }
                                </div>
                            )}
                        </div>:
                        <div className="modal-content" ref="content">{this.props.children}</div>
                    }
                </div>
            </div>
        )
    }
}
