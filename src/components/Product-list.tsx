import { useState, useEffect } from 'react';
import { Product } from '../model/Product';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const productsPerPage = 12;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setIsLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="relative inline-block text-4xl font-bold text-gray-800">
          Fake Boutique
        </h1>
        <div className="mt-4 text-gray-600">
          <p className="text-sm">
            Affichage des produits{' '}
            <span className="font-semibold">
              {startIndex + 1} - {Math.min(startIndex + productsPerPage, products.length)}
            </span>{' '}
            sur{' '}
            <span className="font-semibold">{products.length}</span> produits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="h-full overflow-hidden rounded-2xl border bg-white shadow-none transition duration-300 hover:shadow-lg">
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="size-full object-contain px-6 py-8"
                />
              </div>
              <div className="flex flex-col justify-between gap-3 px-4 py-8">
                <h6 className="line-clamp-2 text-sm group-hover:text-pink-800">
                  {product.title}
                </h6>
                <p className="text-lg font-bold">
                  {product.price.toFixed(2)} MAD
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(index + 1)}
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
          onClick={() => handlePageChange(currentPage + 1)}
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
  );
};

export default ProductList;