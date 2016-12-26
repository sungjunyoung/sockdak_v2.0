/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React from 'react';
import Alert from 'react-s-alert';

const App = React.createClass({
    propTypes: {
        route: React.PropTypes.object,
        location: React.PropTypes.object
    },

    contextTypes: {
        router: React.PropTypes.object
    },

    render() {
        return (
            <div>
                {this.props.children}
                <Alert stack={{limit: 3}}/>
            </div>
        );
    }
});

export default App;


