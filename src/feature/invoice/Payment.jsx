import html2pdf from 'html2pdf.js';
import { useState } from 'react';
import { useData } from '../../context/Context';

import { useNavigate } from 'react-router-dom';
import Invoice from './Invoice';

export default function PaymentApp() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div>
      <div>
        <Payment {...{ paymentSuccess, setPaymentSuccess }} />
      </div>
      <div className="hidden">{paymentSuccess && <Invoice />}</div>
    </div>
  );
}

// المكون الرئيسي لنموذج الدفع
const Payment = ({ paymentSuccess, setPaymentSuccess }) => {
  // حالة لإدارة حقول النموذج
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const { invoiceRef, Cart, setCart } = useData();
  // حالة لتتبع حالة الدفع
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // معالج التغييرات في حقول الإدخال
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // معالج عملية الدفع الوهمية
  const handlePayment = (e) => {
    e.preventDefault();

    // **تحقق بسيط من إدخال البيانات (يمكن تحسينه)**
    if (Object.values(formData).some((val) => val === '')) {
      alert('الرجاء تعبئة جميع الحقول.');
      return;
    }

    setIsProcessing(true);
    setPaymentSuccess(false);

    // **محاكاة عملية دفع تستغرق وقتًا (2 ثانية)**
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // إظهار التوست
      setShowToast(true);

      // إخفاء التوست بعد 3 ثوانٍ
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // هنا يتم عادةً مسح النموذج أو إعادة توجيه المستخدم
    }, 2000);
  };

  // معالج لزر طباعة الفاتورة
  const handlePrintInvoice = () => {
    const element = invoiceRef.current;

    if (!element) return;

    const options = {
      margin: 0.1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  };

  // -------------------------------------------------------------------
  // مكون التوست (الإشعار)
  const Toast = ({ message }) => (
    <div
      className={`fixed left-1/2 top-5 z-50 -translate-x-1/2 transform rounded-lg p-4 text-white shadow-xl transition-opacity duration-300 ${
        showToast ? 'bg-green-500 opacity-100' : 'pointer-events-none opacity-0'
      } w-full max-w-sm text-center`}
    >
      {message}
    </div>
  );
  // -------------------------------------------------------------------
  const Navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#bf9742] p-4 font-Inter">
      {/* عرض التوست */}
      {showToast && <Toast message="✅ تم الدفع بنجاح!" />}

      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl md:p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          💰 Payment Form
        </h2>

        {paymentSuccess ? (
          /* حالة نجاح الدفع */
          <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="mb-4 text-xl font-semibold text-green-700">
              Payment processed successfully!
            </p>
            <div className="flex items-center justify-around">
              <button
                className="mt-4 w-full rounded-lg bg-yellow-600 px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:bg-yellow-700 md:w-auto"
                onClick={() => {
                  (Navigate('/'), setCart([]));
                }}
              >
                &larr; back
              </button>
              <button
                onClick={handlePrintInvoice}
                className="mt-4 w-full rounded-lg bg-green-600 px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:bg-green-700 md:w-auto"
                disabled={isProcessing}
              >
                🖨️ print invoice
              </button>
            </div>
          </div>
        ) : (
          /* نموذج الدفع */
          <form onSubmit={handlePayment} className="space-y-6">
            {/* حقل اسم حامل البطاقة */}
            <div className="relative">
              <label
                htmlFor="cardHolder"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder="ex:Ahmed Ali Sayed"
                required
                className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* حقل رقم البطاقة */}
            <div className="relative">
              <label
                htmlFor="cardNumber"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                number card (16 number)
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="16"
                required
                className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* حقول التاريخ و CVV */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <div className="relative w-1/2">
                <label
                  htmlFor="expiryDate"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  end date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative w-1/2">
                <label
                  htmlFor="cvv"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 transition duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* زر الدفع */}
            <button
              type="submit"
              className={`mt-6 w-full rounded-lg py-3 font-semibold text-white shadow-md transition duration-200 ${
                isProcessing
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing Payment...
                </div>
              ) : (
                ' Pay Now'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
