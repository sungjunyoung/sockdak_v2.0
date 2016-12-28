/**
 * Created by Junyoung on 2016. 12. 25..
 */

// React base import
import React, {Component} from 'react';

// additional module import
import {browserHistory} from 'react-router'

// material-ui component import
import FlatButton from 'material-ui/FlatButton';
import BackButtonIcon from 'material-ui/svg-icons/navigation/chevron-left';

// style import
import Styles from './styles';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    onBack() {
        browserHistory.goBack();
    }

    render() {

        if(!this.props){
            return(<div>로딩중</div>)
        }

        var headerColor;
        if(!this.props.headerColor){
            headerColor = 'lightgray';
        } else {
            headerColor = this.props.headerColor;
        }

        return (
            <div style={Object.assign(Styles.container, {backgroundColor: headerColor})}>
                <FlatButton
                    onTouchTap={this.onBack.bind(this)}
                    style={Object.assign(Styles.backButton, {display: this.props.backButtonDisplay})}
                    target="_blank"
                    label={this.props.backButtonLabel ? this.props.backButtonLabel : 'BACK' }
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

