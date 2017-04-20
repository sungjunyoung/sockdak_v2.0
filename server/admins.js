/**
 * Created by junyoung on 2017. 4. 20..
 */
import {Admins} from '../imports/collections/admins'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({
    //
    // 'chatAdd': function (chat) {
    //     var user = Meteor.users.findOne({_id: this.userId});
    //     Chats.insert({
    //         chat_lecture_name: chat.chat_lecture_name,
    //         chat_lecture_code: chat.chat_lecture_code,
    //         chat_content: chat.chat_content,
    //
    //         chat_user_id: this.userId,
    //         chat_user_nickname: user.profile.nickname,
    //         chat_created_at: new Date()
    //     })
    // },

    'isAdmin': function(userId){
        return !!Admins.find({admin_id: userId});
    }

});


