import { BurgerIcon } from "./svg/BurgerIcon"
import React from 'react';

interface BtnProps {
  onClick: () => void;
  className?: string;
}

export const BtnBurger: React.FC<BtnProps> = ({onClick, className = '' }) => {
    return(
        <button 
          onClick={onClick}
          className={`text-gray-400 hover:text-white ${className}`}
          >
          <BurgerIcon/>
        </button>
    )
};