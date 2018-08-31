import React, { Component } from 'react';

import { Header } from "./components/header";
import { Main } from './components/main';

export class App extends Component {
    state = {}
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}
