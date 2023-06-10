import React, { useState, FC, useContext } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  activateButtonText: React.ReactNode;
  activateButtonClassName?: string;
  activateButtonOnClick?: () => void;
  modalHeader: React.ReactChild;
  modalBody: React.ReactChild;
  modalFooter?: React.ReactChild;
}

const CustomModal: FC<Props> = ({
  activateButtonText,
  activateButtonClassName,
  activateButtonOnClick,
  modalHeader,
  modalFooter,
  modalBody
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleButtonClick = () => {
    handleShow();
    activateButtonOnClick && activateButtonOnClick();
  };

  const { lang } = useContext(CurrentLanguageContext);

  return (
    <>
      <Button className={activateButtonClassName} onClick={handleButtonClick}>
        <>{activateButtonText}</>
      </Button>

      <Modal centered animation show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100">
            <>{modalHeader}</>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>{modalBody}</>
        </Modal.Body>
        <Modal.Footer onClick={handleClose}>
          <>
            {modalFooter || (
              <Button variant="primary">{lang.global.close}</Button>
            )}
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
