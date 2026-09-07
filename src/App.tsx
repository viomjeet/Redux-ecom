import { Routes, Route } from 'react-router-dom';
import Navbar from './Navigation/Navigation';
import Product from './Products';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </>
  );
}

export default App;