import React from 'react';

const Modal = ({ isOpen, onClose, Content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md relative w-full max-w-[calc(100%-32px)]">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          ✕
        </button>
        <div className="p-6">
          {Content}
        </div>
      </div>
    </div>
  );
};

export default Modal; 