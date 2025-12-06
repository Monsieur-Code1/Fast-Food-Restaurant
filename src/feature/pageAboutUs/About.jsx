// import './About.css';
import style from "./About.module.css"
import style1 from "../style/ButtonNow.module.css"
import { useData } from "../../context/Context";
export default function About() {
  const { aboutRef } = useData();
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
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.
          </p>

          <div className={style.containerBtnOrder}>
            <button className={style1.btnOrderNow}>READ MORE</button>

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
