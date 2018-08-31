import React, { Component } from 'react';
// import 'Style/main/timeline.scss';

export class TimeLineComponent extends Component {
    state = {
        timeList: []
    }
    componentDidMount() {
        let timeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
            return `2018年${item}月`;
        })
        this.setState({ timeList });
    }
    render() {
        let htmlStr = this.state.timeList.map(item => {
            return <li key={item}>{item}</li>
        });
        return (
            <div className="c-box  c-timeline">
                <div className="c-box-header">文章归档</div>
                <div className="c-timeline">
                    <ul>
                        {htmlStr}
                    </ul>
                </div>
            </div>
        );
    }
}
