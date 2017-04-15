/**
 * Created by Junyoung on 2016. 12. 25..
 */

// base import
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

// material-ui import
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트
import UserImage from 'material-ui/svg-icons/action/account-circle';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

//component import
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


    render() {
        if(Meteor.user() === null){
            browserHistory.push('/login-please');
        }
        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <Header title="알림" backButtonLabel="홈"/>

                <List style={{marginLeft: -8, marginRight: -8}}>
                    <Subheader>알림</Subheader>
                </List>
            </div>
        );
    }
}

export default Notification;