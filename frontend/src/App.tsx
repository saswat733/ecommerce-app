import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import HeaderComponent from './components/Header'
import ProductPage from './pages/ProductPage'
import ProductListPage from './pages/ProductListPage'
import LoginPage from './pages/LoginPage'

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  
  return (
    <>
      {/* Conditionally render the Header */}
      {!isLoginPage && <HeaderComponent />}
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
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
