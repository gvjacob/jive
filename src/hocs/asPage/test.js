import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import asPage from '.';

describe('asPage', () => {
  let $component;
  let text;
  let docTitle;

  beforeEach(() => {
    $component = asPage(({ text, setDocumentTitle, history }) => {
      useEffect(() => {
        setDocumentTitle(docTitle);
      }, []);

      return <div data-testid={'$component'}>{text}</div>;
    });

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
    expect(document.title).toBe('Jive');

    const { unmount } = render(
      <BrowserRouter>
        <$component text={text} />
      </BrowserRouter>,
    );

    expect(document.title).toBe(`Jive | ${docTitle}`);

    unmount();
    expect(document.title).toBe('Jive');
  });
});
