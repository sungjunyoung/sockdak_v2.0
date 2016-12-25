/**
 * Created by Junyoung on 2016. 12. 25..
 */
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트

import Styles from './styles';

class Intro extends Component {

    onStart() {
        // event.preventDefault();
        // if(Meteor.user()){
        //     browserHistory.push('home');
        // } else{
        browserHistory.push('login');
        // }

    }

    render() {
        return (
            <div style={Styles.container}>
                <div style={Styles.subContainer}>
                    <div style={Styles.logo}>SOCKDAK</div>
                    <RaisedButton onTouchTap={this.onStart} style={Styles.startButton} label="시작하기"/>
                </div>
            </div>
        );
    }
}

export default Intro;