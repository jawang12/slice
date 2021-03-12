import React from 'react';
import Layout from './src/components/Layout';

// everytime gatsby renders out a page, it will be wrapped in something
// element represents the page element and props are props passed to the page element
export const wrapPageElement = ({ element, props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Layout {...props}>{element}</Layout>
);
