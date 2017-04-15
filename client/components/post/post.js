/**
 * Created by junyoung on 2017. 1. 20..
 */
// base import
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';

// material-ui import
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트
import UserImage from 'material-ui/svg-icons/action/account-circle';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';

import LikeIcon from 'material-ui/svg-icons/action/favorite';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

//component import
import Header from '../../common_components/header/header'

// style import
import Styles from './post_style';

// additional import
import {WindowResizeListener} from 'react-window-resize-listener';
import {Posts} from '../../../imports/collections/posts';
import {Comments} from '../../../imports/collections/comments';
import {Lectures} from '../../../imports/collections/lectures';
import ColorCode from '../../../imports/constants/color_code';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'


class Post extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            writeButtonDisabled: true,
            showBookmarkQuitConfirm: false,
            quitBookmarkPostId: '',
            showBookmarkConfirm: false,
            bookmarkPostId: '',
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.lecture !== undefined) {
            for (var i in nextProps.lecture.lecture_users) {
                if (nextProps.lecture.lecture_users[i].user_id === Meteor.user()._id) {
                    this.setState({writeButtonDisabled: false});
                    break;
                }
            }
        }
    }

    onBookmark(post_id) {
        var userBookmarks = Meteor.user().profile.bookmark;

        for (var i = 0; i < userBookmarks.length; i++) {
            if (post_id === userBookmarks[i]) {
                console.log(11);
                this.setState({showBookmarkQuitConfirm: true, quitBookmarkPostId: post_id});
                return;
            }
        }

        this.setState({showBookmarkConfirm: true, bookmarkPostId: post_id});
    }

    render() {

        if (!this.props.lecture || !this.props.post || !this.props.comments) {
            return (
                <div>

                </div>
            )
        }

        var userBookmarks = Meteor.user().profile.bookmark;
        var isBookmarked = false;
        for (var i = 0; i < userBookmarks.length; i++) {
            if (this.props.post._id === userBookmarks[i]) {
                isBookmarked = true;
            }
        }
        var bookmarkColor = isBookmarked ? "#f7e81f" : "lightgray";


        var subContanierWidth = 0;
        if (this.state.width < 480) {
            subContanierWidth = this.state.width;
        } else {
            subContanierWidth = 496
        }


        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <Header title={this.props.lecture.lecture_name} backButtonLabel="게시판"
                        headerColor={this.props.lectureColor}/>

                <SweetAlert
                    show={this.state.showBookmarkQuitConfirm}
                    title='속닥'
                    text='북마크를 해제하시겠어요?'
                    showCancelButton
                    onConfirm={() => {
                        Meteor.users.update({_id: Meteor.userId()}, {$pull: {"profile.bookmark": this.state.quitBookmarkPostId}});
                        this.setState({showBookmarkQuitConfirm: false});
                        this.forceUpdate();
                    }}
                    onCancel={() =>
                        this.setState({showBookmarkQuitConfirm: false})
                    }
                />
                <SweetAlert
                    show={this.state.showBookmarkConfirm}
                    title='속닥'
                    text='북마크를 등록하시겠어요?'
                    showCancelButton
                    onConfirm={() => {
                        Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {"profile.bookmark": this.state.bookmarkPostId}});
                        this.forceUpdate();
                        this.setState({showBookmarkConfirm: false})
                    }}
                    onCancel={() =>
                        this.setState({showBookmarkConfirm: false})
                    }
                />

                <div style={Object.assign(Styles.subContainer, {width: subContanierWidth})}>
                    <IconButton style={Styles.bookmarkButton}
                                onTouchTap={(e) => {
                                    e.preventDefault();
                                    this.onBookmark(this.props.post._id);
                                }
                                }
                    >
                        <BookmarkIcon color={bookmarkColor}/>
                    </IconButton>

                    <div style={Styles.postTitle}>
                        {this.props.post.post_title}
                    </div>
                    <div style={Styles.postCreatedAt}>
                        {this.props.post.post_created_at.toString()}
                    </div>
                    <div style={Styles.postContent}>
                        {this.props.post.post_content}
                    </div>

                    <div style={Styles.betweenBar}>
                        <div style={Styles.userInfoWrapper}>
                            <div style={{width: 45, float: 'left'}}>
                                <AccountCircleIcon style={Styles.postUserIcon} color="#9e9e9e"/>
                            </div>
                            <div style={Styles.userNickname}>행복한지렁이</div>
                        </div>
                        <div style={Styles.rightInfoWrapper}>
                            <div style={Styles.heartInfo}>
                                <div>
                                    <LikeIcon style={Styles.likeIcon} color="#9e9e9e"/>
                                </div>
                                <div style={Styles.likeText}>
                                    99+
                                </div>
                            </div>
                            <div style={Styles.commentInfo}>
                                <div>
                                    <CommentIcon style={Styles.commentIcon} color="#9e9e9e"/>
                                </div>
                                <div style={Styles.commentText}>
                                    99+
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={Styles.commentInputWrapper}>
                    <div style={Object.assign(Styles.commentInput, {width: this.state.width * 72 / 100})}>
                        <TextField
                            disabled={this.state.writeButtonDisabled}
                            fullWidth={true}
                            // className="input-post-title"
                            hintText="새 댓글을 남겨보세요."
                            hintStyle={{fontSize: '12px', color: '#999999'}}
                            underlineFocusStyle={{borderColor: this.props.lectureColor}}
                        />
                    </div>
                    <div>
                        <RaisedButton
                            disabled={this.state.writeButtonDisabled}
                            buttonStyle={Object.assign(Styles.commentInputButton, {
                                width: this.state.width * 20 / 100,
                                backgroundColor: '#f7f7f7'
                            })}
                            // className="commend-input-button"
                            label="작성"
                            labelPosition="before"
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default createContainer((props) => {
    let lectureCode = props.params.lecture_code;
    let postId = props.params.post_id;
    var lectureSubscribeHandle = Meteor.subscribe('findLectureByCode', lectureCode);
    var postSubscribeHandle = Meteor.subscribe('findPostById', postId);
    var commentsSubscribeHandle = Meteor.subscribe('findCommentsByPostId', postId);

    if (postSubscribeHandle.ready() && commentsSubscribeHandle.ready() && lectureSubscribeHandle.ready()) {

        let str = lectureCode;
        str = str.replace(/[0-9]/g, '');
        let lectureColor = ColorCode[str];

        return {
            post: Posts.findOne({}),
            comments: Comments.find({}).fetch(),
            lecture: Lectures.findOne({}),
            lectureColor: lectureColor
        };
    } else {
        return props;
    }

}, Post);