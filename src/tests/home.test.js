import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import HomePage from '../../src/pages/homePage/HomePage';

describe('HomePage', () => {
  it('should render the profile picture and user information', () => {
    render(<HomePage />);

    // TEST 1: Profile Picture (hard-coded for now)
    const profilePicture = screen.getByAltText('ProfilePicture');
    expect(profilePicture).toBeInTheDocument();

    expect(screen.getByText(/Welcome,/i)).toBeInTheDocument();
    expect(screen.getByText(/Matthew Swee Jing Kai !/i)).toBeInTheDocument();
    expect(screen.getByText(/Textile Fabric Centre/i)).toBeInTheDocument();
  });

  // TEST 2: Companies (hard-coded for now)

  it('should render the list of companies involved', () => {
    render(<HomePage />);

    expect(screen.getByText(/Companies Involved:/i)).toBeInTheDocument();

    const slideInfo = [
      { company: "OATSIDE", name: "Tan Min Yi", contact: "+65 9876 5432", address: "Blk 123 Ang Mo Kio Ave 2 #12-34 S(567890)" },
      { company: "MUJI", name: "Renee Ki Meiee", contact: "+65 8667 5643", address: "Blk 12 Seng Kang Street #01-39 S(125640)" },
      { company: "COTTON ON", name: "Swee Heng Sean", contact: "+65 9007 2345", address: "12 Toa Payoh Road #03-67 S(987654)" },
      { company: "POPULAR", name: "Rebecca Chan", contact: "+65 8456 3401", address: "blk 67 Paya Lebar SingPost" }
    ];

    for (const company of slideInfo) {
      expect(screen.getByText(new RegExp(company.company, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp('Name: ' + company.name, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp('Contact: ' + company.contact, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp('Address: ' + company.address, 'i'))).toBeInTheDocument();
    }
  });
});