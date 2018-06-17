import React from 'react';
import ReactDOM from 'react-dom';
import WDBControl from './components/WDBControl';
import './index.css';
import './style/WDBControl.css';
import './style/WDBWidget.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WDBControl />, document.getElementById('root'));
registerServiceWorker();
