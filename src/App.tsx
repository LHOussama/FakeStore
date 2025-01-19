import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import ProductList from './components/Products';
import ProductDetail from './components/ProductDetails';

const  App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;