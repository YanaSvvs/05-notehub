import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root")!;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  
  if (!isOpen) {
      return null;
  }

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
