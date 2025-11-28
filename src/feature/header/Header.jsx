import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu, FiSearch } from 'react-icons/fi';
import useScreens from '../../hook/useMediaQuery';
import './header.css';

// jsx
export default function Header() {
  const [showItem, setShowItem] = useState(false);
  function handleShowItem() {
    setShowItem((show) => !show);
  }
  const {
    mobileS,
    mobileM,
    mobileL,
    tablet,
    laptopS,
    laptopL,
    desktop,
    bigScreen,
  } = useScreens();
  return (
    <header className="AppHeader">
      <span className="Logo">Faene</span>
      <div className="HeaderStyle">
        {(mobileS || mobileM || mobileL || tablet) && (
          <div className="Menu">
            <FiMenu fontSize="40" color="#d9d9d9" onClick={handleShowItem} />
          </div>
        )}

        {showItem && (mobileS || mobileM || mobileL || tablet) && (
          <div className="StyleAppMobile">
            <div className="AppUserNameAndCloseIcon">
              <div className="AppUserInfo">
                <img className="Image" src="/images/userImage.jpg" alt="" />
                <span className="UserName">Hi,Abdo</span>
              </div>
              <AiFillCloseCircle
                className="AiFillCloseCircle"
                onClick={handleShowItem}
                color="red"
                style={{
                  marginLeft: '30px',
                  cursor: 'pointer',
                  fontSize: '40px',
                }}
              />
            </div>
            <div className="ContainerSearch">
              <input
                className="SearchInput"
                placeholder="Search"
                type="search"
              />
              <FiSearch fontSize="20px" color="#bf9742" />
            </div>
            <div className="AppItemHeader">
              <span className="ItemHome">HOME</span>
              <span className="ItemHeader">MENU</span>
              <span className="ItemHeader">ABOUT</span>
              <span className="ItemHeader">CARD</span>
              <span className="ItemHeader" er>
                BOOK TABLE
              </span>
            </div>
          </div>
        )}
        {(laptopS || laptopL || desktop || bigScreen) && (
          <>
            
              <div className="items AppItemHeader">
                <span className="ItemHome">HOME</span>
                <span className="ItemHeader">MENU</span>
                <span className="ItemHeader">ABOUT</span>
                <span className="ItemHeader">CARD</span>
                <span className="ItemHeader">BOOK TABLE</span>
              </div>
            
            <div className="ContainerSearch">
              <input
                className="SearchInput"
                placeholder="Search"
                type="search"
              />
              <FiSearch fontSize="20px" color="#bf9742" />
            </div>
            <span className="userInfo AppUserInfo">
              <img className="Image" src="/images/userImage.jpg" alt="" />
              <span className="UserName">Hi,Abdo</span>
            </span>
          </>
        )}
      </div>
    </header>
  );
}
