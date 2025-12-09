import './App.css';
import CustomerPage from './feature/CustomersPage/CustomerPage';
import Frame1 from './feature/FirstPage/Fram1';
import CartIcon from './feature/Icon-Cart/CartIcon';
import About from './feature/pageAboutUs/About';
import PageMap from './feature/PageMap/PageMap';
import Meals from './feature/pageMeals/Meals';
export default function Applayout() {
  return (
    <>
      {/* <Reservations/> */}
      <Frame1 />
      <Meals />
      <About />
      <PageMap />
      <CartIcon />
      <CustomerPage />
    </>
  );
}
