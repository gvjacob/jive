import React, { useEffect, useContext } from 'react';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.css';

/**
 * Higher order component for initializing pages with fade in and initial scroll,
 * providing API for setting document title, and automatic redirects
 * when user is not logged in.
 *
 * asPage will revert document title when component is unmounted.
 *
 * @param {*} $component component to render
 * @param {*} redirect if user is not logged in, redirect to?
 */
const asPage = ($component) =>
  withRouter((props) => {
    const documentTitle = 'Jive';

    useEffect(() => {
      return resetTitle;
    }, []);

    const setDocumentTitle = (title) => {
      if (!title) {
        resetTitle();
      } else {
        document.title = `${documentTitle} | ${title}`;
      }
    };

    const resetTitle = () => (document.title = documentTitle);

    return (
      <$component
        className={cn(props.className, styles.page)}
        setDocumentTitle={setDocumentTitle}
        {...props}
      />
    );
  });

export default asPage;
