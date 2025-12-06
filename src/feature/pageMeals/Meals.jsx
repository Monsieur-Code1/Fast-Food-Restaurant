import { useState } from 'react';
import style1 from '../style/ButtonNow.module.css';
import style from './Meals.module.css';
import { meal } from './mealData';
import { useData } from '../../context/Context';
export default function Meals() {
  const [mealsFilter, setMealsFilter] = useState('All');
  const{  mealsRef }=useData()
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
      <div className="flex w-full items-center justify-center"></div>
      {/* <button className={style.btnShowMore}>VIEW MORE</button> */}
      <div className={style1.containerBtnOrder}>
        <button className={style1.btnOrderNow}>VIEW MORE</button>
      </div>
    </section>
  );
}

function ButtonsFilter({ setMealsFilter }) {
  return (
    <div className={style.containerBtnFilter}>
      <button onClick={() => setMealsFilter('All')}>All</button>
      <button onClick={() => setMealsFilter('Burger')}>Burger</button>
      <button onClick={() => setMealsFilter('Pizza')}>Pizza</button>
      <button onClick={() => setMealsFilter('Pasta')}>Pasta</button>
      <button onClick={() => setMealsFilter('Fries')}>Fries</button>
    </div>
  );
}

function Products({ mealsFilter, setMealsFilter }) {
  const [meals, setMeals] = useState(meal);
  if (mealsFilter === 'All') mealsFilter = meals;
  if (mealsFilter === 'Burger')
    mealsFilter = meals.filter((meal) => meal.type === 'Burger');
  if (mealsFilter === 'Pizza')
    mealsFilter = meals.filter((meal) => meal.type === 'Pizza');
  if (mealsFilter === 'Pasta')
    mealsFilter = meals.filter((meal) => meal.type === 'Pasta');
  if (mealsFilter === 'Fries')
    mealsFilter = meals.filter((meal) => meal.type === 'Fries');
  return (
    <div className={style.containerCards}>
      {mealsFilter?.map((el) => {
        return (
          <div key={el.id} className={style.card}>
            <div className={style.cardParent}>
              <span className={style.lineHor}></span>
              <span className={style.lineVert}></span>
              <p className={style.titleCard}>{el.name}</p>
              <p className={style.descriptionCard}>{el.description}</p>
              <div className={style.containerRating}>
                <img
                  src="/images/star.png"
                  alt={style.star}
                  className={style.starRating}
                />
                <span className={style.numberRating}>4.3</span>
              </div>
              <div className={style.containerTime}>
                <img src="/images/watch.png" alt="" className={style.watch} />
                <span className={style.time}>12:00-12:30</span>
              </div>
              <div className={style.price}>{el.price}$</div>
              <button className={style.btnOrder}>Order now</button>
            </div>
            <img src={el.src} className={style.photoMeal} alt="" />
          </div>
        );
      })}
    </div>
  );
}
