import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../model/Product';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data as Product))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-16 animate-spin rounded-full border-b-2 border-red-600"></div>
      </div>
    );
  }

  const starRating = Math.round(product.rating?.rate ?? 0);
  const totalStars = 5;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-8 shadow-lg md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full object-contain"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
          <span className="mb-4 inline-block rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
            {product.category}
          </span>
          <p className="mb-6 text-gray-600">{product.description}</p>
          <p className="mb-6 text-3xl font-bold text-pink-600">
            {product.price.toFixed(2)} MAD
          </p>
          <p className="mb-2 text-gray-700">
            Quantité: {product.rating?.count ?? 0}
          </p>
          <div className="mb-4 flex items-center space-x-1">
            {Array.from({ length: totalStars }).map((_, i) => (
              <span key={i} className={i < starRating ? 'text-yellow-500' : 'text-gray-400'}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating?.rate ?? 0})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
