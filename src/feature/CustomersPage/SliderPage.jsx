import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { persons } from './rating';
// ... باقي الاستيرادات
import styleS from './Slider.module.css';
export default function SimpleSlider() {
  const [rating, setRating] = useState(persons);
  const [width, setWidth] = useState(0);
  const controls = useAnimation();
  let margin = 0;
  const widthMargin = rating.map((el) => {
    margin += 2;
  });
  const carouselRef = useRef();
  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  // تحديد عرض الخطوة (عرض البطاقة الواحدة + هامشها)
  // نفترض أن عرض البطاقة هو 390px والهامش الكلي هو 10px
  const CARD_STEP_WIDTH = 400; // 390 + 10

  const moveSlider = (direction) => {
    // الموضع الحالي للسلايدر (القيمة الافتراضية 0)
    const currentX = controls.current?.x || 0;
    let targetX;

    // حساب الموضع المستهدف
    if (direction === 'right') {
      // التحرك نحو اليسار (قيم سالبة)
      // نضمن أننا لا نتجاوز الحد الأقصى للسحب (-width)
      targetX = Math.max(currentX - CARD_STEP_WIDTH, -width);
    } else {
      // التحرك نحو اليمين (قيم موجبة أو 0)
      // نضمن أننا لا نتجاوز الصفر (بداية السلايدر)
      targetX = Math.min(currentX + CARD_STEP_WIDTH, 0);
    }

    // بدء الحركة باستخدام Framer Motion
    controls.start({
      x: targetX,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  };
  return (
    <div className={styleS.AppSlider}>
      <button
        onClick={() => moveSlider('left')}
        className={styleS.navButtonLeft}
      >
        <FiChevronLeft className={styleS.ArrowClick} size={30} />
      </button>

      <motion.div
        ref={carouselRef}
        className={styleS.carousel}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          drag="x"
          animate={controls}
          dragConstraints={{ right: 0, left: -(width + margin) }}
          className={styleS.innerCarousel}
        >
          {rating.map((el) => (
            <div key={el.id} className={styleS.cardSlider}>
              <div className={styleS.cardAppPhotoAndStar}>
                <img src={el.img} className={styleS.imgCard} alt={el.name} />
                <span className={styleS.starCard}>
                  <FiStar className={styleS.star} />
                  <FiStar className={styleS.star} />
                  <FiStar className={styleS.star} />
                  <FiStar className={styleS.star} />
                  <FiStar className={styleS.star} />
                </span>
              </div>
              <h4 className={styleS.titleCard}>{el.name}</h4>
              <p className={styleS.textCard}>{el.text}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <button
        onClick={() => moveSlider('right')}
        className={styleS.navButtonRight}
      >
        <FiChevronRight className={styleS.ArrowClick} size={30} />
      </button>
    </div>
  );
}
