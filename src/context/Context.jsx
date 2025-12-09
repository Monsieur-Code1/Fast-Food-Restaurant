import { createContext, useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
const dateContext = createContext();
function DataProvider({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [Cart, setCart] = useState([]);
  function handleShowCart() {
    setShowCart((cart) => !cart);
  }
  function handleCloseCart() {
    setShowCart(false);
  }
  // function handleAddItemInCart(product) {
  //   setCart((prev) => {
  //     const exist = prev?.find((item) => item.id === product.id);
  //     if (exist) {
  //       return prev.map((meal) =>
  //         meal.id === product.id
  //           ? { ...meal, quantity: meal.quantity + 1 }
  //           : meal,
  //       );
  //     }
  //     toast.dismiss()
  //     toast.success(product.name +' Added successfully');
  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // }

  function handleAddItemInCart(product) {
    let wasNewItem = false; // ⭐️ متغير لتتبع إذا كان العنصر جديدًا

    setCart((prev) => {
      const exist = prev?.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((meal) =>
          meal.id === product.id
            ? { ...meal, quantity: meal.quantity + 1 }
            : meal,
        );
      }

      // ⭐️ إذا كان العنصر غير موجود، سنقوم بإضافته وتعيين المتغير إلى true
      wasNewItem = true;
      return [...prev, { ...product, quantity: 1 }];
    });

    // ⭐️ 🛠️ تنفيذ التأثير الجانبي (عرض التوست) خارج دالة setCart 🛠️
    if (wasNewItem) {
      toast.dismiss();
      toast.success(product.name + ' Added successfully');
    }
  }

  const frame1Ref = useRef();
  const mealsRef = useRef();
  const BookTableRef = useRef();
  const mapRef = useRef();
  const aboutRef = useRef();
  const cardRef = useRef();

  // 2. دالة التمرير (Scroll Handler Function)
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth', // لتمرير سلس
      block: 'start', // لتثبيت العنصر في أعلى منطقة العرض
    });
  };
  return (
    <dateContext.Provider
      value={{
        aboutRef,
        frame1Ref,
        mapRef,
        BookTableRef,
        mealsRef,
        scrollToSection,
        cardRef,
        showCart,
        setShowCart,
        handleShowCart,
        handleCloseCart,
        showItem,
        setShowItem,
        Cart,
        setCart,
        handleAddItemInCart,
      }}
    >
      {children}
    </dateContext.Provider>
  );
}
function useData() {
  const context = useContext(dateContext);
  return context;
}

export { DataProvider, useData };
