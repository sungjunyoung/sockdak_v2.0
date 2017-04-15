/**
 * Created by Junyoung on 2016. 12. 27..
 */

// base import
import {Meteor} from 'meteor/meteor';

// module to subscribe import
import {Lectures} from '../imports/collections/lectures'
import {Posts} from '../imports/collections/posts'
import {Comments} from '../imports/collections/comments'

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
        return Lectures.find({$or: [{lecture_name: {$regex: toFind}}, {lecture_professor: {$regex: toFind}}]});
    });


    //강좌
    // 강좌 코드로 강좌를 찾음
    Meteor.publish('findLectureByCode', function (lectureCode) {
        return Lectures.find({lecture_code: lectureCode});
    });

    //게시물
    // 강좌 코드로 게시물들을 찾음
    Meteor.publish('findPostsByLectureCode', function (lectureCode) {
        return Posts.find({post_lecture_code: lectureCode});
    });
    // 게시물 아이디로 게시물을 찾음
    Meteor.publish('findPostById', function (postId) {
        return Posts.find({_id: postId});
    });

    //댓글
    // 게시물 아이디로 댓글을 찾음
    Meteor.publish('findCommentsByPostId', function (postId) {
        return Comments.find({comment_post_id: postId});
    });
    // 강좌 코드로 댓글을 찾음
    Meteor.publish('findCommentsByLectureCode', function(lectureCode){
        return Comments.find({comment_lecture_code: lectureCode});
    })

});