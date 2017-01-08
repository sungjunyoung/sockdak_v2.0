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

//components import


// additional module import
import Infinite from 'react-infinite';
import Styles from './post_list_style';
import {Posts} from '../../../../imports/collections/posts';


class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    onWritePost() {
        browserHistory.push('/lecture/' + this.props.lecture.lecture_code + '/write-post');
    }

    postForm(post) {
        return (
            <div>
                <div>{post.post_title}</div>
                <div>{post.post_content}</div>
                <div>{post.post_created_at.toString()}</div>
            </div>
        )
    }

    renderPostList() {
        return this.props.posts.map(post => {
          return (
              <ListItem key={post._id}>
                  {this.postForm(post)}
              </ListItem>
          )
        })
    }

    render() {

        console.log(this.props);

        return (
            <div>
                <FloatingActionButton
                    onTouchTap={this.onWritePost.bind(this)}
                    backgroundColor={this.props.lectureColor}
                    style={Styles.floatingButton}>
                    <ContentAdd/>
                </FloatingActionButton>

                <List>
                    {this.props.posts ? this.renderPostList() : null}
                </List>
            </div>
        )
    }
}

// export default PostsList;

export default createContainer((props) => {
    var subscribeHandle = Meteor.subscribe('findPostsByLectureCode', props.lecture.lecture_code);

    if (subscribeHandle.ready()) {
        return {posts: Posts.find({}).fetch()};
    } else {
        return props;
    }


}, PostsList);