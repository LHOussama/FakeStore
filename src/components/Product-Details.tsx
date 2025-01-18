import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        <div className="size-16 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="mb-8 inline-block font-medium text-blue-600 hover:text-blue-800"
      >
        ← Retour aux produits
      </Link>
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
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {product.category}
          </span>
          <p className="mb-6 text-gray-600">{product.description}</p>
          <p className="mb-6 text-3xl font-bold text-blue-600">
            {product.price.toFixed(2)} €
          </p>
          <button className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;