import style2 from './ButtonNow.module.css';
import Map from './Map';
import style from './PageMap.module.css';
import style1 from './TitlePage.module.css';
export default function PageMap() {
  return (
    <div className={style.Container}>
      <div className={style1.containerTitle}>
        <h3 className={style1.titlePage}>Book A Table</h3>
        <img
          className={style1.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>
      <div className={style.ContainerInputAndMap}>
        <div className={style.containerInputs}>
          <input
            placeholder="Your Name"
            className={style.input}
            type="text"
            name=""
            id=""
          />
          <input
            placeholder="Email"
            className={style.input}
            type="email"
            name=""
            id=""
          />
          <input
            placeholder="Phone Number"
            className={style.input}
            type="tel"
            name=""
            id=""
          />
          <select
            placeholder="How Many Person?"
            className={style.input}
            name=""
            id=""
          >
            <option value="">How Many Person?</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <input
            placeholder="Date"
            className={style.input}
            type="date"
            name=""
            id=""
          />
          <div className={style2.containerBtnOrder}>
            <button className={style2.btnOrderNow}>Book Now</button>
            <img
              src="/images/Vector 4.png"
              className={style2.photoVector}
              alt=""
            />
          </div>
        </div>
        <div className={style.map}>
          <Map />
        </div>
      </div>
    </div>
  );
}
