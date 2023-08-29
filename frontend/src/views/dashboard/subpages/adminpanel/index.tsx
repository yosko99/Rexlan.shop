import React, { useContext } from 'react';

import { Col, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import adminPanelImg from '../../../../assets/dashboard/admin-panel/admin-panel-option-menu.png';
import { CurrentLanguageContext } from '../../../../context/CurrentLanguageContext';
import AdminPanelOptionContainer from '../../../../styles/AdminPanelOptionContainer';

interface AdminOptionButton {
  btnText: string;
  urlParam: string;
}

const AdminPanelPage = () => {
  const { lang } = useContext(CurrentLanguageContext);

  const adminOptions: AdminOptionButton[] = [
    {
      btnText: lang.global.products,
      urlParam: 'products'
    },
    {
      btnText: lang.global.categories,
      urlParam: 'categories'
    },
    {
      btnText: lang.global.users,
      urlParam: 'users'
    },
    {
      btnText: lang.global.deliveries,
      urlParam: 'deliveries'
    }
  ];

  return (
    <div>
      <p className="fs-3 my-3">{lang.dashboard.tabs.adminPanel.header.title}</p>
      <p>{lang.dashboard.tabs.adminPanel.header.subtitle}</p>
      <hr/>
      <Row>
        <Col lg={5}>
          <Image src={adminPanelImg} fluid/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae repellendus, mollitia reprehenderit excepturi deserunt odit nemo illo incidunt!
          </p>
        </Col>
        <Col lg={7}>
          <Row>
            {adminOptions.map((option: AdminOptionButton, index: number) => (
              <LinkContainer key={index} to={option.urlParam}>
                <Col lg={12}>
                  <AdminPanelOptionContainer role="button">
                    <p>{option.btnText}</p>
                  </AdminPanelOptionContainer>
                </Col>
              </LinkContainer>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanelPage;
