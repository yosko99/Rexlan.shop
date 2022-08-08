import React, { useContext } from 'react';

import { Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

import adminPanelImg from '../../../../assets/dashboard/admin-panel/admin-panel-option-menu.png';
import { CurrentLanguageContext } from '../../../../context/CurrentLanguageContext';

const AdminPanelOptionDiv = styled.div`
	border: 1px solid green;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	transition: 0.5s ease-in-out;
	margin: 1em 0 1em 0;

	p {
		padding: 0.2em;
		font-size: 2em;
		margin: 0;
	}
	:hover {
		box-shadow: 0px 5px 5px 0px lightgreen;
		transform: translateY(-0.3em);
	}
`;

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
    }
  ];

  return (
		<div>
			<p className='fs-3 my-3'>{lang.dashboard.tabs.adminPanel.header.title}</p>
			<p>{lang.dashboard.tabs.adminPanel.header.subtitle}</p>
			<hr />
			<Row>
				<Col lg={5}>
					<Image src={adminPanelImg} fluid />
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Repudiandae repellendus, mollitia reprehenderit excepturi deserunt odit nemo illo incidunt!
					</p>
				</Col>
				<Col lg={7}>
					<Row>
						{adminOptions.map((option: AdminOptionButton, index: number) => (
							<LinkContainer key={index} to={option.urlParam}>
								<Col lg={12}>
									<AdminPanelOptionDiv role='button'>
										<p>{option.btnText}</p>
									</AdminPanelOptionDiv>
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
