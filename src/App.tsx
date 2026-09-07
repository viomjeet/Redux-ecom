import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navigation/Navigation';
import Product from './Products';
import CartItem from './CartItem';
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useIdleTimer } from './hooks/useIdleTimer';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useIdleTimer();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartItem /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;