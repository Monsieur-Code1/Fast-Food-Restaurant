// import './About.css';
import { useState } from 'react';
import { useData } from '../../context/Context';
import style1 from '../style/ButtonNow.module.css';
import style from './About.module.css';
export default function About() {
  const { aboutRef } = useData();
  const [ShowMore, setShowMore] = useState(false);
  return (
    <section ref={aboutRef} className={style.containerPage}>
      <div className={style.containerTitle}>
        <h3 className={style.titlePage}>About Us</h3>
        <img
          className={style.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>
      <div className={style.ContainerTextAndPhoto}>
        <div className={style.containerText}>
          <h4 className={style.h4}>We Are Feane</h4>
          <p className={style.paragraph}>
            {ShowMore
              ? `At Faene, we don't just serve fast food; we redefine the entire experience. Our commitment has always been built on a simple principle: quality must always be the priority, even in the fastest meals. We meticulously select every cut of meat, every fresh vegetable, and every type of bread baked exclusively for us, ensuring every bite exceeds your expectations. Our story is one of passion for speedy cooking that never compromises on high standards of taste and health. We work tirelessly to ensure your ordering process, from the initial request to the moment the meal arrives, is seamless and enjoyable. We combine superior speed and excellent ingredients to provide you with the perfect, reliable meal at any time, whether you dine with us or order delivery, making Faene the premier destination for food lovers seeking the best and fastest in the city.`
              : `At Faene, we don't just serve fast food; we redefine the entire experience. Our commitment has always been built on a simple principle: quality must always be the priority, even in the fastest meals.We meticulously select every cut of meat, every fresh vegetable, and every type of bread baked exclusively for us, ensuring every bite exceeds your expectations.`}
          </p>

          <div className={style.containerBtnOrder}>
            <button
              onClick={() => setShowMore((more) => !more)}
              className={style1.btnOrderNow}
            >
              {ShowMore ? 'READ LEES' : 'READ MORE'}
            </button>

            {/* <button className={style.btnOrderNow}> MORE</button> */}
            <img
              src="/images/Vector 4.png"
              className={style.photoVector}
              alt=""
            />
          </div>
        </div>
        <img className={style.PhotoMan} src="/images/man.jpg" alt="" />
      </div>
    </section>
  );
}
