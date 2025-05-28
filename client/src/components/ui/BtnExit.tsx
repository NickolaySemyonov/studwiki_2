import { ExitIcon } from "./svg/ExitIcon";
import React from 'react';

interface BtnExitProps {
  onClick: () => void;
  className?: string;
}

export const BtnExit: React.FC<BtnExitProps> = ({onClick, className = '' }) => {
    return(
        <button 
          onClick={onClick}
          className={`text-gray-400 hover:text-white ${className}`}
          >
          <ExitIcon/>
        </button>
    )
}