import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import SigninPage from '../../src/pages/signInPage/Signinpage';
import EditDocumentPage from '../../src/pages/editDocumentPage/EditDocumentPageSOA';


const dummySOA= { 
    supplierID: '69',
    totalAmount: 'artstranesteia234238497',
    invoiceID: [777, 86],
    issuedDate: ['tomorrow', 2024],
    dueDate: ['yesterday', 'next week'],
    amount: [22, 33],
  }

describe('EditDocumentPageSOA renders dummy data correctly', () =>{

    it('should render properly given the dummy data', () => {

    render(
    <MemoryRouter initialEntries={[{ url:'hi', state:dummySOA }]} >
      <EditDocumentPage />
    </MemoryRouter>

	    , {state: dummySOA, url:'dummyurl'});
    expect(true).toBe(true);
  const supplierIdInputLabel = screen.getByText('SUPPLIER ID:');
  const supplierIdInput = supplierIdInputLabel.nextElementSibling;
  expect(supplierIdInput.value).toEqual('69');
  const secondCellInFirstRow = screen.getByRole('cell', { name: /tomorrow/i });
  expect(secondCellInFirstRow).toBeInTheDocument();
  console.log(screen.getByRole('cell', { row: 0, column: 1 }))

    });
});





/*
describe('SigninPage', () => {

    // TEST 1: Header + inputs
  it('should render the header and input fields', () => {
    render(<MemoryRouter>
	    <SigninPage />
    	   </MemoryRouter>);
    expect(screen.getByText(/Welcome to -SuRe!/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Enter your Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Your Password/i)).toBeInTheDocument();
  });

  // TEST 2: UPdating of input fields
  it('should update the input fields when values are entered', () => {
    render(<MemoryRouter>
	    <SigninPage />
    	   </MemoryRouter>);

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

    render(<MemoryRouter>
	    <SigninPage onSignIn={mockSignIn} />
	   </MemoryRouter>);

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

});*/
