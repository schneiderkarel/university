import React, { useContext } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import ModalContext from '../context/modal.context';

const Modal = () => {
  const [Content, setContent] = useContext(ModalContext);

  const contentIsEmpty = () => Content === null;

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
        {Content}
      </BootstrapModal>
    )
  );
};

export default Modal;
