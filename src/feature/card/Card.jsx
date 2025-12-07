import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/Context';
import style from './Card.module.css';
import styleBtn from './buttonBack.module.css';
import { FiChevronLeft } from 'react-icons/fi';
export default function Card() {
  const { cardRef } = useData();
  const navigate = useNavigate();

  return (
    <div ref={cardRef} className={style.Container}>
      repellendus blanditiis perspiciatis aliquam neque, omnis deleniti vero
      cupiditate officia veniam inventore sit magni amet. Ipsam quod mollitia
      reprehenderit ipsum? Saepe facilis dolor minima sunt ea dignissimos, quasi
      maxime perspiciatis quam doloremque praesentium est sapiente eaque
      laudantium beatae.
      <div className={styleBtn.containerBtnOrder}>
        <button onClick={() => navigate(-1)} className={styleBtn.btnOrderNow}>
          &larr;
          <span className="mx-4">Back</span>
        </button>
      </div>
    </div>
  );
}
