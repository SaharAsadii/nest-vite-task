import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      className={`bg-gradient-to-r w-full text-sm md:text-base from-primary to-blue-500 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg rounded-lg text-white md:px-6 px-4 py-3 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
