import React, { useState, FC } from 'react';

import { Button, Modal } from 'react-bootstrap';

interface Props {
	activateButtonText: string;
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

  return (
    <>
      <Button className={activateButtonClassName} onClick={handleButtonClick}>
        {activateButtonText}
      </Button>

      <Modal centered animation show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
						<>{modalHeader}</>
					</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<>{modalBody}</>
				</Modal.Body>
        <Modal.Footer onClick={handleClose}>
          <>
            {modalFooter || <Button variant="primary">Close</Button>}
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
