
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

import 'react-perfect-scrollbar/dist/css/styles.css';

import { RouterProvider } from 'react-router-dom';
import router from './router/index';

import { Provider } from 'react-redux';
import store from './redux/app/store.js';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);

