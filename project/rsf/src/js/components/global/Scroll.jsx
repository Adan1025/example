
import React, { Component } from 'react';
export class ScrollComponent extends Component {
    state = {
        isNext: true,
        load: function () { }
    }
    constructor(props) {
        super(props);
        let { isNext, load } = this.props;
        this.state = {
            isNext,
            load
        }
    }
    render() {
        return <div className="sf-scroll" ref="__scroll">
            {this.props.children}
        </div>
    }
    componentDidMount() {
        let $scroll = this.refs.__scroll,
            isLoad = false;
        window.onscroll = () => {
            let { isNext, load } = this.state;
            if (!isNext) {
                window.onscroll = null;
                return;
            }
            let scrollTop = this.getScrollTop() + this.getClientHeight()
            if ($scroll.scrollHeight - scrollTop < 30) {
                if (isLoad) return;
                isLoad = true;
                load();
                setTimeout(() => {
                    isLoad = false;
                }, 300);
            }
        }
    }
    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    getClientHeight() {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }
}