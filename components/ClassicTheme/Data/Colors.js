const white = {
    "theme": "light",
    "navtextColor": "text-slate-500",
    "headerBgColor": "bg-white",
    "bodyBgColor": "bg-slate-50",
    "menuColor": "text-black",
    "titleTextColor": "text-slate-600",
    "descriptionTextColor": "text-slate-500",
    "facilitiesTextColor": "text-gray-700",
    "bookingFormColor": "bg-white",
    "inputTextColor": "text-slate-600",
    "dropdownTextColor": "text-gray-900",

    // injecting colors to booking engine below
    "text": {
        "title": "text-slate-600",
        "description": "text-gray-700",
    }


}

const black = {
    "theme": "dark",
    "navtextColor": "text-white",
    "headerBgColor": "bg-gray-900",
    "bodyBgColor": "bg-gray-800",
    "menuColor": "text-slate-100",
    "titleTextColor": "text-white",
    "descriptionTextColor": "text-gray-400",
    "facilitiesTextColor": "text-gray-400",
    "bookingFormColor": "bg-gray-800",
    "inputTextColor": "text-slate-300",
    "dropdownTextColor": "text-white",

    // injecting colors to booking engine below
    "text": {
        "title": "text-white",
        "description": "text-gray-400",
    }


}

const accessibleColors = {
    theme: "light",
    navtextColor: "text-gray-700", // Adjusted for better contrast
    headerBgColor: "bg-white",
    bodyBgColor: "bg-gray-100", // Adjusted for better contrast
    menuColor: "text-black",
    titleTextColor: "text-gray-800", // Adjusted for better contrast
    descriptionTextColor: "text-gray-700",
    facilitiesTextColor: "text-gray-600", // Adjusted for better contrast
    bookingFormColor: "bg-white",
    inputTextColor: "text-gray-800", // Adjusted for better contrast
    dropdownTextColor: "text-gray-900",
  
    // Injecting colors to booking engine below
    text: {
      title: "text-gray-800", // Adjusted for better contrast
      description: "text-gray-700",
    },
  };
  
export default { black, white, accessibleColors }