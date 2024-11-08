import React from 'react';
import { useNavigate} from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { ReactComponent as Logo } from '../assets/logo.svg';

const Header = () => {
  
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return(
    <div id="header" className={`w-full h-16 md:h-20 flex justify-between  pl-1 pr-4 md:pl-14 md:pr-16`}>
      <button onClick={handleLogoClick} className="cursor-pointer">
        <Logo className='h-8 md:h-10'/>
      </button>
      <LanguageSelector />
    </div>
  );

};

export default Header;



