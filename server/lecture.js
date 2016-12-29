/**
 * Created by Junyoung on 2016. 12. 27..
 */
import {Lectures} from '../imports/collections/lectures'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({

    // 신규 로그인시 강좌 를 검색하고, 강좌가 있으면 lecture_users 에 해당 유저 추가 / 없으면 강좌 추가
    'lectureUpdate': function (lectures) {


        lectures.forEach(function (value, index, arr) {

            var user_id = Meteor.userId();

            Meteor.setTimeout(
                function () {
                    if (Lectures.find({lecture_code: value.lecture_code}).count() > 0) {
                        console.log('exist');
                        Lectures.update(
                            {lecture_code: value.lecture_code},
                            {
                                $addToSet: {
                                    lecture_users: {user_id: user_id}
                                }
                            })
                    } else {
                        console.log('not exist');
                        Lectures.insert({
                            lecture_name: value.lecture_name,
                            lecture_code: value.lecture_code,
                            lecture_professor: value.professor,
                            lecture_users: [{user_id: user_id}],
                            lecture_created_at: new Date()
                        })
                    }
                }, 100)

        });
    }


});
