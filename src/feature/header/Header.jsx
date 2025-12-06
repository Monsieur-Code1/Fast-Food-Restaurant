import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { useData } from '../../context/Context';
import useScreens from '../../hook/useMediaQuery';
import './header.css';

// jsx
export default function Header() {
  const [showItem, setShowItem] = useState(false);
  const [activeBtn, setActiveBtn] = useState('Home');
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

  const {
    aboutRef,
    frame1Ref,
    mapRef,
    customersRef,
    mealsRef,
    scrollToSection,
  } = useData();
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
              <span
                onClick={() => {
                  (scrollToSection(frame1Ref),
                    setShowItem(false),
                    setActiveBtn('Home'));
                }}
                className={`ItemHome ${activeBtn === 'HOME' && 'active'}`}
              >
                HOME
              </span>
              <span
                onClick={() => {
                  (scrollToSection(mealsRef),
                    setShowItem(false),
                    setActiveBtn('MENU'));
                }}
                className={`ItemHome ${activeBtn === 'MENU' && 'active'}`}
              >
                MENU
              </span>
              <span
                onClick={() => {
                  (scrollToSection(aboutRef),
                    setShowItem(false),
                    setActiveBtn('ABOUT'));
                }}
                className={`ItemHome ${activeBtn === 'ABOUT' && 'active'}`}
              >
                ABOUT
              </span>
              <span
                onClick={() => {
                  (scrollToSection(mapRef),
                    setShowItem(false),
                    setActiveBtn('CARD'));
                }}
                className={`ItemHome ${activeBtn === 'CARD' && 'active'}`}
              >
                CARD
              </span>
              <span
                onClick={() => {
                  (scrollToSection(customersRef),
                    setShowItem(false),
                    setActiveBtn('BOOK-TABLE'));
                }}
                className={`ItemHome ${activeBtn === 'BOOK-TABLE' && 'active'}`}
              >
                BOOK TABLE
              </span>
            </div>
          </div>
        )}
        {(laptopS || laptopL || desktop || bigScreen) && (
          <>
            <div className="items AppItemHeader">
              <span
                onClick={() => {
                  scrollToSection(frame1Ref);
                  setActiveBtn('HOME');
                }}
                className={`ItemHome ${activeBtn === 'HOME' && 'active'}`}
              >
                HOME
              </span>
              <span
                onClick={() => {
                  scrollToSection(mealsRef);
                  setActiveBtn('MENU');
                }}
                className={`ItemHome ${activeBtn === 'MENU' && 'active'}`}
              >
                MENU
              </span>
              <span
                onClick={() => {
                  scrollToSection(aboutRef);
                  setActiveBtn('ABOUT');
                }}
                className={`ItemHome ${activeBtn === 'ABOUT' && 'active'}`}
              >
                ABOUT
              </span>
              <span
                onClick={() => {
                  scrollToSection(mapRef);
                  setActiveBtn('CARD');
                }}
                className={`ItemHome ${activeBtn === 'CARD' && 'active'}`}
              >
                CARD
              </span>
              <span
                onClick={() => {
                  scrollToSection(customersRef);
                  setActiveBtn('BOOK-TABLE');
                }}
                className={`ItemHome ${activeBtn === 'BOOK-TABLE' && 'active'}`}
              >
                BOOK TABLE
              </span>
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
