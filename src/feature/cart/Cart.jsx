import { createPortal } from 'react-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useData } from '../../context/Context';
import style from './cart.module.css';
export default function Cart() {
  return createPortal(
    <div className={style.Container}>
      <CLoseItem />
      <Title />
      <hr />
      <TotalPrice />
      <BtnOrder />
    </div>,

    document.body,
  );
}

function CLoseItem() {
  const { handleShowCart, handleCloseCart } = useData();
  return (
    <div className="flex w-full items-end justify-end">
      <AiFillCloseCircle
        onClick={handleCloseCart}
        className="cursor-pointer text-[35px] text-red-700"
      />
    </div>
  );
}

function BtnOrder() {
  const { handleShowCart, handleCloseCart, scrollToSection, mealsRef } =
    useData();
  function handelOrderNow() {
    handleCloseCart();
    scrollToSection(mealsRef);
  }
  return (
    <div className="flex w-full justify-center">
      <button onClick={handelOrderNow} className={style.btnOrderNow}>
        Order Now
      </button>
    </div>
  );
}

function TotalPrice() {
  return (
    <div className="flex w-full justify-end gap-1">
      <span>TotaL Price:</span>
      <span>00.00$</span>
    </div>
  );
}

function Title() {
  return (
    <div className="flex w-full items-center justify-center">
      <h4 className=' text-xl'>Your Cart</h4>
    </div>
  );
}
