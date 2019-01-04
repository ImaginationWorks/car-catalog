import React from 'react';

import { Page } from './common';


export default () => (
  <Page
    id="not-found"
    title="Not Found"
    className='not-found-page'
    description="This is embarrassing."
    noCrawl
  >
    <p>OOPS!</p>
    <img src='https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/404-pages_featured@2x.png'/>
  </Page>
);
