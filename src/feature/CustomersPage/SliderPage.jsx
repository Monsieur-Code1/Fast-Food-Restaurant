import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';

import styleS from './Slider.module.css';
import StarRating from '../starsRating/StarRating';
import { useData } from '../../context/Context';

export default function SimpleSlider() {
  const { ratingPersons } = useData();

  const carouselRef = useRef(null);
  const innerRef = useRef(null);

  const [dragLimit, setDragLimit] = useState(0);

  const calculateDrag = () => {
    if (!carouselRef.current || !innerRef.current) return;

    const carouselWidth = carouselRef.current.offsetWidth;
    const innerWidth = innerRef.current.scrollWidth;

    const maxDrag = innerWidth - carouselWidth;

    setDragLimit(maxDrag > 0 ? -maxDrag : 0);
  };

  useEffect(() => {
    calculateDrag();

    window.addEventListener('resize', calculateDrag);
    return () => window.removeEventListener('resize', calculateDrag);
  }, [ratingPersons.length]);

  return (
    <div className={styleS.AppSlider}>
      <motion.div
        ref={carouselRef}
        className={styleS.carousel}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          ref={innerRef}
          className={styleS.innerCarousel}
          drag="x"
          dragConstraints={{ left: dragLimit, right: 0 }}
        >
          {ratingPersons.map((el) => (
            <div key={el.id} className={styleS.cardSlider}>
              <div className={styleS.cardAppPhotoAndStar}>
                {el.img ? (
                  <img src={el.img} alt={el.name} className={styleS.imgCard} />
                ) : (
                  <FaUser size={40} />
                )}

                <span className={styleS.starCard}>
                  <StarRating
                    defaultRating={el.rating}
                    size={26}
                    maxRating={5}
                    messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
                  />
                </span>
              </div>

              <h4 className={styleS.titleCard}>{el.name}</h4>
              <p className={styleS.textCard}>{el.text}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
