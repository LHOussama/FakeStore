import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const formatCategoryName = (category: never) => {
    switch(category) {
      case "men's clothing":
        return "Vêtements Hommes";
      case "women's clothing":
        return "Vêtements Femmes";
      case "jewelery":
        return "Bijoux";
      case "electronics":
        return "Électronique";
      default:
        return category;
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            FakeStore
          </Link>
          <div className="hidden items-center space-x-8 md:flex">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Accueil</Link>
            <div className="relative">
              <button 
                className={`text-gray-600 hover:text-blue-600 focus:outline-none ${isCategoryOpen ? 'text-blue-600' : ''}`}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setTimeout(() => setIsCategoryOpen(false), 200);
                  }
                }}
              >
                Catégories
              </button>
              {isCategoryOpen && (
                <div 
                  className="absolute z-10 mt-2 w-48 bg-white py-2 shadow-lg"
                  onMouseDown={(e) => e.preventDefault()} 
                  >
                  {categories.map(category => (
                    <Link 
                      key={category}
                      to={`/category/${category}`} 
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {formatCategoryName(category)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-gray-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="block rounded-md px-3 py-2 text-gray-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {formatCategoryName(category)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;