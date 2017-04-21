/**
 * Created by Junyoung on 2016. 12. 25..
 */

const styles = {

    container: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        paddingTop: 66,
        // backgroundColor: 'red'
    },
    bookmarkButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    subContainer: {
        position: 'absolute',
        paddingBottom: 55,
        backgroundColor: '#f7f7f'
    },
    postTitle: {
        margin: "30px 30px 5px 30px",
        wordBreak: 'break-word',
        fontWeight: 'bold'
    },
    postCreatedAt: {
        margin: "0 30px 20px 30px",
        color: "#bfc0c1",
        fontSize: '12px',
    },
    postContent: {
        margin: "0 30px 20px 30px",
        color: "#686a6b",
    },
    betweenBar: {
        width: '100%',
        height: 50,
        backgroundColor: '#f1f1f1'
    },
    userInfoWrapper: {
        float: 'left',
        width: '60%',
        height: '100%',
    },
    postUserIcon: {
        marginTop: 14,
        marginLeft: 15
    },
    userNickname: {
        float: 'left',
        width: 120,
        marginTop: 19,
        fontSize: 13,
        color: '#969696'
    },
    rightInfoWrapper: {
        float: 'left',
        width: '40%',
        height: '100%'
    },
    heartInfo: {
        float: 'left',
        width: '50%',
        height: '100%',
    },

    likeIcon: {
        marginTop: 14,
        float: 'left',
        zIndex: 999
    },
    likeText: {
        fontSize: 14,
        marginTop: 19,
        marginLeft: 32,
        color: '#969696'
    },
    commentIcon: {
        marginTop: 14,
        float: 'left',
    },
    commentText: {
        fontSize: 14,
        marginTop: 19,
        marginLeft: 32,
        color: '#969696'
    },
    commentInfo: {
        float: 'left',
        width: '50%',
        height: '100%',
    },
    commentUserInfoWrapper: {
        width: '100%'
    },
    commentUserIcon: {
        width: 30,
        float: 'left'
    },
    commentUserNickname: {
        paddingTop: 5,
        fontSize: 12,
        color: '#969696'
    },
    commentContent: {
        width: '100%',
        fontSize: 16,
        marginTop: 12,
        marginLeft: 8,
        wordBreak: 'break-word',
        color: '#686a6b'
    },
    commentCreatedAt:{
        position: 'absolute',
        top: 8,
        right: 10,
        fontSize: 10,
        marginTop: 10,
        color: '#edeaea'
    },

    commentInput: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        margin: "10px 2% 5px 2%"
    },
    commentInputButton: {
        position: 'fixed',
        right: '2%',
        bottom: 10
    },
    commentInputWrapper: {
        borderTop: '1px solid #e5e9ea',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#f7f7f7'
        // backgroundColor:'#131231'
    }
};

export default styles;