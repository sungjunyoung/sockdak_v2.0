/**
 * Created by Junyoung on 2016. 12. 25..
 */
import React, {Component} from 'react'; // React 임포트
import FlatButton from 'material-ui/FlatButton'; // material-ui 플랫버튼 임포트
import BackButtonIcon from 'material-ui/svg-icons/navigation/chevron-left';
import {browserHistory} from 'react-router'

import Styles from './styles';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    onBack(){
        browserHistory.goBack();
    }

    render() {
        return (
            <div style={Styles.container}>
                <FlatButton
                    onTouchTap={this.onBack.bind(this)}
                    style={Object.assign(Styles.backButton, {display: this.props.backButtonDisplay})}
                    target="_blank"
                    label="BACK"
                    secondary={true}
                    icon={<BackButtonIcon color="#555555"/>}
                    labelStyle={{color: '#555555'}}
                    primary={true}
                />

                <div style={Styles.title}>
                    {this.props.title}
                </div>

            </div>
        )
    }
}


export default Header;

