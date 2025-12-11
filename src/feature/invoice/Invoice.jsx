import { useData } from '../../context/Context';
import { getCurrentDateTime } from './../../services/GetCurrntDate';
export default function Invoice() {
  const { invoiceRef } = useData();
  return (
    <div ref={invoiceRef} className="flex items-center justify-center">
      <div className="m-2 flex w-[780px] flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <HeaderInvoice />
        </div>
        <div className="flex w-full items-center justify-center">
          <TableCLient />
        </div>

        <h4 className="mb-1 mt-3 text-xl text-orange-600">Booking Meals </h4>
        <div className="w-[90%]">
          <TableMeals />
        </div>
        <div className="mt-1 font-bold text-green-700">payed successfully</div>
      </div>
    </div>
  );
}

function HeaderInvoice() {
  return (
    <div className="flex w-[100%] items-center justify-around bg-[#c79439] p-2 font-Inter text-black">
      <h4>Faene</h4>
      <p>Invoice</p>
      <p>{getCurrentDateTime()}</p>
    </div>
  );
}

function TableCLient() {
  const { Cart, name, email, phone, persons, date, totalPrice } = useData();
  const styleTdHeader = 'text-sm  text-stone-800';
  const styleTdDataHeader = 'text-amber-900 pl-2  ';
  const tr = 'text-left';
  return (
    <table className="mt-3 pb-4 text-center">
      <thead className="w-full">
        <th className={tr}>
          <td className="text-center" colSpan={2}>
            CLien Data
          </td>
        </th>
      </thead>
      <tbody className="">
        <tr className={tr}>
          <td className={styleTdHeader}>Name:</td>
          <td className={styleTdDataHeader}>{name}</td>
        </tr>
        <tr className={tr}>
          <td className={styleTdHeader}>Email:</td>
          <td className={styleTdDataHeader}>{email}</td>
        </tr>
        <tr className={tr}>
          <td className={styleTdHeader}>Invoice Date:</td>
          <td className={styleTdDataHeader}>{date}</td>
        </tr>
        <tr className={tr}>
          <td className={styleTdHeader}>Number persons:</td>
          <td className={styleTdDataHeader}>{persons}</td>
        </tr>

        <tr className={tr}>
          <td className={styleTdHeader}>Total Price:</td>
          <td className={styleTdDataHeader}>{totalPrice}</td>
        </tr>
      </tbody>
    </table>
  );
}
function TableMeals() {
  const { Cart } = useData();
  const header = 'bg-[#c79439] text-black mx-1 font-Inter';
  const text = 'font-Inter text-black px-1';
  const border = 'border border-solid border-stone-900 px-1  text-center';
  return (
    <table className="w-full">
      <thead>
        <tr>
          <td className={`${border} ${header}`}>Name Meal</td>
          <td className={`${border} ${header}`}>Price</td>

          <td className={`${border} ${header}`}>quantity</td>
          <td className={`${border} ${header}`}>Total Price</td>
        </tr>
      </thead>
      <tbody>
        {Cart?.map((meal) => {
          return (
            <tr className={border} key={meal.id}>
              <td className={`${text}`}>{meal.name}</td>
              <td className={`${text}`}>{meal.price}</td>
              <td className={`${text}`}>{meal.quantity}</td>
              <td className={`${text}`}>{meal.price * meal.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
