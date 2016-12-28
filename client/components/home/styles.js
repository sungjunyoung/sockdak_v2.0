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
    searchButton: {
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
        marginTop: '-10px',
        backgroundColor: 'lightgray'
    },
    myPageButton:{
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
    }
};

export default styles;