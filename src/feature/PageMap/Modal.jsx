import styled from 'styled-components';
const AppModal = styled.div`
  width: 100%;
  display:flex;
  height: 100dvh;
  justify-content:center;
  align-items:center;
  background-color:rgba(0,0,0,0.5);
`;
const Container = styled.div`
  width: fit-content;
  height: fit-content;
  padding:50px
`;
export default function Modal() {
  return <AppModal>
    <Container></Container>
  </AppModal>;
}
