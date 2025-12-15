import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';
import { useData } from '../../context/Context';
import DeleteConfirmationModal from '../Modal/Modal';
import style1 from '../style/ButtonNow.module.css';
import style from './Meals.module.css';
import { meal } from './mealData';
export default function Meals() {
  const [mealsFilter, setMealsFilter] = useState('All');
  const { mealsRef, handleShowCart, Cart } = useData();
  return (
    <section ref={mealsRef} className={style.Container}>
      <div className={style.AppTitle}>
        <h2 className={style.titlePage}>Our Menu</h2>
        <img
          className={style.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>
      <ButtonsFilter {...{ mealsFilter, setMealsFilter }} />
      <Products {...{ mealsFilter, setMealsFilter }} />
    </section>
  );
}

function ButtonsFilter({ setMealsFilter, mealsFilter }) {
  return (
    <div className={style.containerBtnFilter}>
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setMealsFilter('All')}
        className={`${mealsFilter === 'All' ? `${style.activeBtn}` : `${style.BtnFilter}`}`}
      >
        All
      </button>
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setMealsFilter('Burger')}
        className={`${mealsFilter === 'Burger' ? `${style.activeBtn}` : `${style.BtnFilter}`}`}
      >
        Burger
      </button>
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setMealsFilter('Pizza')}
        className={`${mealsFilter === 'Pizza' ? `${style.activeBtn}` : `${style.BtnFilter}`}`}
      >
        Pizza
      </button>
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setMealsFilter('Pasta')}
        className={`${mealsFilter === 'Pasta' ? `${style.activeBtn}` : `${style.BtnFilter}`}`}
      >
        Pasta
      </button>
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setMealsFilter('Fries')}
        className={`${mealsFilter === 'Fries' ? `${style.activeBtn}` : `${style.BtnFilter}`}`}
      >
        Fries
      </button>
    </div>
  );
}
function Products({ mealsFilter }) {
  const {
    Cart,
    setCart,
    handleAddItemInCart,
    handleShowCart,
    showCart,
    setShowCart,
    searchbar,
    setSearchbar,
  } = useData();
  const [meals] = useState(meal);
  const [showAll, setShowAll] = useState(false);

  // فلترة
  let filteredMeals = meals;
  if (mealsFilter !== 'All') {
    filteredMeals = meals.filter((meal) => meal.type === mealsFilter);
  }
  if (searchbar) {
    filteredMeals = filteredMeals.filter((meal) =>
      meal.name.toLowerCase().includes(searchbar.toLowerCase()),
    );
  }
  // تحديد الكروت المرئية
  let visibleMeals = filteredMeals;
  if (mealsFilter === 'All' && !showAll) {
    visibleMeals = filteredMeals.slice(0, 5);
  }
  const [ShowModalDelete, setShowModalDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handelShowModal = (el) => {
    setItemToDelete(el); // 👈 تسجيل العنصر
    setShowModalDelete(true);
  };
  const handelCloseModal = () => setShowModalDelete(false);

  // ⭐️ 4. دالة الحذف المؤكدة: تستخدم itemToDelete وتغلق الموديل
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      // تنفيذ منطق الحذف
      setCart((prev) => prev.filter((meal) => meal.id !== itemToDelete.id));
      toast.dismiss();
      toast(itemToDelete.name + ' deleted ', {
        icon: <FiTrash className="text-[25px] text-red-600" />,
        style: { border: '1px solid #c62828', color: '#c62828' },
      });
    }
    handelCloseModal(); // إغلاق الموديل بعد الحذف
  };
  return (
    <>
      <div className={style.containerCards}>
        {visibleMeals.map((el) => (
          <div key={el.id} className={style.card}>
            <div className={style.cardParent}>
              <span className={style.lineHor}></span>
              <span className={style.lineVert}></span>
              <p className={style.titleCard}>{el.name}</p>
              <p className={style.descriptionCard}>{el.description}</p>
              <div className={style.containerRating}>
                <img src="/images/star.png" className={style.starRating} />
                <span className={style.numberRating}>4.3</span>
              </div>
              <div className={style.containerTime}>
                <img src="/images/watch.png" className={style.watch} />
                <span className={style.time}>12:00-12:30</span>
              </div>
              <div className={style.price}>{el.price}$</div>
              {Cart.some((meal) => meal.id === el.id) ? (
                <button
                  className={`${style.btnOrder} flex items-center justify-center text-orange-950`}
                >
                  <span onClick={() => handelShowModal(el)}>Remove </span>
                </button>
              ) : (
                <button
                  onClick={() => handleAddItemInCart(el)}
                  className={style.btnOrder}
                >
                  Add to cart
                </button>
              )}
            </div>
            <img src={el.src} className={style.photoMeal} alt="" />
          </div>
        ))}
        {ShowModalDelete && (
          <DeleteConfirmationModal
            itemName={itemToDelete?.name}
            onClose={handelCloseModal}
            onConfirmDelete={handleConfirmDelete}
            isOpen={ShowModalDelete}
          />
        )}
      </div>

      {/* زرار VIEW MORE */}

      <div
        className={`${style1.containerBtnOrder} flex items-center justify-around`}
      >
        {mealsFilter === 'All' && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={style1.btnOrderNow}
          >
            {showAll ? 'VIEW LESS' : 'VIEW MORE'}
          </button>
        )}
        {Cart.length > 0 && (
          <button
            onClick={handleShowCart}
            className={`${style1.btnOrderNow} ml-3`}
          >
            Show Your Cart
          </button>
        )}
      </div>
    </>
  );
}
