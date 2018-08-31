import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Router, Route } from 'react-router-dom';


import { ArticleComponent } from './Article';
import { ArticleInfoComponent } from './ArticleInfo';

let style = {
    width: '100%',
    display: 'flex',
    display: '-webkit-flex',
    overflow: 'hidden'
}

export class CLeftComponent extends Component {
    state = {}
    render() {
        return (<HashRouter >
            <div style={style}>
                <Route exact path="/" component={ArticleComponent} />
                <Route path="/info/:id" component={ArticleInfoComponent} />
            </div>
        </HashRouter>);
    }
}
