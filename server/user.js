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
                if (err == 'ERROR') {
                    console.log('----LOGIN-----------------------');
                    console.log('!! ERROR : KHU BAD CONNECTION !!');
                    console.log('--------------------------------');
                }
                return err;
            })
            .then(khuAuth.getUserInfo)
            .catch(function (err) {
                if (err == 'ERROR') {
                    console.log('----LOGIN-----------------------');
                    console.log('!! ERROR : KHU BAD CONNECTION !!');
                    console.log('--------------------------------');
                }
                return err;
            })
            .then(khuAuth.getUserLecture)
            .catch(function (err) {
                if (err == 'ERROR') {
                    console.log('----LOGIN-----------------------');
                    console.log('!! ERROR : KHU BAD CONNECTION !!');
                    console.log('--------------------------------');
                }
                return err;
            })
            .then(function (result) {
                if (result.info) {
                    console.log('----LOGIN--------------------------------------');
                    console.log('@@ LOGIN SUCCESS @@');
                    console.log('\tUSER NAME : ' + result.info.name);
                    console.log('\tUSER ID : ' + result.info.class_number);
                    console.log('\tUSER DEPARTMENT : ' + result.info.department);
                    console.log('-----------------------------------------------');
                }
                else if (result == 'REST') {
                    console.log('----LOGIN--------------------------------------------------------');
                    console.log('!! ERROR : USER IS IN REST (id : ' + id + ' / pw : ' + pw + ') !!');
                    console.log('-----------------------------------------------------------------');
                }
                else if (result == 'INCORRECT') {
                    console.log('----LOGIN-----------------------------------------------------------------------');
                    console.log('!! ERROR : USER INFORMATION IS NOT CORRECT (id : ' + id + ' / pw : ' + pw + ') !!');
                    console.log('--------------------------------------------------------------------------------');
                }
                return result;
            })
    },

    // 학번으로 유저 정보 검색
    'findUserByUsername': function (id) {
        return Accounts.findUserByUsername(id);
    },

    // 유저 로그인 체크
    'checkUserLogin': function () {
        return Meteor.user();
    },

    'addNotification': function (noti) {

        var counter = 0;
        noti.noti_to_user_id_list.forEach(function (userId, index) {
            counter += 1;
            Meteor.users.update(
                {_id: userId},
                {
                    $addToSet: {
                        "profile.notifications": {
                            noti_post_id: noti.noti_post_id,
                            noti_from_user_id: noti.noti_from_user_id,
                            noti_from_user_nickname: noti.noti_from_user_nickname,
                            noti_type: noti.noti_type,
                            noti_content: noti.noti_content,
                            noti_url: noti.noti_url,
                            noti_lecture_code : noti.lecture_code,
                            noti_lecture_color : noti.lecture_color,
                            noti_created_at: new Date()
                        }
                    }
                });

            if (counter === noti.noti_to_user_id_list.length) {
                return true;
            }
        });
    },

    'deleteNotification' : function(noti){
        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $pull: {
                    "profile.notifications":{
                        noti_post_id : noti.noti_post_id,
                        noti_created_at: noti.noti_created_at
                    }
                }
            }
        )
    }

});

