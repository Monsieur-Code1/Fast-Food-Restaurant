import { createContext, useContext, useRef } from 'react';
const dateContext = createContext();
function DataProvider({ children }) {
  const frame1Ref = useRef();
  const mealsRef = useRef();
  const customersRef = useRef();
  const mapRef = useRef();
  const aboutRef = useRef();

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
        customersRef,
        mealsRef,
        scrollToSection,
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
