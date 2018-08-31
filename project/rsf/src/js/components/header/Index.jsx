import React,{ Component } from 'react';
import { NavbarComponent } from './Navbar';
import { LogoComponent } from './Logo';


export class Header extends Component {
    state = {}
    render() {
        return (
            <header>
                <LogoComponent />
                <NavbarComponent />
            </header>
        );
    }
}
