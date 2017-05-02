/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';
import {Comments} from '../../../../imports/collections/comments';
import ColorCode from '../../../../imports/constants/color_code'

// material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import SearchButtonIcon from 'material-ui/svg-icons/action/search'

import LikeIcon from 'material-ui/svg-icons/action/favorite';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

//components import


// additional module import
import Infinite from 'react-infinite';
import Styles from './post_list_style';
import {Posts} from '../../../../imports/collections/posts';
import {WindowResizeListener} from 'react-window-resize-listener';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'
import AlertModule from '../../../modules/alert';

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            writeButtonDisabled: true,
            isInfiniteLoading: false,
            showBookmarkQuitConfirm: false,
            quitBookmarkPostId: '',
            showBookmarkConfirm: false,
            bookmarkPostId: '',
            isLiked: false,
        };
    }

    onWritePost() {
        browserHistory.push('/lecture/' + this.props.lecture.lecture_code + '/write-post');
    }


    onBookmark(post_id) {
        if(Meteor.user().username === 'guest'){
            AlertModule.alert('error', '게스트 계정은 북마크를 하실 수 없어요!');
            return;
        }

        var userBookmarks = Meteor.user().profile.bookmark;

        for (var i = 0; i < userBookmarks.length; i++) {
            if (post_id === userBookmarks[i]) {
                this.setState({showBookmarkQuitConfirm: true, quitBookmarkPostId: post_id});
                return;
            }
        }

        this.setState({showBookmarkConfirm: true, bookmarkPostId: post_id});
    }


    // 라이크 버튼 눌렀을때
    clickLikeButton(post_id) {
        
        if(Meteor.user().username === 'guest'){
            AlertModule.alert('error', '게스트 계정은 좋아요를 하실 수 없어요!');
            return;
        }

        var userLikes = Meteor.user().profile.like;

        var quit = false;

        for (var i = 0; i < userLikes.length; i++) {
            if (post_id === userLikes[i]) {
                Meteor.users.update({_id: Meteor.userId()}, {$pull: {"profile.like": post_id}});
                Meteor.call('postPullLike', post_id, function (err, res) {
                    this.forceUpdate();
                    quit = true;
                }.bind(this));
                quit = true;
            }
        }

        if (!quit) {
            Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {"profile.like": post_id}});
            Meteor.call('postAddLike', post_id, function (err, res) {
                this.forceUpdate();
            }.bind(this));
        }
    }

    postForm(post) {

        if (post.post_title.length > 20) {
            post.post_title = post.post_title.substring(0, 20);
            post.post_title += '...';
        }

        // 각 포스트별 width 결정
        var contentWidth = 0;
        if (post.post_content.length > 120) {
            post.post_content = post.post_content.substring(0, 120);
            post.post_content += '...';
        } else {
            if (this.state.width < 600) {
                contentWidth = this.state.width -4;
            } else {
                contentWidth = 600
            }
        }
        post.post_url = `/lecture/${post.post_lecture_code}/post/${post._id}`;

        var userBookmarks = Meteor.user().profile.bookmark;
        var isBookmarked = false;
        for (var i = 0; i < userBookmarks.length; i++) {
            if (post._id === userBookmarks[i]) {
                isBookmarked = true;
            }
        }

        // 좋아요 누른 게시물인지 아닌지
        var userLikes = Meteor.user().profile.like;
        var isLiked = false;
        for (var i = 0; i < userLikes.length; i++) {
            if (post._id === userLikes[i]) {
                isLiked = true;
            }
        }
        var likeIconColor = '#d6d4d4';
        if (isLiked) {
            likeIconColor = '#fc8f8f';
        }

        //좋아요 갯수 99개 이상이면 99+로 표시
        var likeCount = '1';
        if (post.post_likes.length > 99) {
            likeCount = '99+';
        } else {
            likeCount = post.post_likes.length;
        }

        // 전체 댓글 중에서 해당 게시물에 해당하는 댓글 수 구하기
        var commentCount = 0;
        for (var i = 0; i < this.props.comments.length; i++) {
            if (this.props.comments[i].comment_post_id === post._id) {
                commentCount++;
            }
        }

        // 댓글 갯수 99개 이상이면 99+로 표시
        if (commentCount > 99) {
            commentCount = '99+';
        }

        //북마크 눌럿는지
        var bookmarkColor = isBookmarked ? "#f7e81f" : "lightgray";

        return (
            <div className="onePost">
                <IconButton style={Styles.bookmarkButton}
                            onTouchTap={(e) => {
                                this.onBookmark(post._id);
                                e.stopPropagation();
                            }}>
                    <BookmarkIcon color={bookmarkColor}/>
                </IconButton>
                <div>
                    <div className="postMain">
                        <div style={Styles.postTitle}>{post.post_title}</div>
                        <div style={Styles.createdAt}>{post.post_created_at.toString()}</div>
                        <div style={Styles.postContent}>{post.post_content}</div>
                    </div>

                    <div className="postFooter" style={Styles.postFooter}>
                        <div className="user" style={{float: 'left', width: '60%', height: '100%'}}>
                            <AccountCircleIcon style={Styles.userIcon} color="gray"/>
                            <div style={Styles.userNickname}>{post.post_user_nickname}의 한마디</div>
                        </div>

                        <div style={Styles.rightInfoWrapper}>
                            <div style={Styles.heartInfo}>
                                <div>
                                    <LikeIcon
                                        className="likeIcon"
                                        style={Styles.likeIcon} color={likeIconColor}
                                        onTouchTap={(e) => {
                                            this.clickLikeButton(post._id);
                                            e.stopPropagation();
                                        }}/>
                                </div>
                                <div style={Styles.likeText}>
                                    {likeCount}
                                </div>
                            </div>
                            <div style={Styles.commentInfo}>
                                <div>
                                    <CommentIcon style={Styles.commentIcon} color="#9e9e9e"/>
                                </div>
                                <div style={Styles.commentText}>
                                    {commentCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderPostList() {
        return this.props.posts.map(post => {
            return (
                <ListItem
                    onTouchTap={(e) => {
                        browserHistory.push(post.post_url);
                        e.stopPropagation();
                    }}
                    className="postListItem"
                    key={post._id}
                    style={Styles.postItem}>
                    {this.postForm(post)}
                </ListItem>
            )
        })
    }

    componentWillReceiveProps(nextProps) {
        if (Meteor.user().profile.isAdmin) {
            this.setState({writeButtonDisabled: false});
        }

        for (var i in nextProps.lecture.lecture_users) {
            if (nextProps.lecture.lecture_users[i].user_id === Meteor.user()._id) {
                this.setState({writeButtonDisabled: false});
            }
        }
    }

    handleInfiniteLoad() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function () {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 1000);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
    }

    elementInfiniteLoad() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    }

    render() {
        return (
            <div>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

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

                <FloatingActionButton
                    onTouchTap={ this.onWritePost.bind(this)}
                    backgroundColor={this.props.lectureColor}
                    style={Styles.floatingButton}
                    disabled={this.state.writeButtonDisabled}>
                    <ContentAdd/>
                </FloatingActionButton>

                <Infinite
                    style={{width: 600}}
                    containerHeight={this.state.height - 103}
                    elementHeight={140}
                    onInfiniteLoad={this.handleInfiniteLoad}
                    loadingSpinnerDelegate={this.elementInfiniteLoad()}
                    isInfiniteLoading={this.state.isInfiniteLoading}>
                    {this.props.posts ? this.renderPostList() : null}
                </Infinite>
            </div>
        )
    }
}


export default createContainer((props) => {
    var postsSubscribeHandle = Meteor.subscribe('findPostsByLectureCode', props.lecture.lecture_code);
    var lectureSubscribeHandle = Meteor.subscribe('findLectureByCode', props.lecture.lecture_code);
    var commentsSubscribeHandle = Meteor.subscribe('findCommentsByLectureCode', props.lecture.lecture_code);

    if (postsSubscribeHandle.ready() && lectureSubscribeHandle.ready() && commentsSubscribeHandle.ready()) {

        return {
            posts: Posts.find({},
                {sort: {post_created_at: -1}}).fetch(),
            lecture: Lectures.findOne({}),
            comments: Comments.find({}).fetch()
        };
    } else {
        return {posts: [], lecture: {}};
    }


}, PostsList);