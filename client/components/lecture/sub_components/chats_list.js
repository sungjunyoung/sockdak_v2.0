/**
 * Created by junyoung on 2017. 4. 16..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';
import {Comments} from '../../../../imports/collections/comments';
import ColorCode from '../../../../imports/constants/color_code'

// material-ui
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
import FlatButton from 'material-ui/FlatButton';
import LikeIcon from 'material-ui/svg-icons/action/favorite';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

//components import


// additional module import
import Infinite from 'react-infinite';
import Styles from './chats_list_style';
import {Chats} from '../../../../imports/collections/chats';
import {WindowResizeListener} from 'react-window-resize-listener';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            chatContent: '',
            isInfiniteLoading: false
        }
    }


    chatForm(chat) {
        var chatWidth = 0;
        if (this.state.width < 600) {
            chatWidth = this.state.width * 94 / 100;
        } else {
            chatWidth = 600
        }

        return (
            <div style={{width: chatWidth}}>
                <div>
                    {chat.chat_content}
                </div>
            </div>
        )
    }

    componentWillUpdate(nextProps, nextStates) {

        if (nextProps.chats && this.props.chats) {
            if (nextProps.chats.length > this.props.chats.length) {
                this.refs.scrollThis.scrollable.scrollTop = nextProps.chats.length * 48 + 48;
            }
        }
    }

    componentDidUpdate() {
        if (this.props.chats) {
            this.refs.scrollThis.scrollable.scrollTop = this.props.chats.length * 48;
        }
    }

    renderChatList() {
        return this.props.chats.map((chat, idx) => {
            return (
                <ListItem key={chat._id} style={{}}>
                    {this.chatForm(chat)}
                </ListItem>
            )
        })
    }

    getRealHeight() {    // Note viewport sizing broken in Android 2.x see http://stackoverflow.com/questions/6601881/problem-with-meta-viewport-and-android
        var viewport = {
            left: window.pageXOffset,   // http://www.quirksmode.org/mobile/tableViewport.html
            top: window.pageYOffset,
            width: window.innerWidth || documentElement.clientWidth,
            height: window.innerHeight || documentElement.clientHeight
        };
        return viewport.height;
    }

    // // ios 키보드가 올라왔을때 (미구현)
    // onInputFocus(e) {
    //     setTimeout(function () {
    //         console.log(this.getRealHeight())
    //     }.bind(this), 500);
    // }

    onChatChange(e) {
        this.setState({chatContent: e.target.value});
    }

    keyboardInput(e) {
        if (e.charCode == 13) {
            this.writeChat(e);
        }
    }

    writeChat(e) {
        setTimeout(function () {
            this.inputChat.focus();
        }.bind(this), 500);


        e.preventDefault();
        e.stopPropagation();

        var chat = {};

        chat.chat_lecture_name = this.props.lecture.lecture_name;
        chat.chat_lecture_code = this.props.lecture.lecture_code;
        chat.chat_content = this.state.chatContent;

        Meteor.call('chatAdd', chat, function (err, res) {
            this.setState({chatContent: ''});


        }.bind(this))
    }

    render() {

        var containerWidth = 0;
        if (this.state.width < 600) {
            containerWidth = this.state.width * 94 / 100;
        } else {
            containerWidth = 600;
        }

        return (
            <div className="chatListContainer"
                 style={{
                     padding: '8px 8px 0 8px',
                     position: 'absolute',
                     width: '100%',
                     height: this.state.height - 120
                 }}>

                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <div className="chatsList">
                    <Infinite
                        className="chattingInfinitList"
                        containerHeight={this.state.height - 180}
                        elementHeight={48}
                        displayBottomUpwards
                        infiniteLoadBeginEdgeOffset={200}
                        ref="scrollThis">
                        {this.props.chats ? this.renderChatList() : null}
                    </Infinite>
                </div>

                <div className="sendChatWrapper" style={Styles.sendChatWrapper}>
                    <input className="inputChat"
                        // onFocus={this.onInputFocus.bind(this)}
                           onKeyPress={this.keyboardInput.bind(this)}
                           onChange={this.onChatChange.bind(this)}
                           style={{width: containerWidth - 120}}
                           value={this.state.chatContent}
                           ref={(input) => {
                               this.inputChat = input;
                           }}/>
                    <FlatButton
                        className="sendChatButton"
                        style={{
                            position: 'absolute', right: 18, top: 8, color: '#ffffff',
                            borderRadius: '5px'
                        }}
                        hoverColor={this.props.lectureColor}
                        backgroundColor={this.props.lectureColor}
                        onTouchTap={this.writeChat.bind(this)}
                        label="전송"/>
                </div>
            </div>
        )
    }

}

export default createContainer((props) => {

    var chatsSubscribHandle = Meteor.subscribe('findChatsByLectureCode', props.lecture.lecture_code);
    if (chatsSubscribHandle.ready()) {
        return {
            chats: Chats.find({}).fetch()
        }
    } else {
        return props;
    }

    return props;
}, ChatList);