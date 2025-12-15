import { createContext, useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { personsWasRating } from './../feature/CustomersPage/rating';
const dateContext = createContext();
function DataProvider({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [dataClient, setDataCLient] = useState('');
  const [Cart, setCart] = useState([]);
  function handleShowCart() {
    setShowCart((cart) => !cart);
  }
  function handleCloseCart() {
    setShowCart(false);
  }
  //  data Client-first
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [persons, setPersons] = useState('');
  const [date, setDate] = useState('');
  //غلق موديل الخاص بالتقييم 
  const [openModelRating,setOpenModelRating]=useState(false)
  //userRating
   const [ratingPersons, setRatingPersons] = useState(personsWasRating);
// searchbar
const [searchbar,setSearchbar]=useState("")
  //  data Client-end

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
  const InputClient = useRef();
  const invoiceRef = useRef();

  // 2. دالة التمرير (Scroll Handler Function)
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth', // لتمرير سلس
      block: 'start', // لتثبيت العنصر في أعلى منطقة العرض
    });
  };

  // دالة حساب الإجمالي الصحيحة
  const totalPrice = Cart.reduce((accumulator, currentItem) => {
    // 1. حساب السعر الإجمالي للعنصر الحالي
    const itemTotal = currentItem.price * currentItem.quantity;

    // 2. إضافة هذا الإجمالي إلى القيمة التراكمية السابقة
    return accumulator + itemTotal;
  }, 0); // ✅ البدء بقيمة أولية 0 (رقمية)
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
        dataClient,
        setDataCLient,
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        persons,
        setPersons,
        date,
        setDate,
        InputClient,
        totalPrice,
        invoiceRef,
        openModelRating,
        setOpenModelRating,
        ratingPersons,
        setRatingPersons,
        searchbar,
        setSearchbar,
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
