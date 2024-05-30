import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
// import '@fontsource/poppins/400.css'; // Normal weight
// import '@fontsource/poppins/700.css'; // Bold weight

import '@fontsource/nunito/400.css'; // Normal weight
import '@fontsource/nunito/700.css'; // Bold weight
import '@fontsource/nunito'; // Defaults to weight 400 with all styles included.



ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='font-dancing'>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>,
  </div>
)
