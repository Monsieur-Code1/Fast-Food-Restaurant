import { createPortal } from 'react-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useData } from '../../context/Context';
export default function CartIcon() {
  const { Cart, handleShowCart } = useData();
  return createPortal(
    <>
      {Cart.length > 0 && (
        <div
          onClick={handleShowCart}
          className="fixed bottom-[100px] cursor-pointer left-3 flex items-center justify-center text-teal-700"
        >
          <FaShoppingCart className="text-[35px]" />
          <span>{Cart.length}</span>
        </div>
      )}
    </>,
    document.body,
  );
}
