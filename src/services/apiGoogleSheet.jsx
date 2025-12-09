// import { useEffect, useState } from 'react';

// // const API_URL =
// //   'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMMuout8G20UlBABF2j3wbKOA_TrYSPcDhK0Qfc-4RLFoLfaNzROJhrazacHk-fZsxORpm9spjTR0p/pubhtml';
// const API_URL =
//   'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMMuout8G20UlBABF2j3wbKOA_TrYSPcDhK0Qfc-4RLFoLfaNzROJhrazacHk-fZsxORpm9spjTR0p/pub?output=csv';

// export default function Reservations() {
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({
//     Name: '',
//     Email: '',
//     Phone: '',
//     NumPersons: '',
//     Date: '',
//   });
//   const [editId, setEditId] = useState(null);

//   const fetchData = () => {
//     fetch(API_URL) // API_URL يكون رابط CSV وليس pubhtml
//       .then((res) => res.text())
//       .then((csvText) => {
//         const lines = csvText.split('\n').slice(1); // تجاهل الهيدر
//         const rows = lines.map((line) => {
//           const [id, Name, Email, Phone, NumPersons, Date] = line.split(',');
//           return { id, Name, Email, Phone, NumPersons, Date };
//         });
//         setData(rows);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const payload = editId ? { id: editId, ...form } : form;
//     await fetch(API_URL, {
//       method: 'POST',
//       body: JSON.stringify(payload),
//     });
//     setForm({ Name: '', Email: '', Phone: '', NumPersons: '', Date: '' });
//     setEditId(null);
//     fetchData();
//   };

//   const handleDelete = async (id) => {
//     await fetch(API_URL, {
//       method: 'DELETE',
//       body: JSON.stringify({ id }),
//     });
//     fetchData();
//   };

//   const handleEdit = (row) => {
//     setForm({
//       Name: row.Name,
//       Email: row.Email,
//       Phone: row.Phone,
//       NumPersons: row.NumPersons,
//       Date: row.Date,
//     });
//     setEditId(row.id);
//   };

//   return (
//     <div>
//       <h2>الحجوزات</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <input
//           placeholder="الاسم"
//           name="Name"
//           value={form.Name}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="الايميل"
//           name="Email"
//           value={form.Email}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="الهاتف"
//           name="Phone"
//           value={form.Phone}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="عدد الأشخاص"
//           name="NumPersons"
//           value={form.NumPersons}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.Date}
//           onChange={handleChange}
//         />
//         <button onClick={handleSubmit}>{editId ? 'تعديل' : 'إضافة'}</button>
//       </div>

//       <table border="1" cellPadding="5">
//         <thead>
//           <tr>
//             <th>الاسم</th>
//             <th>الايميل</th>
//             <th>الهاتف</th>
//             <th>عدد الأشخاص</th>
//             <th>التاريخ</th>
//             <th>تحرير</th>
//             <th>حذف</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//               <td className='border-2 text-center p-3 border-solid border-orange-500'>{row.Name}</td>
//               <td className='border-2 text-center p-3 border-solid border-orange-500'>{row.Email}</td>
//               <td className='border-2 text-center p-3 border-solid border-orange-500'>{row.Phone}</td>
//               <td className='border-2 text-center p-3 border-solid border-orange-500'>{row.NumPersons}</td>
//               <td className='border-2 text-center p-3 border-solid border-orange-500'>{row.Date}</td>
//               <td>
//                 <button onClick={() => handleEdit(row)}>تعديل</button>
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(row.id)}>حذف</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

const SHEET_NAME = 'Reservations';

// GET → جلب البيانات
function doGet() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // إزالة Header
  const rows = data.map((row) => {
    let obj = {};
    row.forEach((val, i) => (obj[headers[i]] = val));
    return obj;
  });
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// POST → إضافة أو تعديل
function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  if (data.id) {
    // تعديل صف موجود
    const values = sheet.getDataRange().getValues();
    const headers = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] == data.id) {
        headers.forEach((h, j) => {
          sheet.getRange(i + 1, j + 1).setValue(data[h]);
        });
        break;
      }
    }
  } else {
    // إضافة صف جديد
    const lastRow = sheet.getLastRow();
    const newId = lastRow; // رقم تلقائي
    sheet.appendRow([
      newId,
      data.Name,
      data.Email,
      data.Phone,
      data.NumPersons,
      data.Date,
    ]);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' }),
  ).setMimeType(ContentService.MimeType.JSON);
}

// DELETE → حذف صف
function doDelete(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] == data.id) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'deleted' }),
  ).setMimeType(ContentService.MimeType.JSON);
}
import { useState, useEffect } from 'react';

const API_URL = 'ضع رابط Web App هنا';

export default function Reservations() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    Phone: '',
    NumPersons: '',
    Date: '',
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = editId ? { id: editId, ...form } : form;
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setForm({ Name: '', Email: '', Phone: '', NumPersons: '', Date: '' });
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(API_URL, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const handleEdit = (row) => {
    setForm({
      Name: row.Name,
      Email: row.Email,
      Phone: row.Phone,
      NumPersons: row.NumPersons,
      Date: row.Date,
    });
    setEditId(row.id);
  };

  return (
    <div>
      <h2>الحجوزات</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          name="Name"
          placeholder="الاسم"
          value={form.Name}
          onChange={handleChange}
        />
        <input
          name="Email"
          placeholder="الايميل"
          value={form.Email}
          onChange={handleChange}
        />
        <input
          name="Phone"
          placeholder="الهاتف"
          value={form.Phone}
          onChange={handleChange}
        />
        <input
          name="NumPersons"
          placeholder="عدد الأشخاص"
          value={form.NumPersons}
          onChange={handleChange}
        />
        <input
          type="date"
          name="Date"
          value={form.Date}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>{editId ? 'تعديل' : 'إضافة'}</button>
        
      </div>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الايميل</th>
            <th>الهاتف</th>
            <th>عدد الأشخاص</th>
            <th>التاريخ</th>
            <th>تحرير</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.Name}</td>
              <td>{row.Email}</td>
              <td>{row.Phone}</td>
              <td>{row.NumPersons}</td>
              <td>{row.Date}</td>
              <td>
                <button onClick={() => handleEdit(row)}>تعديل</button>
              </td>
              <td>
                <button onClick={() => handleDelete(row.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}