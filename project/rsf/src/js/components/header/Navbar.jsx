import React,{ Component } from 'react';
import 'Style/header/navbar';

export class NavbarComponent extends Component {
    state = {
        menuBlock: false
    }
    render() {
        return (
            <div className="hd-navbar">
                <ul className="hd-navbar-float" onClick={this.showMenu.bind(this)}>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={`hd-navbar-main ${this.state.menuBlock ? 'curr' : ''}`} ref="menu">
                    <ul className="hd-navbar-menu">
                        <li className="curr"><a href="#">首页</a></li>
                        <li><a href="#">技术文章</a></li>
                        <li><a href="#">工作随笔</a></li>
                        <li><a href="#">关于自己</a></li>
                    </ul>
                </div>
            </div>
        );
    }
    showMenu() {
        let menuBlock = !this.state.menuBlock;
        this.setState({
            menuBlock
        });
    }
}
