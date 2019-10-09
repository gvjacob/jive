import React from 'react';
import { render } from '@testing-library/react';

import Disconnected from '.';

describe('Disconnected', () => {
  it('renders', () => {
    const { getByTestId } = render(<Disconnected />);
    expect(getByTestId('Disconnected')).toBeInTheDocument();
  });
});
