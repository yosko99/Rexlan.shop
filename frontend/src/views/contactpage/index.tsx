import React from 'react';

import { faPhone, faMessage, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
// @ts-ignore
import Zoom from 'react-reveal/Zoom';

import contactUsImg from '../../assets/contactpage/contact-us.svg';

const ContactPage = () => {
  return (
        <Container>
            <Row className='d-flex mt-5'>
                <Col lg={4} className='d-flex justify-content-center flex-column'>
                    <Zoom>
                        <p className='fs-3'>Contact us</p>
                        <p className='fs-1'>We are here to help</p>
                    </Zoom>
                </Col>
                <Col lg={8}>
                    <Zoom>
                        <Image src={contactUsImg} fluid alt='contact us' />
                    </Zoom>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col lg={4} className='p-3 mt-2 shadow-sm rounded text-center'>
                    <FontAwesomeIcon className='fs-4' icon={faPhone} />
                    <p className='fs-4'>Call us directly at</p>
                    <p className='fs-5'>We are available Sun 7:00pm EST - Friday 7:00pm EST</p>
                    <p className='text-info fs-5'>+111 1 111 1111</p>
                </Col>
                <Col lg={4} className='p-3 mt-2 shadow-sm rounded text-center'>
                    <FontAwesomeIcon className='mb-2 fs-4' icon={faMessage} />
                    <p className='fs-4'>Chat with our sales team</p>
                    <p className='fs-5'>We are available Sun 7:00pm EST - Friday 7:00pm EST</p>
                    <Button className='text-uppercase'>Chat with sales</Button>
                </Col>
                <Col lg={4} className='p-3 mt-2 shadow-sm rounded text-center'>
                    <FontAwesomeIcon className='mb-2 fs-4' icon={faMailForward} />
                    <p className='fs-4'>Ask a question</p>
                    <p className='fs-5'>Fill out our form and we will be back in 24 hours.</p>
                    <Button className='text-uppercase'>Get started</Button>
                </Col>
            </Row>
            <div className='mt-4'>
                <p>Looking for someone you know?
                    <span className='text-info' role={'button'}> Try our Staff directory</span>
                </p>
                <p>For media queries, contact email@email.com or find your regional media contact
                    <span className='text-info' role={'button'}> Regional Media Contacts</span>.
                </p>
            </div>
        </Container>
  );
};

export default ContactPage;
