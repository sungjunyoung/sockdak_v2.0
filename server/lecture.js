/**
 * Created by Junyoung on 2016. 12. 27..
 */
import {Lectures} from '../imports/collections/lectures'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({

    // 신규 로그인시 강좌 를 검색하고, 강좌가 있으면 lecture_users 에 해당 유저 추가 / 없으면 강좌 추가
    'lectureUpdate' : function(name, code, professor){
        var lecture = Lectures.findOne({lecture_code: code});
        if(lecture){
            for(var i in lecture.lecture_users){
                if(lecture.lecture_users[i] == Meteor.userId()){
                    return;
                }
            }

            return Lectures.update({lecture_code:code}, {
                $push: {lecture_users:{user_id: Meteor.userId()}}
            })
        } else {
            return Lectures.insert({
                lecture_name : name,
                lecture_code : code ,
                lecture_professor : professor,
                lecture_users : [{user_id : Meteor.userId()}],
                lecture_created_at : new Date()
            })
        }
    },


});
