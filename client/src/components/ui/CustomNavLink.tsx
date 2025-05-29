import React from "react";
import { Link, type To } from "react-router-dom";

interface NavLinkProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    to:To;
}

export const CustomNavLink: React.FC<NavLinkProps> = ({
  onClick, 
  className = '',
  children,
  to 
}) => {
  return(
    <Link
        to={to}
        className={`flex items-center p-3 rounded-lg
             text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${className}`}
        onClick={onClick}
    >
        {children || 'It`s a link'}
    </Link>
 
    
  )
}