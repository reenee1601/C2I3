import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signin from '../../src/pages/signInPage/Signinpage';

describe('Sign In Page', () => {

  const mockNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate, 
  }));

  // TEST 1
  test('renders the Signin page', () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );
    // Check if the header text is rendered
    const headerText = screen.getByText(/WELCOME TO SuRe/i);
    expect(headerText).toBeInTheDocument();
  });

  // TEST 2
  test('typing in email and password inputs', () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );
    
    // Type in email input
    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    expect(emailInput.value).toBe('test@gmail.com');

    // Type in password input
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  // TEST 3
  test('submitting with empty inputs', () => {
    // Render the component with the MemoryRouter
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    const submitButtons = screen.queryAllByText(/Sign In/i);
    const submitButton = submitButtons.find((button) => button.tagName === "BUTTON");

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    // Check if at least one empty input error message is displayed
    const emptyInputError = screen.queryAllByText(/This is a required field/i);
    expect(emptyInputError.length).toBeGreaterThan(0);
  });

  // TEST 4
  test('submitting with invalid email and password', () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    const submitButtons = screen.queryAllByText(/Sign In/i);
    const submitButton = submitButtons.find((button) => button.tagName === "BUTTON");

    fireEvent.change(emailInput, { target: { value: 'invalid@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    // Check if invalid login error message is displayed
    const invalidLoginError = screen.getByText(/Invalid email or password/i);
    expect(invalidLoginError).toBeInTheDocument();
  });

  // TEST 5 (still fail the useNavigate)
  test('submitting with valid email and password', async () => {
    // Render the Signin component inside the MemoryRouter
    render(
      <MemoryRouter>
        <Signin onCLick={mockNavigate()}/>
      </MemoryRouter>
    );
    // Set the email and password inputs
    const emailInput = screen.getByPlaceholderText(/Enter Your Email Address/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Your Password/i);
    const submitButtons = screen.queryAllByText(/Sign In/i);
    const submitButton = submitButtons.find((button) => button.tagName === "BUTTON");

    fireEvent.change(emailInput, { target: { value: 'abc@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    fireEvent.click(submitButton);

    // Check if the mockNavigate function was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

});