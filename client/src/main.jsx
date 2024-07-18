import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { Providers } from './redux/Provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();