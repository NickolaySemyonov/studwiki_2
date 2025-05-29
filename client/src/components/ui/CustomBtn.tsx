import React from 'react';

interface CustomBtnProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const CustomBtn: React.FC<CustomBtnProps> = ({
  onClick, 
  className = '',
  children 
}) => {
  return(
    <button 
      onClick={onClick}
      className={`text-gray-400 hover:text-white ${className}`}
    >
      {children || '< icon :) >'}
    </button>
  )
}