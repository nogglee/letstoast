import React from 'react';

const Modal = ({ isOpen, onClose, Content }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        {Content} {/* Content 속성을 통해 전달된 내용을 렌더링 */}
      </div>
    </div>
  );
};

export default Modal; 