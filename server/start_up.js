/**
 * Created by Junyoung on 2016. 12. 27..
 */

import {Meteor} from 'meteor/meteor';
import {Lectures} from '../imports/collections/lectures'

Meteor.startup(() => {

    Meteor.publish('userLectures', function () {
        return ReactiveAggregate(this, Lectures, [
            {$match: {"lecture_users.user_id": this.userId}},
            {$sort: {"lecture_name": 1}}
        ]);

        // return Lectures.find({});
    })

});