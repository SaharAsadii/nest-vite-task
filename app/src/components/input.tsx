import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, placeholder, multiline, ...props }, ref) => {
  return (
    <div className="mb-1">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={label}
          placeholder={placeholder}
          className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...props}
        />
      ) : (
        <input
          id={label}
          ref={ref as React.Ref<HTMLInputElement>}
          placeholder={placeholder}
          className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...props}
        />
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
