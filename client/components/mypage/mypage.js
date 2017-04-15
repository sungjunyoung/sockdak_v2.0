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

//component import
import Header from '../../common_components/header/header'
import Avatar from 'material-ui/Avatar';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';

//data import
import {Posts} from '../../../imports/collections/posts';
import {Comments} from '../../../imports/collections/comments';

// style import
import Styles from './styles';

//additional module
import {WindowResizeListener} from 'react-window-resize-listener';
import AlertModule from '../../modules/alert';

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
            showLogoutConfirm: false
        };
    }

    onLogout() {
        this.setState({showLogoutConfirm: true})
    }

    render() {
        if(Meteor.user() === null){
            browserHistory.push('/');
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
                if(this.props.userComments[i].comment_post_id === commentedPosts[j]){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                commentedPosts.push(this.props.userComments[i].comment_post_id);
            }
        }

        var userInfoWidth = this.state.width;
        if (this.state.width > 600) {
            userInfoWidth = 600;
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
                <div className="userInfo" style={Object.assign(Styles.userInfo, {width: userInfoWidth})}>
                    <div className="userImageWrapper">
                        <AccountCircleIcon style={Styles.userImage} color="lightgray"/>
                    </div>
                    <div className="userNickname" style={Styles.userNickname}>
                        {userNickname}
                    </div>
                    <div className="changeNickname" style={Styles.changeNickname}>
                        <a style={Styles.changeNicknameButton}>닉네임 바꿀래?</a>
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
                    <List style={{marginLeft: -8, marginRight: -8}}>
                        <ListItem leftAvatar={<Avatar src=""/>} onClick={this.onLogout.bind(this)}>
                            <div>
                                로그아웃
                            </div>
                        </ListItem>
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