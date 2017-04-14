/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';
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

//components import


// additional module import
import Infinite from 'react-infinite';
import Styles from './post_list_style';
import {Posts} from '../../../../imports/collections/posts';
import {WindowResizeListener} from 'react-window-resize-listener';


class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            writeButtonDisabled: true,
            isInfiniteLoading: false
        };
    }

    onWritePost() {
        browserHistory.push('/lecture/' + this.props.lecture.lecture_code + '/write-post');
    }

    postForm(post) {

        if (post.post_title.length > 20) {
            post.post_title = post.post_title.substring(0, 20);
            post.post_title += '...';
        }

        var contentWidth = 0;
        if (post.post_content.length > 120) {
            post.post_content = post.post_content.substring(0, 120);
            post.post_content += '...';
        } else {
            if(this.state.width < 480){
                contentWidth = this.state.width * 94/100;
            } else {
                contentWidth = 438
            }
        }

        post.post_url = `/lecture/${post.post_lecture_code}/post/${post._id}`;

        return (
            <div onClick={() => browserHistory.push(post.post_url)}>
                <IconButton style={Styles.bookmarkButton}>
                    <BookmarkIcon color="lightgray"/>
                </IconButton>
                <div style={Styles.postTitle}>{post.post_title}</div>
                <div style={Styles.createdAt}>{post.post_created_at.toString()}</div>
                <div style={Object.assign(Styles.postContent, {width: contentWidth})}>{post.post_content}</div>

                <div className="postFooter" style={Styles.postFooter}>
                    <div className="user">
                        <AccountCircleIcon style={Styles.userIcon} color="gray"/>
                        <div style={Styles.userNickname}>{post.post_user_nickname}의 한마디</div>
                    </div>
                </div>
            </div>
        )
    }

    renderPostList() {
        return this.props.posts.map(post => {
            return (
                <ListItem key={post._id} style={Styles.postItem}>
                    {this.postForm(post)}
                </ListItem>
            )
        })
    }

    componentDidMount() {

        for (var i in this.props.lecture.lecture_users) {
            if (this.props.lecture.lecture_users[i].user_id == Meteor.user()._id) {
                this.setState({writeButtonDisabled: false})
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
                <FloatingActionButton
                    onTouchTap={this.onWritePost.bind(this)}
                    backgroundColor={this.props.lectureColor}
                    style={Styles.floatingButton}
                    disabled={this.state.writeButtonDisabled}>
                    <ContentAdd/>
                </FloatingActionButton>

                <Infinite
                    className="list"
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

// export default PostsList;

export default createContainer((props) => {
    var postsSubscribeHandle = Meteor.subscribe('findPostsByLectureCode', props.lecture.lecture_code);
    var lectureSubscribeHandle = Meteor.subscribe('findLectureByCode', props.lecture.lecture_code);

    if (postsSubscribeHandle.ready() && lectureSubscribeHandle.ready()) {
        return {posts: Posts.find({}, {sort: {post_created_at: -1}}).fetch(), lecture: Lectures.findOne({})};
    } else {
        return {posts: []};
    }


}, PostsList);