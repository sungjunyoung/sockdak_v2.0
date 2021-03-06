/**
 * Created by Junyoung on 2016. 12. 25..
 */
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

import AlertModule from '../../modules/alert';
import {WindowResizeListener} from 'react-window-resize-listener';

// import components, styles
import Styles from './styles';
import Header from '../../common_components/header/header'

// material ui import
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

//import additional modules
import RandomNickname from '../../../imports/constants/user_nickname';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            id: '',
            pw: '',
            approve: false,
            height: $(window).height(),
            width: $(window).width(),
            showAdditionalInput: false,
            loadingVisibility: 'hidden'
        }
    }

    // input 변화시 state 에 저장
    onSchoolChange(event, index, value) {
        this.setState({school: value, showAdditionalInput: true});
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

    componentWillMount() {
        if (BrowserDetect.browser !== 'Chrome' && BrowserDetect.browser !== 'Safari') {
            alert('속닥은 크롬과 사파리만 지원해요 ㅠㅠ');
            browserHistory.push('/');
        }
    }

    onGuestLogin(event, value) {

        //게스트 계정이 있는지 확인
        //있으면 로그인
        //없으면 계정생성 후 로그인

        Meteor.call('findUserByUsername', 'guest', function (res) {
            if (res === undefined) {
                Accounts.createUser({
                    username: 'guest',
                    password: 'none',
                    profile: {
                        nickname: '게스트 계정이에요',
                        name: '게스트',
                        bookmark: [],
                        like: [],
                        notifications: [],
                        changeNicknameCount: -1,
                        isAdmin: false
                    }
                });

                Meteor.loginWithPassword('guest', 'none', function (err, res) {
                    browserHistory.push('home');
                });
            } else {
                Meteor.loginWithPassword('guest', 'none', function (err, res) {
                    browserHistory.push('home');
                });
            }
        })
    }

    // 로그인시 호출
    onLogin(event, value) {
        event.preventDefault();
        this.setState({loadingVisibility: 'visible'});

        // 로그인 예외처리
        if (this.state.school !== '경희대학교') {
            AlertModule.alert('error', '학교를 선택해 주세요!');
            this.setState({loadingVisibility: 'hidden'});
            return;
        }

        if (this.state.id.length !== 10) {
            AlertModule.alert('error', '학번을 정확히 입력해 주세요!');
            this.setState({loadingVisibility: 'hidden'});
            return;
        }

        if (this.state.pw.length === 0) {
            AlertModule.alert('error', '비밀번호를 입력해 주세요!');
            this.setState({loadingVisibility: 'hidden'});
            return;
        }
        if (this.state.approve === false) {
            AlertModule.alert('error', '이용약관에 동의해 주세요!');
            this.setState({loadingVisibility: 'hidden'});
            return;
        }
        // END

        var id = this.state.id;
        var pw = this.state.pw;


        // 결과 promise 로 리턴
        var resultPromise = Meteor.callPromise('loginToKhu', this.state.id, this.state.pw);

        // 로그인 결과 받기
        resultPromise.then(function (res) {

            this.setState({loadingVisibility: 'hidden'});

            loginResult = res.result;

            Meteor.call('isAdmin', id, function (err, isAdmin) {
                if (isAdmin === true) {
                    if (loginResult === 'REST')
                        loginResult = 'REST_BUT_ADMIN';
                }

                if (loginResult === 'ERROR') {
                    AlertModule.alert('error', '종합정보시스템 서버에 문제가 있습니다.');
                } else if (loginResult === 'INCORRECT') {
                    AlertModule.alert('error', '학번과 비밀번호를 다시 확인해주세요.');
                } else if (loginResult === 'REST') {
                    AlertModule.alert('error', '혹시 휴학생이세요..?');
                } else {
                    AlertModule.alert('success', '환영합니다! ' + res.info.name + '님');

                    Meteor.call('findUserByUsername', id, function (err, findUserResult) {

                        // 유저를 찾고 있으면 바로 로그인
                        if (findUserResult) {
                            Meteor.loginWithPassword(id, pw, function (err, res) {
                                browserHistory.push('home');
                            });
                        }

                        // 없으면 강의정보 및 회원정보 만들기
                        else {
                            if (loginResult === 'REST_BUT_ADMIN') {
                                res.lectures = [];
                            }

                            console.log('INFO :: user not exist, create user');
                            Accounts.createUser({
                                username: id,
                                password: pw,
                                profile: {
                                    nickname: RandomNickname.getRandom(),
                                    name: res.info.name,
                                    bookmark: [],
                                    like: [],
                                    notifications: [],
                                    changeNicknameCount: 3,
                                    isAdmin: isAdmin
                                }
                            });

                            Meteor.loginWithPassword(id, pw, function (err, res) {
                                browserHistory.push('home');
                            });

                            Meteor.call('lectureUpdate', res.lectures);
                        }
                    });
                }
            });
        }.bind(this));
    }

    render() {
        return (
            <div style={Object.assign(Styles.container, {height: this.state.height - 80})}>

                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>
                <CircularProgress style={Object.assign(Styles.loading, {visibility: this.state.loadingVisibility})}/>

                <Header title="로그인"/>
                <div className="formContainer" style={Styles.formContainer}>
                    <div style={Styles.subContainer}>
                        <div className="additional-input" style={Styles.infoText}>학교 선택</div>
                        <SelectField
                            className="additional-input"
                            style={Styles.schoolSelectField}
                            floatingLabelText="재학중인 학교를 선택해 주세요 :)"
                            floatingLabelStyle={{fontSize: '14px'}}
                            value={this.state.school}
                            onChange={this.onSchoolChange.bind(this)}
                        >
                            <MenuItem value="경희대학교" primaryText="경희대학교"/>
                        </SelectField>
                    </div>


                    {this.state.showAdditionalInput &&
                    <div>
                        <div style={Styles.subContainer}>
                            <div className="additional-input" style={Styles.infoText}>종합정보시스템 정보 입력</div>
                            <TextField
                                className="additional-input"
                                onChange={this.onIdChange.bind(this)}
                                style={Styles.userIdField}
                                hintText="종합정보시스템 학번을 입력해주세요."
                                hintStyle={{fontSize: '12px', color: '#999999'}}
                                floatingLabelText="학번"
                                floatingLabelStyle={{fontSize: '14px'}}
                            />

                            <TextField
                                className="additional-input"
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
                                className="additional-input"
                                onToggle={this.onApproveChange.bind(this)}
                                label="속닥 이용약관에 동의합니다."
                                labelPosition="right"
                                labelStyle={{fontSize: '14px'}}
                                style={Styles.approveToggle}
                            />
                        </div>
                    </div>
                    }
                </div>

                <div style={Styles.subContainer}>
                    <RaisedButton onTouchTap={this.onLogin.bind(this)} style={Styles.loginButton} label="로그인"/>
                    <RaisedButton onTouchTap={this.onGuestLogin.bind(this)} style={Styles.guestLoginButton}
                                  label="게스트로 둘러보기"/>
                </div>
            </div>
        );
    }
}

export default Login;