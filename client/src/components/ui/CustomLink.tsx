import React from "react";
import { Link, type To } from "react-router-dom";

interface LinkProps {
    onClick?: () => void;
    children?: React.ReactNode;
    to:To;
}

export const CustomLink: React.FC<LinkProps> = ({
    onClick, 
    children,
    to 
}) => {
    return(
        <Link
            to={to}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
            onClick={onClick}
        >
            {children || 'It`s a link'}
        </Link>
  );
}