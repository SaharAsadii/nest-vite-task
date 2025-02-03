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
      className={`bg-blue-500 shadow-sm rounded-lg text-white px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
