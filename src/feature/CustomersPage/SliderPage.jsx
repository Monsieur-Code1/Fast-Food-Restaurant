// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { persons } from './rating';
// import style from './CustomerPage.module.css';
// import { FiStar } from 'react-icons/fi';

// export default function SimpleSlider() {
//       const [rating, setRating] = useState(persons);

//   var settings = {
//     dots: false,
//     arrows: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1500,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 1100,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },

//       {
//         breakpoint: 817,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };
//   return (

//       <div className="m-auto w-3/4">
//         <div className="mt-10">
//           <Slider {...settings}>
//             {rating?.map((el) => {
//               return (
//                 <div key={el.id} className={style.cardSlider}>
//                   <div className={style.cardAppPhotoAndStar}>
//                     <img src={el.img} className={style.imgCard} />
//                     <span className={style.starCard}>
//                       <FiStar className={style.star} />
//                       <FiStar className={style.star} />
//                       <FiStar className={style.star} />
//                       <FiStar className={style.star} />
//                       <FiStar className={style.star} />
//                     </span>
//                   </div>
//                   <h4 className={style.titleCard}>{el.name}</h4>
//                   <p className={style.textCard}>{el.text}</p>
//                 </div>
//               );
//             })}
//           </Slider>
//         </div>
//       </div>

//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { persons } from './rating';
import style from './CustomerPage.module.css';
import { FiStar } from 'react-icons/fi';

export default function SimpleSlider() {
  const [rating] = useState(persons);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 817,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // إعادة حساب Slider عند mount للتأكد من breakpoints
  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <Slider ref={sliderRef} {...settings}>
        {rating.map((el) => (
          <div key={el.id} className={style.cardSlider}>
            <div className={style.cardAppPhotoAndStar}>
              <img src={el.img} className={style.imgCard} alt={el.name} />
              <span className={style.starCard}>
                <FiStar className={style.star} />
                <FiStar className={style.star} />
                <FiStar className={style.star} />
                <FiStar className={style.star} />
                <FiStar className={style.star} />
              </span>
            </div>
            <h4 className={style.titleCard}>{el.name}</h4>
            <p className={style.textCard}>{el.text}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}