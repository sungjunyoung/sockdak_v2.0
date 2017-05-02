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
    },
    myPageButton: {
        position: 'fixed',
        left: 10,
        top: 10,
        zIndex: 999
    },
    searchText: {
        marginTop: -10,
    },
    searchTextContainer: {
        position: 'fixed',
        width: '100%',
        left: 0,
        marginTop: '-2px',
        backgroundColor: 'lightgray'
    },
    searchButton: {
        position: 'fixed',
        right: 50,
        top: 10,
        zIndex: 999
    },
    notificationButton: {
        position: 'fixed',
        right: 10,
        top: 10,
        zIndex: 999
    },
    guestInfo:{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 'auto',
        padding: 10,
        backgroundColor: 'gray'
    },
    guestInfoText: {
        fontSize: 12,
        color: '#ffffff'
    }
};

export default styles;