import React from 'react';
import { render } from '@testing-library/react';
import Banner from '../../components/ClassicTheme/Banner';
import'@testing-library/jest-dom';

describe('Banner Component', () => {
  it('should render with correct text content', () => {
    const language = {
      needhelpbooking: 'Need Help Booking?',
      bookingtitle: 'Our team is here to assist you with all your booking needs.'
    };
    const args = {
      phone: {
        contact_data: '+1 234 567 890'
      }
    };
    const visible = 1;

    const { getByText } = render(<Banner args={args} language={language} visible={visible} />);

    expect(getByText('Need Help Booking?')).toBeInTheDocument();
    expect(getByText('Our team is here to assist you with all your booking needs.')).toBeInTheDocument();
    expect(getByText('+1 234 567 890')).toBeInTheDocument();
  });

  it('should render LineLoader when visible is 0', () => {
    const language = {
      needhelpbooking: 'Need Help Booking?',
      bookingtitle: 'Our team is here to assist you with all your booking needs.'
    };
    const args = {
      phone: {
        contact_data: '+1 234 567 890'
      }
    };
    const visible = 0;

    const { getByTestId } = render(<Banner args={args} language={language} visible={visible} />);

    expect(getByTestId('line-loader')).toBeInTheDocument();
  });

  it('should not render LineLoader when visible is 1', () => {
    const language = {
      needhelpbooking: 'Need Help Booking?',
      bookingtitle: 'Our team is here to assist you with all your booking needs.'
    };
    const args = {
      phone: {
        contact_data: '+1 234 567 890'
      }
    };
    const visible = 1;

    const { queryByTestId } = render(<Banner args={args} language={language} visible={visible} />);

    expect(queryByTestId('line-loader')).toBeNull();
  });
});
