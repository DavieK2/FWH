import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ children }) {

  return (
    <>
      <div className={`main-section antialiased relative font-nunito text-sm font-normal`}>
        {children}
      </div>
      <ToastContainer />
    </>
  )
}

export default App
