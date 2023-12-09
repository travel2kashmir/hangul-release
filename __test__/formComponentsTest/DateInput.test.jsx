import {fireEvent,render, screen ,within} from '@testing-library/react'
import DateInput from '../../components/utils/DateInput';
import Color from '../../components/colors/Color';
import '@testing-library/jest-dom'

let testFunction= jest.fn();
describe('Check if DateInput Component loads correctly', () => {
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
    const  content  = render(<DateInput
    color={Color?.light}
    label={`test case1`}
    req={true}
    initialValue={'2023-03-03'}
    onChangeAction={testFunction}
    error={`random error test`}
    visible={1}
    max={'2024-03-03'}
    toolTip={`test case1`}
  />)
  
  expect(screen.getByTestId('first')).toBeInTheDocument(); 
  console.log(screen.getByTestId('first'));
      })

// Testing Label
      test('Checking The Label',()=>{
        const  content  = render(<DateInput
        color={Color?.light}
        label={`test case1`}
        req={true}
        initialValue={'2023-03-03'}
        onChangeAction={testFunction}
        error={`random error test`}
        visible={1}
        max={'2024-03-03'}
        toolTip={`test case2`}
      />)
      expect(screen.getByText(/test case1/i)).toBeInTheDocument();
      let firstdivone = screen.getByTestId('first');
          let child0=within(firstdivone).getByTestId("child0")
              expect(firstdivone).toContainElement(child0)
          })

// Testing Initial value 
test('Checking the Initial Value',()=>{
const  content  = render(<DateInput
color={Color?.light}
label={`test case1`}
req={true}
initialValue={'2023-03-03'}
onChangeAction={testFunction}
error={`random error test`}
visible={1}
max={'2024-03-03'}
toolTip={`test case1`}
/>)
          
let firstdivone = screen.getByTestId('first');
let inputdate=within(firstdivone).getByTestId("inputdate")
expect(firstdivone).toContainElement(inputdate)
expect(inputdate).toHaveValue('2023-03-03');
})
// Testing Error 
test('Checking the Error',()=>{
const  content  = render(<DateInput
color={Color?.light}
label={`test case1`}
req={true}
initialValue={'2023-03-03'}
onChangeAction={testFunction}
error={`random error test`}
visible={1}
max={'2024-03-03'}
toolTip={`test case1`}
/>)
let firstdivone = screen.getByTestId('first');
let Error=within(firstdivone).getByTestId("Error")
expect(firstdivone).toContainElement(Error)
expect(Error).toHaveTextContent('random error test')
})

// Testing  Required (*)
test('Does * exist',()=>{
 const  content  = render(<DateInput
 color={Color?.light}
 label={`test case1`}
 req={true}
 initialValue={'2023-03-03'}
 onChangeAction={testFunction}
 error={`random error test`}
 visible={1}
 max={'2024-03-03'}
 toolTip={`test case1`}
/>)
expect(screen.getByText('*')).toBeInTheDocument(); 
})
// Dark color testing
test('Checking The Dark Color',()=>{
const  content  = render(<DateInput
color={Color?.dark}
label={`test case1`}
req={true}
initialValue={'2023-03-03'}
onChangeAction={testFunction}
error={`random error test`}
visible={1}
max={'2024-03-03'}
toolTip={`test case2`}
/>)
let firstdivone = screen.getByTestId('first');
let checkingcolor=within(firstdivone).getByTestId("checkingcolor")
expect(firstdivone).toContainElement(checkingcolor)
expect(checkingcolor).toHaveClass(`text-sm font-medium text-white block mb-2`);
})
// Light color Testing
test('Checking The Light Color',()=>{
const  content  = render(<DateInput
color={Color?.light}
label={`test case1`}
req={true}
initialValue={'2023-03-03'}
onChangeAction={testFunction}
error={`random error test`}
visible={1}
max={'2024-03-03'}
toolTip={`test case2`}
/>)
let firstdivone = screen.getByTestId('first');
let checkingcolor=within(firstdivone).getByTestId("checkingcolor")
expect(firstdivone).toContainElement(checkingcolor)
expect(checkingcolor).toHaveClass(`text-sm font-medium text-gray-700 block mb-2`);
})

// FireEvent
test('Does Fire event works',()=>{
  const  content  = render(<DateInput
    color={Color?.light}
    label={`test case1`}
    req={true}
    initialValue={'2023-03-03'}
    onChangeAction={testFunction}
    error={`random error test`}
    visible={1}
    max={'2024-03-03'}
    toolTip={`test case2`}
 />)
 const input=screen.getByTestId('inputdate')
 fireEvent.change(input, {target: {value: 'w'}})
 expect(testFunction).toHaveBeenCalled();
 })

 // visible block 
test('Does visible exist',()=>{
  const  content  = render(<DateInput
 
    color={Color?.light}
    label={`test case1`}
    req={true}
    initialValue={'2023-03-03'}
    onChangeAction={testFunction}
    error={`random error test`}
    visible={0}
    max={'2024-03-03'}
    toolTip={`test case2`}
 />)
 expect(screen.getByTestId('loader')).toHaveClass('block'); 
 expect(screen.getByTestId('inputfield')).toHaveClass('hidden');
 })

  // visible hidden 
test('Does visible exist',()=>{
  const  content  = render(<DateInput
    color={Color?.light}
    label={`test case1`}
    req={true}
    initialValue={'2023-03-03'}
    onChangeAction={testFunction}
    error={`random error test`}
    visible={1}
    max={'2024-03-03'}
    toolTip={`test case2`}
 />)
 expect(screen.getByTestId('inputfield')).toHaveClass('block'); 
 expect(screen.getByTestId('loader')).toHaveClass('hidden');
 })
});
 

            
            