const RedirectButton = ({ 
    url = '/visualizer',
    className = '',
    buttonText = 'Go Back',
    icon = true
  }) => {
    const handleRedirect = () => {
      window.location.href = url;
    };
  
    return (
      <button
        onClick={handleRedirect}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:text-amber-500 dark:bg-black transition-colors duration-200 text-gray-700 ${className}`}
        aria-label={buttonText}
      >
        {icon && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
        {buttonText}
      </button>
    );
  };
  
  export default RedirectButton;