import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Login from '.';

describe('Login', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(getByTestId('Login')).toBeInTheDocument();
  });
});
