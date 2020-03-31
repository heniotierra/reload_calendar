import React from 'react';
import './index.css';

interface ContainerProps {
  isOpen: boolean;
}

const Modal: React.FC<ContainerProps> = ({
  isOpen,
  children,
}) => {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal__inner">
        {children}
      </div>
    </div>
  );
};

export default Modal;
