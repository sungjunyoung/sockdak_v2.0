/**
 * Created by Junyoung on 2016. 12. 27..
 */

// base import
import {Meteor} from 'meteor/meteor';

// module to subscribe import
import {Lectures} from '../imports/collections/lectures'

Meteor.startup(() => {

    WebApp.connectHandlers.use(function (req, res, next) {
        res.setHeader('access-control-allow-origin', '*');
        return next();
    });

    // 유저의 강좌 리스트를 발행
    Meteor.publish('userLectures', function () {
        return ReactiveAggregate(this, Lectures, [
            {$match: {"lecture_users.user_id": this.userId}},
            {$sort: {"lecture_name": 1}}
        ]);

        // return Lectures.find({});
    });






    // 강좌 검색시 일치하는 강좌 리스트를 발행행
    Meteor.publish('findLectures', function (toFind) {
        if (!toFind) {
            return undefined;
        }
        toFind = ".*" + toFind + ".*";
        return Lectures.find({$or: [{lecture_name: {$regex: toFind}}, {lecture_professor: {$regex: toFind}}]}, {sort: {lecture_name: 1}});
    });


    Meteor.publish('findLectureByCode', function(lectureCode){
        return Lectures.find({lecture_code: lectureCode});
    });
});