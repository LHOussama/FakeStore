import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../model/Product';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching category products:', err);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, [categoryName]);

  const formatCategoryName = (category: string) => {
    const translations: { [key: string]: string } = {
      "men's clothing": "Vêtements Hommes",
      "women's clothing": "Vêtements Femmes",
      "jewelery": "Bijoux",
      "electronics": "Électronique"
    };
    return translations[category] || category;
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-16 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="relative inline-block text-4xl font-bold text-gray-800">
          <span className="absolute -left-4 top-0 h-full w-1 bg-blue-600"></span>
          {formatCategoryName(categoryName?? '')}
          <span className="absolute -right-4 top-0 h-full w-1 bg-blue-600"></span>
        </h1>
        <div className="mt-4 text-gray-600">
          <p className="text-lg">
            Affichage des produits{' '}
            <span className="font-semibold text-blue-600">
              {startIndex + 1} - {Math.min(startIndex + productsPerPage, products.length)}
            </span>{' '}
            sur{' '}
            <span className="font-semibold text-blue-600">{products.length}</span> produits
          </p>
        </div>
        <div className="mx-auto mt-4 h-1 w-24 bg-blue-600"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="size-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h2 className="mb-2 line-clamp-2 text-lg font-semibold group-hover:text-blue-600">
                  {product.title}
                </h2>
                <p className="text-2xl font-bold text-blue-600">
                  {product.price.toFixed(2)} €
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
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`rounded px-4 py-2 transition-colors ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
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
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryProducts;