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
        };
    }


    render() {

        if (!this.props.lecture || !this.props.post || !this.props.comments) {
            return (
                <div>

                </div>
            )
        }

        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <Header title={this.props.lecture.lecture_name} backButtonLabel="게시판"
                        headerColor={this.props.lectureColor}/>

                <div style={Styles.subContainer}>
                    <div>
                        {this.props.post.post_title}
                    </div>
                    <div>
                        {this.props.post.post_created_at.toString()}
                    </div>
                    <div>
                        {this.props.post.post_content}
                    </div>
                </div>

                <div style={Styles.commentInputWrapper}>
                    <div style={Object.assign(Styles.commentInput, {width: this.state.width * 72 / 100})}>
                        <TextField
                            fullWidth={true}
                            className="input-post-title"
                            hintText="새 댓글을 남겨보세요."
                            hintStyle={{fontSize: '12px', color: '#999999'}}
                            underlineFocusStyle={{borderColor: this.props.lectureColor}}
                        />
                    </div>
                    <div>
                        <RaisedButton
                            buttonStyle={Object.assign(Styles.commentInputButton, {width: this.state.width * 20 / 100})}
                            className="commend-input-button"
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