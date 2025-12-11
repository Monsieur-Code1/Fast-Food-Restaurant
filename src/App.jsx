import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Applayout from './Applayout';
import { DataProvider, useData } from './context/Context';

import NotFound from './feature/PageError/NotFound';
import Cart from './feature/cart/Cart';
import { Toaster } from 'react-hot-toast';
import Invoice from './feature/invoice/Invoice';
import Payment from './feature/invoice/Payment';
import PaymentApp from './feature/invoice/Payment';
export default function App() {
  const { showCart, setShowCart } = useData();
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '12px 24px',
            backgroundColor: '#eee',
            color: '#000',
          },
        }}
      />
      {showCart && <Cart />}

      <Routes>
        <Route path="/" element={<Applayout />} />
        <Route path="/PaymentApp" element={<PaymentApp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
