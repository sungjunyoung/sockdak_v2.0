/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {ReactDOM} from 'react-dom'
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import {Lectures} from '../../../../imports/collections/lectures';
import ColorCode from '../../../../imports/constants/color_code'

// material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';


import Styles from './post_list_style';


class PostsList extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <FloatingActionButton
                    backgroundColor={this.props.floatingColor}
                    style={Styles.floatingButton}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        )
    }
}

export default PostsList;

// createContainer((props) => {
//
// }, PostsList);