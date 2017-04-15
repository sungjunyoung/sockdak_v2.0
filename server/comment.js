/**
 * Created by junyoung on 2017. 4. 15..
 */
import {Comments} from '../imports/collections/comments'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({

    'commentAdd' : function(comment){
        var user = Meteor.users.findOne({_id: this.userId});
        Comments.insert({
            // post_lecture_color: post.post_lecture_color,
            comment_post_id: comment.comment_post_id,
            comment_nickname: comment.comment_nickname,
            comment_user_id : this.userId,
            comment_content : comment.comment_content,
            comment_created_at : new Date(),
        })
    }

});
