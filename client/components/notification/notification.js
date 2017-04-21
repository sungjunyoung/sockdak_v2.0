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
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

//component import
import Infinite from 'react-infinite';
import Header from '../../common_components/header/header'

// style import
import Styles from './styles';

class Notification extends Component {
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

    componentWillMount() {
        if (BrowserDetect.browser !== 'Chrome' && BrowserDetect.browser !== 'Safari') {
            alert('속닥은 크롬과 사파리만 지원해요 ㅠㅠ');
            browserHistory.push('/');
        }
    }

    onNotiClick(noti) {
        Meteor.call('deleteNotification', noti, function (err, res) {

            browserHistory.push(noti.noti_url);
        })
    }

    notiForm(noti) {
        var notiInfo = '';
        switch (noti.noti_type) {
            case 'COMMENT':
                notiInfo = noti.noti_from_user_nickname + '님이 댓글을 다셨어요';
                break;
            default:
                notiInfo = '어디서 온 알람인지 모르겠는걸요..?';
                break;
        }

        return (
            <div onClick={() => this.onNotiClick(noti)}>
                <div>{notiInfo}</div>
                <div>{noti.noti_content}</div>
            </div>
        )
    }

    renderNotiList() {
        return Meteor.user().profile.notifications.map((noti, idx) => {
            return (
                <ListItem key={noti.noti_created_at} style={{}}>
                    {this.notiForm(noti)}
                </ListItem>
            )
        })
    }


    render() {
        if (Meteor.user() === null) {
            browserHistory.push('/login-please');
        }

        if (Meteor.user() === undefined) {
            return (
                <div></div>
            )
        }

        console.log(Meteor.user().profile.notifications);
        return (
            <div className="container" style={Object.assign(Styles.container,
                {height: this.state.height - 80})}>
                <Header title="알림" backButtonLabel="홈"/>

                <Infinite
                    containerHeight={this.state.height - 100}
                    elementHeight={48}>
                    <Subheader>알림</Subheader>
                    {Meteor.user().profile.notifications ? this.renderNotiList() : null}
                </Infinite>
            </div>
        );
    }
}

export default createContainer((props) => {
    var userSubHandle = Meteor.subscribe('userInfo');
    if (userSubHandle.ready()) {
        return {
            user: Meteor.user()
        };
    } else {
        return props;
    }
}, Notification);

