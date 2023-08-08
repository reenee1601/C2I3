import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import UploadPage from '../../src/pages/uploadPage/UploadPage'; 

describe('UploadPage', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    );
  });

  it('displays error message when no image is uploaded', async () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    );

    const timeout = 3000;

    await waitFor(
      () => {

        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(screen.getByText('No image uploaded')).toBeInTheDocument();
      },
      {
          timeout,
      }
    );
  // });

  it('uploads an image and displays its name', async () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    );

    const inputFile = screen.getByTestId('file-input');

    const sampleImage = new File(['sample'], 'sample.png', { type: 'image/png' });
    fireEvent.change(inputFile, { target: { files: [sampleImage] } });

    expect(screen.getByText('sample.png')).toBeInTheDocument();
  });

  it('resets image and filename when cancel button is clicked', async () => {
    render(
      <MemoryRouter>
        <UploadPage />
      </MemoryRouter>
    );

    const inputFile = screen.getByTestId('file-input');
    const cancelButton = screen.getByTestId('cancel-button');

    const sampleImage = new File(['sample'], 'sample.png', { type: 'image/png' });
    fireEvent.change(inputFile, { target: { files: [sampleImage] } });

    await waitFor(() => {
      expect(screen.getByText('sample.png')).toBeInTheDocument();
    });

    fireEvent.click(cancelButton);

    expect(screen.getByText('No File Selected')).toBeInTheDocument();
  });

});
