import { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/Context';
import CustomModal from '../Modal/CustomeModal';
import DeleteConfirmationModal from '../Modal/Modal';
import style from './cart.module.css';
export default function Cart() {
  const { Cart, dataClient } = useData();
  console.log(Cart);
  return createPortal(
    <div className={`${style.Container} `}>
      <div className="border-b-2 border-solid border-stone-950 bg-[#bf9742]">
        <CLoseItem />
        <Title />
      </div>

      <CartItem />

      <TotalPrice />
      {Cart?.length < 1 && <BtnOrder />}
      {Cart?.length > 0 && <PayNow />}
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

  function handleRemoveMeal(el) {
    // ... (منطق حذف الوجبة السابق)
    toast.dismiss();
    toast(el.name + ' deleted ', {
      icon: <FiTrash className="text-[25px] text-red-600" />,
      style: {
        border: '1px solid #c62828',
        color: '#c62828',
      },
    });
    setCart((prev) => prev.filter((meal) => meal.id !== el.id));
    handleCloseModal(); // أغلق النافذة بعد الحذف
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

  const [mealToDeleteId, setMealToDeleteId] = useState(null);

  // الفتح: قم بتخزين معرّف الوجبة التي تم النقر عليها
  const handleOpenModal = (mealId) => setMealToDeleteId(mealId);

  // الإغلاق: قم بتعيين القيمة إلى null
  const handleCloseModal = () => setMealToDeleteId(null);
  return (
    <div className="border-b-[2px] border-solid border-stone-950 font-Inter text-[#171715]">
      {Cart?.length > 0 &&
        Cart.map((meal, index) => {
          const isCurrentMealModalOpen = mealToDeleteId === meal.id;
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
                onClick={() => handleOpenModal(meal.id)}
              />
              {isCurrentMealModalOpen && (
                <DeleteConfirmationModal
                  isOpen={true}
                  onClose={handleCloseModal}
                  itemName={meal.name}
                  onConfirmDelete={() => handleRemoveMeal(meal)}
                />
              )}
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
  const { Cart, setCart, totalPrice } = useData();

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
function PayNow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const {
    setCart,
    name,
    email,
    phone,
    persons,
    date,
    scrollToSection,
    InputClient,
    setShowCart,
  } = useData();

  const navigate = useNavigate();
  function handelClickPay() {
    // التحقق من أن جميع البيانات موجودة وليست سلاسل نصية فارغة
    const isClientDataMissing =
      name.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      persons.length === 0 ||
      date.length === 0;

    if (isClientDataMissing) {
      // 1. ✅ المنطق الصحيح: إذا كانت البيانات ناقصة، اطلب من المستخدم إدخالها.
      handleOpenModal();
    } else {
      navigate('/PaymentApp');
      setShowCart(false);
    }
  }
  function handelPleaseEnterDataClient() {
    setShowCart(false);
    scrollToSection(InputClient);
  }
  return (
    <div>
      {!isPay && (
        <div className="flex w-full justify-center">
          <button onClick={handelClickPay} className={style.btnOrderNow}>
            Pay Now
          </button>
        </div>
      )}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          okay={'okay'}
          onConfirmDelete={handelPleaseEnterDataClient}
          text="please enter your information to complete the booking process"
        />
      )}
    </div>
  );
}
