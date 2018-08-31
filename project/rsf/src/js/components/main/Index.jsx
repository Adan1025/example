import React,{ Component } from 'react';
import 'Style/main/index.scss';

import { CLeftComponent } from './cLeft';
import { TopicComponent } from './Topic';
import { TimeLineComponent } from './Timeline';

export class Main extends Component {
    state = {}
    render() {
        return (
            <div className="c-container">
                <CLeftComponent />
                <div className="c-right">
                    <TopicComponent />
                    <TimeLineComponent />
                </div>
            </div>
        );
    }
}
