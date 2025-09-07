import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Navbar from './layout/Header.jsx';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {store} from "./redux/store.js"
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    {/* <Navbar /> */}
    <Provider store={store}>
      <App />
    </Provider>
   </StrictMode>
  </BrowserRouter>
)
