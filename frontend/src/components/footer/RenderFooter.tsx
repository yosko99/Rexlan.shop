import React, { FC, useContext } from 'react';

import { faFacebook, faGithub, faGoogle, faInstagram, faLinkedin, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faStore, faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import Category from '../../types/categoryType';
import Loading from '../loading/Loading';

interface Props {
	categories: Category[];
	isLoading: boolean;
}

const RenderFooter: FC<Props> = ({ isLoading, categories }) => {
  const brands: IconDefinition[] = [faFacebook, faGithub, faGoogle, faInstagram, faLinkedin, faTwitter];
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<footer className="text-center text-lg-start bg-light text-black">
			<section
				className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom container">
				<div className="me-5 d-none d-lg-block ">
					<span>{lang.footer.getConnected}</span>
				</div>

				<div>
					{brands.map((brand: IconDefinition, index: number) => (
						<FontAwesomeIcon
							key={index}
							className='me-3'
							icon={brand} />
					))}
				</div>
			</section>

			<section className="">
				<div className="container text-center text-md-start mt-5">
					<div className="row mt-3">
						<div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								<FontAwesomeIcon icon={faStore} className='me-3' />
								Rexlan E-Commerce
							</h6>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet impedit ipsam illum suscipit eaque autem error perspiciatis saepe alias itaque iste.
							</p>
						</div>

						<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								{lang.global.categories}
							</h6>
							{isLoading
							  ? <Loading />
							  : categories.map((category: Category, index: number) => (
									<LinkContainer
										key={index}
										className='text-uppercase'
										role="button"
										to={`/category/${category.categoryURL}`}
									>
										<p>
											{category.name}
										</p>
									</LinkContainer>
							  ))
							}
						</div>

						<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								{lang.footer.usefullLinks}
							</h6>
							<p>
								<a href="#!" className="text-reset">{lang.global.pricing}</a>
							</p>
							<p>
								<a href="#!" className="text-reset">{lang.global.settings}</a>
							</p>
							<p>
								<a href="#!" className="text-reset">{lang.global.orders}</a>
							</p>
							<p>
								<a href="#!" className="text-reset">{lang.global.help}</a>
							</p>
						</div>

						<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
							<h6 className="text-uppercase fw-bold mb-4">
								{lang.global.contacts}
							</h6>
							<p>
								<FontAwesomeIcon icon={faHome} className='me-1' /> Rousse, Bulgaria
							</p>
							<p>
								<FontAwesomeIcon icon={faEnvelope} className='me-1' /> yusuf.bikov99@gmail.com
							</p>
							<p>
								<FontAwesomeIcon icon={faPhone} className='me-1' /> + 01 234 567 88
							</p>
							<p>
								<FontAwesomeIcon icon={faPrint} className='me-1' /> + 01 234 567 88
							</p>
						</div>
					</div>
				</div>
			</section>

			<div className="text-center p-4">
				© 2021 {lang.footer.copyright}:
				<a
					className="text-reset fw-bold"
					target='_blank'
					href="https://github.com/yosko99"
					rel="noreferrer">
					yosko99
				</a>
			</div>
		</footer>
  );
};

export default RenderFooter;
