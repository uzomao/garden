// hooks/useModal.js
import { useState } from 'react';

export default function useModal() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    contentSlug: ''
  });

  const changeModalState = (isOpen, contentSlug = '') => {
    setModalState({ isOpen, contentSlug });
  };

  return {
    modalState,
    setModalState,
    changeModalState
  };
}