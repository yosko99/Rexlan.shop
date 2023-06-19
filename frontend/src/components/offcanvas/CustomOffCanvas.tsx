import React, { FC, useState, useEffect } from 'react';

import { Button, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
	buttonText: string;
	title: string;
	body: React.ReactChild;
  buttonClassName?: string;
  buttonVariant?: string;
}

const CustomOffCanvas: FC<Props> = ({ buttonText, title, body, buttonClassName, buttonVariant }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Hide off canvas when url changes
  useEffect(() => {
    handleClose();
  }, [navigate]);

  return (
    <>
      <Button variant={buttonVariant} className={buttonClassName} onClick={handleShow}>
        {buttonText}
      </Button>

      <Offcanvas show={show} placement={'end'} onHide={handleClose}>
        <Offcanvas.Header closeButton className='bg-black'>
          <Offcanvas.Title className='text-white'>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
					<>
						{body}
					</>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomOffCanvas;
