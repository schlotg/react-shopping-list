import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.css';
import { App } from './components/app';

const title = "React Shopping List";
document.querySelector('title').textContent = title;
ReactDOM.render((
  <HashRouter>
    <App name={title}/>
  </HashRouter>
), document.getElementById('root'));
