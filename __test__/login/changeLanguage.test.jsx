import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChangeLanguages from '../../components/Login/utils/ChangeLanguages';

describe('ChangeLanguages', () => {
    it('should update language state and call changelanguage with "en" when clicking on the English button', () => {
      const setLang = jest.fn();
      const { getByTestId } = render(<ChangeLanguages language="en" lang="en" setLang={setLang} />);
      const enButton = getByTestId('en-btn');
  
      fireEvent.click(enButton);
  
      expect(setLang).toHaveBeenCalledWith('en');
    });
  
    it('should update language state and call changelanguage with "fr" when clicking on the French button', () => {
      const setLang = jest.fn();
      const { getByTestId } = render(<ChangeLanguages language="en" lang="en" setLang={setLang} />);
      const frButton = getByTestId('fr-btn');
  
      fireEvent.click(frButton);
  
      expect(setLang).toHaveBeenCalledWith('fr');
    });
  
    it('should update language state and call changelanguage with "ar" when clicking on the Arabic button', () => {
      const setLang = jest.fn();
      const { getByTestId } = render(<ChangeLanguages language="en" lang="en" setLang={setLang} />);
      const arButton = getByTestId('ar-btn');
  
      fireEvent.click(arButton);
  
      expect(setLang).toHaveBeenCalledWith('ar');
    });
  
    it('should set the selected language in localStorage when clicking on a language button', () => {
        const setLang = jest.fn();
        const { getByTestId } = render(<ChangeLanguages language="en" lang="en" setLang={setLang} />);
        const frButton = getByTestId('fr-btn');
      
        Object.defineProperty(window, 'localStorage', {
          value: {
            setItem: jest.fn(),
            getItem: jest.fn().mockReturnValue('en'),
          },
          writable: true,
        });
      
        fireEvent.click(frButton);
      
        expect(localStorage.setItem).toHaveBeenCalledWith('Language', 'fr');
      });
      it('should navigate to the root route with the selected locale when clicking on a language button', () => {
        const setLang = jest.fn();
        const push = jest.fn();
        
        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
        useRouterMock.mockReturnValue({ push });
      
        const { getByTestId } = render(<ChangeLanguages language="en" lang="en" setLang={setLang} />);
        const arButton = getByTestId('ar-btn');
      
        fireEvent.click(arButton);
      
        expect(push).toHaveBeenCalledWith('/', '/', { locale: 'ar' });
      });
      
      
  });
