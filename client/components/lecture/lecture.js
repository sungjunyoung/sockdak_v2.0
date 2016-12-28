/**
 * Created by Junyoung on 2016. 12. 25..
 */

// base import
import React, {Component} from 'react'; // React 임포트

// additional module import
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

// material-ui import
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트
import UserImage from 'material-ui/svg-icons/action/account-circle';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Lectures} from '../../../imports/collections/lectures';

//component import
import Header from '../../common/header/header'
import ColorCode from '../../../imports/constants/color_code';
import CircularProgress from 'material-ui/CircularProgress';

// style import
import Styles from './styles';

// 강좌 페이지
class Lecture extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
        };
    }


    render() {

        if(!this.props.lecture){
            return(
                <CircularProgress style={Object.assign(Styles.loading, {visibility: this.props.loadingVisibility})}/>
                )
        }

        // 이름 잘라버리기
        var lectureName = this.props.lecture.lecture_name;
        let tempArr = lectureName.split(':');
        lectureName = tempArr[0];

        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <Header title={lectureName} backButtonLabel="홈" headerColor={this.props.lectureColor}/>

                <List style={{marginLeft: -8, marginRight: -8}}>
                    <Subheader>알림</Subheader>
                </List>
            </div>
        );
    }
}

export default createContainer((props) => {

    let lectureCode = props.params.lecture_code;
    var subscribeHandle = Meteor.subscribe('findLectureByCode', lectureCode);



    if (subscribeHandle.ready()) {
        let str = props.params.lecture_code;
        str = str.replace(/[0-9]/g, '');
        let lectureColor = ColorCode[str];

        return {lecture: Lectures.findOne({}), lectureColor: lectureColor};
    } else {
        return {};
    }

}, Lecture);