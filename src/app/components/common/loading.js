import React from 'react';

import './loading.css';


export default () => (
  <div className='loading'>
    <p className='loading__title'>We are working hard to load content for you.</p>
    <img className='loading__progress-animation' src='https://i.imgur.com/k9GyXLC.gif'/>
  </div>
);
