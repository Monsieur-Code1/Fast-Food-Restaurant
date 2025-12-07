import { createContext, useContext, useRef, useState } from 'react';
const dateContext = createContext();
function DataProvider({ children }) {
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
