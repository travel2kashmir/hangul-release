import {render, screen ,within,fireEvent} from '@testing-library/react'
import InputText from '../../components/utils/InputText';
import '@testing-library/jest-dom'

let testFunction= jest.fn();
describe('Check if Input Text Component loads correctly', () => {
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
    const  content  = render(<InputText
   
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
        const  content  = render(<InputText
       
        label={`testcase1`}
        req={true}
        defaultValue={'welcome'}
        onChangeAction={testFunction}
        error={`random error test`}
        visible={1}
       
        toolTip={`test case2`}
      />)
  

      expect(screen.getByText(/testcase1/i)).toBeInTheDocument();
      let firstdivone = screen.getByTestId('main');
          let child0=within(firstdivone).getByTestId("child0")
              expect(firstdivone).toContainElement(child0)
          })

// Testing Default value 
test('Checking the Initial Value',()=>{
const  content  = render(<InputText

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
// Testing Error 
test('Checking the Error',()=>{
const  content  = render(<InputText

label={`test case1`}
req={true}
defaultValue={'welcome'}
onChangeAction={testFunction}
error={`random error test`}
visible={1}

toolTip={`test case1`}
/>)
let firstdivone = screen.getByTestId('main');
let Error=within(firstdivone).getByTestId("Error")
expect(firstdivone).toContainElement(Error)
expect(Error).toHaveTextContent('random error test')
})

// Testing  Required (*)
test('Does * exist',()=>{
 const  content  = render(<InputText

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
 const  content  = render(<InputText
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
  const  content  = render(<InputText
 
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
  const  content  = render(<InputText
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
 

            
            