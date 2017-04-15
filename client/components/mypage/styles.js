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
    userInfo: {
        width: '100%',
        left: -8,
        position: 'absolute',
        top: 50,
        backgroundColor: '#ffffff',
        height: 170
    },

    userImageWrapper: {},
    userImage: {
        width: 80,
        height: 80,
        position: 'absolute',
        margin: '0 auto',
        left: 0, right: 0, top: 20, bottom: 0
    },
    userNickname: {
        position: 'absolute',
        margin: '0 auto',
        textAlign: 'center',
        left: 0, right: 0, top: 110, bottom: 0,
        fontSize: 18,
        color: '#515151'
    },
    changeNickname: {
        position: 'absolute',
        margin: '0 auto',
        textAlign: 'center',
        left: 0, right: 0, top: 135, bottom: 0,
    },
    changeNicknameButton: {
        fontSize: 10,
        backgroundColor: '#8c8c8c',
        color: '#ffffff',
        padding: '5px 10px 5px 10px',
        borderRadius: '10px'
    },
    userWroteCounter: {
        width: '100%',
        left: 0,
        position: 'absolute',
        top: 170,
        backgroundColor: '#b7b7b7',
        height: 70
    },
    postCounter: {
        float:'left',
        width: '50%',
        height: '100%',
        borderRight: '1px solid #ffffff'
    },
    commentedPostCounter: {
        float:'left',
        width: '49%',
        height: '100%',
    },
    CounterNum: {
        textAlign: 'center',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 10
    },
    CounterInfo: {
        textAlign: 'center',
        fontSize: 11,
        color: '#606060',
        marginTop: 2
    },

    userSettings: {
        position: 'absolute',
        width: '100%',
        top: 300
    }
};

export default styles;