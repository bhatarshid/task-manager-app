import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import 'react-day-picker/dist/style.css'
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
        <App />
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </Provider>
  </StrictMode>,
)
