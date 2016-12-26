import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from 'react-router'; // 리액트 라우터 ( url 변경 )
import injectTapEventPlugin from 'react-tap-event-plugin'; // 버튼 탭 이벤트
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';

import Intro from './components/intro/intro';
import Login from './components/login/login';
import Home from './components/home/home';



const routes = (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Intro}/>
                <Route path="login" component={Login}/>
                <Route path="home" component={Home}/>
            </Route>
        </Router>
    </MuiThemeProvider>
);


Meteor.startup(() => {
    ReactDOM.render(routes, document.querySelector('.render-target'));
});
