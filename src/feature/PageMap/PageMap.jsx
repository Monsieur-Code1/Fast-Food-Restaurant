import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
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
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    persons,
    setPersons,
    date,
    setDate,
    setShowCart,
    InputClient,
    Cart,
    FirstInput,
  } = useData();
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [personsInput, setPersonsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
 
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !nameInput ||
      !emailInput ||
      !phoneInput ||
      !personsInput ||
      !dateInput
    ) {
      toast.error('Please fill in all the required fields');
      FirstInput.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return null;
    }
    setName(nameInput);
    setEmail(emailInput);
    setDate(dateInput);
    setPersons(personsInput);
    setPhone(phoneInput);

    toast.success('Booking successful!');
    // 3. ✅ خطوة تفريغ الحقول (إعادة تعيين الحالة إلى قيم فارغة):
    setNameInput('');
    setEmailInput('');
    setPhoneInput('');
    setPersonsInput(''); // تعيين الـ Select إلى القيمة الافتراضية الفارغة
    setDateInput('');
  }
  function handleGoToPay() {
    setShowCart(true);
  }
  return (
    <form
      ref={InputClient}
      onSubmit={handleSubmit}
      className={style.containerInputs}
    >
      <input
        value={nameInput}
        ref={FirstInput}
        name="name"
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="Your Name"
        className={style.input}
        type="text"
        id=""
      />
      <input
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        placeholder="Email"
        className={style.input}
        type="email"
        name="email"
        id=""
      />
      <input
        value={phoneInput}
        onChange={(e) => setPhoneInput(e.target.value)}
        placeholder="Phone Number"
        className={style.input}
        type="tel"
        name="phone"
        id=""
      />
      <select
        value={personsInput}
        onChange={(e) => setPersonsInput(e.target.value)}
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
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <input
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        placeholder="Date"
        className={`${style.input}`}
        type="datetime-local"
        name="date"
        id=""
      />

      <div className={style2.containerBtnOrder}>
        {Cart.length > 0 &&
        name.length > 0 &&
        email.length > 0 &&
        phone.length > 0 &&
        persons.length > 0 &&
        date.length > 0 &&
        date.length > 0 ? (
          <button onClick={handleGoToPay} className={style2.btnOrderNow}>
            Go to pay
          </button>
        ) : (
          <button type="submit" className={style2.btnOrderNow}>
            Book Now
          </button>
        )}

        <img src="/images/Vector 4.png" className={style2.photoVector} alt="" />
      </div>
    </form>
  );
}
