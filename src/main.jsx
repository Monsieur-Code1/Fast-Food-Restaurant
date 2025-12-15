import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import App from './App.jsx';
import './index.css';
import { DataProvider } from './context/Context.jsx';
import { Browser } from 'leaflet';
import { BrowserRouter } from 'react-router-dom';
import StarRating from './feature/starsRating/StarRating.jsx';
createRoot(document.getElementById('root')).render(
  // const [numStarRating,setNumStarRating]=useState("")
  <StrictMode>
    <DataProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true, // لمعالجة التحذير الأول
          v7_relativeSplatPath: true, // لمعالجة التحذير الثاني
        }}
      >
        <App />
      </BrowserRouter>
    </DataProvider>
    
  </StrictMode>,
);
