const Button = ({ testid, onClick, Primary = {},buttonType=undefined }) => {
    const { color = '', icon = '', label = '',disabled=false } = Primary;
    if (!label && !icon) {
      return null; // Return null if both label and icon are not provided
    } 
    return (
      <button
      type={buttonType ? buttonType : undefined}
        data-testid={testid}
        onClick={onClick}
        disabled={disabled}
        className={`bg-gradient-to-r ${color} sm:inline-flex focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2 text-center items-center mb-1 ease-linear transition-all duration-150`}
      >
        {icon}
        {label}
      </button>
    );
  };
  
  export default Button;
  