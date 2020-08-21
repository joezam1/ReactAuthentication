import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './src/App.js';

ReactDOM.render(
    <React.StrictMode>
          <BrowserRouter>
          <App/>
          </BrowserRouter>
    </React.StrictMode> 

, document.getElementById('root'));