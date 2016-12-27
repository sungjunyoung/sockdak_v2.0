/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트

import {WindowResizeListener} from 'react-window-resize-listener';

import MyLectures from './sub_components/my_lectures';

import Styles from './styles';
import Header from '../../common/header/header'



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
        }
    }

    render() {

        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <Header title="홈"/>
                <MyLectures/>

                <div style={Styles.subContainer}>
                </div>
            </div>
        );
    }
}

export default Home;