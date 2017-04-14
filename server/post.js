/**
 * Created by Junyoung on 2016. 12. 27..
 */
import {Posts} from '../imports/collections/posts'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({

    'postAdd' : function(post){
        var user = Meteor.users.findOne({_id: this.userId});
        Posts.insert({
            post_lecture_color: post.post_lecture_color,
            post_lecture_name: post.post_lecture_name,
            post_lecture_code: post.post_lecture_code,
            post_user_id : this.userId,
            post_user_nickname : user.profile.nickname,
            post_title: post.post_title,
            post_content: post.post_content,
            post_created_at : new Date(),
        })
    }

});
