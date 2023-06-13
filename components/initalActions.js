import colorFile from './colors/Color';
import {english,french,arabic} from './Languages/Languages';
import ColorToggler from './colorToggler/ColorToggler';


const InitialActions = ({ setColor, setMode }) => {
  
    let language, currentLogged, currentProperty, colorToggle;
    if (typeof window !== 'undefined') {
        var locale = localStorage.getItem("Language");
        colorToggle = localStorage.getItem("colorToggle");
        if (colorToggle === "" || colorToggle === undefined || colorToggle === null || colorToggle === "system") {
            window.matchMedia("(prefers-color-scheme:dark)").matches === true ? setColor(colorFile?.dark) : setColor(colorFile?.light)
            setMode(window.matchMedia("(prefers-color-scheme:dark)").matches === true ? true : false);
        }
        else if (colorToggle === "true" || colorToggle === "false") {
            setColor(colorToggle === "true" ? colorFile?.dark : colorFile?.light);
            setMode(colorToggle === "true" ? true : false)
        }
        {
            if (locale === "ar") {
                language = arabic;
            }
            if (locale === "en") {
                language = english;
            }
            if (locale === "fr") {
                language = french;

            }
        }
        /** Current Property Details fetched from the local storage **/
        currentProperty = JSON.parse(localStorage.getItem("property"));
        currentLogged = JSON.parse(localStorage.getItem("Signin Details"));

    }
    return {language, currentLogged, currentProperty, colorToggle};
}

export {
    InitialActions,
    ColorToggler
}