import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/Header';
import ProductPage from './pages/ProductPage';
import ProductListPage from './pages/ProductListPage';
import SignUpPage from './pages/SignUpPage';
import { lazy, Suspense } from 'react';
import EmailOtpPage from './pages/Email-otp';

const Cart = lazy(() => import('./pages/CartPage'));
const Login = lazy(() => import('./pages/LoginPage'));

function Layout() {
  const location = useLocation();
  const headerAvoidPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/email-verification';

  return (
    <>
      {/* Conditionally render the Header */}
      {!headerAvoidPage && <HeaderComponent />}
      {/* Define routes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products/:category" element={<ProductListPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/email-verification" element={<EmailOtpPage/>} />
        
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
