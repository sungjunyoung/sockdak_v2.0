/**
 * Created by Junyoung on 2016. 12. 27..
 */

//base moduel import
import React, {Component} from 'react'; // React 임포트

// additional module import
import {WindowResizeListener} from 'react-window-resize-listener';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import {browserHistory} from 'react-router';
import AlertModule from '../../modules/alert';

// material-ui import
import IconButton from 'material-ui/IconButton';
import SearchButtonIcon from 'material-ui/svg-icons/action/search'
import QuitSearchButtonIcon from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField';
import MyPageButtonIcon from 'material-ui/svg-icons/action/account-circle';
import NotificationButtonIcon from 'material-ui/svg-icons/social/notifications';

// component import
import LectureList from './sub_components/lectures_list';
import Header from '../../common_components/header/header'

// style import
import Styles from './styles';


// 홈 화면에 필요한 부가적인 헤더
class SubHeader extends Component {
    render() {
        return (
            <div>
                <IconButton onTouchTap={this.props.onSearchButton} style={Styles.searchButton}>
                    {this.props.findState ? <QuitSearchButtonIcon/> : <SearchButtonIcon/>}
                </IconButton>

                <IconButton onTouchTap={this.props.onMyPageButton} style={Styles.myPageButton}>
                    <MyPageButtonIcon color="gray"/>
                </IconButton>

                <IconButton onTouchTap={this.props.onNotificationButton} style={Styles.notificationButton}>
                    <NotificationButtonIcon color="gray"/>
                </IconButton>


                {this.props.findState ?
                    <div className="search-text-container" style={Styles.searchTextContainer}>
                        <TextField
                            multiLine={false}
                            underlineShow={false}
                            onChange={this.props.onChangeSearchText}
                            fullWidth={true}
                            style={Styles.searchText}
                            hintText="교수님 또는 강좌명으로 검색해보세요 :)"
                            hintStyle={{fontSize: '12px', color: '#999999', paddingLeft: 20, paddingRight: 20}}
                            inputStyle={{paddingLeft: 20, paddingRight: 20}}/>
                    </div>
                    : null}
            </div>
        )
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         findState: 강좌검색인지 아닌지 (true / false)
         toFind: findState가 true 일때 찾을 강좌
         lectureListMargin: 강좌검색에서 리스트 margin-top
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            findState: false,
            toFind: '',
            lectureListMargin: 0
        };
    }

    onSearchButton() {
        // 강좌 검색을 클릭할 경우
        if (this.state.findState == false)
            this.setState({findState: true, lectureListMargin: 30});
        // 내 강좌로 돌아갈 경우
        else
            this.setState({toFind: '', findState: false});
    }

    onMyPageButton() {
        browserHistory.push('mypage');
    }

    onNotificationButton() {
        browserHistory.push('notification');
    }

    onChangeSearchText(event) {
        this.setState({toFind: event.target.value})
    }

    componentWillMount() {
        if (BrowserDetect.browser === 'Explorer' || BrowserDetect.browser === 'Mozilla') {
            alert('속닥은 크롬과 사파리만 지원해요 ㅠㅠ');
            browserHistory.push('/');
        }
    }

    render() {

        setTimeout(function () {
            if (Meteor.user() === null) {
                browserHistory.push('/login-please');
            }

            // var browserName = parser.setUA(ua).getBrowser().name;
            // console.log(browserName);


        }, 500);

        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                {/*화면이 바뀔때 리스너*/}
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <Header title="LOGO" backButtonDisplay="none"/>
                {/*헤더에 들어가는 추가적인 버튼이나 요소들*/}
                <SubHeader onSearchButton={this.onSearchButton.bind(this)}
                           onMyPageButton={this.onMyPageButton.bind(this)}
                           onNotificationButton={this.onNotificationButton.bind(this)}
                           findState={this.state.findState}
                           onChangeSearchText={this.onChangeSearchText.bind(this)}/>

                {/*회원찾기일 경우에는 props 로 정보들을 넣어준다.*/}
                {this.state.findState ?
                    <LectureList
                        find={true}
                        toFind={this.state.toFind}
                        lectureListMargin={this.state.lectureListMargin}/>
                    : <LectureList/>}

                <div style={Styles.subContainer}>
                </div>
            </div>
        );
    }
}

export default Home;