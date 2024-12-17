import React from 'react';

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {message}
    </div>
  );
}