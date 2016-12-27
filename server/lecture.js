/**
 * Created by Junyoung on 2016. 12. 27..
 */
import {Lectures} from '../imports/collections/lectures'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({

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
    }

});
