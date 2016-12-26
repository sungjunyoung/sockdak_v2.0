/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트
import {browserHistory} from 'react-router';

import Styles from './styles';
import Header from '../../common/header/header'



class Home extends Component {


    render() {

        return (
            <div className="container" style={Styles.container}>
                <Header title="홈"/>


                <div style={Styles.subContainer}>
                </div>
            </div>
        );
    }
}

export default Home;