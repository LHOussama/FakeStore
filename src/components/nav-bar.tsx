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

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid h-16 grid-cols-12 items-center space-x-6">
          <div className="col-span-2">
            <Link to="/">
              <div className='flex items-center space-x-3'>
                <img className='h-8' src="https://fakestoreapi.com/icons/logo.png" alt="Fake store" />
                <span className='font-bold'>FakeStore</span>
              </div>
            </Link>
          </div>
          <div className="col-span-7">
            <div className='grow'>
              <div className="flex w-full">
                <input type="text" placeholder="Search..." className="w-full rounded rounded-e-none border border-e-0 border-gray-300 px-4 py-2 transition focus:border-pink-800 focus:outline-none focus:ring-1 focus:ring-pink-800"/>
                <button className="rounded rounded-s-none bg-pink-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-900">
                  Search
                </button>
              </div>

            </div>
          </div>
          <div className="col-span-3">
            <div className="flex items-center justify-end">
              <div className="hidden items-center space-x-8 md:flex">
                <Link to="/" className="text-gray-600 hover:text-pink-600">Accueil</Link>
                <div className="relative">
                  <button 
                    className={`text-gray-600 hover:text-pink-800 focus:outline-none ${isCategoryOpen ? 'text-blue-600' : ''}`}
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
                          className="block px-4 py-2 text-gray-800 hover:bg-pink-50"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-gray-600 hover:bg-pink-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            {categories.map(category => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="block rounded-md px-3 py-2 text-gray-600 hover:bg-pink-800"
                onClick={() => setIsMenuOpen(false)}
              >
                { category }
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;