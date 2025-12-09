import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FiEyeOff, FiTrash } from 'react-icons/fi';
import { useData } from '../../context/Context';
import style1 from '../style/ButtonNow.module.css';
import style from './Meals.module.css';
import { meal } from './mealData';
import toast from 'react-hot-toast';
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
  } = useData();
  const [meals] = useState(meal);
  const [showAll, setShowAll] = useState(false);

  function handleRemoveMeal(el) {
    setCart((prev) => prev.filter((meal) => meal.id !== el.id));
    toast.dismiss()
    toast(el.name + ' deleted ', {
      icon: <FiTrash className="text-[25px] text-red-600" />,
      style: {
        border: '1px solid #c62828',
        color: '#c62828',
      },
    });
  }

  // فلترة
  let filteredMeals = meals;
  if (mealsFilter !== 'All') {
    filteredMeals = meals.filter((meal) => meal.type === mealsFilter);
  }

  // تحديد الكروت المرئية
  let visibleMeals = filteredMeals;
  if (mealsFilter === 'All' && !showAll) {
    visibleMeals = filteredMeals.slice(0, 5);
  }

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
                  <span onClick={() => handleRemoveMeal(el)}>In Cart</span>
                  {showCart ? (
                    <FiEyeOff
                      className="ml-[8px] text-[30px] text-orange-950"
                      onClick={() => setShowCart(false)}
                    />
                  ) : (
                    <FaShoppingCart
                      onClick={() => setShowCart(true)}
                      className="ml-[8px] text-[30px] text-orange-950"
                    />
                  )}
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
