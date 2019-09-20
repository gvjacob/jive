import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait } from '@testing-library/react';

import asPage from '.';

describe('asPage', () => {
  let $component;
  let text;
  let docTitle;
  let routerHistory;

  beforeEach(() => {
    $component = asPage(({ text, setDocumentTitle, history }) => {
      useEffect(() => {
        setDocumentTitle(docTitle);
        routerHistory = history;
      }, []);

      return <div data-testid={'$component'}>{text}</div>;
    }, '/otherPage');

    text = 'hello';
    docTitle = 'world';
  });

  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <$component text={text} />
      </BrowserRouter>,
    );

    expect(getByTestId('$component')).toBeInTheDocument();
  });

  it('renders wrapped component with props', () => {
    const { getByText } = render(
      <BrowserRouter>
        <$component text={text} />
      </BrowserRouter>,
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it('sets document title and resets after unmounted', () => {
    expect(document.title).toBe('Chef');

    const { unmount } = render(
      <BrowserRouter>
        <$component text={text} />
      </BrowserRouter>,
    );

    expect(document.title).toBe(`Chef | ${docTitle}`);

    unmount();
    expect(document.title).toBe('Chef');
  });

  it('redirects to if user is not logged in', () => {
    render(
      <BrowserRouter>
        <$component text={text} />
      </BrowserRouter>,
    );

    expect(routerHistory.location.pathname).toBe('/otherPage');
  });

  it('redirects to if user is not logged in', () => {
    render(
      <BrowserRouter>
        <$component text={text} />
      </BrowserRouter>,
    );

    expect(routerHistory.location.pathname).toBe('/otherPage');
  });
});
