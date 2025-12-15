import { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useData } from '../../context/Context';
import ActiveStarRating from '../starsRating/ActiveStarRating ';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Black transparent background */
  z-index: 1000;
  backdrop-filter: blur(10px); /* تطبيق التغبش على ما يقع خلف العنصر */
`;
const Content = styled.div`
  padding: 10px 10px 10px 10px;
  width: clamp(250px, 90%, 500px);
  background-color: var(--second-color);
  border-radius: 20px;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px 0 10px 0;
`;
const Paragraph = styled.p`
  color: var(--four-color);
  font-family: 'Inter';
`;
const Input = styled.input``;
const AppButtons = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
const ButtonClose = styled.button`
  padding: 10px;
  color: var(--second-color);
  background-color: red;
  border-radius: 10px;
`;
const ButtonSubmitted = styled.button`
  padding: 10px 15px;
  color: var(--second-color);
  background-color: #0a0f98;
  border-radius: 10px;
`;
const HeaderModalRating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: var(--four-color);
  font-family: 'Inter';
  font-size: 30px;
`;

export default function InputsUserRating() {
  const [name, SetName] = useState('');
  const [description, setDescription] = useState('');
  const [numStarRating, setNumStarRating] = useState('');
  const {
    openModelRating,
    setOpenModelRating,
    ratingPersons,
    setRatingPersons,
  } = useData();
  const handelCloseModel = () => setOpenModelRating(false);
  const userRating = {
    id: Date.now(),
    name: name,
    text: description,
    rating: numStarRating,
  };
  function handelAddRatingFromPerson() {
    if (!name || !description || numStarRating < 1)
      return toast.error('please Enter your name and opinion and your rating');

    setRatingPersons((ratingPersons) => [...ratingPersons, userRating]);
    setOpenModelRating(false);
    toast.success('successfully Added your FeedBack');
  }
  return createPortal(
    <Container>
      <Content>
        <HeaderModalRating>
          <span className="transparent"></span>
          <h1> Feedback</h1>
          <span
            className="cursor-pointer"
            role="button"
            onClick={handelCloseModel}
          >
            <AiFillCloseCircle className="text-[35px]" />
          </span>
        </HeaderModalRating>
        <Row>
          <Paragraph>Your Name</Paragraph>
          <input
            value={name}
            onChange={(e) => SetName(e.target.value)}
            type="text"
            name=""
            id=""
            className="h-8 w-[90%] rounded-lg border border-solid border-stone-900"
          />
        </Row>
        <Row>
          <Paragraph>Your Opinion</Paragraph>
          <textArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name=""
            className="w-[90%] rounded-lg border border-solid border-stone-900"
            id=""
          />
        </Row>
        <Row>
          <ActiveStarRating
            defaultRating={0}
            size={'35'}
            maxRating={5}
            messages={['Terrible', 'Bad', 'Oky', 'Good', 'Amazing']}
            onSetRating={setNumStarRating}
          />
        </Row>
        <Row>
          <AppButtons>
            <ButtonSubmitted onClick={handelAddRatingFromPerson}>
              send
            </ButtonSubmitted>
            <ButtonClose onClick={handelCloseModel}>cancel</ButtonClose>
          </AppButtons>
        </Row>
      </Content>
    </Container>,
    document.body,
  );
}
