import React from 'react';
import { render } from '@testing-library/react';

import Idle from '.';

describe('Idle', () => {
  it('renders', () => {
    const { getByTestId } = render(<Idle />);
    expect(getByTestId('Idle')).toBeInTheDocument();
  });
});
