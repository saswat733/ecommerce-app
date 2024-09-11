import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import HeaderComponent from './components/Header'
import ProductPage from './pages/ProductPage'
import ProductListPage from './pages/ProductListPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function Layout() {
  const location = useLocation();
  const headerAvoidPage = location.pathname === "/login" || location.pathname === "/signup";
  
  return (
    <>
      {/* Conditionally render the Header */}
      {!headerAvoidPage && <HeaderComponent />}
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
