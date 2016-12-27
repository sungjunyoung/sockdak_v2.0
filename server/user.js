/**
 * Created by Junyoung on 2016. 12. 25..
 */
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import khuAuth from './modules/khu_auth'

Meteor.methods({

    // 경희대학교 종정시에 로그인
    'loginToKhu': function (id, pw) {

        return khuAuth.login(id, pw)
            .catch(function (err) {
                console.log('-----------------------------------------------');
                console.log('!! KHU SERVER ERROR !!');
                console.log('-----------------------------------------------');
                return err;
            })
            .then(khuAuth.getUserInfo)
            .catch(function (err) {
                console.log('-----------------------------------------------');
                console.log('!! CANNOT GET USER INFO FROM KHU !!');
                console.log('-----------------------------------------------');
                return err;
            })
            .then(khuAuth.getUserLecture)
            .catch(function (err) {
                console.log('---------------------------------------------------------');
                console.log('!! CANNOT GET USER LECUTURE FROM KHU (REST/INCORRECT) !!');
                console.log('--------------------------------------------------------');
                return err;
            })
            .then(function (result) {
                if(result.info){
                    console.log('----------------------------------------------------');
                    console.log('@@ LOGIN SUCCESS @@');
                    console.log('\tUSER NAME : ' + result.info.name);
                    console.log('\tUSER ID : ' + result.info.class_number);
                    console.log('\tUSER DEPARTMENT : ' + result.info.department);
                    console.log('-----------------------------------------------');
                }
                return result;
            })
    },

    'findUserByUsername': function (id) {
        return Accounts.findUserByUsername(id);
    }

});

