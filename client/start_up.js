// react base import
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'; // 리액트 라우터 ( url 변경 )

// 시작시 onTouchTap init
import injectTapEventPlugin from 'react-tap-event-plugin'; // 버튼 탭 이벤트
injectTapEventPlugin({
    shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
        return true;
    }
});

// material-ui theme import
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// base component
import App from './components/app';

// additional component import
import Intro from './components/intro/intro';
import Login from './components/login/login';
import Home from './components/home/home';
import MyPage from './components/mypage/mypage';
import Notification from './components/notification/notification';
import Lecture from './components/lecture/lecture';
import WritePost from './components/write_post/write_post';
import Post from './components/post/post';

const routes = (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Intro}/>
                <Route path="login" component={Login}/>
                <Route path="home" component={Home}/>
                <Route path="mypage" component={MyPage}/>
                <Route path="notification" component={Notification}/>
                <Route path="lecture/:lecture_code" component={Lecture}/>
                <Route path="lecture/:lecture_code/post/:post_id" component={Post}/>
                <Route path="lecture/:lecture_code/write-post" component={WritePost}/>
            </Route>
        </Router>
    </MuiThemeProvider>
);


Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});
