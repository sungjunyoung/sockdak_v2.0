/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../imports/collections/lectures';
import ColorCode from '../../../imports/constants/color_code'

// material-ui
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

// additional module import
import {WindowResizeListener} from 'react-window-resize-listener';

//components import
import Header from '../../common_components/header/header'

import Styles from './write_post_style';


class WritePost extends Component {
    constructor(props) {
        super(props);
        /*
         height: 화면 높이
         width: 화면 너비
         */
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            slide: 'slideIn',
            showContentInput: false,
            showshowConfirm: false
        };
    }

    onPostTitleChange(event) {
        if (event.target.value.length >= 5 && event.target.value.length < 30) {
            this.setState({showContentInput: true});
        } else {
            this.setState({showContentInput: false, showConfirm: false});
        }
    }

    onPostContentChange(event) {
        if (event.target.value.length >= 5 && event.target.value.length < 30) {
            this.setState({showConfirm: true});
        } else {
            this.setState({showConfirm: false});
        }
    }

    render() {
        if (!this.props.lecture) {
            return (<div></div>)
        }

        return (

            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 70})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>
                <Header title="글쓰기" backButtonLabel="" headerColor={this.props.lectureColor}/>
                <TextField
                    fullWidth={true}
                    onChange={this.onPostTitleChange.bind(this)}
                    className="input-post-title"
                    hintText="제목을 입력하세요."
                    hintStyle={{fontSize: '12px', color: '#999999'}}
                    underlineFocusStyle={{borderColor: this.props.lectureColor}}
                />
                {
                    this.state.showContentInput ?
                        <TextField
                            fullWidth={true}
                            onChange={this.onPostContentChange.bind(this)}
                            className="input-post-content"
                            hintText="내용을 입력하세요."
                            hintStyle={{fontSize: '12px', color: '#999999', position: 'absolute', top: 12, left: 0}}
                            rows={6}
                            rowsMax={6}
                            multiLine={true}
                            underlineFocusStyle={{borderColor: this.props.lectureColor}}
                        />
                        : null
                }

                {
                    this.state.showConfirm ?
                        <div>
                            <RaisedButton
                                style={Styles.uploadImageButton}
                                className="input-post-upload-images"
                                fullWidth={true}
                                label="파일선택"
                            />
                            <FlatButton
                                style={Styles.inputPostConfirm}
                                className="input-post-confirm"
                                labelStyle={{color: 'white'}}
                                label="등록"/>
                        </div>
                        : null
                }


            </div>
        )
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

}, WritePost);
