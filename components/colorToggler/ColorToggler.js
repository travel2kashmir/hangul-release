import colorFile from '../colors/Color';
const ColorToggler = (newColor,setColor) => {
    
    if (newColor === 'system') {
      window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark)
        : setColor(colorFile?.light)
      localStorage.setItem("colorToggle", newColor)
    }
    else if (newColor === 'light') {
      setColor(colorFile?.light)
      localStorage.setItem("colorToggle", false)
    }
    else if (newColor === 'dark') {
      console.log(typeof setColor)
      setColor(colorFile?.dark)
      localStorage.setItem("colorToggle", true)
    }
   // firstfun();
   // router.push(page);
  }
  export default ColorToggler;