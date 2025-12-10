import styled, { keyframes } from 'styled-components';

// 1. Backdrop (Black transparent)
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Black transparent background */
  z-index: 1000;
`;

// Slide-in animation for the modal box
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

// 2. Modal Container
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  width: 90%;
  max-width: 500px; 

  animation: ${slideIn} 0.3s ease-out forwards;
`;

// 3. Close Button
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #aaa;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

// 4. Content and Action Buttons Styling
export const ModalContent = styled.div`
  padding-top: 10px;
  color: #333;
  text-align: center;
`;

export const ActionButtons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

export const CancelButton = styled.button`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  flex: 1;
`;

export const ConfirmDeleteButton = styled.button`
  padding: 5px 5px;
  border: none;
  border-radius: 5px;
  background-color: #e53e3e; /* Red color for destructive action */
  color: white;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c53030;
  }
`;


import { createPortal } from 'react-dom';


// Inner component logic
const ModalOverlay = ({ onClose, onConfirmDelete, text, okay }) => {
  const handleDelete = () => {
    onConfirmDelete(); // Execute the passed delete function
    onClose(); // Close the modal after successful execution
  };

  return (
    <>
      {/* 1. The Backdrop (Closes on click) */}
      <Backdrop onClick={onClose} />

      {/* 2. The Modal Container */}
      <ModalContainer>
        {/* Close Button */}
        <CloseButton onClick={onClose}>&times;</CloseButton>

        {/* Modal Content */}
        <ModalContent>
          <div className="mt-2 p-2">{text}</div>
        </ModalContent>

        {/* Action Buttons */}
        <ActionButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmDeleteButton onClick={handleDelete}>
            {okay}
          </ConfirmDeleteButton>
        </ActionButtons>
      </ModalContainer>
    </>
  );
};

// External Component (Uses Portal)
function CustomModal({ isOpen, onClose, onConfirmDelete, text, okay }) {
  if (!isOpen) {
    return null;
  }

  // Use createPortal to render the modal outside the main component tree
  // The destination is document.body as you requested.
  return createPortal(
    <ModalOverlay
      onClose={onClose}
      onConfirmDelete={onConfirmDelete}
      text={text}
      okay={okay}
    />,
    document.body,
  );
}

export default CustomModal;