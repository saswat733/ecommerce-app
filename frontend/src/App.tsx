import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import HeaderComponent from './components/Header'
import ProductPage from './pages/ProductPage'
import ProductListPage from './pages/ProductListPage'

function App() {

  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/product/:id' element={<ProductPage/>}/>
    <Route path='/products/:category' element={<ProductListPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
