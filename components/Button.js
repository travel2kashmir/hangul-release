const Button = ({ testid, onClick, Primary = {} }) => {
    const { color = '', icon = '', label = '' } = Primary;
    if (!label) return null;
    
    return (
      <button
        type="button"
        data-testid={testid}
        onClick={onClick}
        className={`bg-gradient-to-r ${color} sm:inline-flex focus:ring-4 focus:ring-cyan-200 font-semibold rounded-lg text-sm px-5 py-2 text-center items-center mb-1 ease-linear transition-all duration-150`}
      >
        {icon}
        {label}
      </button>
    );
  };
  
  export default Button;
  