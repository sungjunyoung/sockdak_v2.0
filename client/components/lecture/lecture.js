/**
 * Created by Junyoung on 2016. 12. 25..
 */

// base import
import React, {Component} from 'react'; // React 임포트

// additional module import
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import {WindowResizeListener} from 'react-window-resize-listener';

// material-ui import
import FlatButton from 'material-ui/FlatButton'; // material-ui 플랫버튼 임포트
import UserImage from 'material-ui/svg-icons/action/account-circle';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Lectures} from '../../../imports/collections/lectures';
import ListIcon from 'material-ui/svg-icons/action/list';

//component import
import Header from '../../common_components/header/header'
import ColorCode from '../../../imports/constants/color_code';
import CircularProgress from 'material-ui/CircularProgress';
import PostsList from './sub_components/posts_list';
import ChatList from './sub_components/chats_list';

// style import
import Styles from './styles';

// 탭바 서브헤더
class SubHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tab-bar"
                 style={Object.assign(Styles.tab, {
                     width: this.props.width,
                     backgroundColor: this.props.backgroundColor
                 })}>
                <FlatButton onTouchTap={this.props.onPostsTap}
                            style={Object.assign({width: this.props.width / 2}, Styles.postsTab)}
                            label="게시판"
                            icon={<ListIcon/>}/>
                <FlatButton onTouchTap={this.props.onChatsTap}
                            style={Object.assign({width: this.props.width / 2 + 9}, Styles.chatsTab)}
                            label="대화방"
                            icon={<ListIcon/>}/>
            </div>
        )
    }
}


// 강좌 페이지
class Lecture extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            swipeIndex: 0
        };
    }

    onPostsTap(event) {
        this.refs.bar.style.transform = "translateX(0px)";
        this.refs.bar.style.transitionDuration = "0.5s";
        this.setState({swipeIndex: 0});
    }

    onChatsTap(event) {
        this.refs.bar.style.transform = "translateX(" + this.state.width / 2 + "px)";
        this.refs.bar.style.transitionDuration = "0.5s";
        this.setState({swipeIndex: 1});
    }

    onSwitch(index, type) {
        if (index >= 0.5) {
            this.refs.bar.style.transform = "translateX(" + this.state.width / 2 + "px)";
            this.refs.bar.style.transitionDuration = "0.5s";
            this.setState({swipeIndex: 1});
        }

        else if (index < 0.5) {
            this.refs.bar.style.transform = "translateX(0px)";
            this.refs.bar.style.transitionDuration = "0.5s";
            this.setState({swipeIndex: 0});
        }
    }

    componentWillMount() {
        if (BrowserDetect.browser === 'Explorer' || BrowserDetect.browser === 'Mozilla') {
            alert('속닥은 크롬과 사파리만 지원해요 ㅠㅠ');
            browserHistory.push('/');
        }
    }


    render() {
        if (Meteor.user() === null) {
            browserHistory.push('/login-please');
        }

        if (!this.props.lecture) {
            return (
                <Header title="LOGO" backButtonDisplay="none"/>
            )
        }

        // 이름 잘라버리기
        var lectureName = this.props.lecture.lecture_name;
        let tempArr = lectureName.split(':');
        lectureName = tempArr[0];

        var containerWidth;
        if (this.state.width >= 600) {
            containerWidth = 620;
        } else {
            containerWidth = this.state.width;
        }

        return (
            <div className="container"
                 style={Object.assign(Styles.container, {height: this.state.height - 110, width: containerWidth})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <Header title={lectureName} backButtonLabel="홈" headerColor={this.props.lectureColor}/>
                <SubHeader width={this.state.width}
                           backgroundColor={this.props.lectureColor}
                           onPostsTap={this.onPostsTap.bind(this)}
                           onChatsTap={this.onChatsTap.bind(this)}
                />
                {/*서브헤더 밑에서 왓다갓다거리는 바*/}
                <div ref="bar" style={Object.assign({width: this.state.width / 2 - 1}, Styles.bar)}/>

                <SwipeableViews className="swipeableViews"
                                index={this.state.swipeIndex}
                                onSwitching={this.onSwitch.bind(this)}>
                    <div className="postsList" style={Object.assign(Styles.subComponent, {
                        height: this.state.height - 110,
                        width: containerWidth + 8
                    })}>
                        <PostsList lectureColor={this.props.lectureColor} lecture={this.props.lecture}/>
                    </div>


                    <div className="chatsList" style={Object.assign(Styles.subComponent, {
                        height: this.state.height - 110,
                        width: containerWidth + 8
                    })}>
                        <ChatList lecture={this.props.lecture} lectureColor={this.props.lectureColor}/>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}

export default createContainer((props) => {

    let lectureCode = props.params.lecture_code;
    var subscribeHandle = Meteor.subscribe('findLectureByCode', lectureCode);

    if (subscribeHandle.ready()) {
        let str = props.params.lecture_code;
        str = str.replace(/[0-9]/g, '');
        let lectureColor = ColorCode[str];

        return {lecture: Lectures.findOne({}), lectureColor: lectureColor};
    } else {
        return {};
    }

}, Lecture);