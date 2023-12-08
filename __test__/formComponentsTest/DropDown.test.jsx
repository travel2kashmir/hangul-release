import {render, screen ,within,fireEvent} from '@testing-library/react'
import DropDown from '../../components/utils/DropDown';
import '@testing-library/jest-dom'

let testFunction= jest.fn();
describe('Check if Input Text Box Component loads correctly', () => {
beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
        value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    })}  )
 
// Testing Parent Div
test('Does Parent div exist',()=>{
    const  content  = render(<DropDown
   
    label={`test case1`}
    req={true}
    defaultValue={'welcome'}
    onChangeAction={testFunction}
    error={`random error test`}
    visible={1}
    toolTip={`test case1`}
  />)
  
  expect(screen.getByTestId('main')).toBeInTheDocument(); 
  
      })

// Testing Label
      test('Checking The Label',()=>{
        const  content  = render(<DropDown
       
        label={`test case1`}
        req={true}
        defaultValue={'welcome'}
        onChangeAction={testFunction}
        error={`random error test`}
        visible={1}
         toolTip={`test case2`}
/>)
  

expect(screen.getByText(/test case1/i)).toBeInTheDocument();
let firstdivone = screen.getByTestId('main');
let child0=within(firstdivone).getByTestId("child0")
expect(firstdivone).toContainElement(child0)
          })

// Testing Default value 
test('Checking the Initial Value',()=>{
const  content  = render(<DropDown

label={`test case1`}
req={true}
defaultValue={'welcome'}
onChangeAction={testFunction}
error={`random error test`}
visible={1}
toolTip={`test case1`}
/>)
          
let firstdivone = screen.getByTestId('main');
let input=within(firstdivone).getByTestId("input")
expect(firstdivone).toContainElement(input)
expect(input).toHaveValue('welcome');
})

// Testing  Required (*)
test('Does * exist',()=>{
 const  content  = render(<DropDown

 label={`test case1`}
 req={true}
 defaultValue={'welcome'}
 onChangeAction={testFunction}
 error={`random error test`}
 visible={1}

 toolTip={`test case1`}
/>)
expect(screen.getByText('*')).toBeInTheDocument(); 
})
// FireEvent
test('Does Fire event works',()=>{
 const  content  = render(<DropDown
 label={`test case1`}
 req={true}
 defaultValue={'welcome'}
 onChangeAction={testFunction}
 error={`random error test`}
 visible={1}

 toolTip={`test case1`}
/>)
const input=screen.getByTestId('input')
fireEvent.change(input, {target: {value: 'w'}})
expect(testFunction).toHaveBeenCalled();
})
// visible block 
test('Does visible exist',()=>{
  const  content  = render(<DropDown
 
  label={`test case1`}
  req={true}
  defaultValue={'welcome'}
  onChangeAction={testFunction}
  error={`random error test`}
  visible={0}
  toolTip={`test case1`}
 />)
 expect(screen.getByTestId('vis0')).toHaveClass('block'); 
 expect(screen.getByTestId('vis1')).toHaveClass('hidden');
 })

 // visible hidden 
test('Does visible exist',()=>{
  const  content  = render(<DropDown
  label={`test case1`}
  req={true}
  defaultValue={'welcome'}
  onChangeAction={testFunction}
  error={`random error test`}
  visible={1}
 
  toolTip={`test case1`}
 />)
 expect(screen.getByTestId('vis1')).toHaveClass('block'); 
 expect(screen.getByTestId('vis0')).toHaveClass('hidden');
 })
});
 

            
            