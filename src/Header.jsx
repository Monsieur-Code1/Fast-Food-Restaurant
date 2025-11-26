import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
const HeaderStyle = styled.header`
  padding-top: 27px;
  height: 52px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Image = styled.img`
  border-radius: 50%;
  border: 1px solid #c79439;
  width: 43.01px;
  height: 43.01px;
`;
const UserName = styled.span`
  color: #ffffff;
  width: 93px;
  height: 24px;
  font-weight: 400;
  font-size: 20px;
`;
const ItemHeader = styled.li`
  color: #ffffff;
  font-weight: 400;
  font-size: 18px;
  font-family: 'Inter';
`;
const ItemHome = styled.li`
  color: #bf9742;
  font-weight: 400;
  font-size: 18px;
  font-family: 'Inter';
`;
const AppItemHeader = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #bf9742;
  font-weight: 400;
  font-size: 20px;
  width: 420px;
`;
const Logo = styled.div`
  margin-left: 20px;
  font-size: 38px;
  color: #ffffff;
  font-weight: 400;
  font-family: 'Lobster_Two';
`;
const AppUserInfo = styled.div`
  width: 152px;
  height: 52px;
  gap: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter';
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  /* padding-left:10px; */
  color: #ffffff;
  &::placeholder {
    color: #bf9742;
    padding-left: 20px;
  }
`;
const ContainerSearch = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #d9d9d9;
  width: 300px;
  border-radius: 15px;
`;

// jsx
export default function Header() {
  return (
    <HeaderStyle>
      <Logo>Faene</Logo>
      <div>
        <AppItemHeader className="items">
          <ItemHome>HOME</ItemHome>
          <ItemHeader>MENU</ItemHeader>
          <ItemHeader>ABOUT</ItemHeader>
          <ItemHeader>CARD</ItemHeader>
          <ItemHeader>BOOK TABLE</ItemHeader>
        </AppItemHeader>
      </div>
      <ContainerSearch>
        <SearchInput placeholder="Search" type="search" />
        <FiSearch fontSize="20px" color="#bf9742" />
      </ContainerSearch>
      <AppUserInfo className="userInfo">
        <Image src="/images/userImage.jpg" alt="" />
        <UserName>Hi,Abdo</UserName>
      </AppUserInfo>
    </HeaderStyle>
  );
}
