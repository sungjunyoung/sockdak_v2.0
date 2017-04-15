/**
 * Created by Junyoung on 2016. 12. 27..
 */
import {Chats} from '../imports/collections/chats'
import {Meteor, Accounts} from 'meteor/meteor';


Meteor.methods({

    'chatAdd': function (chat) {
        var user = Meteor.users.findOne({_id: this.userId});
        Chats.insert({
            chat_lecture_name: chat.chat_lecture_name,
            chat_lecture_code: chat.chat_lecture_code,
            chat_content: chat.chat_content,

            chat_user_id: this.userId,
            chat_user_nickname: user.profile.nickname,
            chat_created_at: new Date()
        })
    },


});
