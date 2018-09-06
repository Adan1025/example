import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'Style/header/navbar';

export class NavbarComponent extends Component {
    state = {
        menuBlock: false,
        menuCurr: 0,
        menuList: [{
            link: '/',
            title: '首页'
        }, {
            link: '/article',
            title: '技术文章'
        }, {
            link: '/note',
            title: '工作随笔'
        }, {
            link: '/article',
            title: '关于自己'
        }]
    }
    render() {
        let { menuList, menuCurr } = this.state;
        let menuChild = menuList.map((item, index) => {
            return <li key={index} className={menuCurr == index ? 'curr' : ''} onClick={this.currMenuHanlde.bind(this, index)}><Link to={item.link}>{item.title}</Link></li>;
        })
        return (
            <div className="hd-navbar">
                <ul className="hd-navbar-float" onClick={this.showMenuHanlde.bind(this)}>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={`hd-navbar-main ${this.state.menuBlock ? 'curr' : ''}`} ref="menu">
                    <ul className="hd-navbar-menu">
                        {menuChild}
                    </ul>
                </div>
            </div>
        );
    }
    currMenuHanlde(menuCurr) {
        this.setState({ menuCurr })
    }
    showMenuHanlde() {
        let menuBlock = !this.state.menuBlock;
        this.setState({
            menuBlock
        });
    }
}
