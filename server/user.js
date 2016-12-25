/**
 * Created by Junyoung on 2016. 12. 25..
 */
import {Meteor, Accounts} from 'meteor/meteor';


import khuAuth from './modules/khu_auth'

Meteor.methods({

    // 경희대학교 종정시에 로그인
    'loginToKhu': function(id, pw){
        return khuAuth.login(id,pw)
            .catch(function(err){
                console.log(err);
                return err;
            })
            .then(khuAuth.getUserInfo)
            .catch(function(err){
                console.log(err);
                return err;
            })
            .then(khuAuth.getUserLecture)
            .catch(function(err){
                console.log(err);
                return err;
            })
            .then(function(result){
                console.log(result);
                return result;
            })
    }

});


Meteor.startup(() => {


});