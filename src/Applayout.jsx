import './App.css';
import { DataProvider } from './context/Context';
import Card from './feature/card/Card';
import CustomerPage from './feature/CustomersPage/CustomerPage';
import Frame1 from './feature/FirstPage/Fram1';
import Header from './feature/header/Header';
import About from './feature/pageAboutUs/About';
import PageMap from './feature/PageMap/PageMap';
import Meals from './feature/pageMeals/Meals';
import { createContext } from 'react';
export default function Applayout() {
  return (
    <>
      <Frame1 />
      <Meals />
      <About />
      <PageMap />

      <CustomerPage />
    </>
  );
}
