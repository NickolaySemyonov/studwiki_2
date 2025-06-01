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
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            onClick={onClick}
        >
            {children || 'It`s a link'}
        </Link>
  );
}