import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductPage from '../../src/pages/ProductPage/ProductPage';
import { Swiper, SwiperSlide } from './swiperMock'; 

describe('Product Page', () => {
    
    // Mock Swiper components
    jest.mock('swiper/react', () => ({
        Swiper,
        SwiperSlide,
      }));

    // TEST1:render card
    test('renders product cards', () => {
        render(
            <MemoryRouter>
              <ProductPage />
            </MemoryRouter>
          );
    
        // Check if product cards are rendered
        const productCards = screen.queryAllByTestId('product-card'); // Adjust the test ID based on your implementation
        expect(productCards.length).toBeGreaterThan(0); // Ensure at least one card is rendered
      });

    // TEST2: render swiper

    // TEST3: add
    // TEST4: delete button

})