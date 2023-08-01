import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SigninPage from '../../src/pages/signInPage/Signinpage';

describe('SigninPage', () => {

    // TEST 1: Header + inputs
  it('should render the header and input fields', () => {
    render(<SigninPage />);
    expect(screen.getByText(/Welcome to -SuRe!/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Enter your Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Your Password/i)).toBeInTheDocument();
  });

  // TEST 2: UPdating of input fields
  it('should update the input fields when values are entered', () => {
    render(<SigninPage />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your Email Address/i), {
      target: { value: 'john.doe@mymail.sutd.edu.sg' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Password/i), {
      target: { value: 'johnjohn' },
    });

    expect(screen.getByPlaceholderText(/Enter your Email Address/i)).toHaveValue('john.doe@mymail.sutd.edu.sg');
    expect(screen.getByPlaceholderText(/Enter Your Password/i)).toHaveValue('johnjohn');
  });

  // TEST 3: SignIn function called
  it('should call the "Sign In" function when the button is clicked', () => {

    const mockSignIn = jest.fn();

    render(<SigninPage onSignIn={mockSignIn} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your Email Address/i), {
      target: { value: 'john.doe@mymail.sutd.edu.sg' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Password/i), {
      target: { value: 'johnjohn' },
    });

    fireEvent.click(screen.getByText(/Sign In/i));

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'john.doe@example.com',
      password: 'johnjohn',
    });
  });

});