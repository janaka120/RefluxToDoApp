import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app/pages/App';

class TODORefluxApp extends Component {
    render() {
        return <App />;
    }
}

AppRegistry.registerComponent('TODORefluxApp', () => TODORefluxApp);
