import styled from 'styled-components';

const CenteredItems = styled.div<{flexColumn?: boolean}>`
	display:flex;
	justify-content:center;
	align-items:center;
	flex-direction: ${props => props.flexColumn ? 'column' : 'row'};
`;

export default CenteredItems;
