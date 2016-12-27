/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';
import ColorCode from '../../../../imports/constants/color_code'

import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';


import Styles from './lectures_list_styles';

class Lecture extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="channel-color-box"
                     style={Object.assign(Styles.channelColorBox, {backgroundColor: this.props.lecture.lecture_color})}></div>
                <ListItem leftAvatar={<Avatar src=""/>}>
                    <div>
                        {this.props.lecture.lecture_name}
                    </div>
                    <div>
                    </div>
                </ListItem>
            </div>
        )
    }
}

class LecturesList extends Component {
    constructor(props) {
        super(props);
    }


    // 강의리스트 렌더링
    renderLectureList() {

        var timer = 2;
        return this.props.lectures.map(lecture => {

            let str = lecture.lecture_code;
            str = str.replace(/[0-9]/g, '');

            lecture.lecture_color = ColorCode[str];
            // lecture.url = `/channel/${channel.code}`;

            timer += 1;

            return (
                <div style={{animationDuration: '.' + timer + 's', animationName: 'slidein', marginBottom: 2}}
                     key={lecture.lecture_code}>
                    <Lecture lecture={lecture}/>
                </div>
            )
        });
    }

    render() {

        return (
            <div style={{marginLeft: -8, marginRight: -8}}>
                <CircularProgress style={Object.assign(Styles.loading, {visibility: this.props.loadingVisibility})}/>
                <List>
                    <Subheader>내 강의실</Subheader>
                    {this.renderLectureList()}
                </List>
            </div>
        )
    }
}

export default createContainer((props) => {

    var loadingVisibility;

    // 강의 검색일 때때
    if (props.find) {
        console.log(Lectures.find({}).fetch());
        Meteor.subscribe('findLectures', props.toFind);

        loadingVisibility = 'hidden';
        return {lectures: Lectures.find({}).fetch(), loadingVisibility};

    }
    // 유저 강의 목록일 때때
    else {
        console.log(Lectures.find({}).fetch());
        var subscriptHandle = Meteor.subscribe('userLectures');

        if (!subscriptHandle.ready()) {
            loadingVisibility = 'visible';
            return {lectures: [], loadingVisibility};
        } else {
            loadingVisibility = 'hidden';
            return {lectures: Lectures.find({}).fetch(), loadingVisibility};
        }
    }


}, LecturesList);