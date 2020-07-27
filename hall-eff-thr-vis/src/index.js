import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// render visualization app
render(<App/>, document.getElementById('app'));
