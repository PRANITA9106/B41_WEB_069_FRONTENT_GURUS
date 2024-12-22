import React from 'react';

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
      <p className="mt-4 text-lg">You do not have permission to view this page.</p>
    </div>
  );
};

export default AccessDenied;
