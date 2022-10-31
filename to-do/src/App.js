import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthProvider from './contexts/AuthContext';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Login from './Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Categories from './components/Categories/Categories';
import ToDo from './components/ToDos/ToDo';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/todos' element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
          <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
