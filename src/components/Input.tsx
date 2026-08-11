import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-3 border border-border rounded-2xl bg-surface text-text-primary transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-danger' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="mt-1 text-sm text-danger">{error}</span>
      )}
    </div>
  );
};
