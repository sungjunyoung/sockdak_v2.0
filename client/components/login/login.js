/**
 * Created by Junyoung on 2016. 12. 25..
 */
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';


import Styles from './styles';
import Header from '../../common/header/header'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

// 알림창 모듈
function alert(type, message) {
    if (type == 'error') {
        Alert.error(message, {
            position: 'top',
            effect: 'jelly',
            timeout: 1500
        })
    } else if (type == 'success') {
        Alert.success(message, {
            position: 'top',
            effect: 'jelly',
            timeout: 1500
        })
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            id: '',
            pw: '',
            approve: false
        }
    }

    // input 변화시 state 에 저장
    onSchoolChange(event, index, value) {
        this.setState({school: value});
    }

    onIdChange(event, value) {
        this.setState({id: value});
    }

    onPasswordChange(event, value) {
        this.setState({pw: value});
    }

    onApproveChange(event, value) {
        this.setState({approve: value})
    }
    // END


    // 로그인시 호출
    onLogin(event, value) {
        event.preventDefault();

        // 로그인 예외처리
        if (this.state.school != '경희대학교') {
            alert('error', '학교를 선택해 주세요!');
            return;
        }

        if(this.state.id.length != 10){
            alert('error', '학번을 정확히 입력해 주세요!');
            return;
        }

        if(this.state.pw.length == 0){
            alert('error', '비밀번호를 입력해 주세요!');
            return;
        }
        if(this.state.approve == false){
            alert('error', '이용약관에 동의해 주세요!');
            return;
        }
        // END

        /*TODO
        - 로그인 로직 구현
         */
    }


    render() {
        return (
            <div style={Styles.container}>
                <Alert stack={{limit: 3}}/>
                <Header title="로그인"/>
                <div style={Styles.formContainer}>
                    <div style={Styles.subContainer}>
                        <div style={Styles.infoText}>학교 선택</div>

                        <SelectField
                            style={Styles.schoolSelectField}
                            floatingLabelText="재학중인 학교를 선택해 주세요 :)"
                            floatingLabelStyle={{fontSize: '14px'}}
                            value={this.state.school}
                            onChange={this.onSchoolChange.bind(this)}
                        >
                            <MenuItem value="경희대학교" primaryText="경희대학교"/>
                        </SelectField>
                    </div>

                    <div style={Styles.subContainer}>
                        <div style={Styles.infoText}>종합정보시스템 정보 입력</div>
                        <TextField
                            onChange={this.onIdChange.bind(this)}
                            style={Styles.userIdField}
                            hintText="종합정보시스템 학번을 입력해주세요."
                            hintStyle={{fontSize: '12px', color: '#999999'}}
                            floatingLabelText="학번"
                            floatingLabelStyle={{fontSize: '14px'}}
                        />
                        <TextField
                            onChange={this.onPasswordChange.bind(this)}
                            type='password'
                            style={Styles.userPasswordField}
                            hintText="종합정보시스템 비밀번호를 입력해주세요."
                            hintStyle={{fontSize: '12px', color: '#999999'}}
                            floatingLabelText="패스워드"
                            floatingLabelStyle={{fontSize: '14px'}}
                        />
                    </div>

                    <div style={Styles.subContainer}>
                        <Toggle
                            onToggle={this.onApproveChange.bind(this)}
                            label="속닥 이용약관에 동의합니다."
                            labelPosition="right"
                            labelStyle={{fontSize: '14px'}}
                            style={Styles.approveToggle}
                        />
                    </div>

                    <div style={Styles.subContainer}>
                        <RaisedButton onTouchTap={this.onLogin.bind(this)} style={Styles.loginButton} label="로그인"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;