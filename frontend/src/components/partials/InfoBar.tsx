import React, { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';

import CenteredItems from '../../styles/CenteredItems';
import InfoBarData from '../../types/infotBarTypes';

interface Props {
  textAreas: InfoBarData[];
}

const InfoBar: FC<Props> = ({ textAreas }) => {
  return (
    <Container className="mb-2">
      <Row className="justify-content-center">
        {textAreas.map((textArea: InfoBarData, index: number) => (
          <Col key={index} className="shadow-sm mx-1">
            <CenteredItems flexColumn className="py-2">
              <FontAwesomeIcon icon={textArea.icon} size={'2x'} />
              <div className="text-center mt-2">
                <p className="m-0">{textArea.title}</p>
                <p className="m-0">{textArea.description}</p>
              </div>
            </CenteredItems>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InfoBar;
