import { useState } from 'react';
import style from './Meals.module.css';
import { meal } from './mealData';
import style1 from "../style/ButtonNow.module.css"
export default function Meals() {
  const [meals, setMeals] = useState(meal);
  return (
    <section className={style.Container}>
      <div className={style.AppTitle}>
        <h2 className={style.titlePage}>Our Menu</h2>
        <img
          className={style.imgUnderLine}
          src="/images/underLine.png"
          alt=""
        />
      </div>
      <div className={style.containerBtnFilter}>
        <button>All</button>
        <button>Burger</button>
        <button>Pizza</button>
        <button>Pasta</button>
        <button>Fries</button>
      </div>
      <div className={style.containerCards}>
        {meals?.map((el) => {
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
      <div className="flex w-full items-center justify-center"></div>
      {/* <button className={style.btnShowMore}>VIEW MORE</button> */}
      <div className={style1.containerBtnOrder}>
        <button className={style1.btnOrderNow}>VIEW MORE</button>
      </div>
    </section>
  );
}
