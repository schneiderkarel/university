import React, { useContext } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import ModalContext from '../context/modal.context';

const Modal = () => {
  const [content, setContent] = useContext(ModalContext);

  const contentIsEmpty = () => content === null;

  const handleClose = () => {
    setContent(null);
  };

  return (
    contentIsEmpty() ? (
      <div />
    ) : (
      <BootstrapModal
        dialogClassName="expanded-modal-dialog"
        className="d-flex justify-content-center align-items-center"
        show={!contentIsEmpty()}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {content}
      </BootstrapModal>
    )
  );
};

export default Modal;
