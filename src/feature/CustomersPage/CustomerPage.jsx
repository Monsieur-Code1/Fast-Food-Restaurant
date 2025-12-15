import { useData } from '../../context/Context';
import InputsUserRating from '../inputs/InputsUserRating';
import style from './CustomerPage.module.css';
import Footer from './Footer';
import SimpleSlider from './SliderPage';
import styleT from './TitlePage.module.css';

export default function CustomerPage() {
  const { customersRef } = useData();
  return (
    <section className={style.Container}>
      <div className={styleT.containerTitle}>
        <h3 className={styleT.titlePage}>What Says Our Customers?</h3>
        <img
          className={styleT.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>

      <SimpleSlider />
      <ContainerPhoto />
      <img className={style.vector8} src="/images/Vector 8 (1).png" alt="" />
      <Footer />
    </section>
  );
}

function ContainerPhoto() {
  const { openModelRating, setOpenModelRating } = useData();
  const handelShowModalRating = () => setOpenModelRating(true);
  return (
    <div className="w-full">
      <p
        role="button"
        onClick={handelShowModalRating}
        className={` ${style.feedback}w-full feedback cursor-pointer p-0 pt-5 text-right font-Inter text-[20px] text-[#ffffff] underline md:pr-8`}
      >
        Add Your Feedback
      </p>
      <img
        src="/images/pizza-black.jpg"
        className="w-[99%] items-start sm:w-[65%] md:w-[500px] lg:w-[600px]"
        alt=""
      />
      {openModelRating && <InputsUserRating />}
    </div>
  );
}
