/**
 * Created by junyoung on 2017. 4. 16..
 */

// base import
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

// additional module import
import AlertModule from '../../modules/alert';

// material-ui import
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트


class LoginPlease extends Component {

    goToLogin(){
        browserHistory.push('/');
    }

    render() {
        return (
            <div className="container" style={{position: 'fixed', left: '2%', top: '33%', width: '96%'}}>
                <div className="notFoundTitle"
                     style={{fontSize: 60, marginBottom: 20, textAlign: 'center'}}>
                    속닥
                </div>
                <RaisedButton className="notFoundContent"
                              fullWidth={true}
                              label="로그인 해줄래요?"
                              onTouchTap={this.goToLogin.bind(this)}/>
            </div>
        );
    }
}

export default LoginPlease;