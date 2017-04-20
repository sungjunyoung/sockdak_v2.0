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
import AlertModule from '../../modules/alert';

//components import
import Header from '../../common_components/header/header'

import Styles from './write_post_style';
import SweetAlert from 'sweetalert-react'
import '/node_modules/sweetalert/dist/sweetalert.css'


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
            title: '',
            content: '',
            writeButtonDisabled: true,
            writePostConfirm: false
        };
    }

    componentWillMount() {
        if (BrowserDetect.browser === 'Explorer' || BrowserDetect.browser === 'Mozilla') {
            alert('속닥은 크롬과 사파리만 지원해요 ㅠㅠ');
            browserHistory.push('/');
        }
    }

    componentDidMount(){
    }

    render() {
        if (Meteor.user() === null) {
            browserHistory.push('/login-please');
        }

        if (!this.props.lecture) {
            return (<div></div>)
        }

        return (

            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 70})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>
                <Header title="글쓰기" backButtonLabel="" headerColor={this.props.lectureColor}/>

                <SweetAlert
                    show={this.state.writePostConfirm}
                    title='속닥'
                    text='게시물을 등록하시겠어요?'
                    showCancelButton
                    onConfirm={() => {
                        if (this.state.title.length < 4 || this.state.title.length > 30) {
                            AlertModule.alert('error', '게시물의 제목은 4자 이상, 30자 이하 입니다.');
                            this.setState({writePostConfirm: false});
                            return;
                        } else if (this.state.content.length < 5 || this.state.content.length > 1000000) {
                            AlertModule.alert('error', '게시물의 내용은 5자 이상, 1000자 이내 입니다.');
                            this.setState({writePostConfirm: false});
                            return;
                        }

                        var post = {};
                        // post.post_lecture_color = this.props.lectureColor;
                        post.post_lecture_name = this.props.lecture.lecture_name;
                        post.post_lecture_code = this.props.lecture.lecture_code;
                        post.post_title = this.state.title;
                        post.post_content = this.state.content;

                        Meteor.call('postAdd', post, function (err, res) {
                            browserHistory.goBack();
                        });
                        this.setState({writePostConfirm: false});
                    }}
                    onCancel={() =>
                        this.setState({writePostConfirm: false})
                    }
                />

                <TextField
                    autoFocus
                    onChange={this.onTitleChange.bind(this)}
                    fullWidth={true}
                    className="input-post-title"
                    hintText="제목을 입력하세요."
                    hintStyle={{fontSize: '12px', color: '#999999'}}
                    underlineFocusStyle={{borderColor: this.props.lectureColor}}
                />
                <TextField
                    onChange={this.onContentChange.bind(this)}
                    fullWidth={true}
                    className="input-post-content"
                    hintText="내용을 입력하세요."
                    hintStyle={{fontSize: '12px', color: '#999999', position: 'absolute', top: 12, left: 0}}
                    rows={8}
                    rowsMax={8}
                    multiLine={true}
                    underlineFocusStyle={{borderColor: this.props.lectureColor}}
                />
                <RaisedButton
                    style={Styles.uploadImageButton}
                    className="input-post-upload-images"
                    fullWidth={true}
                    disabled={true}
                    label="파일업로드 기능은 업데이트 예정입니다."
                    labelPosition="before"
                >
                    {/*<input type="file" style={{*/}
                    {/*cursor: 'pointer',*/}
                    {/*position: 'absolute',*/}
                    {/*top: 0,*/}
                    {/*bottom: 0,*/}
                    {/*right: 0,*/}
                    {/*left: 0,*/}
                    {/*width: '100%',*/}
                    {/*opacity: 0,*/}
                    {/*}}/>*/}
                </RaisedButton>
                <FlatButton
                    onClick={this.writePost.bind(this)}
                    style={Styles.inputPostConfirm}
                    className="input-post-confirm"
                    labelStyle={{color: 'white'}}
                    label="등록"/>
            </div>
        )
    }

    onTitleChange(event) {
        this.setState({title: event.target.value});
    }

    onContentChange(event) {
        this.setState({content: event.target.value});
    }

    writePost() {
        this.setState({writePostConfirm: true});
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
