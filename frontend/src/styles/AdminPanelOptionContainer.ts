import styled from 'styled-components';

const AdminPanelOptionContainer = styled.div`
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

export default AdminPanelOptionContainer;
