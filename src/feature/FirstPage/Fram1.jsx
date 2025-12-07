import { useEffect, useState } from 'react';
import './styleFram1.css';

import { useData } from '../../context/Context';
import Header from '../header/Header';

export default function Frame1() {
  const { frame1Ref } = useData();

  const [meal, setMeal] = useState('Burger');
  const meals = ['Burger', 'Pizza', 'Pasta'];
  const [active, setActive] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = prev === meals.length ? 1 : prev + 1; // يدوّر بين 1 و 2 و 3
        setMeal(meals[next - 1]); // نحدّث اسم الوجبة بناءً على active
        return next;
      });
    }, 2000);

    return () => clearInterval(interval); // تنظيف الـ interval عند فك المكون
  }, []);
  return (
    <div ref={frame1Ref} className="AppContentFrame">
      <Header />
      <h1 className="Title">Fast Food Restaurant</h1>

      <p className="SpanText">
        Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapientead
        mollitia laborum quam quisquam esse error unde. Tempora ex doloremque,
        labore,sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
      </p>
      <div className="container-btn-and-img">
        <div className="AppButtonOrder">
          <button className="ButtonOrder">ORDER NOW</button>
          <img className="ImgVector" src="/images/Vector 4.png" alt="Vector" />
          <div className="TastyThursdays">
            {meal === 'Burger' && (
              <>
                <p className="Thursdays">Tasty Thursdays</p>
                <p className="Off">20% Off</p>
              </>
            )}
            {meal === 'Pizza' && (
              <>
                <p className="Thursdays">Pizza Days</p>
                <p className="Off">15% Off</p>
              </>
            )}
            {meal === 'Pasta' && (
              <>
                <p className="Thursdays">Delicious Pasta</p>
                <p className="Off">25% Off</p>
              </>
            )}

            <img className="ImagCircle" src="/images/Vector 6.png" />
          </div>
        </div>
        <div className="AppImageStyle">
          {meal === 'Burger' && (
            <img
              className="ImageStyle"
              key="Burger"
              src="/images/Burger.png"
              alt="Burger"
            />
          )}
          {meal === 'Pizza' && (
            <img
              className="ImageStyle"
              key="Pizza"
              src="/images/pizza.png"
              alt="Pizza"
            />
          )}
          {meal === 'Pasta' && (
            <img
              className="ImageStyle"
              key="Pasta"
              src="/images/Pasta.png"
              alt="Pasta"
            />
          )}
        </div>
      </div>

      <div className="ContainerSpan">
        <span
          className={`${meal == 'Burger' && 'SpanTreeDotToShowMealActive'} SpanTreeDotToShowMeal`}
        ></span>
        <span
          className={`${meal == 'Pizza' && 'SpanTreeDotToShowMealActive'} SpanTreeDotToShowMeal`}
        ></span>
        <span
          className={`${meal == 'Pasta' && 'SpanTreeDotToShowMealActive'} SpanTreeDotToShowMeal`}
        ></span>
      </div>
    </div>
  );
}
