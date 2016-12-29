/**
 * Created by Junyoung on 2016. 12. 25..
 */

const styles = {

    container: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        paddingTop: 100,
        // backgroundColor: 'red'
    },
    loading: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20,
        zIndex:998
    },
    tab: {
        position: 'fixed',
        top: 63,
        left: 0,
        zIndex: 998,
        height: 30,
        padding: 5
    },
    bar: {
        position: 'fixed',
        top: 100,
        left: 0,
        height: 3,
        zIndex:999,
        backgroundColor: 'white'
    },
    postsTab: {
        position: 'absolute',
        top:0,
        left:0,
        float: 'left',
        height: 37,
        color: 'white'
    },
    chatsTab: {
        position: 'absolute',
        top:0,
        right: 0,
        height: 37,
        color: 'white'
    },
    subComponent: {
        marginLeft: -8,
        marginRight: -8
    }

};

export default styles;