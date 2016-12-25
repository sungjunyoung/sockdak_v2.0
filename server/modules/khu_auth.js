/**
 * Created by Junyoung on 2016. 12. 25..
 */
var request = require('request');
var Promise = require('promise');
import cheerio from 'cheerio';

var khuAuth = (function () {

    // 유저 로그인
    var login = function (id, pw) {

        var j = request.jar();
        request = request.defaults({jar: j});

        return new Promise(function (resolve, reject) {
            request({
                url: "http://klas.khu.ac.kr/user/loginUser.do",
                method: "POST",
                form: {USER_ID: id, PASSWORD: pw}
            }, function (err, res, body) {
                if (err) {
                    console.log('Error Occured While Login');
                    reject('ERROR');
                } else {
                    console.log('Login Success');
                    resolve(body);
                }
            })
        });
    };

    // 유저 정보 받아오기
    var getUserInfo = function (body) {

        var result = {};

        return new Promise(function (resolve, reject) {
            request({
                url: "http://klas.khu.ac.kr/main/viewPopUserConfig.do",
                method: "GET"
            }, function (err, res, body) {
                if(err){
                    console.log('Error Occured While getUserInfo');
                    reject('ERROR');
                } else {
                    var $ = cheerio.load(body);
                    result.info = {};
                    var count = 0;
                    $('td').each(function () {
                        if (count == 2) {
                            result.info.department = $(this).text();
                        } else if (count == 4) {
                            var name_class_num_arr = $(this).text().split("(");
                            var my_name = name_class_num_arr[0];
                            var class_num = name_class_num_arr[1].substring(0, 10);
                            result.info.name = name_class_num_arr[0];
                            result.info.class_number = class_num;
                        }

                        count++;
                    });

                    console.log('getUserInfo Success');
                    resolve(result);
                }
            })
        })
    };
    
    var getUserLecture = function (result) {
        return new Promise(function (resolve, reject) {
            request({
                url: "http://klas.khu.ac.kr/classroom/viewClassroomCourseMoreList.do?courseType=ing",
                method: "GET"
            }, function (err, res, body) {
                if(err){
                    reject('ERROR');
                } else {
                    var $ = cheerio.load(body);

                    result.lectures = [];

                    var count = 0;
                    $('tr').each(function () {
                        if (count !== 0) {

                            var lecture_name_arr = $(this).children().eq(1).text().split("[");
                            var lecture_name = lecture_name_arr[0];
                            var lecture_code = lecture_name_arr[1];
                            if (lecture_code !== undefined) {
                                lecture_code = lecture_code.split("]")[0];
                            }

                            result.lectures.push({
                                lecture_name: lecture_name,
                                lecture_code: lecture_code,
                                professor: $(this).children().eq(3).text()
                            });
                        }
                        count++;
                    });

                    if (result.info.class_number == ')') {
                        result.result = "incorrect";
                        reject("INCORRECT");
                    } else if (result.lectures[0].lecture_name == '') {
                        result.result = "rest";
                        reject("REST");
                    } else {
                        result.result = "success";
                        resolve(result);
                    }


                }

            })
        })
    };

    return {
        login: login,
        getUserInfo: getUserInfo,
        getUserLecture:getUserLecture
    }
}());

export default khuAuth;