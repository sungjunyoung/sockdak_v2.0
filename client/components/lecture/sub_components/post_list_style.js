/**
 * Created by Junyoung on 2016. 12. 25..
 */

const styles = {

    floatingButton: {
        position: 'fixed',
        zIndex: 999,
        bottom: 10,
        right: 10
    },
    postTitle: {
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    postContent: {
        marginLeft: '3%',
        marginRight: '3%',
        marginBottom: 10,
        wordBreak: 'break-word',
        // width: '94%',
        color: "gray"
    },
    createdAt: {
        marginBottom: 10,
        fontSize: 10,
        marginLeft: 10,
        color: "lightgray"
    },
    postItem: {
        borderRadius: 10,
        backgroundColor: "#ffffff",
        marginBottom: 45
    },
    bookmarkButton: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    postFooter: {
        backgroundColor: '#f1f2f1',
        position: 'absolute',
        height: 40,
        width: '100%',
        left: 0,
        marginTop: 5,
        borderRadius: "0 0 10px 10px"
    },
    userIcon: {
        position: 'absolute',
        top: 10,
        left: 20,
        height: 20
    },
    userNickname: {
        position: 'absolute',
        fontSize: 12,
        color: 'gray',
        top: 12,
        left: 45
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
        marginTop: 10,
        float: 'left',
        zIndex: 999
    },
    likeText: {
        fontSize: 14,
        marginTop: 15,
        marginLeft: 32,
        color: '#969696'
    },
    commentIcon: {
        marginTop: 10,
        float: 'left',
    },
    commentText: {
        fontSize: 14,
        marginTop: 14,
        marginLeft: 32,
        color: '#969696'
    },
    commentInfo: {
        float: 'left',
        width: '50%',
        height: '100%',
    },
    not_exist: {
        paddingTop: '30%',
        textAlign: 'center'
    },
    not_exist_desc_1: {
        marginTop: '-20px',
        fontSize: '16px',
        fontWeight:'bold',
        color: '#848484',
        paddingBottom: '5px'
    },
    not_exist_desc_2: {
        color: 'darkgray',
        fontSize: '13px'
    },
};

export default styles;
