import { createPortal } from 'react-dom';
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';
import { useData } from '../../context/Context';
import style from './cart.module.css';
export default function Cart() {
  const { Cart } = useData();
  return createPortal(
    <div className={style.Container}>
      <div className="border-b-2 border-solid border-stone-950 bg-[#bf9742]">
        <CLoseItem />
        <Title />
      </div>

      <CartItem />

      <TotalPrice />
      {Cart?.length < 1 && <BtnOrder />}
    </div>,

    document.body,
  );
}

function CartItem() {
  const { Cart, setCart } = useData();

  function AddQuantityToOneItem(el) {
    setCart((prev) => {
      return prev.map((product) => {
        if (product.id === el.id)
          return { ...product, quantity: product.quantity + 1 };
        return product;
      });
    });
  }
  function removeQuantityToOneItem(el) {
    setCart((prev) => {
      const update = prev.map((product) => {
        if (product.id === el.id) {
          return { ...product, quantity: el.quantity - 1 };
        }
        return product;
      });
      return update.filter((el) => el.quantity > 0);
    });
  }

  function handleRemoveMeal(el) {
    setCart((prev) => prev.filter((meal) => meal.id !== el.id));
  }
  return (
    <div className="border-b-[1px] border-solid border-stone-950">
      {Cart?.length > 0 &&
        Cart.map((meal) => {
          return (
            <div
              key={meal.id}
              className="my-4 flex w-full items-center justify-around gap-1"
            >
              <img
                className="h-[80px] w-[80px]"
                src={meal.src}
                alt={meal.name}
              />
              <div className="flex flex-col items-start justify-start">
                <p className="font-medium">{meal.name}</p>
                <div>{meal.price * meal.quantity}$</div>
                <div className="flex items-center justify-center">
                  <span
                    onClick={() => AddQuantityToOneItem(meal)}
                    className="border-1 h-[30px] w-[35px] cursor-pointer border border-solid border-stone-800 pb-[4px] text-center font-bold text-green-900"
                  >
                    +
                  </span>
                  <span className="border-1 h-[30px] w-[35px] border border-stone-800 border-x-transparent pb-[4px] text-center">
                    {meal.quantity}
                  </span>
                  <span
                    onClick={() => removeQuantityToOneItem(meal)}
                    className="border-1 h-[30px] w-[35px] cursor-pointer border border-solid border-stone-800 pb-[4px] text-center font-bold text-red-900"
                  >
                    -
                  </span>
                </div>
              </div>
              <AiFillDelete
                className="stone-red-800 cursor-pointer text-[30px]"
                onClick={() => handleRemoveMeal(meal)}
              />
            </div>
          );
        })}
    </div>
  );
}

function CLoseItem() {
  const { handleShowCart, handleCloseCart } = useData();
  return (
    <div className="flex w-full items-end justify-end">
      <AiFillCloseSquare
        onClick={handleCloseCart}
        className="cursor-pointer text-[35px] text-red-900"
      />
    </div>
  );
}

function BtnOrder() {
  const {
    handleShowCart,
    handleCloseCart,
    scrollToSection,
    mealsRef,
    setShowItem,
  } = useData();
  function handelOrderNow() {
    handleCloseCart();
    setShowItem(false);
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
  const { Cart, setCart } = useData();

  // دالة حساب الإجمالي الصحيحة
  const totalPrice = Cart.reduce((accumulator, currentItem) => {
    // 1. حساب السعر الإجمالي للعنصر الحالي
    const itemTotal = currentItem.price * currentItem.quantity;

    // 2. إضافة هذا الإجمالي إلى القيمة التراكمية السابقة
    return accumulator + itemTotal;
  }, 0); // ✅ البدء بقيمة أولية 0 (رقمية)
  return (
    <>
      {Cart.length > 0 ? (
        <div className="flex w-full justify-center gap-1 font-Inter text-lg font-medium text-[#171715]">
          <span>TotaL Price:</span>
          <span>{totalPrice}$</span>
        </div>
      ) : (
        <p className="mx-4 text-center mt-7 text-red-900">
          Not Found Meals in Your Cart yet
        </p>
      )}
    </>
  );
}

function Title() {
  return (
    <div className="flex w-full items-center justify-center">
      <h4 className="font-Inter text-xl">Your Cart</h4>
    </div>
  );
}
