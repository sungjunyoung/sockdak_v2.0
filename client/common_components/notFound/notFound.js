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


class NotFound extends Component {

    render() {
        return (
            <div className="container" style={{position: 'fixed', left: 20, top: '33%'}}>
                <div className="notFoundTitle"
                     style={{fontSize: 60, marginBottom: 20}}>
                    속닥
                </div>
                <div className="notFoundContent"
                     style={{}}>
                    엥? 잘못된 경로로 들어왔어요..누구냐 넌!
                </div>
            </div>
        );
    }
}

export default NotFound;