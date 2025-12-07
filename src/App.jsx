import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Applayout from './Applayout';
import { DataProvider, useData } from './context/Context';
import Card from './feature/card/Card';
import NotFound from './feature/PageError/NotFound';
export default function App() {
 
  return (
    <>
      
     
        <Routes>
          <Route path="/" element={<Applayout />} />
          <Route path="/card" element={<Card />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </>
  );
}
