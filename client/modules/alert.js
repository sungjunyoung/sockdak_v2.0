/**
 * Created by Junyoung on 2016. 12. 29..
 */

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

var alertModule = (function(){

    // 알림창 모듈
    function alert(type, message) {
        if (type == 'error') {
            Alert.error(message, {
                position: 'top',
                effect: 'jelly',
                timeout: 1500
            })
        } else if (type == 'success') {
            Alert.success(message, {
                position: 'top',
                effect: 'jelly',
                timeout: 1500
            })
        } else if (type == 'info') {
            Alert.info(message, {
                position: 'top',
                effect: 'jelly',
                timeout: 1500
            })
        }
    }

    return{
        alert:alert
    }
}());

export default alertModule;