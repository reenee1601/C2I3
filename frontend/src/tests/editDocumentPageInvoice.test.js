import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditDocumentPageInvoice from '../../src/pages/editDocumentPage/EditDocumentPageInvoice.jsx';

global.URL.createObjectURL = jest.fn(() => 'mocked-url');

const dummyInvoice = { 
  // this is a dummy invoice object to be passed on to the editDocumentPage
  // Delete this later and replace with a call to the endpoint to get the 
  // raw OCRed data

  invoiceID: 'the first invoiceeeee',
  issuedDate: 'yesterday',
  dueDate: 'tomorrow',
  supplierID: '69',
  totalBeforeGST: 'two dollars',
  totalAfterGST: 'a million dollars',
  GST: 'yes there is gst',
  productCode: [777, 86],
  quantity: [2, 44],
  amount: [22, 33],
  productName: ['hot dogs', 'buns'],
}

describe('Statement of Account Page', () => {

    // TEST1
    test('renders the table with correct rows and columns', () => {
        render(
          <MemoryRouter initialEntries={[{ url:'hi', state:dummyInvoice }]} >
            <EditDocumentPageInvoice />
          </MemoryRouter>);
        
      const invoiceIdLabel= screen.getByText('INVOICE ID:');
      const invoiceIdInput = invoiceIdLabel.nextElementSibling;
      expect(invoiceIdInput.value).toEqual('the first invoiceeeee');
      });

    // TEST 2
    // sort SOA ID 
  /*
    test('sorting works correctly', async () => {
        render(
          <MemoryRouter>
            <SoaPage />
          </MemoryRouter>
        );
      
        // Click the header to sort the table
        const soaIdHeader = screen.getByText('SOA ID');
        fireEvent.click(soaIdHeader);
      
        // Wait for the sorting to complete
        await waitFor(() => {
          // Check if the table is sorted correctly (descending order)
          const sortedRows = screen.getAllByRole('row', { name: /soa id/i });
          const sortedSoaIds = sortedRows.map((row) => row.textContent);
          const isSortedDescending = sortedSoaIds.every((soaId, index) => {
            if (index === 0) return true;
            return soaId <= sortedSoaIds[index - 1];
          });
          expect(isSortedDescending).toBeTruthy();
        });
      
        // Click the header again to sort in reverse order (ascending order)
        fireEvent.click(soaIdHeader);
      
        // Wait for the sorting to complete
        await waitFor(() => {
          // Check if the table is sorted in reverse order (ascending order)
          const reverseSortedRows = screen.getAllByRole('row', { name: /soa id/i });
          const reverseSortedSoaIds = reverseSortedRows.map((row) => row.textContent);
          const isSortedAscending = reverseSortedSoaIds.every((soaId, index) => {
            if (index === 0) return true;
            return soaId >= reverseSortedSoaIds[index - 1];
          });
          expect(isSortedAscending).toBeTruthy();
        });
      });*/

//       // TEST 3
//       test('export dropdown menu is displayed when the export button is clicked', () => {
//         render(
//             <MemoryRouter>
//               <SoaPage />
//             </MemoryRouter>
//         );
      
//         // Click the export button
//         // const exportButton = screen.getByText('button', { name: /export/i });
       
//         const exportButtons = screen.queryAllByText(/Sign In/i);
//         const exportButton = exportButtons.find((button) => button.tagName === "BUTTON");

//         fireEvent.click(exportButton);
      
//         // Check if the dropdown menu is displayed
//         const exportExcelOption = screen.getByText('Export Excel');
//         const exportCSVOption = screen.getByText('Export CSV');
//         const generateTaxReportOption = screen.getByText('Generate Tax Report');
      
//         expect(exportExcelOption).toBeInTheDocument();
//         expect(exportCSVOption).toBeInTheDocument();
//         expect(generateTaxReportOption).toBeInTheDocument();
//       });
});
