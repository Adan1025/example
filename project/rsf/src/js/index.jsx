import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Router, Route } from 'react-router-dom';
import { Header } from "./components/header";

import { TopicComponent } from './components/main/Topic';
import { TimeLineComponent } from './components/main/Timeline';
import { ArticleComponent } from './components/main/cLeft/Article';
import { ArticleInfoComponent } from './components/main/cLeft/ArticleInfo';
let style = {
    width: '100%',
    display: 'flex',
    display: '-webkit-flex',
    overflow: 'hidden'
}

export class App extends Component {
    state = {}
    render() {
        return (
            <div>
                <HashRouter >
                    <div>
                        <Header />
                        <div className="c-container" style={style}>
                            <Route exact path="/" component={ArticleComponent} />
                            <Route exact path="/article" component={ArticleComponent} />
                            <Route exact path="/note" component={ArticleComponent} />
                            <Route path="/info/:id" component={ArticleInfoComponent} />
                            <div className="c-right">
                                <TopicComponent />
                                <TimeLineComponent />
                            </div>
                        </div>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
