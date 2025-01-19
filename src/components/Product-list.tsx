import { useState, useEffect } from 'react';
import { Product } from '../model/Product';
import { ProductApp } from './Product-component';
const ProductList = () => {
  
  // State for products
  const [products, setProducts] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for categories
  const [categories, setCategories] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  
  // Filter products
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Products to display
  let currentProducts = products
      .filter(product => {
        if (selectedCategory) {
          return product.category === selectedCategory;
        }
        return true
      })
  
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;  
  currentProducts = currentProducts.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => setError('Error fetching products: ' + err));

  }, []);

  if (error) {
    return <div className="py-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="relative inline-block text-3xl font-bold text-gray-800">
          Fake Boutique
        </h1>
        <div className="mt-4 text-gray-600">
          <p className="text-sm">
            Affichage {' '}
            <span className="font-semibold">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, products.length)}
            </span>{' '}
            sur{' '}
            <span className="font-semibold">{products.length}</span> produits
          </p>
        </div>
      </div>

      <div>
        <select className='mb-4 rounded border px-3 py-2 outline-none' onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value=''>Toutes les catégories</option>
          {categories.map((category: string) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

      </div>


      {isLoading ? (
        <div className="mt-10 flex items-center justify-center">
          <svg className="-ml-1 mr-3 size-10 animate-spin text-pink-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {currentProducts.map((product) => (
            ProductApp(product)
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <span className="text-sm">Produits par page</span>
            <select onChange={e => setItemsPerPage(Number(e.target.value))} className='rounded border px-3 py-2 outline-none'>
              {[5, 10, 20, 30, 40, 50].map((item) => (
                <option key={item} value={item} selected={item == itemsPerPage}>{item}</option>
              ))}
            </select>
          </div>


          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded px-4 py-2 transition-colors ${
                currentPage === 1
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-pink-800 text-white hover:bg-pink-800'
              }`}
            >
              Précédent
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`rounded px-4 py-2 transition-colors ${
              currentPage === index + 1
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`rounded px-4 py-2 transition-colors ${
                currentPage === totalPages
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-pink-800 text-white hover:bg-pink-800'
              }`}
            >
              Suivant
            </button>
          </div>

        </div>
        </>
      )}
    </div>
  );
};

export default ProductList;