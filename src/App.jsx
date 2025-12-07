import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Applayout from './Applayout';
import { DataProvider, useData } from './context/Context';

import NotFound from './feature/PageError/NotFound';
import Cart from './feature/cart/Cart';
export default function App() {
  const { showCart, setShowCart } = useData();
  return (
    <>
      {showCart && <Cart />}
     
        <Routes>
          <Route path="/" element={<Applayout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </>
  );
}
