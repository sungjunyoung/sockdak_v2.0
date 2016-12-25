/**
 * Created by Junyoung on 2016. 12. 25..
 */
import React, {Component} from 'react'; // React 임포트
import RaisedButton from 'material-ui/RaisedButton'; // material-ui 플랫버튼 임포트

import Styles from './styles';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={Styles.container}>
                <div style={Styles.title}>
                    {this.props.title}
                </div>
            </div>
        )
    }
}


export default Header;

