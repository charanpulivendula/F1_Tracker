import React, { useState } from 'react';
import IU_logo from '../Assets/IU_logo.png';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navbar flex sticky z-10 top-0 max-sm:items-end bg-black lg:pl-48 lg:pr-48 max-sm:pl-4 max-sm:pr-4'>
      <nav className='w-full shadow sticky flex items-center justify-between'>
        <a href='/'>
          <img className='visible-only-lg visible-only-md'  width={70} height={70} src={IU_logo} alt='IU_logo'/>
          <img className='visible-only-sm' width={40} height={40} src={IU_logo} alt='IU_logo'/>
        </a>
        <div className='visible-only-sm flex'>
          <button className="block lg:hidden" onClick={toggleMenu}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          {menuOpen && (
            <ul className="flex flex-col absolute top-12 right-0 bg-crimson text-white py-2 px-4 rounded-md">
              <li>
                <a href="/" className="block py-1" onClick={toggleMenu}>Home</a>
              </li>
              <li>
                <a href="/about" className="block py-1" onClick={toggleMenu}>About</a>
              </li>
            </ul>
          )}
        </div>
        <div className='visible-only-lg visible-only-md flex'>
          <ul className='flex'>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
