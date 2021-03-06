/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';
import ColorCode from '../../../../imports/constants/color_code';


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
                     style={Object.assign(Styles.channelColorBox, {backgroundColor: this.props.lecture.lecture_color})}/>
                <ListItem leftAvatar={<Avatar src=""/>}
                          onTouchTap={() => browserHistory.push(this.props.lecture.lecture_url)}
                          style={Styles.lectureItem}>
                    <div>
                        {this.props.lecture.lecture_name} / {this.props.lecture.lecture_professor} 교수님
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

        var timer = -0.1;
        return this.props.lectures.map(lecture => {

            let str = lecture.lecture_code;
            str = str.replace(/[0-9]/g, '');

            lecture.lecture_color = ColorCode[str];
            lecture.lecture_url = `/lecture/${lecture.lecture_code}`;

            timer += 0.1;

            return (
                <div
                    style={{animationDuration: timer + 's', animationName: 'slideIn', marginBottom: 2}}
                    key={lecture.lecture_code}>
                    <Lecture lecture={lecture}/>
                </div>
            )
        });
    }

    render() {

        return (
            <div style={{marginTop: this.props.lectureListMargin}}>
                <CircularProgress style={Object.assign(Styles.loading, {visibility: this.props.loadingVisibility})}/>
                <List>
                    <Subheader>{this.props.listTitle}</Subheader>
                    {this.renderLectureList()}
                </List>
            </div>
        )
    }
}

export default createContainer((props) => {

    var loadingVisibility;
    var subscribeHandle;

    // 강의 검색일 때때
    if (props.find) {
        subscribeHandle = Meteor.subscribe('findLectures', props.toFind);

        if (!subscribeHandle.ready()) {
            loadingVisibility = 'hidden';
            return {lectures: [], loadingVisibility, listTitle: "검색 결과"};
        } else {
            loadingVisibility = 'hidden';
            return {
                lectures: Lectures.find({}, {sort: {lecture_name: 1}}).fetch(),
                loadingVisibility,
                listTitle: "검색 결과"
            };
        }


    }
    // 유저 강의 목록일 때때
    else {
        subscribeHandle = Meteor.subscribe('userLectures');

        // 구독이 끝나지 않았을 때, 로딩화면과 빈 리스트를 prop 로 넘긴다.
        if (!subscribeHandle.ready()) {
            loadingVisibility = 'visible';
            return {lectures: [], loadingVisibility, listTitle: "내 강의실"};
        } else if (Meteor.user().username === 'guest') {
            loadingVisibility = 'hidden';
            var allLectures = Lectures.find({}, {sort: {lecture_name: 1}}).fetch();
            var randomLectures = [];
            for (var i = 0; i < 5; i++) {
                var count = allLectures.length;
                var randomNum = Math.floor(Math.random() * count);
                randomLectures.push(allLectures[randomNum]);
                allLectures.splice(randomNum, 1);
            }
            return {lectures: randomLectures, loadingVisibility, listTitle: "내 강의실"}
        } else {
            loadingVisibility = 'hidden';
            return {
                lectures: Lectures.find({}, {sort: {lecture_name: 1}}).fetch(),
                loadingVisibility,
                listTitle: "내 강의실"
            };
        }
    }


}, LecturesList);