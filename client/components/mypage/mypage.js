/**
 * Created by Junyoung on 2016. 12. 25..
 */

// base import
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';

// material-ui import
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트
import UserImage from 'material-ui/svg-icons/action/account-circle';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import NoticeIcon from 'material-ui/svg-icons/av/volume-down';
import DeveloperSayIcon from 'material-ui/svg-icons/image/tag-faces';
import BugReportIcon from 'material-ui/svg-icons/action/bug-report';
import TermsIcon from 'material-ui/svg-icons/action/report-problem';
import ShareIcon from 'material-ui/svg-icons/social/share';
import LogoutIcon from 'material-ui/svg-icons/action/highlight-off';

//component import
import Header from '../../common_components/header/header'
import Avatar from 'material-ui/Avatar';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';

//data import
import {Posts} from '../../../imports/collections/posts';
import {Comments} from '../../../imports/collections/comments';

// style import
import Styles from './styles';

//additional module
import {WindowResizeListener} from 'react-window-resize-listener';
import AlertModule from '../../modules/alert';
import RandomNickname from '../../../imports/constants/user_nickname';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'

class MyPage extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            showLogoutConfirm: false,
            showChangeNicknameConfirm: false,
        };
    }

    changeNickname() {
        // 닉네임 업데이트는 세번 제한
        if (Meteor.user().profile.changeNicknameCount >= 3) {
            // 컨펌창
            this.setState({showChangeNicknameConfirm: true});
            return;
        } else if (Meteor.user().profile.changeNicknameCount === 0) {
            AlertModule.alert('error', '닉네임 변경 횟수가 초과되었어요!');
            return;
        } else {
            var randomNickname = RandomNickname.getRandom();
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nickname": randomNickname}});
            Meteor.users.update({_id: Meteor.userId()}, {$inc: {"profile.changeNicknameCount": -1}});
        }

    }

    onLogout() {
        this.setState({showLogoutConfirm: true})
    }

    render() {
        if (Meteor.user() === null) {
            browserHistory.push('/login-please');
        }

        if (!this.props.user) {
            return <div></div>
        }
        if (!this.props.userPosts) {
            return <div></div>
        }
        if (!this.props.userComments) {
            return <div></div>
        }

        // 유저 닉네임
        var userNickname = this.props.user.profile.nickname;

        // 유저 포스트 갯수
        var postCounter = this.props.userPosts.length;

        //유저가 댓글 단 포스트 갯수 구하기
        var commentsCounter = this.props.userComments.length;
        var commentedPosts = [];
        for (var i = 0; i < commentsCounter; i++) {
            var flag = false;
            for (var j = 0; j < commentedPosts.length; j++) {
                if (this.props.userComments[i].comment_post_id === commentedPosts[j]) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                commentedPosts.push(this.props.userComments[i].comment_post_id);
            }
        }

        // 화면조정
        var userInfoWidth = this.state.width;
        if (this.state.width > 600) {
            userInfoWidth = 616;
        }

        // 닉네임 바꾸기 멘트
        var changeNicknameInfo = "닉네임 바꿀래요? " + this.props.user.profile.changeNicknameCount + "번 남았어요!";
        if (this.props.user.profile.changeNicknameCount === 0) {
            changeNicknameInfo = "닉네임 변경기회 세번을 다 써버렷네요.."
        }

        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>
                <Header title="마이페이지" backButtonLabel="홈"/>

                <SweetAlert
                    show={this.state.showLogoutConfirm}
                    title='속닥'
                    text='정말 로그아웃 하시겠어요?'
                    showCancelButton
                    onConfirm={() => {
                        Meteor.logout();
                        this.setState({showLogoutConfirm: false});
                        browserHistory.push('/');
                    }}
                    onCancel={() =>
                        this.setState({showLogoutConfirm: false})
                    }
                />

                <SweetAlert
                    show={this.state.showChangeNicknameConfirm}
                    title='속닥'
                    text='닉네임은 계정당 3회 변경가능합니다! 정말 변경하시겠어요?'
                    showCancelButton
                    onConfirm={() => {
                        var randomNickname = RandomNickname.getRandom();
                        Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.nickname": randomNickname}});
                        Meteor.users.update({_id: Meteor.userId()}, {$inc: {"profile.changeNicknameCount": -1}});
                        this.setState({showChangeNicknameConfirm: false});
                    }}
                    onCancel={() =>
                        this.setState({showChangeNicknameConfirm: false})
                    }
                />

                <div className="userInfo" style={Object.assign(Styles.userInfo, {width: userInfoWidth})}>
                    <div className="userImageWrapper">
                        <AccountCircleIcon style={Styles.userImage} color="lightgray"/>
                    </div>
                    <div className="userNickname" style={Styles.userNickname}>
                        {userNickname}
                    </div>
                    <div className="changeNickname" style={Styles.changeNickname}>
                        <a style={Styles.changeNicknameButton}
                           onClick={this.changeNickname.bind(this)}>{changeNicknameInfo}</a>
                    </div>
                    <div className="userWroteCounter" style={Styles.userWroteCounter}>
                        <div className="postCounter" style={Styles.postCounter}>
                            <div className="postCounterNum" style={Styles.CounterNum}>{postCounter}</div>
                            <div className="postCounterInfo" style={Styles.CounterInfo}>내가 쓴 글</div>
                        </div>
                        <div className="commentedPostCounter" style={Styles.commentedPostCounter}>
                            <div className="commentCounterNum" style={Styles.CounterNum}>{commentedPosts.length}</div>
                            <div className="commentCounterInfo" style={Styles.CounterInfo}>댓글 단 글</div>
                        </div>
                    </div>
                </div>

                <div className="userSettings" style={Styles.userSettings}>
                    <Subheader>설정</Subheader>
                    <List style={{marginLeft: -8, marginRight: -8, marginBottom: 10, backgroundColor: '#ffffff'}}>
                        <ListItem primaryText="잠금설정" leftIcon={<LockIcon style={Styles.listIcons}/>}/>
                        <ListItem primaryText="알림설정" leftIcon={<AlarmIcon style={Styles.listIcons}/>}/>
                    </List>
                    <Subheader>고객지원</Subheader>
                    <List style={{marginLeft: -8, marginRight: -8, backgroundColor: '#ffffff'}}>
                        <ListItem primaryText="공지사항" leftIcon={<NoticeIcon style={Styles.listIcons}/>}/>
                        <ListItem primaryText="제작자 한마디" leftIcon={<DeveloperSayIcon style={Styles.listIcons}/>}/>
                        <ListItem primaryText="문의 / 버그신고" leftIcon={<BugReportIcon style={Styles.listIcons}/>}/>
                        <ListItem primaryText="이용약관" leftIcon={<TermsIcon style={Styles.listIcons}/>}/>
                        <ListItem primaryText="친구에게 소문내기" leftIcon={<ShareIcon style={Styles.listIcons}/>}/>
                        <ListItem primaryText="로그아웃" leftIcon={<LogoutIcon style={Styles.listIcons}/>}
                                  onClick={this.onLogout.bind(this)}/>
                    </List>
                </div>
            </div>
        );

    }
}

export default createContainer((props) => {
    var userInfo = Meteor.subscribe('userInfo', Meteor.userId());
    var userPosts = Meteor.subscribe('findPostByUserId', Meteor.userId());
    var userComments = Meteor.subscribe('findCommentsByUserId', Meteor.userId());

    if (userInfo.ready() && userPosts.ready() && userComments.ready()) {
        return {
            user: Meteor.users.findOne({_id: Meteor.userId()}),
            userPosts: Posts.find({}).fetch(),
            userComments: Comments.find({}).fetch(),
        }
    } else {
        return props;
    }

}, MyPage) ;