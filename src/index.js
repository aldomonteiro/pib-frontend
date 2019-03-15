import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<React.Fragment>
    <App />

</React.Fragment>, document.getElementById('root'));
registerServiceWorker();
