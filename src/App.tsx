import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar';
import ProductList from './components/Product-list';
import ProductDetail from './components/Product-Details';
import CategoryProducts from './components/Category-products';

const  App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;