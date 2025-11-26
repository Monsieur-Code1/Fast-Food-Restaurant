import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
const Frame = styled.div`
  background: linear-gradient(to bottom, #171715 0%, #171715 79%, #c79439 100%);
  /* height: 1024px; */
  height: 100dvh;
  width: 100%;

  @media (max-width: 480px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 1024px) and (min-width: 769px) {
  }

  @media (min-width: 1025px) {
  }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// const slideOutToRight = keyframes`
//   from { transform: translateX(0); opacity: 1; }
//   to { transform: translateX(100%); opacity: 0; }
// `;
const Title = styled.h1`
  font-family: 'JockeyOne';
  font-weight: 400;
  width: 100%;
  text-align: center;
  font-size: 80px;
  color: #ffffff;
  /* margin-top: 121px; */
  margin-top: 80px;
`;
const AppContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 200px;
  direction: ltr;
  position: relative;
`;
const ParagraphContent = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  font-family: 'Inter';
`;
const ButtonOrder = styled.button`
  box-shadow: 3px 4px #fefefe80;
  width: 311px;
  height: 59px;
  border-radius: 15px;
  gap: 10px;
  background-color: #bf9742;
  color: #ffffff;
  font-family: 'Inter';
  font-size: 30px;
`;
const ImageStyle = styled.img`
  height: 450px;
  animation:${slideInFromLeft} 0.5s forwards
`;

const AppButtonOrder = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 400px; */
  margin-top: 20px;
`;
const ImgVector = styled.img`
  width: 100px;
  height: 50px;
  padding: 20px 10px 0 20px;
  /* padding-top: 30px; */
`;
const TastyThursdays = styled.div`
  width: 292px;
  padding: 10px;
  height: 225px;
  position: relative;
  padding-top: 30px;
`;
const Thursdays = styled.p`
  font-size: 38px;
  font-family: 'JockeyOne';
  font-weight: 400;
  color: #fdf8f8;
  animation: ${slideInFromLeft} 0.5s forwards;
`;
const Off = styled.p`
  font-size: 80px;
  font-family: 'JockeyOne';
  font-weight: 400;
  color: #bf9742;
  animation: ${slideInFromLeft} 0.5s forwards;
`;
const ImagCircle = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  /* padding: px; */
`;
const ContainerSpan = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 292px;
`;
const SpanTreeDotToShowMeal = styled.span`
  display: inline-block;
  width: 17px;
  height: 17px;
  border-radius: 50%;cursor: pointer;
  
  /* background-color: #d9d9d9; */
  background-color: ${({ active }) => (active?"#d9d9d9":"#bf9742")};
  
`;

export default function Applayout() {
  const [meal, setMeal] = useState('Burger');
  const [active, setActive] = useState(1); 
  return (
    <>
      <Frame>
        <Header />
        <AppContentFrame>
          <Title>Fast Food Restaurant</Title>

          <ParagraphContent>
            <span>
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia
            </span>
            <span>
              laborum quam quisquam esse error unde. Tempora ex doloremque,
              labore, sunt repellat
            </span>
            <span>dolore, iste magni quos nihil ducimus libero ipsam.</span>
          </ParagraphContent>
          <AppButtonOrder>
            <ButtonOrder>ORDER NOW</ButtonOrder>
            <ImgVector src="/images/Vector 4.png" alt="Vector" />
            <TastyThursdays>
              {meal === 'Burger' && (
                <>
                  <Thursdays>Tasty Thursdays</Thursdays>
                  <Off>20% Off</Off>
                </>
              )}
              {meal === 'Pizza' && (
                <>
                  <Thursdays>Pizza Days</Thursdays>
                  <Off>15% Off</Off>
                </>
              )}
              {meal === 'Pasta' && (
                <>
                  <Thursdays>Delicious Pasta</Thursdays>
                  <Off>25% Off</Off>
                </>
              )}

              <ImagCircle src="/images/Vector 6.png" />
            </TastyThursdays>
          </AppButtonOrder>
          {meal === 'Burger' && (
            <ImageStyle key="Burger" src="/images/Burger.png" alt="Burger" />
          )}
          {meal === 'Pizza' && (
            <ImageStyle key="Pizza" src="/images/pizza.png" alt="Pizza" />
          )}
          {meal === 'Pasta' && (
            <ImageStyle key="Pasta" src="/images/Pasta.png" alt="Pasta" />
          )}

          <ContainerSpan>
            <SpanTreeDotToShowMeal
              active={active === 1}
              onClick={() => {
                (setMeal('Burger'), setActive(1));
              }}
            ></SpanTreeDotToShowMeal>
            <SpanTreeDotToShowMeal
              active={active === 2}
              onClick={() => {
                (setMeal('Pizza'), setActive(2));
              }}
            ></SpanTreeDotToShowMeal>
            <SpanTreeDotToShowMeal
              active={active === 3}
              onClick={() => {
                (setMeal('Pasta'), setActive(3));
              }}
            ></SpanTreeDotToShowMeal>
          </ContainerSpan>
        </AppContentFrame>
      </Frame>
    </>
  );
}
