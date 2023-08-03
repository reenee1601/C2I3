import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SoaPage from '../../src/pages/soaPage/SoaPage';

describe('Statement of Account Page', () => {

    // TEST1
    test('renders the table with correct rows and columns', () => {
        render(
            <MemoryRouter>
              <SoaPage />
            </MemoryRouter>
        );
      
        // Check if the table is rendered
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
      
        // Check if the table headers are rendered
        const soaIdHeader = screen.getByText('SOA ID');
        const supplierHeader = screen.getByText('Supplier');
        const dueDateHeader = screen.getByText('Due Date');
        const amountHeader = screen.getByText('Amount');
      
        expect(soaIdHeader).toBeInTheDocument();
        expect(supplierHeader).toBeInTheDocument();
        expect(dueDateHeader).toBeInTheDocument();
        expect(amountHeader).toBeInTheDocument();
      });

    // TEST 2
    // sort SOA ID 
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
      });

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