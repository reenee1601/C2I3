import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Testing Component --> Register Page
import RegisterPage from '../../src/pages/registerPage/RegisterPage';

describe('RegisterPage', () => {

    // TEST 1: Header + Input 
  it('should render the header and input fields', () => {
    render(<RegisterPage />);

    expect(screen.getByText(/Welcome to -SuRe!/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Enter Your Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Your Company/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Your Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Your Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Your Password/i)).toBeInTheDocument();
  });

  // TEST 2: Form Fields Update

  it('should update the form fields when input values change', () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Full Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Company/i), {
      target: { value: 'SUTD' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email Address/i), {
      target: { value: 'john.doe@mymail.sutd.edu.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Password/i), {
      target: { value: 'johnjohn' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Your Password/i), {
      target: { value: 'johnjohn' },
    });

    expect(screen.getByPlaceholderText(/Enter Your Full Name/i)).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText(/Enter Your Company/i)).toHaveValue('SUTD');
    expect(screen.getByPlaceholderText(/Enter Your Email Address/i)).toHaveValue('john.doe@mymail.sutd.edu.com');
    expect(screen.getByPlaceholderText(/Enter Your Password/i)).toHaveValue('johnjohn');
    expect(screen.getByPlaceholderText(/Confirm Your Password/i)).toHaveValue('johnjohn');
  });

  // TEST 3: Navigation Route

  it('should navigate to the homepage after successful form submission', async () => {

    // Mock the useNavigate function
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Your Full Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Company/i), {
      target: { value: 'SUTD' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Email Address/i), {
      target: { value: 'john.doe@mymail.sutd.edu.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Your Password/i), {
      target: { value: 'johnjohn' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Your Password/i), {
      target: { value: 'johnjohn' },
    });

    fireEvent.click(screen.getByText(/Create Account/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/homepage');
    });
  });
});