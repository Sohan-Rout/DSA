import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white py-4 px-6 fixed top-0 left-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight hover:text-blue-400 transition duration-300">
          DSA<span className='text-amber-500'>Visualizer</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 md:space-x-8 items-center">
          <li>
            <Link href="/" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/features" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Features
            </Link>
          </li>
          <li>
            <Link href="/visualizer" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              Visualizer
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm md:text-base font-medium hover:text-blue-400 transition duration-300">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}