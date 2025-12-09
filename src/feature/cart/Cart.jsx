import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
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
  /*
  function removeQuantityToOneItem(el) {
    setCart((prev) => {
      const update = prev.map((product) => {
        if (product.id === el.id) {
          return { ...product, quantity: el.quantity - 1 };
        }
        if (el.quantity) {
          toast(el.name + ' deleted ', {
            icon: <FiTrash className="text-[25px] text-red-600" />,
          });
        }
        return product;
      });
      return update.filter((el) => el.quantity > 0);
    });
  }
*/
  function handleRemoveMeal(el) {
    toast.dismiss();
    toast(el.name + ' deleted ', {
      icon: <FiTrash className="text-[25px] text-red-600" />,
        style: {
          border: '1px solid #c62828',
          color: '#c62828',
        },
    });
    setCart((prev) => prev.filter((meal) => meal.id !== el.id));
  }



  function removeQuantityToOneItem(el) {
    let removedItem = null; // 👈 1. متغير لتتبع العنصر الذي سيتم حذفه نهائيًا

    setCart((prev) => {
      const update = prev.map((product) => {
        if (product.id === el.id) {
          const newQuantity = product.quantity - 1;

          // 2. إذا كانت الكمية ستصل للصفر، سجل اسم المنتج
          if (newQuantity === 0) {
            removedItem = product.name;
            return { ...product, quantity: newQuantity };
          }

          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      // 3. فلترة العناصر التي كميتها أكبر من صفر
      return update.filter((item) => item.quantity > 0);
    });

    // 4. تنفيذ التأثير الجانبي (Toast) خارج دالة التحديث
    //  (نتأكد أن removedItem ليس null، أي أن العنصر أُزيل نهائياً)
    if (removedItem) {
      toast.dismiss();
      toast(removedItem + ' deleted', {
        icon: <FiTrash className="text-[25px] text-red-600" />,
        style: {
          border: '1px solid #c62828',
          color: '#c62828',
        },
      });
    }
  }
  return (
    <div className="border-b-[2px] border-solid border-stone-950 font-Inter text-[#171715]">
      {Cart?.length > 0 &&
        Cart.map((meal, index) => {
          return (
            <div
              key={meal.id}
              className="my-1 flex w-full items-center justify-start border border-solid border-stone-900 px-3 py-1"
            >
              <img
                className="mr-3 h-[80px] w-[80px]"
                src={meal.src}
                alt={meal.name}
              />
              <div className="flex w-[60%] flex-col items-start justify-start text-left">
                <p className="font-medium">{meal.name}</p>
                <div className="w-full pl-5">{meal.price * meal.quantity}$</div>
                <div className="text-c flex items-center justify-center">
                  <span
                    onClick={() => AddQuantityToOneItem(meal)}
                    className="border-1 h-[30px] w-[35px] cursor-pointer rounded-[12px] border border-solid border-green-800 bg-green-100 pb-[4px] text-center font-bold text-green-900"
                  >
                    +
                  </span>
                  <span className="text[#61481c] h-[30px] w-[35px] pb-[4px] text-center">
                    {meal.quantity}
                  </span>
                  <span
                    onClick={() => removeQuantityToOneItem(meal)}
                    className="border-1 h-[30px] w-[35px] cursor-pointer rounded-[12px] border border-solid border-red-800 bg-red-100 pb-[4px] text-center font-bold text-red-900"
                  >
                    -
                  </span>
                </div>
              </div>
              <AiFillDelete
                className="cursor-pointer text-[30px] text-red-700"
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
        <div className="mt-4 flex w-full justify-center gap-1 font-Inter text-lg font-bold text-[#171715]">
          <span>TotaL Price:</span>
          <span>{totalPrice}$</span>
        </div>
      ) : (
        <p className="mx-4 mt-7 text-center text-red-900">
          Not Found Meals in Your Cart yet
        </p>
      )}
    </>
  );
}

function Title() {
  return (
    <div className="flex w-full items-center justify-center text-[#171715]">
      <h4 className="font-Inter text-xl">Your Cart</h4>
    </div>
  );
}
