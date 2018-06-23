import React from 'react'
import ReactDOM from 'react-dom';
import WDBControl from './components/WDBControl';
import WDBCookiesStorage from './components/storage/WDBCookiesStorage'
import {cities} from './cities'
import './index.css';
import './style/WDBControl.css';
import './style/WDBWidget.css';
import registerServiceWorker from './registerServiceWorker';

const WDBControlPersisted = WDBControl(cities, WDBCookiesStorage())

ReactDOM.render(<WDBControlPersisted />, document.getElementById('root'));
registerServiceWorker();
