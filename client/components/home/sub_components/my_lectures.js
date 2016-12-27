/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';


import Styles from './my_lectures_styles';

class MyLectures extends Component {
    constructor(props) {
        super(props);
    }

    renderLectureList() {

        var timer = 2;
        return this.props.lectures.map(lecture => {

            timer += 1;

            return (
                <div style={{
                    animationDuration: '.'+ timer + 's',
                    animationName: 'fadein'
                }}
                     key={lecture.lecture_code}>
                    <div className="channel-color-box" style={Styles.channelColorBox}></div>
                    <ListItem leftAvatar={<Avatar src=""/>}>
                        <div>
                            {lecture.lecture_name}
                        </div>
                        <div>
                        </div>
                    </ListItem>
                </div>
            )
        });
    }

    render() {

        if (!this.props.lectures) {
            return;
        }

        return (
            <div style={{paddingTop: 30, marginLeft: -8, marginRight: -8}}>
                <List>
                    {this.renderLectureList()}
                </List>
            </div>
        )
    }
}

export default createContainer((props) => {

    Meteor.subscribe('userLectures');

    return {lectures: Lectures.find({}).fetch()};

}, MyLectures);