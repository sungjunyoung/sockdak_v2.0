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
            chatContent: ''
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

    componentDidUpdate() {
        var scrollHeight = this.props.chats.length * 30;
        this.refs.scrollThis.scrollable.scrollTop = scrollHeight;
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

    onChatChange(event) {
        this.setState({chatContent: event.target.value});
    }

    keyboardInput(e) {

        if (e.charCode == 13) {
            this.writeChat();
        }
    }

    writeChat() {

        var chat = {};

        chat.chat_lecture_name = this.props.lecture.lecture_name;
        chat.chat_lecture_code = this.props.lecture.lecture_code;
        chat.chat_content = this.state.chatContent;

        Meteor.call('chatAdd', chat, function (err, res) {
            this.setState({chatContent: ''});
        }.bind(this))
    }

    render() {
        return (
            <div className="chatListContainer"
                 style={{padding: 8, position: 'absolute', width: '100%', height: this.state.height - 140}}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <div className="chatsList">
                    <Infinite
                        className="chattingInfinitList"
                        containerHeight={this.state.height - 180}
                        elementHeight={30}
                        infiniteLoadBeginEdgeOffset={300}
                        timeScrollStateLastsForAfterUserScrolls={1000}
                        displayBottomUpwards
                        ref="scrollThis">
                        {this.props.chats ? this.renderChatList() : null}
                    </Infinite>
                </div>

                <div className="sendChatWrapper" style={Styles.sendChatWrapper}>
                    <input className="inputChat"
                           onKeyPress={this.keyboardInput.bind(this)}
                           onChange={this.onChatChange.bind(this)}
                           style={{width: this.state.width - 129}}
                           value={this.state.chatContent}/>
                    <FlatButton
                        className="sendChatButton"
                        style={{
                            position: 'absolute', right: 18, top: 8, color: '#ffffff',
                            border: '1px solid #b7b7b7', borderRadius: '0 5px 5px 0'
                        }}
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
}, ChatList);