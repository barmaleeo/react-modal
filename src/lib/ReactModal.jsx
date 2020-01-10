import React, {Component} from 'react';
//import * as ReactDOM from "react-dom";
import './reactModalStyle.scss';


export default class ReactModal extends Component {
    state = {show:''};
    componentDidMount() {
        //const element = ReactDOM.findDOMNode(this.refs.content);
        window.addEventListener('keyup', this.keyUpListener );
        window.addEventListener('touchstart', this.clickListener );
        window.addEventListener('mousedown', this.clickListener );

        setTimeout(() => {this.setState({show:' in'})},0)
    }
    keyUpListener = (event) => {
        const e = event || window.event;
        if(e.code === 'Escape' && this.state.show === ' in'){
            this.handleClickClose()
        }
    };
    componentWillUnmount() {
        window.removeEventListener('keyup', this.keyUpListener );
        window.removeEventListener('touchstart', this.clickListener );
        window.removeEventListener('mousedown', this.clickListener )
    }
    clickListener = (event) => {
//        const e = event || window.event;
        // if(this.state.show === ' in' && !this.state.element.contains(e.target)){
            window.removeEventListener('keyup', this.keyUpListener );
            window.removeEventListener('touchstart', this.clickListener );
            window.removeEventListener('mousedown', this.clickListener );
            this.handleClickClose()

        // }
    };
    handleClickClose = () => {
        const self = this;
        self.setState({show:' out'}, () => {
            setTimeout(() => {
                if(typeof self.props.onClose === 'function'){
                    self.props.bs4?
                    self.setState({show:''}, self.props.onClose):
                        self.props.onClose();
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
    renderContent(){
        const p = this.props;
        return(
            <div className="modal-content"
                 onMouseDown={this.stopPropagation}
                 onTouchStart={this.stopPropagation}>
                {p.header!==false && (
                    p.bs4 ?
                        <div className="modal-header">
                            <h4 className="modal-title">{p.caption}</h4>
                            <button type="button" className="close" aria-label="Close"
                                    onClick={this.handleClickClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>:
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
                        <div title={p.footerMsg} {...p.footerMsgProps}>{p.footerMsg}</div>
                        <div>
                            {p.actionButton !== false &&
                            <button type="button" className={'btn btn-' + (p.bs4?'primary':'default')} {...p.actionButtonProps}
                                    disabled={p.actionButtonDisabled}
                                    onClick={this.handleClickProceed}>
                                {p.actionButtonText?p.actionButtonText:'Proceed'}
                            </button>
                            }
                            {p.closeButton !== false &&
                            <button type="button" className={'btn btn-' + (p.bs4?'secondary':'default')} {...p.closeButtonProps}
                                    disabled={p.closeButtonDisabled}
                                    onClick={this.handleClickClose}>
                                {p.closeButtonText?p.closeButtonText:'Close'}
                            </button>
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
    stopPropagation = (e)=> {
        e.stopPropagation()
    };
    render() {
        const p = this.props;
        const s = this.state;
        if(p.bs4){
            return (
                <div className={'barmaleeo-react-modal bs4 modal fade'+ (s.show.trim()==='in'?' show':'') +(p.fade?(' fade-'+p.fade):'')}>
                    <div className={'modal-dialog modal-dialog-scrollable'
                    +(p.centered?' modal-dialog-centered':'')
                    +(p.size?' modal-'+p.size:'')} role="document">
                        {p.content!==false?this.renderContent():
                            <div className="modal-content"
                                 onMouseDown={this.stopPropagation}
                                 onTouchStart={this.stopPropagation}>{this.props.children}</div>
                        }
                    </div>
                </div>

            )
        }else {
            return (
                <div className={'barmaleeo-react-modal modal fade show' + s.show}>
                    <div className={'modal-dialog'+(p.size?' modal-'+p.size:'')} role="document">
                        {p.content !== false ? this.renderContent() :
                            <div className="modal-content"
                                 onMouseDown={this.stopPropagation}
                                 onTouchStart={this.stopPropagation}>{this.props.children}</div>
                        }
                    </div>
                </div>
            )
        }
    }
}
