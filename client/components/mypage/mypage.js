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

//component import
import Header from '../../common_components/header/header'
import Avatar from 'material-ui/Avatar';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'




// style import
import Styles from './styles';

class MyPage extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            showLogoutConfirm: false
        };
    }

    onLogout(){
        this.setState({showLogoutConfirm: true})
    }


    render() {
        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <Header title="마이페이지" backButtonLabel="홈"/>

                <SweetAlert
                    show={this.state.showLogoutConfirm}
                    title='속닥'
                    text='정말 로그아웃 하시겠어요?'
                    showCancelButton
                    onConfirm={() => {
                        Meteor.logout();
                        this.setState({showLogoutConfirm: false});
                        browserHistory.push('/');
                    }}
                    onCancel={() =>
                        this.setState({showLogoutConfirm: false})
                    }
                />


                <List style={{marginLeft: -8, marginRight: -8}}>
                    <ListItem leftAvatar={<Avatar src=""/>} onClick={this.onLogout.bind(this)}>
                        <div>
                            로그아웃
                        </div>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default MyPage;