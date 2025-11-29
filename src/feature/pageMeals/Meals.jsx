import { useState } from 'react';
import './Meals.css';
import { meal } from './mealData';
export default function Meals() {
  const [meals, setMeals] = useState(meal);
  return (
    <section className="Container">
      <h2 className="title-page">Our Menu</h2>
      <div className="container-btn-filter">
        <button>All</button>
        <button>Burger</button>
        <button>Pizza</button>
        <button>Pasta</button>
        <button>Fries</button>
      </div>
      <div className="containerCards">
        {meals?.map((el) => {
          return (
            <div key={el.id} className="card">
              <div className="card-parent">
               
                  <p className="title-Card">{el.name}</p>
                  <p className="description-card">{el.description}</p>
                  <div className="container-rating">
                    <img
                      src="/public/images/star.png"
                      alt="star"
                      className="star-rating"
                    />
                    <span className="number-rating">4.3</span>
                  </div>
                  <div className="container-time">
                    <img src="/images/watch.png" alt="" className="watch" />
                    <span className="time">12:00-12:30</span>
                  </div>
                  <div className="price">{el.price}$</div>
                  <button className="btn-order">Order now</button>
                </div>
                <img src={el.src} className="photo-meal" alt="" />
                <span className="line-hor"></span>
                <span className="line-vert"></span>
              </div>
           
          );
        })}
      </div>
      <button className="btn-show-more">VIEW MORE</button>
    </section>
  );
}
