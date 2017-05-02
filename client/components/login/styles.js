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
    formContainer:{
        position: 'absolute',
        width: '100%',
        height: 'auto'
    },
    subContainer: {
        padding: '10px 10px 0 10px'
    },
    infoText: {
        paddingLeft: '10px',
        marginTop: 10,
        color: '#666666',
        fontSize: 15
    },
    schoolSelectField: {
        width: '100%'
    },
    userIdField: {
        width: '100%',
        marginTop: -10
    },
    userPasswordField: {
        width: '100%',
        marginTop: -20
    },
    approveToggle: {
        marginTop: 20,
    },
    loginButton: {
        position: 'fixed',
        margin: '0 auto',
        right: 10,
        left: 10,
        bottom : 10,
        maxWidth: '500px',
        zIndex: 999
    },
    guestLoginButton:{
        position: 'fixed',
        margin: '0 auto',
        left: 10,
        right: 10,
        bottom : 55,
        maxWidth: '500px',
        zIndex: 999
    },
    loading: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20,
        zIndex:999
    }
};

export default styles;