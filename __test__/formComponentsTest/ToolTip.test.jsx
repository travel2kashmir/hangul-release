import {render, screen ,within,fireEvent} from '@testing-library/react'
import Tooltip from '../../components/utils/Tooltip';
import Color from '../../components/colors/Color';
import '@testing-library/jest-dom';

let testFunction= jest.fn();
describe('Check if Tooltip Component loads correctly', () => {
// Testing Parent Div
test('Does Parent div exist',()=>{
    const  content  = render(<Tooltip
   message={'welcome'}
   children={'exist'}
   color={Color?.light}
  />)
  expect(screen.getByTestId('first')).toBeInTheDocument(); 
      })
// Testing Message
      test('Checking The Label',()=>{
    const  content  = render(<Tooltip
            message={'welcome'}
            children={'exist'}
            color={Color?.light}
      />)
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      let firstdivone = screen.getByTestId('first');
          let first1=within(firstdivone).getByTestId("first1")
              expect(firstdivone).toContainElement(first1)
          })
          // Testing Children
      test('Checking The Label',()=>{
        const  content=render(<Tooltip
            message={'welcome'}
            children={'exist'}
            color={Color?.light}
      />)
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
      let firstdivone = screen.getByTestId('first');
          let first1=within(firstdivone).getByTestId("first1")
              expect(firstdivone).toContainElement(first1)
          })
            //Testing Light Color
      test('Checking The LIght Color',()=>{
        const  content  = render(<Tooltip
            message={'welcome'}
            children={'exist'}
            color={Color?.light}
      />)
      let firstdivone = screen.getByTestId('first');
      let first1=within(firstdivone).getByTestId("first1")
      expect(firstdivone).toContainElement(first1)
      expect(first1).toHaveClass(`absolute h-8 w-max bottom-2 left-5 scale-0 transition-all rounded text-gray-700 
      bg-gray-50 p-2 text-xs  group-hover:scale-100`);
      })
        // Testing Dark Color
          test('Checking The Dark Color',()=>{
            const  content  = render(<Tooltip
                message={'welcome'}
                children={'exist'}
                color={Color?.dark}
            />)
            let firstdivone = screen.getByTestId('first');
            let first1=within(firstdivone).getByTestId("first1")
            expect(firstdivone).toContainElement(first1)
            expect(first1).toHaveClass(`absolute h-8 w-max bottom-2 left-5 scale-0 transition-all rounded text-white 
            bg-gray-900 p-2 text-xs  group-hover:scale-100`);
            })
        })
        
        