import React, { useContext } from 'react';

import { faPhone, faMessage, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
// @ts-ignore
import Zoom from 'react-reveal/Zoom';

import contactUsImg from '../../assets/contactpage/contact-us.svg';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const ContactPage = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
        <Container>
            <Row className='d-flex mt-5'>
                <Col lg={4} className='d-flex justify-content-center flex-column'>
                    <Zoom>
                        <p className='fs-3'>{lang.contactsPage.contactUs}</p>
                        <p className='fs-1'>{lang.contactsPage.hereToHelp}</p>
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
                    <p className='fs-4'>{lang.contactsPage.callUs.title}</p>
                    <p className='fs-5'>{lang.contactsPage.callUs.subtitle}</p>
                    <p className='text-info fs-5'>{lang.contactsPage.callUs.secondSubtitle}</p>
                </Col>
                <Col lg={4} className='p-3 mt-2 shadow-sm rounded text-center'>
                    <FontAwesomeIcon className='mb-2 fs-4' icon={faMessage} />
                    <p className='fs-4'>{lang.contactsPage.chatWithUs.title}</p>
                    <p className='fs-5'>{lang.contactsPage.chatWithUs.subtitle}</p>
                    <Button className='text-uppercase'>{lang.contactsPage.chatWithUs.secondSubtitle}</Button>
                </Col>
                <Col lg={4} className='p-3 mt-2 shadow-sm rounded text-center'>
                    <FontAwesomeIcon className='mb-2 fs-4' icon={faMailForward} />
                    <p className='fs-4'>{lang.contactsPage.askQuestion.title}</p>
                    <p className='fs-5'>{lang.contactsPage.askQuestion.subtitle}</p>
                    <Button className='text-uppercase'>{lang.contactsPage.askQuestion.secondSubtitle}</Button>
                </Col>
            </Row>
            <div className='mt-4'>
                <p>{lang.contactsPage.lookingForSomeone}
                    <span className='text-info' role={'button'}> {lang.contactsPage.tryOurStaffDirectory}</span>
                </p>
                <p>{lang.contactsPage.forMediaQueries}
                    <span className='text-info' role={'button'}> {lang.contactsPage.regionalMediaContacts}</span>.
                </p>
            </div>
        </Container>
  );
};

export default ContactPage;
