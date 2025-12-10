import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/Context';
import style2 from './ButtonNow.module.css';
import Map from './Map';
import style from './PageMap.module.css';
import style1 from './TitlePage.module.css';

export default function PageMap() {
  const { BookTableRef } = useData();
  return (
    <div ref={BookTableRef} className={style.Container}>
      <div className={style1.containerTitle}>
        <h3 className={style1.titlePage}>Book A Table</h3>
        <img
          className={style1.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>
      <div className={style.ContainerInputAndMap}>
        <Inputs />
        <div className={style.map}>
          <Map />
        </div>
      </div>
    </div>
  );
}

function Inputs() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    persons: '',
    date: '',
  });
  function handelChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://api.sheetbest.com/sheets/da49e06f-b7f5-4422-ae96-4073b28112c3',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.containerInputs}>
      <input
        value={data.name}
        name="name"
        onChange={handelChange}
        placeholder="Your Name"
        className={style.input}
        type="text"
        id=""
      />
      <input
        value={data.email}
        onChange={handelChange}
        placeholder="Email"
        className={style.input}
        type="email"
        name="email"
        id=""
      />
      <input
        value={data.phone}
        onChange={handelChange}
        placeholder="Phone Number"
        className={style.input}
        type="tel"
        name="phone"
        id=""
      />
      <select
        value={data.persons}
        onChange={handelChange}
        placeholder="How Many Person?"
        className={style.input}
        name="persons"
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
        value={data.date}
        onChange={handelChange}
        placeholder="Date"
        className={`${style.input}`}
        type="datetime-local"
        name="date"
        id=""
      />

      <div className={style2.containerBtnOrder}>
        <button className={style2.btnOrderNow}>Book Now</button>
        <img src="/images/Vector 4.png" className={style2.photoVector} alt="" />
      </div>
    </form>
  );
}
