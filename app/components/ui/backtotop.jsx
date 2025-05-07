import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-gradient-to-br from-blue-500 to-blue-600
        text-white shadow-lg
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        hover:from-blue-600 hover:to-blue-700
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
        group
      `}
    >
      {/* Tooltip */}
      <div className="
        absolute bottom-full mb-2 hidden group-hover:block
        bg-gray-800 text-white text-xs font-medium
        px-2 py-1 rounded whitespace-nowrap
        after:content-[''] after:absolute after:top-full after:left-1/2
        after:-translate-x-1/2 after:border-4 after:border-transparent
        after:border-t-gray-800
      ">
        Back to top
      </div>
      
      {/* Arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default BackToTop;