/**
 * Created by Junyoung on 2016. 12. 25..
 */

// base import
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

// additional module import
import AlertModule from '../../modules/alert';

// material-ui import
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트

// style import
import Styles from './styles';

class Intro extends Component {

    // 유저가 로그인 되어 있을 때는 home 으로, 로그인이 안되어있을때는 로그인 화면으로
    onStart() {
        if (Meteor.user()) {
            var loginUser = Meteor.user();
            console.log(loginUser);
            AlertModule.alert('success', '환영합니다! ' + loginUser.profile.name + '님');
            browserHistory.push('home');
        } else {
            browserHistory.push('login');
        }
    }

    render() {
        return (
            <div className="container" style={Styles.container}>
                <div style={Styles.subContainer}>
                    <div className="logo" style={Styles.logo}>SOCKDAK</div>
                    <RaisedButton className="start-button" onTouchTap={this.onStart} style={Styles.startButton}
                                  label="시작하기"/>
                </div>
            </div>
        );
    }
}

export default Intro;