/**
 * Created by Junyoung on 2016. 12. 25..
 */

const styles = {

    floatingButton:{
        position:'absolute',
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
    postContent:{
        marginLeft: 15,
        marginBottom: 10,
        wordBreak: 'break-all',
        width: '100%',
        color:"gray"
    },
    createdAt:{
        marginBottom: 10,
        fontSize: 10,
        marginLeft: 10,
        color: "lightgray"
    },
    postItem: {
        backgroundColor: "#ffffff",
        marginBottom: 35
    },
    bookmarkButton:{
        position: 'absolute',
        right: 5,
        top: 5
    },
    postFooter:{
        backgroundColor: '#f1f2f1',
        position: 'absolute',
        height: 40,
        width: '100%',
        left : 0,
        marginTop: 5
    },
    userIcon: {
        position: 'absolute',
        top: 10,
        left: 20,
        height: 20
    },
    userNickname:{
        position: 'absolute',
        fontSize : 12,
        color: 'gray',
        top: 12,
        left: 45
    }

};

export default styles;